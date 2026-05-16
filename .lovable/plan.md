## Objetivo

Fazer o push notification funcionar **sem você precisar colar nenhuma chave** e sem deixar chave privada no código-fonte (resolve o alerta de segurança).

Nada de OneSignal/Firebase/serviço pago. O padrão Web Push (VAPID) já é 100% gratuito e usa os servidores de push do próprio navegador (Google/Mozilla/Apple) — só precisa de um par de chaves nosso.

## Como vai funcionar

1. Na **primeira vez** que o servidor for chamado para enviar/registrar push, ele:
   - Procura o par VAPID numa tabela nova `app_secrets`.
   - Se não existir, **gera um par novo** com `web-push.generateVAPIDKeys()` e salva.
2. Daí em diante, qualquer envio lê o par direto do banco. Nenhuma chave fica no código nem precisa ser configurada como secret.
3. A **chave pública** é exposta por um server function `getVapidPublicKey()` que o `pwa.ts` chama antes de inscrever o navegador (substitui o `src/lib/vapid.ts` hardcoded).
4. A chave privada nunca sai do servidor (acesso só via `supabaseAdmin`, RLS bloqueia leitura pública).

## Mudanças

### Banco
Nova tabela:
```text
app_secrets
  key   text primary key
  value text not null
  created_at timestamptz default now()
```
RLS: ativada, **nenhuma policy pública** — só `supabaseAdmin` (service role) lê/escreve. Linhas usadas: `vapid_public`, `vapid_private`, `vapid_subject`.

### `src/server/push.server.ts`
- Remove fallbacks hardcoded da chave (já era pendência do scan).
- `ensureVapid()` passa a:
  1. ler as 3 linhas em `app_secrets`;
  2. se faltar par, chamar `webpush.generateVAPIDKeys()`, gravar e usar;
  3. cachear em memória pro restante do processo.
- `VAPID_SUBJECT` cai em `mailto:contato@autolimpezapro.app` se não tiver no banco.

### `src/server/push.functions.ts`
- Adiciona `getVapidPublicKey` (server fn público, GET) que devolve só a pública.
- `saveSubscription` continua sem aceitar `user_id` do cliente (já corrigido).

### `src/lib/vapid.ts` e `src/lib/pwa.ts`
- Apaga a constante `VAPID_PUBLIC_KEY` hardcoded.
- `ensurePushSubscription` chama `getVapidPublicKey()` e usa o retorno como `applicationServerKey`.
- Cacheia em `sessionStorage` pra não bater no servidor toda hora.

### Painel admin (opcional, mas útil)
Em `AdminPanel`, um botão **"Rotacionar chaves VAPID"** que:
- chama um server fn admin-only,
- gera novo par, sobrescreve no banco,
- limpa todas as `push_subscriptions` antigas (ficam inválidas com a nova chave),
- mostra aviso pra reinstalar o PWA.

## Resultado prático

- Você publica o site, abre uma vez, e o servidor já cria as chaves sozinho.
- Usuário clica em "Ativar notificações" → navegador inscreve com a chave pública vinda do servidor → você consegue mandar push pelo painel admin.
- Nada de pedir secret no Lovable Cloud, nada de chave no Git, alerta do scanner some.

## Riscos / pontos de atenção

- Se um dia o banco for resetado, as inscrições antigas viram "lixo" (404 no envio) — o código já remove automaticamente endpoints com 404/410, então se auto-limpa.
- iOS Safari só aceita push se o site estiver instalado como PWA (Adicionar à Tela de Início). Isso é limitação da Apple, não do nosso lado.
- Push **só funciona no domínio publicado** (HTTPS), não no preview do Lovable — o `pwa.ts` já bloqueia preview de propósito.

Posso seguir e implementar?