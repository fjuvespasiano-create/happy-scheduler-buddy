import type { Post, PostBloco } from "./blog";

/**
 * 50 DICAS & ARTIGOS PREMIUM
 * Higienização de estofados + Estética automotiva
 * Cada artigo é montado a partir de um briefing compacto para manter
 * tamanho de arquivo razoável sem perder profundidade de conteúdo.
 */

interface Briefing {
  slug: string;
  titulo: string;
  resumo: string;
  data: string;
  leitura: string;
  categoria: "Sofá" | "Colchão" | "Automotiva" | "Impermeabilização" | "Preços";
  keywords: string[];
  intro: string;
  secoes: Array<{
    h2: string;
    paragrafos: string[];
    bullets?: string[];
  }>;
  cta?: string;
}

const HOJE_BASE = "2026-05-";
function dataIncremental(i: number) {
  const d = String(20 - (i % 20)).padStart(2, "0");
  return `${HOJE_BASE}${d}`;
}

function montar(b: Briefing, idx: number): Post {
  const blocos: PostBloco[] = [{ tipo: "p", texto: b.intro }];
  for (const s of b.secoes) {
    blocos.push({ tipo: "h2", texto: s.h2 });
    for (const p of s.paragrafos) blocos.push({ tipo: "p", texto: p });
    if (s.bullets && s.bullets.length) blocos.push({ tipo: "ul", itens: s.bullets });
  }
  if (b.cta) blocos.push({ tipo: "cta", texto: b.cta });
  return {
    slug: b.slug,
    titulo: b.titulo,
    resumo: b.resumo,
    data: b.data || dataIncremental(idx),
    leitura: b.leitura,
    categoria: b.categoria,
    tipo: "manual",
    keywords: b.keywords,
    conteudo: blocos,
  };
}

const BRIEFINGS: Briefing[] = [
  /* =============== SOFÁ (15) =============== */
  {
    slug: "como-limpar-sofa-de-tecido-claro-sem-manchar",
    titulo: "Como limpar sofá de tecido claro sem deixar mancha de água",
    resumo: "Tecido claro é o que mais mostra erro de limpeza. Veja o método correto para não criar halo, encardido ou amarelado.",
    data: "2026-05-19",
    leitura: "6 min",
    categoria: "Sofá",
    keywords: ["limpar sofá tecido claro", "sofá branco amarelado", "mancha de água no sofá"],
    intro: "Sofá de tecido claro — bege, off-white, linho cru, suede claro — é o que mais sofre com tentativas caseiras. O problema raramente é a sujeira em si: é o método. Pano molhado, sabão em pó, escova dura e excesso de água são responsáveis pela maioria dos halos amarelados que aparecem dias depois da limpeza. Neste guia você entende por que isso acontece e qual é o caminho correto.",
    secoes: [
      {
        h2: "Por que aparece halo amarelado depois que seca",
        paragrafos: [
          "Quando você esfrega pano molhado em um ponto específico, a água carrega a sujeira da superfície para o miolo da espuma. Conforme a região seca de fora para dentro, a sujeira sobe novamente junto com a umidade — e se deposita exatamente no contorno da área molhada. O resultado é um anel amarelado que parece pior do que a mancha original.",
          "Em tecidos claros isso fica visível por contraste. O encardido natural do sofá disfarça pequenas variações, mas o halo concentrado denuncia a tentativa de limpeza.",
        ],
      },
      {
        h2: "O método correto para tecido claro",
        paragrafos: [
          "A regra de ouro é: limpar a peça inteira, não só a mancha. Isso evita o contraste. E usar o mínimo de água possível.",
        ],
        bullets: [
          "Aspire bem antes de qualquer líquido (poeira + líquido = barro)",
          "Use pano de microfibra apenas umedecido, não encharcado",
          "Trabalhe a peça inteira em movimentos circulares amplos",
          "Seque imediatamente com pano seco absorvendo a umidade",
          "Mantenha ventilação cruzada até secar completamente (2 a 4 horas)",
        ],
      },
      {
        h2: "Quando chamar profissional",
        paragrafos: [
          "Se o sofá já tem halo, encardido nos braços ou cheiro de umidade, a limpeza caseira tende a piorar. A extratora profissional aspira a água de volta junto com a sujeira, sem deixar resíduo no miolo da espuma — é o único método que devolve uniformidade ao tecido claro.",
        ],
      },
    ],
    cta: "Sofá claro com halo ou encardido? Mande uma foto no WhatsApp e devolvemos o orçamento exato em minutos.",
  },
  {
    slug: "quantas-vezes-por-ano-higienizar-o-sofa",
    titulo: "De quanto em quanto tempo devo higienizar meu sofá?",
    resumo: "Não é todo ano. Depende de pet, criança, fumante e tipo de tecido. Veja a frequência ideal para cada caso.",
    leitura: "4 min", data: "2026-05-18", categoria: "Sofá",
    keywords: ["frequência higienização sofá", "quando higienizar sofá", "manutenção sofá"],
    intro: "A pergunta que mais aparece no WhatsApp é: 'a cada quanto tempo eu deveria higienizar o sofá?'. A resposta honesta é: depende do uso. Um sofá em casa só de adultos sem pet pode ir 12 a 18 meses tranquilamente. Já um sofá com cachorro deitando todo dia precisa de manutenção a cada 4 a 6 meses.",
    secoes: [
      {
        h2: "Tabela de frequência por perfil de casa",
        paragrafos: ["Use esta referência como ponto de partida e ajuste de acordo com o uso real."],
        bullets: [
          "Casa sem pet e sem criança: a cada 12 a 18 meses",
          "Casa com criança pequena: a cada 8 a 10 meses",
          "Casa com pet de pequeno porte: a cada 6 a 8 meses",
          "Casa com pet de médio/grande porte que sobe no sofá: a cada 4 a 6 meses",
          "Casa com fumante: a cada 6 meses (o cheiro fixa na espuma)",
          "Sofá de tecido claro em sala de uso intenso: a cada 8 meses",
        ],
      },
      {
        h2: "Sinais de que está na hora",
        paragrafos: ["Independente do tempo, alguns sinais não devem ser ignorados:"],
        bullets: [
          "Cheiro que aparece quando alguém senta",
          "Encardido no encosto da cabeça ou nos braços",
          "Coceira ou espirros logo após sentar",
          "Tecido com aparência opaca, sem 'caimento'",
          "Mancha antiga que você já tentou tirar sem sucesso",
        ],
      },
    ],
  },
  {
    slug: "diferenca-entre-lavagem-a-seco-e-extracao-no-sofa",
    titulo: "Lavagem a seco x extração: qual é melhor para o seu sofá?",
    resumo: "Os dois métodos têm aplicação. Veja quando cada um é indicado e o que NÃO fazer de jeito nenhum.",
    leitura: "5 min", data: "2026-05-17", categoria: "Sofá",
    keywords: ["lavagem a seco sofá", "extração sofá", "higienização sofá método"],
    intro: "Existe muita confusão entre 'lavagem a seco' e 'extração'. Os dois são processos profissionais legítimos, mas servem para coisas diferentes. Escolher o errado pode encolher tecido, desbotar cor ou simplesmente não resolver o cheiro.",
    secoes: [
      {
        h2: "Lavagem a seco — quando usar",
        paragrafos: [
          "A lavagem a seco usa muito pouca água e produtos específicos que removem sujeira por contato. É indicada para tecidos sensíveis (veludo, chenille de fibra delicada, suede natural) e para sofás onde você não pode arriscar encolhimento.",
          "Limitação: não atinge a sujeira profunda da espuma. Resolve aparência, não resolve odor.",
        ],
      },
      {
        h2: "Extração — quando usar",
        paragrafos: [
          "A extração injeta solução de limpeza no tecido e aspira em seguida, removendo a sujeira do miolo. É o método mais profundo e o único que resolve casos com xixi de pet, suor acumulado ou cheiro impregnado.",
          "Indicado para a maioria dos tecidos modernos (algodão tratado, poliéster, microfibra, courino).",
        ],
      },
      {
        h2: "O que nunca fazer",
        paragrafos: ["Independente do método profissional, evite em casa:"],
        bullets: [
          "Aplicar água sanitária ou cloro em tecido colorido",
          "Usar vassoura molhada (espalha sujeira)",
          "Secar com secador de cabelo (fixa a mancha pelo calor)",
          "Encharcar e deixar secar ao sol forte (amarela e endurece a espuma)",
        ],
      },
    ],
  },
  {
    slug: "como-identificar-tecido-do-sofa",
    titulo: "Como descobrir o tecido do seu sofá (e por que isso importa)",
    resumo: "Veludo, suede, chenille, linho, courino — cada um pede um cuidado. Guia rápido de identificação.",
    leitura: "4 min", data: "2026-05-16", categoria: "Sofá",
    keywords: ["tipos de tecido sofá", "identificar tecido sofá", "veludo suede chenille"],
    intro: "Antes de qualquer produto entrar em contato com o sofá, é fundamental saber qual é o tecido. Aplicar produto errado pode manchar permanentemente. Como ninguém guarda a etiqueta do sofá, segue um guia de identificação visual e ao toque.",
    secoes: [
      {
        h2: "Os 5 tecidos mais comuns no Brasil",
        paragrafos: ["Em ordem de popularidade nos lares brasileiros:"],
        bullets: [
          "Suede: superfície aveludada curta, parece camurça. Marca quando você passa o dedo.",
          "Veludo: fios longos e brilhantes, muda de tom dependendo do ângulo da luz.",
          "Chenille: textura felpuda com brilho discreto, fio mais grosso que veludo.",
          "Linho (ou similar): trama visível, aspecto natural, costuma ter cor neutra.",
          "Courino / corino: imita couro, é liso ao toque, brilho plástico característico.",
        ],
      },
      {
        h2: "Por que importa saber o tecido",
        paragrafos: [
          "Suede aceita produto à base de água com extração. Veludo precisa de método específico para não 'deitar' os fios. Chenille pede pouca fricção. Linho encolhe se molhar demais. Courino só precisa de pano úmido — produto de tecido pode ressecar e rachar.",
          "Profissional sério sempre testa o produto em uma área escondida antes de aplicar no todo.",
        ],
      },
    ],
  },
  {
    slug: "como-tirar-mancha-de-sangue-do-sofa",
    titulo: "Como tirar mancha de sangue do sofá (mesmo a antiga)",
    resumo: "Sangue se fixa muito rápido. Veja a regra de ouro e o que fazer se já secou.",
    leitura: "4 min", data: "2026-05-15", categoria: "Sofá",
    keywords: ["mancha de sangue sofá", "tirar sangue do tecido", "limpar sangue sofá"],
    intro: "Mancha de sangue tem um detalhe técnico: a proteína do sangue se desnatura com calor e se fixa permanentemente. Por isso, água quente é o pior inimigo. A regra de ouro é: água fria, sempre.",
    secoes: [
      {
        h2: "Mancha recente (até 1 hora)",
        paragrafos: ["Aja rápido. Cada minuto conta."],
        bullets: [
          "Pressione papel toalha sobre a mancha para absorver o que ainda está líquido",
          "Aplique água gelada com pano de microfibra batendo, sem esfregar",
          "Aplique solução de água fria + sal grosso e deixe agir por 10 minutos",
          "Absorva novamente com pano seco",
          "Repita até o pano sair limpo",
        ],
      },
      {
        h2: "Mancha antiga (já secou)",
        paragrafos: [
          "Se já secou, a proteína está fixada. Tentativas caseiras com água oxigenada podem desbotar o tecido — risco grande em sofá colorido.",
          "Nesse cenário, a extração profissional com produto enzimático específico para proteína é o caminho mais seguro. O produto quebra a ligação da proteína com a fibra e a extratora retira o resíduo sem deixar halo.",
        ],
      },
    ],
  },
  {
    slug: "produto-caseiro-para-sofa-funciona",
    titulo: "Produto caseiro para sofá funciona mesmo? A verdade técnica",
    resumo: "Vinagre, bicarbonato, sabão neutro... veja o que realmente ajuda e o que pode estragar seu estofado.",
    leitura: "5 min", data: "2026-05-14", categoria: "Sofá",
    keywords: ["produto caseiro sofá", "vinagre no sofá", "bicarbonato no sofá"],
    intro: "Existem dezenas de receitas caseiras circulando no WhatsApp. Algumas ajudam em emergência, outras estragam o sofá. Vamos por partes, com honestidade.",
    secoes: [
      {
        h2: "O que ajuda (com ressalvas)",
        paragrafos: ["Estes produtos podem ser usados pontualmente, sempre testando antes em área escondida:"],
        bullets: [
          "Vinagre branco diluído em água (1:3): bom para neutralizar odor leve",
          "Bicarbonato de sódio seco: absorve umidade e neutraliza cheiro se aspirado depois",
          "Sabão neutro de coco bem diluído: limpa superfície de tecidos resistentes",
          "Pano de microfibra úmido: o melhor 'produto' para manutenção semanal",
        ],
      },
      {
        h2: "O que pode estragar",
        paragrafos: ["Estes nunca devem encostar no estofado:"],
        bullets: [
          "Água sanitária (descolore na hora)",
          "Sabão em pó (não enxágua direito, gera halo)",
          "Detergente de louça em excesso (deixa filme pegajoso que atrai sujeira)",
          "Álcool 70 puro em veludo (mancha permanente)",
          "Acetona (derrete fibras sintéticas)",
        ],
      },
      {
        h2: "Limite do caseiro",
        paragrafos: [
          "Receita caseira limpa a superfície. Sujeira da espuma — onde mora o ácaro, o cheiro de pet e o suor — só sai com extração profissional. É a diferença entre passar pano no chão e passar aspirador de pó.",
        ],
      },
    ],
  },
  {
    slug: "alergia-respiratoria-e-sofa-sujo",
    titulo: "Alergia respiratória pode vir do sofá? Sim, e veja por quê",
    resumo: "Espirros, coceira nos olhos e nariz entupido logo após sentar no sofá têm explicação técnica.",
    leitura: "4 min", data: "2026-05-13", categoria: "Sofá",
    keywords: ["alergia sofá", "ácaro no sofá", "rinite e estofado"],
    intro: "Se você ou alguém da família começa a espirrar logo que senta no sofá, raramente é coincidência. O sofá é um dos principais reservatórios de ácaros, fungos e poeira fina dentro de casa — perde só para o colchão.",
    secoes: [
      {
        h2: "Por que o sofá acumula alérgenos",
        paragrafos: [
          "A espuma do sofá é porosa. Cada vez que alguém senta, o ar é empurrado para fora junto com fragmentos de pele, pelo de pet, poeira e umidade do suor. Quando a pessoa levanta, esse ar volta junto com mais sujeira do ambiente. É um ciclo de 'respiração' do sofá que concentra alérgenos.",
          "Ácaros se alimentam de células mortas da pele e adoram ambiente úmido e morno — exatamente as condições do interior do sofá.",
        ],
      },
      {
        h2: "Sinais de que o sofá está provocando a alergia",
        paragrafos: ["Observe se acontece:"],
        bullets: [
          "Espirros em sequência ao sentar",
          "Coceira no nariz ou nos olhos depois de assistir TV",
          "Tosse seca à noite quando a sala fica fechada",
          "Crianças com rinite que piora à tarde (quando passam mais tempo no sofá)",
        ],
      },
      {
        h2: "O que resolve",
        paragrafos: [
          "Aspirador comum de casa não atinge o ácaro do miolo. A higienização profissional combina aspiração com bocal específico + produto antialérgico + extração — esse trio reduz drasticamente a carga de alérgenos por meses. Quem tem rinite e fez higienização costuma notar diferença na primeira noite.",
        ],
      },
    ],
  },
  {
    slug: "sofa-retratil-cuidados",
    titulo: "Sofá retrátil e reclinável: 7 cuidados que prolongam a vida útil",
    resumo: "Mecanismo, espuma e tecido envelhecem em ritmos diferentes. Veja como evitar o 'afunda' precoce.",
    leitura: "5 min", data: "2026-05-12", categoria: "Sofá",
    keywords: ["sofá retrátil cuidados", "sofá reclinável manutenção", "como conservar sofá retrátil"],
    intro: "Sofá retrátil é o queridinho das salas brasileiras, mas tem 3 inimigos: poeira no mecanismo, peso concentrado na borda e limpeza errada no tecido. Cuidando desses 3 pontos, ele dura 8 a 10 anos sem afundar.",
    secoes: [
      {
        h2: "Os 7 cuidados práticos",
        paragrafos: ["Faça parte da rotina mensal:"],
        bullets: [
          "Aspire embaixo do assento retrátil pelo menos 1x por mês",
          "Não sente na borda do assento estendido (pressiona o mecanismo)",
          "Gire/alterne a posição das almofadas a cada 15 dias",
          "Não coma deitado com a parte reclinada estendida (líquido escorre para o mecanismo)",
          "Limpe os trilhos com pano seco para tirar poeira fina",
          "Recolha o sofá quando sair de casa (evita pressão prolongada)",
          "Faça higienização profissional a cada 6 a 12 meses (a sujeira concentra no recolhimento)",
        ],
      },
      {
        h2: "Sinal de que o mecanismo precisa de atenção",
        paragrafos: [
          "Barulho de areia ao reclinar é o primeiro sinal. Significa poeira no trilho. Aspirar e lubrificar com silicone (NÃO com WD-40, que ataca plásticos) resolve.",
        ],
      },
    ],
  },
  {
    slug: "impermeabilizacao-sofa-vale-a-pena",
    titulo: "Impermeabilização de sofá vale a pena? Resposta honesta",
    resumo: "Em que casos faz diferença real, em que casos é dinheiro jogado fora, e quanto tempo dura de verdade.",
    leitura: "5 min", data: "2026-05-11", categoria: "Impermeabilização",
    keywords: ["impermeabilização sofá vale a pena", "scotchgard sofá", "proteção tecido sofá"],
    intro: "Impermeabilização cria uma camada invisível ao redor de cada fibra do tecido, fazendo o líquido formar uma 'gota' em vez de penetrar. Funciona? Sim, mas com regras. Vamos ser claros sobre quando vale e quando não vale.",
    secoes: [
      {
        h2: "Quando vale muito a pena",
        paragrafos: ["Estes cenários quase sempre justificam o investimento:"],
        bullets: [
          "Casa com criança pequena (suco, leite, papinha)",
          "Casa com pet que sobe no sofá",
          "Sofá novo ou recém-higienizado de tecido claro",
          "Sofá de linho ou tecido natural",
          "Quem come ou toma café no sofá",
        ],
      },
      {
        h2: "Quando não compensa",
        paragrafos: ["Em alguns casos, o dinheiro é melhor empregado em outra coisa:"],
        bullets: [
          "Sofá já encardido sem higienização antes (sela a sujeira)",
          "Courino ou couro (não precisa, o material já é impermeável)",
          "Sofá com mais de 8 anos que será trocado em breve",
        ],
      },
      {
        h2: "Duração real",
        paragrafos: [
          "Em uso normal, a proteção dura 12 a 18 meses. Em sofá usado o dia inteiro, com pet e criança, 8 a 12 meses. Não é 'para sempre' — quem promete isso está vendendo ilusão.",
          "A higienização não 'remove' a impermeabilização. Pelo contrário, depois da extração o produto fica mais aderente. O ideal é impermeabilizar logo após a higienização.",
        ],
      },
    ],
  },
  {
    slug: "sofa-de-couro-cuidados",
    titulo: "Sofá de couro legítimo: 9 cuidados que ninguém te conta",
    resumo: "Couro é durável, mas exige hidratação. Veja o passo a passo para evitar rachadura e ressecamento.",
    leitura: "5 min", data: "2026-05-10", categoria: "Sofá",
    keywords: ["sofá de couro cuidados", "hidratação couro sofá", "couro rachado"],
    intro: "Couro legítimo dura 20 a 30 anos se cuidado direito. Cuidado mal, racha em 5. A diferença está em 3 coisas: limpeza correta, hidratação periódica e proteção contra sol.",
    secoes: [
      {
        h2: "Os 9 cuidados essenciais",
        paragrafos: ["Esta rotina é o que salva o couro:"],
        bullets: [
          "Pano seco semanal para tirar poeira (poeira retém umidade contra o couro)",
          "Pano úmido com pouca água a cada 15 dias",
          "NUNCA usar pano molhado encharcado",
          "Hidratante específico para couro a cada 3 a 6 meses",
          "Não posicionar o sofá em frente à janela com sol direto",
          "Distância mínima de 50 cm de qualquer fonte de calor (lareira, aquecedor)",
          "Não sentar com roupa molhada (calção de praia, toalha)",
          "Limpar mancha imediatamente, sem deixar secar",
          "Nunca usar álcool, removedor ou produto de limpeza multiuso",
        ],
      },
      {
        h2: "Couro rachou — tem como recuperar?",
        paragrafos: [
          "Rachadura superficial pode ser disfarçada com hidratante e selador. Rachadura profunda exige reparo ou troca do painel — serviço de tapeceiro especializado em couro. Vale o orçamento se o sofá for de alto padrão.",
        ],
      },
    ],
  },
  {
    slug: "sofa-de-suede-como-cuidar",
    titulo: "Sofá de suede: como manter aquele aspecto aveludado por anos",
    resumo: "Suede marca fácil, mas é simples de manter bonito com 3 ferramentas em casa.",
    leitura: "4 min", data: "2026-05-09", categoria: "Sofá",
    keywords: ["sofá de suede como cuidar", "limpar suede", "suede marcado"],
    intro: "Suede é elegante, confortável e relativamente acessível. O 'problema' do suede é que ele marca o sentido do toque — passou a mão, ficou desenho. Mas isso é também a graça do tecido. Com cuidado básico, ele dura linhamente.",
    secoes: [
      {
        h2: "Manutenção semanal",
        paragrafos: ["Três ferramentas resolvem 90% dos casos:"],
        bullets: [
          "Aspirador com bocal de cerdas macias",
          "Escova de suede (vendida em sapatarias) ou escova de dente macia",
          "Pano de microfibra seco",
        ],
      },
      {
        h2: "Como restaurar o caimento",
        paragrafos: [
          "Depois de aspirar, passe a escova sempre no mesmo sentido (o sentido em que o tecido 'cai'). Isso devolve o aspecto uniforme. Se um ponto ficou amassado, vapor leve de panela (a 20 cm de distância, sem encostar) levanta as fibras.",
          "Para mancha localizada, evite água. Use borracha branca de apagador esfregando suavemente — funciona melhor do que parece.",
        ],
      },
    ],
  },
  {
    slug: "sofa-cama-higienizacao",
    titulo: "Sofá-cama: por que ele suja por dentro (mesmo sem você usar)",
    resumo: "O colchão dobrado dentro do sofá-cama é um ambiente perfeito para ácaro e fungo. Veja o que fazer.",
    leitura: "4 min", data: "2026-05-08", categoria: "Sofá",
    keywords: ["sofá-cama limpar", "higienização sofá-cama", "colchão do sofá-cama"],
    intro: "O sofá-cama parece prático: dobra e some. Mas é justamente o 'sumir' que cria o problema. O colchão fica abafado, sem ventilação, em contato com a estrutura metálica — ambiente perfeito para ácaro, mofo e cheiro de guardado.",
    secoes: [
      {
        h2: "O que acontece por dentro",
        paragrafos: [
          "Ainda que você não use o sofá-cama como cama, ele 'respira' toda vez que alguém senta. Umidade do ar entra pelo zíper das almofadas, condensa no metal e impregna o colchão dobrado. Em 6 meses sem abrir, é comum encontrar pontos de mofo na lateral.",
        ],
      },
      {
        h2: "Rotina mínima para sofá-cama",
        paragrafos: ["Mesmo se você nunca dorme nele:"],
        bullets: [
          "Abrir e arejar o colchão a cada 30 dias por pelo menos 4 horas",
          "Aspirar o colchão por inteiro nesta hora",
          "Verificar a lateral do colchão (onde dobra) para sinais de mofo",
          "Higienização profissional anual incluindo o colchão dobrado",
        ],
      },
    ],
  },
  {
    slug: "cheiro-de-mofo-no-sofa",
    titulo: "Cheiro de mofo no sofá: como diagnosticar e resolver",
    resumo: "Pode ser umidade, fungo ou simplesmente sujeira velha. Veja como diferenciar e o que fazer.",
    leitura: "4 min", data: "2026-05-07", categoria: "Sofá",
    keywords: ["cheiro de mofo sofá", "mofo no sofá", "sofá com cheiro ruim"],
    intro: "Cheiro de 'guardado' no sofá geralmente tem três causas: umidade do ambiente, fungo no miolo da espuma ou simplesmente sujeira velha de pele e suor. O diagnóstico muda o tratamento.",
    secoes: [
      {
        h2: "Como diagnosticar",
        paragrafos: ["Faça este teste rápido:"],
        bullets: [
          "Cheira sempre que está frio/chuvoso? → umidade do ambiente",
          "Cheira mais perto da parede? → mofo de parede contaminando",
          "Aparece quando alguém senta? → sujeira no miolo da espuma",
          "É um cheiro azedo/forte? → fungo dentro do estofado",
        ],
      },
      {
        h2: "O que resolve cada caso",
        paragrafos: [
          "Umidade do ambiente: desumidificador na sala + sofá afastado pelo menos 5 cm da parede.",
          "Mofo de parede: tratar a parede primeiro, depois higienizar o sofá.",
          "Sujeira no miolo: extração profissional, sem alternativa eficaz caseira.",
          "Fungo: extração + produto fungicida específico — caso para profissional.",
        ],
      },
    ],
  },
  {
    slug: "sofa-com-pet-melhores-tecidos",
    titulo: "Sofá com pet em casa: os 4 melhores tecidos (e os 2 piores)",
    resumo: "Vai trocar de sofá e tem cachorro ou gato? Veja qual tecido aguenta e qual é cilada.",
    leitura: "5 min", data: "2026-05-06", categoria: "Sofá",
    keywords: ["melhor tecido sofá com pet", "sofá que pet não estraga", "sofá resistente cachorro"],
    intro: "Pet em casa muda completamente a escolha do sofá. Pelo se prende, garra arranha, xixi penetra. A escolha do tecido pode evitar 90% das dores de cabeça e prolongar a vida do sofá em anos.",
    secoes: [
      {
        h2: "Os 4 melhores tecidos para casa com pet",
        paragrafos: ["Em ordem de durabilidade real testada:"],
        bullets: [
          "Couro ecológico de alta qualidade (PU premium): garra escorrega, líquido não penetra, pelo solta fácil",
          "Veludo tipo 'pet friendly' (fibra curta e densa): garra não engata, pelo soltável",
          "Tecido tipo 'crypton' / tratado com nanotecnologia: repele líquido por horas",
          "Linho sintético de alta gramatura: aguenta uso, aceita higienização",
        ],
      },
      {
        h2: "Os 2 piores tecidos para pet",
        paragrafos: ["Evite a qualquer custo se tem cachorro ou gato:"],
        bullets: [
          "Chenille tradicional: o fio engata na garra do gato e desfia em poucas semanas",
          "Linho cru natural: absorve líquido instantaneamente e mancha permanente",
        ],
      },
    ],
  },
  {
    slug: "sofa-modular-como-conservar",
    titulo: "Sofá modular (em L ou U): conservação que mantém o caimento",
    resumo: "Os módulos sofrem desgaste diferente. Veja o segredo do rodízio que dobra a vida útil.",
    leitura: "4 min", data: "2026-05-05", categoria: "Sofá",
    keywords: ["sofá modular conservar", "sofá em L cuidados", "rodízio almofadas sofá"],
    intro: "Sofá modular tem uma vantagem que poucos aproveitam: as peças são intercambiáveis. Quem faz rodízio inteligente das almofadas dobra a vida útil do estofado sem investir um centavo.",
    secoes: [
      {
        h2: "O rodízio de almofadas",
        paragrafos: [
          "Toda família tem o 'lugar do pai', o 'cantinho da mãe' e o lugar do meio onde ninguém senta. Em 2 anos, a almofada do 'lugar do pai' está visivelmente mais usada que as outras. Resultado: o sofá inteiro parece velho.",
          "A solução é simples: a cada 30 dias, troque a posição das almofadas. Quem estava no canto vai para o meio, quem estava no meio vai para a outra ponta. O desgaste se distribui e o sofá envelhece uniformemente.",
        ],
      },
      {
        h2: "Cuidados específicos do modular",
        paragrafos: ["Além do rodízio:"],
        bullets: [
          "Aspire entre os módulos a cada 15 dias (acumula migalha e moeda)",
          "Verifique os pés de fixação 1x por ano (afrouxam com o uso)",
          "Higienize todos os módulos juntos, não só os mais usados (diferença de cor fica gritante)",
        ],
      },
    ],
  },

  /* =============== COLCHÃO (10) =============== */
  {
    slug: "por-que-higienizar-o-colchao",
    titulo: "Por que higienizar o colchão é mais importante do que limpar o sofá",
    resumo: "Você passa 1/3 da vida em cima dele. O que acumula em 6 meses sem higienização é assustador.",
    leitura: "5 min", data: "2026-05-04", categoria: "Colchão",
    keywords: ["higienizar colchão", "limpeza de colchão", "ácaro no colchão"],
    intro: "Se eu pudesse escolher higienizar só uma coisa na sua casa, seria o colchão. Você passa 6 a 8 horas por dia em contato direto com ele, respirando o que está na superfície e no miolo. Para dimensionar: um colchão de casal com 1 ano de uso pode ter mais de 2 milhões de ácaros.",
    secoes: [
      {
        h2: "O que acumula no colchão",
        paragrafos: ["Em condições normais de uso (1 casal, sem pet, ambiente padrão):"],
        bullets: [
          "Aproximadamente 200 g de células mortas de pele por ano",
          "Suor (média de 200 ml por noite, que evapora mas deixa sal e proteína)",
          "Ácaros e fezes de ácaros (principal causador de rinite e asma)",
          "Pelo, poeira fina e fragmentos têxteis",
          "Em casas com pet: pelo, saliva e às vezes urina",
        ],
      },
      {
        h2: "Por que aspirador comum não resolve",
        paragrafos: [
          "Aspirador doméstico atinge a superfície. O ácaro vive 2 a 4 cm para dentro da espuma — e é justamente lá que se reproduz. A extração profissional combina vibração + sucção + produto antialérgico, atingindo a camada onde o ácaro mora. É a única forma de reduzir a carga de alérgenos de verdade.",
        ],
      },
    ],
  },
  {
    slug: "colchao-de-bebe-higienizacao",
    titulo: "Colchão de bebê: os 6 cuidados que todo pai precisa saber",
    resumo: "Pele do bebê é mais sensível. Veja a rotina segura, sem química agressiva.",
    leitura: "5 min", data: "2026-05-03", categoria: "Colchão",
    keywords: ["colchão de bebê limpar", "higienização colchão bebê", "ácaro berço"],
    intro: "Colchão de bebê concentra três coisas: leite (rejurgitado), suor (bebê sua muito) e xixi (vaza da fralda). Em 3 meses sem cuidado, tem cheiro, mancha amarela e ácaro. A pele do bebê é mais sensível, então o cuidado precisa ser sem química agressiva.",
    secoes: [
      {
        h2: "Rotina semanal (5 minutos)",
        paragrafos: ["Faça toda sexta-feira, sem desculpa:"],
        bullets: [
          "Retire toda a roupa de cama, incluindo o impermeável",
          "Aspire o colchão inteiro com bocal estreito",
          "Borrife levemente solução de água com 5 gotas de óleo essencial de melaleuca (tea tree)",
          "Deixe arejar com janela aberta por 30 minutos",
          "Coloque roupa de cama nova",
          "Vire o colchão de cabeça para baixo a cada mês",
        ],
      },
      {
        h2: "Higienização profissional",
        paragrafos: [
          "Para bebês, o recomendado é higienização a cada 6 meses, com produto hipoalergênico específico para neonatos. Após a extração, o colchão fica liberado em 2 a 3 horas sem resíduo químico.",
        ],
      },
    ],
  },
  {
    slug: "mancha-amarela-no-colchao",
    titulo: "Mancha amarela no colchão: o que é e como tirar",
    resumo: "Aquela mancha amarelada que aparece sem motivo aparente tem explicação — e solução.",
    leitura: "4 min", data: "2026-05-02", categoria: "Colchão",
    keywords: ["mancha amarela colchão", "amarelado colchão", "como branquear colchão"],
    intro: "Mancha amarela no colchão raramente é xixi. Na maioria dos casos é a oxidação natural da espuma + sal do suor + umidade. Aparece com mais força em colchões de cor clara e em quartos abafados.",
    secoes: [
      {
        h2: "As 3 causas mais comuns",
        paragrafos: ["Identifique a sua:"],
        bullets: [
          "Suor: mancha grande, gradual, sem contorno definido, mais forte na altura do tronco",
          "Umidade do ar: mancha em forma de círculo, com borda mais escura",
          "Xixi (de pet ou criança): mancha bem definida, com cheiro de amônia ao aquecer",
        ],
      },
      {
        h2: "Como tratar",
        paragrafos: [
          "Suor antigo é o caso mais simples: extração profissional com produto enzimático resolve em uma sessão.",
          "Umidade: tratar o ambiente primeiro (desumidificador, ventilação) e depois higienizar.",
          "Xixi: requer extração + neutralizante de amônia. Caseiro com vinagre só ameniza, não resolve.",
        ],
      },
    ],
  },
  {
    slug: "colchao-de-mola-vs-espuma-cuidados",
    titulo: "Colchão de mola, espuma ou látex: cuidados específicos de cada um",
    resumo: "Cada tipo envelhece diferente. Veja o que faz cada um durar mais.",
    leitura: "5 min", data: "2026-05-01", categoria: "Colchão",
    keywords: ["tipos de colchão cuidados", "colchão de mola conservar", "colchão de espuma"],
    intro: "Tem um detalhe que poucos vendedores contam: cada tipo de colchão pede um cuidado diferente. Quem trata um colchão de mola como se fosse de espuma o estraga em 3 anos.",
    secoes: [
      {
        h2: "Colchão de mola",
        paragrafos: ["Estrutura interna metálica + camadas de espuma de conforto:"],
        bullets: [
          "Virar de cabeça para baixo a cada 3 meses (não é mais necessário girar lateralmente nos modelos modernos)",
          "Aspirar a lateral (entrada do oxidante do ar)",
          "Não dobrar para transportar (deforma a mola permanentemente)",
          "Vida útil média com cuidado: 10 a 12 anos",
        ],
      },
      {
        h2: "Colchão de espuma",
        paragrafos: ["100% espuma, mais leve, mais barato:"],
        bullets: [
          "Pode girar e virar livremente",
          "Sensível à umidade — não usar em quarto sem ventilação",
          "Cuidado dobrado com líquido (penetra fundo)",
          "Vida útil média: 6 a 8 anos",
        ],
      },
      {
        h2: "Colchão de látex",
        paragrafos: ["Material premium, mais durável, mais caro:"],
        bullets: [
          "Não pode tomar sol direto (látex resseca e racha)",
          "Não dobrar nunca",
          "Aceita higienização normal, mas com produto neutro",
          "Vida útil: 15 a 20 anos com cuidado",
        ],
      },
    ],
  },
  {
    slug: "colchao-com-cheiro-de-suor",
    titulo: "Colchão com cheiro de suor: o método que realmente funciona",
    resumo: "Bicarbonato sozinho não resolve. Veja o protocolo completo, caseiro e profissional.",
    leitura: "4 min", data: "2026-04-30", categoria: "Colchão",
    keywords: ["cheiro de suor colchão", "colchão fedendo", "tirar cheiro colchão"],
    intro: "Cheiro de suor no colchão é o sal residual + bactéria que se alimenta dele. Bicarbonato neutraliza temporariamente, mas o cheiro volta em 1 a 2 semanas. Para resolver de verdade, é preciso remover a fonte.",
    secoes: [
      {
        h2: "Protocolo caseiro (alivia por 2 a 3 semanas)",
        paragrafos: ["Use quando precisar 'segurar' até a higienização profissional:"],
        bullets: [
          "Tire toda roupa de cama",
          "Polvilhe bicarbonato com 10 gotas de óleo essencial de lavanda",
          "Espalhe com pincel grande por toda a superfície",
          "Deixe agir por 4 horas (manhã inteira)",
          "Aspire bem, passando 3 vezes em cada região",
          "Repita 1 semana depois",
        ],
      },
      {
        h2: "Solução definitiva",
        paragrafos: [
          "Extração profissional remove o sal e a bactéria. O colchão volta sem cheiro e o resultado dura 6 a 12 meses dependendo do uso. Em casos crônicos (transpiração noturna intensa), recomendamos impermeabilização após higienização — o suor para de penetrar.",
        ],
      },
    ],
  },
  {
    slug: "quanto-tempo-dura-um-colchao",
    titulo: "Quanto tempo dura um colchão? Quando trocar e quando higienizar",
    resumo: "Nem todo colchão velho precisa de troca. Veja os sinais para diferenciar conserto de substituição.",
    leitura: "4 min", data: "2026-04-29", categoria: "Colchão",
    keywords: ["quanto tempo dura colchão", "quando trocar colchão", "colchão velho"],
    intro: "Vendedor de loja vai te dizer 'troque a cada 5 anos'. A verdade técnica é diferente: depende do tipo, do uso e da conservação. Tem colchão de 8 anos que está melhor que outro de 3.",
    secoes: [
      {
        h2: "Quando é caso de higienização (mantém o colchão)",
        paragrafos: ["Estes sinais indicam que o colchão tem solução:"],
        bullets: [
          "Cheiro mas espuma firme",
          "Mancha mas sem afundamento",
          "Você acorda bem, mas com espirros",
          "Visual ruim, mas conforto preservado",
        ],
      },
      {
        h2: "Quando é caso de troca",
        paragrafos: ["Aqui higienização não resolve o problema principal:"],
        bullets: [
          "Afundamento no meio com mais de 3 cm",
          "Você acorda com dor nas costas que não tinha antes",
          "Mola aparente ou estrutura comprometida",
          "Mais de 10 anos para colchão de espuma",
          "Mais de 15 anos para qualquer colchão",
        ],
      },
    ],
  },
  {
    slug: "ressecamento-de-pele-e-colchao",
    titulo: "Coceira no corpo à noite? O colchão pode ser o culpado",
    resumo: "Coceira sem motivo aparente que aparece quando você deita tem uma origem provável.",
    leitura: "3 min", data: "2026-04-28", categoria: "Colchão",
    keywords: ["coceira na cama", "alergia colchão", "ácaro coceira"],
    intro: "Se você deita e começa a coçar — pernas, braços, costas — mas durante o dia está tudo bem, é altamente provável que seja o colchão. Ácaros e fungos do miolo causam reação cutânea em pele sensível.",
    secoes: [
      {
        h2: "Como confirmar",
        paragrafos: ["Faça este teste simples por 3 noites:"],
        bullets: [
          "Coloque um lençol antialérgico novo (encapante)",
          "Durma normalmente",
          "Se a coceira sumir ou reduzir drasticamente, é o colchão",
        ],
      },
      {
        h2: "O que fazer",
        paragrafos: [
          "Higienização profissional resolve. Em casos crônicos, é recomendado também trocar o travesseiro (que costuma ter ácaro em maior concentração que o colchão) e usar capa antialérgica permanente.",
        ],
      },
    ],
  },
  {
    slug: "colchao-de-casal-cada-lado-firmeza",
    titulo: "Colchão de casal com cada lado com firmeza diferente: cuidado especial",
    resumo: "Esse tipo de colchão exige rotação inteligente. Veja como não deformar.",
    leitura: "3 min", data: "2026-04-27", categoria: "Colchão",
    keywords: ["colchão dois lados firmeza", "colchão hibrido casal", "rotação colchão"],
    intro: "Colchões 'dois em um' com lado macio e lado firme parecem práticos, mas envelhecem de forma desigual. Quem dorme sempre do mesmo lado afunda um lado e o outro fica novo. A rotação aqui é diferente.",
    secoes: [
      {
        h2: "A regra de rotação",
        paragrafos: [
          "Diferente do colchão tradicional, você NÃO deve virar (trocaria a firmeza). Só pode girar (rotacionar 180°). Quem dormia na cabeceira vai dormir nos pés.",
          "Frequência: a cada 30 dias. Em 6 meses, o colchão estará uniformemente usado em vez de afundado de um lado.",
        ],
      },
    ],
  },
  {
    slug: "como-impermeabilizar-colchao-em-casa",
    titulo: "Impermeabilizar colchão em casa funciona? A verdade",
    resumo: "Sprays vendidos em loja prometem milagre. Veja o que de fato fazem.",
    leitura: "4 min", data: "2026-04-26", categoria: "Impermeabilização",
    keywords: ["impermeabilizar colchão", "spray impermeabilizante", "scotchgard colchão"],
    intro: "Sprays caseiros de impermeabilização (Scotchgard, similares) funcionam — em parte. Eles criam uma barreira contra líquido leve por algumas semanas. Não substituem impermeabilização profissional, mas têm utilidade pontual.",
    secoes: [
      {
        h2: "O que esperar de spray caseiro",
        paragrafos: ["Sendo honesto:"],
        bullets: [
          "Protege contra respingo pequeno (suco, água)",
          "Dura 4 a 6 semanas em colchão usado diariamente",
          "Não protege contra xixi (volume grande penetra)",
          "Precisa reaplicar com frequência",
        ],
      },
      {
        h2: "Impermeabilização profissional",
        paragrafos: [
          "Aplicação profissional usa produto de maior concentração + aplicador específico que penetra na fibra. Dura 12 a 18 meses e protege contra volume maior. É o padrão recomendado para colchão de bebê e de criança pequena.",
        ],
      },
    ],
  },
  {
    slug: "lavar-protetor-de-colchao",
    titulo: "Protetor de colchão: de quanto em quanto tempo lavar (a regra real)",
    resumo: "Não é a cada troca de lençol. Veja a frequência correta para não estragar nem deixar sujo.",
    leitura: "3 min", data: "2026-04-25", categoria: "Colchão",
    keywords: ["lavar protetor colchão", "quando lavar protetor", "impermeável colchão"],
    intro: "Protetor de colchão é a primeira linha de defesa. Mas tem gente que lava a cada troca de lençol (estraga rápido) e tem gente que esquece dele por meses (perde a função). A frequência ideal está no meio.",
    secoes: [
      {
        h2: "Frequência ideal",
        paragrafos: ["Por tipo de uso:"],
        bullets: [
          "Casal sem pet, sem criança: a cada 30 dias",
          "Casal com pet na cama: a cada 15 dias",
          "Cama de criança: a cada 15 dias",
          "Berço de bebê: a cada 7 dias",
          "Sempre que acontecer 'acidente' (xixi, vômito, suco): na hora",
        ],
      },
      {
        h2: "Como lavar sem estragar",
        paragrafos: [
          "Use ciclo delicado, água fria, sabão neutro. Nunca passe ferro (derrete a camada impermeável). Seque na sombra. Centrífuga normal é OK, mas evite secadora elétrica.",
        ],
      },
    ],
  },

  /* =============== AUTOMOTIVA (15) =============== */
  {
    slug: "diferenca-lavagem-detalhada-e-comum",
    titulo: "Lavagem detalhada x lavagem comum: o que muda de verdade",
    resumo: "Por que uma lavagem detalhada custa 5x mais que uma comum — e quando vale.",
    leitura: "6 min", data: "2026-04-24", categoria: "Automotiva",
    keywords: ["lavagem detalhada", "estética automotiva detalhamento", "polimento automotivo"],
    intro: "Lavagem comum tira a poeira. Lavagem detalhada (também chamada de detalhamento ou detailing) trata cada parte do carro como um item separado. A diferença não é só de preço — é de método, tempo e resultado.",
    secoes: [
      {
        h2: "O que envolve uma lavagem detalhada",
        paragrafos: ["Em ordem de execução padrão:"],
        bullets: [
          "Pré-lavagem com snow foam (espuma de baixa fricção que solta sujeira sem riscar)",
          "Descontaminação química e mecânica da pintura (clay bar)",
          "Lavagem com 2 baldes (regra do balde único de água limpa por área)",
          "Secagem com microfibra premium ou ar comprimido",
          "Tratamento de plásticos externos",
          "Higienização interna por região (banco, painel, teto, carpete)",
          "Tratamento de couro (se aplicável)",
          "Finalização com cera ou selante",
        ],
      },
      {
        h2: "Tempo médio",
        paragrafos: [
          "Lavagem comum: 30 a 45 minutos. Lavagem detalhada: 4 a 6 horas para carro pequeno, 6 a 8 horas para SUV. Carro grande com necessidade de polimento: pode passar de 1 dia inteiro.",
        ],
      },
      {
        h2: "Quando vale",
        paragrafos: [
          "Vale quando o carro vai ser vendido (valoriza), depois de viagem longa, antes de aplicar cera/selante, em carros premium, ou simplesmente a cada 6 meses como manutenção profunda. Para carro de uso diário, lavagem comum semanal + detalhada semestral é o equilíbrio ideal.",
        ],
      },
    ],
  },
  {
    slug: "polimento-cristalizacao-vitrificacao",
    titulo: "Polimento, cristalização e vitrificação: o que cada um faz",
    resumo: "Os três termos são usados como sinônimos, mas fazem coisas completamente diferentes.",
    leitura: "6 min", data: "2026-04-23", categoria: "Automotiva",
    keywords: ["polimento cristalização vitrificação diferença", "tratamento pintura carro", "ceramic coating"],
    intro: "Loja de lavagem usa esses três termos como se fossem a mesma coisa. Não são. Cada um trata um problema diferente da pintura e tem custo, durabilidade e indicação distintos.",
    secoes: [
      {
        h2: "Polimento",
        paragrafos: [
          "É a remoção mecânica de uma camada microscópica da pintura para tirar arranhão fino, marca de lavagem (swirl) e oxidação. Usa massa de polir + politriz.",
          "Indicado para: pintura com arranhão, fosca por oxidação, marcada por água dura.",
          "Durabilidade: o resultado em si é definitivo (até nova marca aparecer). Mas só pode ser feito algumas vezes na vida do carro (cada polimento remove material).",
        ],
      },
      {
        h2: "Cristalização",
        paragrafos: [
          "Aplicação de uma cera sintética premium sobre a pintura, formando uma camada protetora. Dá brilho intenso, repele água e protege contra poluição/UV.",
          "Durabilidade: 3 a 6 meses dependendo do produto e do uso.",
        ],
      },
      {
        h2: "Vitrificação (Ceramic Coating)",
        paragrafos: [
          "Aplicação de uma camada cerâmica que se liga molecularmente à pintura. Forma uma 'casca' transparente extremamente resistente.",
          "Durabilidade: 2 a 5 anos. É o que mais protege e mais custa.",
        ],
      },
      {
        h2: "Sequência correta",
        paragrafos: [
          "Pintura defeituosa? Polimento primeiro. Em seguida, cristalização (para uso comum) ou vitrificação (para proteção longa). Aplicar vitrificação sobre pintura riscada 'cristaliza o defeito'.",
        ],
      },
    ],
  },
  {
    slug: "manchas-de-agua-no-carro",
    titulo: "Manchas brancas no carro depois da chuva: o que são e como remover",
    resumo: "Aquelas marcas circulares que ficam no carro têm nome técnico e solução específica.",
    leitura: "4 min", data: "2026-04-22", categoria: "Automotiva",
    keywords: ["mancha de chuva no carro", "água dura pintura", "remover marca de água carro"],
    intro: "As marcas brancas/circulares que aparecem na pintura após chuva (ou após lavagem mal feita) são depósitos minerais. A água evapora, os minerais ficam. Quando endurecem, viram quase incrustação.",
    secoes: [
      {
        h2: "Como evitar",
        paragrafos: ["Prevenção é melhor que cura aqui:"],
        bullets: [
          "Seque o carro logo após lavar (não deixe escorrer sozinho)",
          "Não estacione embaixo de ar-condicionado que pinga",
          "Aplique cera/selante (a água escorre antes de marcar)",
          "Após chuva forte, passe um pano de microfibra seco",
        ],
      },
      {
        h2: "Como remover",
        paragrafos: [
          "Marca recente: pano de microfibra com vinagre branco diluído 1:5 + água destilada.",
          "Marca antiga/incrustada: removedor específico para water spots, ou polimento profissional. Tentativas agressivas com produto comum podem riscar a pintura.",
        ],
      },
    ],
  },
  {
    slug: "como-tirar-cheiro-de-cigarro-do-carro",
    titulo: "Como tirar cheiro de cigarro do carro (mesmo de carro usado)",
    resumo: "Aromatizante só piora. Veja o protocolo de eliminação real.",
    leitura: "5 min", data: "2026-04-21", categoria: "Automotiva",
    keywords: ["cheiro de cigarro carro", "tirar fumaça do carro", "ozonização carro"],
    intro: "Cheiro de cigarro impregna em estofamento, teto, painel, ar-condicionado e até nas borrachas. Aromatizante perfumado só mascara — e quando passa, o cheiro volta misturado, pior do que era. A eliminação real exige protocolo em etapas.",
    secoes: [
      {
        h2: "Protocolo de eliminação",
        paragrafos: ["Em ordem. Pular etapa não funciona:"],
        bullets: [
          "Higienização profunda do estofamento (extração) — remove o resíduo principal",
          "Limpeza do teto (acumula muita fumaça por proximidade)",
          "Higienização do ar-condicionado com produto antibacteriano",
          "Troca do filtro de cabine (impregna 100%)",
          "Ozonização: gerador de ozônio dentro do carro fechado por 1 a 2 horas",
          "Aplicação de neutralizador de odor (não perfume)",
        ],
      },
      {
        h2: "Quanto tempo demora e quanto custa",
        paragrafos: [
          "Protocolo completo: 6 a 10 horas de trabalho. Custo varia bastante por região, mas é o tratamento que valoriza o carro na revenda — comprador entra, sente cheiro de novo e fecha negócio na hora.",
        ],
      },
    ],
  },
  {
    slug: "limpar-banco-de-couro-do-carro",
    titulo: "Banco de couro do carro: rotina simples que dobra a vida útil",
    resumo: "Cuidado correto faz o couro durar a vida do carro. Cuidado errado racha em 2 anos.",
    leitura: "4 min", data: "2026-04-20", categoria: "Automotiva",
    keywords: ["banco de couro carro", "hidratação couro automotivo", "limpar couro carro"],
    intro: "Banco de couro envelhece com 3 fatores: ressecamento (sol), abrasão (jeans, fivela) e produto errado. Os 3 são evitáveis com rotina mensal de 15 minutos.",
    secoes: [
      {
        h2: "Rotina mensal",
        paragrafos: ["Faça toda primeira sexta-feira do mês:"],
        bullets: [
          "Aspire o banco (areia da praia é o pior inimigo, risca microscópico)",
          "Limpe com pano de microfibra úmido em água com sabão neutro",
          "Seque com pano seco",
          "Aplique hidratante específico para couro automotivo",
          "Deixe absorver por 30 minutos e remova o excesso",
        ],
      },
      {
        h2: "O que evitar",
        paragrafos: ["Listas de 'não fazer' valem mais que listas de 'fazer':"],
        bullets: [
          "Não use produto multiuso (resseca)",
          "Não use silicone (deixa o banco escorregadio e cria película)",
          "Não estacione o carro destapado no sol o dia todo sem proteção (parasol no para-brisa)",
          "Não sente com calça molhada (mancha de água em couro é difícil)",
        ],
      },
    ],
  },
  {
    slug: "carpete-do-carro-como-limpar",
    titulo: "Carpete do carro fedendo: causa e solução em 4 passos",
    resumo: "Embaixo do tapete fica sujeira de meses. Veja como limpar de verdade.",
    leitura: "4 min", data: "2026-04-19", categoria: "Automotiva",
    keywords: ["carpete carro fedendo", "limpar carpete automotivo", "cheiro embaixo do tapete"],
    intro: "Quem ergue o tapete plástico do carro e olha embaixo geralmente se assusta. Areia, terra, migalha, líquido derramado que escorreu, às vezes mofo. Esse é o motivo de muitos cheiros 'inexplicáveis' no carro.",
    secoes: [
      {
        h2: "Os 4 passos da limpeza",
        paragrafos: ["Em casa dá para fazer manutenção. Para resolver problema crônico, profissional.",],
        bullets: [
          "Retire os tapetes e bata fora do carro",
          "Aspire todo o carpete com bocal estreito (atinge os cantos)",
          "Borrife solução de água + bicarbonato + 5 gotas de óleo essencial",
          "Deixe agir por 30 minutos com janelas abertas",
          "Aspire novamente",
        ],
      },
      {
        h2: "Caso crônico (líquido foi derramado)",
        paragrafos: [
          "Se sucos, café ou leite foram derramados há tempo, a sujeira penetrou na manta isolante embaixo do carpete. Isso só sai com extração profissional + secagem ativa. Em caso de mofo, é obrigatório.",
        ],
      },
    ],
  },
  {
    slug: "lavar-motor-do-carro-pode",
    titulo: "Lavar o motor do carro: pode ou não pode?",
    resumo: "A pergunta clássica das oficinas. Veja a resposta técnica baseada em carro moderno.",
    leitura: "4 min", data: "2026-04-18", categoria: "Automotiva",
    keywords: ["lavar motor carro pode", "limpeza motor carro", "como lavar motor"],
    intro: "Antigamente, lavar o motor era arriscado. Carro moderno tem componentes elétricos selados, mas tem condicionante. Sim, pode — desde que feito por quem sabe.",
    secoes: [
      {
        h2: "O que muda no carro moderno",
        paragrafos: [
          "Conectores elétricos modernos são selados. Centrais e sensores têm proteção contra umidade. Mas a regra continua: NÃO use jato direto de alta pressão em região elétrica. Use jato de baixa pressão, produto desengraxante apropriado e secagem com ar comprimido.",
        ],
      },
      {
        h2: "Por que vale lavar",
        paragrafos: ["Motor limpo:"],
        bullets: [
          "Permite identificar vazamento na hora (óleo, água) em vez de só ver quando vira poça",
          "Aumenta a vida útil de mangueiras e correias (graxa acumulada degrada borracha)",
          "Melhora dissipação de calor",
          "Valoriza o carro na venda",
        ],
      },
      {
        h2: "Frequência recomendada",
        paragrafos: [
          "Para uso urbano padrão: 1x por ano. Para uso em estrada de terra, próximo a praia ou em região muito poluída: a cada 6 meses.",
        ],
      },
    ],
  },
  {
    slug: "vidro-com-marca-de-limpador",
    titulo: "Vidro do carro com marca de palheta: como remover",
    resumo: "Aquela faixa que o limpador deixa não sai com qualquer produto. Veja o método correto.",
    leitura: "3 min", data: "2026-04-17", categoria: "Automotiva",
    keywords: ["marca de palheta vidro carro", "limpar vidro carro", "borracha do limpador"],
    intro: "Palheta gasta deixa marca permanente no vidro do para-brisa se não for trocada. A marca é mistura de borracha desgastada + sujeira da chuva ácida. Algumas saem, outras já são micro-arranhão.",
    secoes: [
      {
        h2: "Como remover",
        paragrafos: ["Tente nessa ordem:"],
        bullets: [
          "Limpa-vidros automotivo + microfibra (resolve marcas recentes)",
          "Vinagre branco puro + jornal amassado (truque antigo que funciona)",
          "Argila de descontaminação (clay bar) específica para vidro",
          "Polimento de vidro com cério (caso de marca permanente)",
        ],
      },
      {
        h2: "Prevenção",
        paragrafos: [
          "Troque a palheta a cada 12 meses, mesmo que pareça boa. Custa pouco e evita risco no vidro, que custa caro para resolver.",
        ],
      },
    ],
  },
  {
    slug: "carro-cheirando-mofo-ar-condicionado",
    titulo: "Carro com cheiro de mofo quando liga o ar: causa e solução",
    resumo: "É o ar-condicionado. Veja por que acontece e como resolver.",
    leitura: "4 min", data: "2026-04-16", categoria: "Automotiva",
    keywords: ["ar condicionado carro cheiro", "mofo ar condicionado", "higienização ar condicionado carro"],
    intro: "Aquele cheiro de mofo que aparece nos primeiros segundos do ar-condicionado é fungo no evaporador. Acontece com 100% dos carros mais cedo ou mais tarde. A solução é simples.",
    secoes: [
      {
        h2: "Por que acontece",
        paragrafos: [
          "O ar-condicionado gera condensação. A umidade fica no evaporador (aquela peça gelada atrás do painel). Quando o carro desliga, a umidade não evapora completamente. Em poucas semanas, fungo se desenvolve. É como banheiro sem janela.",
        ],
      },
      {
        h2: "Solução em 2 etapas",
        paragrafos: ["Para resolver e prevenir:"],
        bullets: [
          "Higienização profissional do ar-condicionado: produto entra pela admissão e mata o fungo",
          "Troca do filtro de cabine: ele segura o cheiro também",
          "Prevenção: desligar o ar 2 minutos antes de chegar e deixar o ventilador ligado (seca o evaporador)",
          "Higienização anual obrigatória",
        ],
      },
    ],
  },
  {
    slug: "diferenca-cera-e-selante",
    titulo: "Cera ou selante: qual escolher para proteger seu carro",
    resumo: "Os dois protegem, mas servem para casos diferentes. Comparativo direto.",
    leitura: "4 min", data: "2026-04-15", categoria: "Automotiva",
    keywords: ["cera ou selante carro", "diferença cera selante", "qual cera carro"],
    intro: "Cera tradicional e selante moderno protegem a pintura, mas têm propriedades diferentes. A escolha depende do que você prioriza: brilho intenso ou durabilidade.",
    secoes: [
      {
        h2: "Cera de carnaúba (cera natural)",
        paragrafos: [
          "Origem vegetal, dá um brilho profundo, 'molhado'. É o que carro de revista usa para foto.",
          "Durabilidade: 1 a 2 meses.",
          "Indicada para: quem prioriza visual e não se importa em reaplicar com frequência.",
        ],
      },
      {
        h2: "Selante sintético",
        paragrafos: [
          "Polímero sintético, brilho mais 'duro', menos profundo, mas dura muito mais.",
          "Durabilidade: 4 a 6 meses.",
          "Indicada para: quem quer proteção prática, com menos manutenção.",
        ],
      },
      {
        h2: "Combinação que muitos detalhadores usam",
        paragrafos: [
          "Selante como base de proteção + cera de carnaúba por cima para o brilho. Você tem o melhor dos dois mundos.",
        ],
      },
    ],
  },
  {
    slug: "lavar-carro-na-chuva-pode",
    titulo: "Lavar o carro logo antes ou depois da chuva: faz diferença?",
    resumo: "Mito ou verdade? A resposta técnica.",
    leitura: "3 min", data: "2026-04-14", categoria: "Automotiva",
    keywords: ["lavar carro antes chuva", "lavar carro depois chuva", "chuva e lavagem"],
    intro: "Tem gente que jura que lavar antes da chuva é desperdício e tem gente que jura que lavar depois é melhor. Vamos ao que faz sentido tecnicamente.",
    secoes: [
      {
        h2: "Lavar antes da chuva",
        paragrafos: [
          "Tecnicamente, a chuva por si não é o problema. O problema é o que está na atmosfera: chuva ácida (em região industrial), poluição, poeira em suspensão. Quando essa chuva seca no seu carro, deixa marca.",
          "Conclusão: se acabou de lavar e vai chover, seque o carro depois da chuva — não deixe a água da chuva secar sozinha.",
        ],
      },
      {
        h2: "Lavar depois da chuva",
        paragrafos: [
          "Faz mais sentido. A chuva trouxe a poluição da atmosfera, depositou no seu carro. Lavar remove esse acúmulo. É o melhor momento, especialmente após a primeira chuva depois de semana de seca.",
        ],
      },
    ],
  },
  {
    slug: "limpar-rodas-do-carro",
    titulo: "Rodas e pneus brilhando: a rotina semanal de 10 minutos",
    resumo: "Roda escurecida e pneu opaco têm solução fácil. Veja a sequência correta.",
    leitura: "3 min", data: "2026-04-13", categoria: "Automotiva",
    keywords: ["limpar rodas carro", "pretinho pneu", "limpeza roda aro"],
    intro: "Roda limpa muda visualmente o carro. Felizmente é a parte mais fácil de manter. 10 minutos por semana, com 3 produtos básicos, resolve.",
    secoes: [
      {
        h2: "A sequência correta",
        paragrafos: ["Faça nesta ordem para não desperdiçar produto:"],
        bullets: [
          "Borrife removedor de ferradem específico para rodas (aquele que fica laranja quando reage)",
          "Aguarde 2 minutos sem deixar secar",
          "Escove com escova de cerda macia (não de aço)",
          "Enxágue com água em abundância",
          "Seque com microfibra",
          "Aplique 'pretinho' no pneu (de preferência à base de água, não de óleo)",
        ],
      },
      {
        h2: "Erro comum",
        paragrafos: [
          "Aplicar pretinho à base de óleo: escorre no asfalto quando esquenta, atrai sujeira, mancha a roda. Pretinho à base de água tem secagem rápida e visual matte ou brilhoso conforme o produto.",
        ],
      },
    ],
  },
  {
    slug: "carro-novo-precisa-de-cera",
    titulo: "Carro zero precisa de polimento e cera? Sim, e veja por quê",
    resumo: "Carro novo já vem com pintura 'perfeita' — em teoria. Na prática, há detalhes.",
    leitura: "4 min", data: "2026-04-12", categoria: "Automotiva",
    keywords: ["carro zero polimento", "ceramic coating carro novo", "proteção carro novo"],
    intro: "Carro novo sai da fábrica com pintura boa, mas raramente perfeita. Transporte, pátio da concessionária e primeira lavagem já marcam. E a pintura nova é justamente o melhor momento para aplicar proteção de longa duração — antes que ela tenha defeito a 'preservar'.",
    secoes: [
      {
        h2: "Por que faz sentido",
        paragrafos: [
          "Vitrificação ou ceramic coating em carro novo dura mais (a pintura está perfeita, a aderência é máxima). Você protege o investimento desde o dia 1.",
          "Polimento de revisão antes da vitrificação remove os micro-arranhões do pátio. É um passo barato comparado ao valor do tratamento.",
        ],
      },
      {
        h2: "Cronograma sugerido",
        paragrafos: ["Para carro novo:"],
        bullets: [
          "Semana 1: polimento de revisão + ceramic coating",
          "A cada 30 dias: lavagem detalhada com produto compatível",
          "A cada 6 meses: revisão da camada cerâmica",
          "A cada 2 a 5 anos: reaplicação da cerâmica (depende do produto)",
        ],
      },
    ],
  },
  {
    slug: "tirar-piche-do-carro",
    titulo: "Como tirar piche, asfalto e cola do carro sem riscar a pintura",
    resumo: "Os contaminantes mais difíceis têm produto específico. Veja o que NÃO usar.",
    leitura: "4 min", data: "2026-04-11", categoria: "Automotiva",
    keywords: ["tirar piche carro", "remover asfalto pintura", "removedor de cola carro"],
    intro: "Piche, asfalto, resina de árvore e cola de adesivo são os contaminantes mais difíceis. Não saem com lavagem normal e tentar arrancar 'na unha' marca a pintura.",
    secoes: [
      {
        h2: "Produto correto",
        paragrafos: [
          "Existe removedor específico para contaminantes orgânicos vendido em lojas de produtos automotivos. Ele dissolve sem agredir a pintura.",
          "Em emergência: querosene aplicado com pano macio funciona, mas é agressivo — precisa lavar bem depois e reaplicar cera.",
        ],
      },
      {
        h2: "O que NUNCA usar",
        paragrafos: ["Estes destruem a pintura:"],
        bullets: [
          "Acetona",
          "Removedor de esmalte",
          "Thinner",
          "Lixa de qualquer granulação",
          "Espátula de metal",
        ],
      },
    ],
  },
  {
    slug: "valorizar-carro-na-revenda",
    titulo: "5 serviços de estética que mais valorizam o carro na revenda",
    resumo: "Pequenos investimentos antes de vender que aumentam o preço final em milhares.",
    leitura: "5 min", data: "2026-04-10", categoria: "Automotiva",
    keywords: ["valorizar carro revenda", "estética antes de vender", "preparar carro para venda"],
    intro: "Quem compra carro usado decide nos primeiros 30 segundos da visita. A estética é responsável por boa parte dessa decisão — antes mesmo de abrir o capô. Uma preparação de R$ 600 a R$ 1.000 pode valorizar o carro em R$ 3.000 a R$ 8.000 facilmente.",
    secoes: [
      {
        h2: "Os 5 serviços que mais valorizam",
        paragrafos: ["Em ordem de retorno:"],
        bullets: [
          "Higienização interna profunda (banco, teto, painel, ar-condicionado): remove cheiro e dá impressão de carro 'pouco usado'",
          "Polimento + selante na pintura: remove arranhão, devolve brilho de carro novo",
          "Eliminação de cheiro de cigarro (se aplicável): pode dobrar o número de interessados",
          "Restauração de farol amarelado: visualmente faz parecer 5 anos mais novo",
          "Pretinho profissional nos pneus + limpeza de roda: detalhe que toda foto de anúncio mostra",
        ],
      },
      {
        h2: "Quando fazer",
        paragrafos: [
          "1 a 2 semanas antes de anunciar. Tire as fotos com o carro acabado de receber os tratamentos — anúncio com foto profissional vende mais rápido e por preço melhor.",
        ],
      },
    ],
  },

  /* =============== PREÇOS / ORÇAMENTO (5) =============== */
  {
    slug: "quanto-custa-higienizar-sofa",
    titulo: "Quanto custa higienizar um sofá? Tabela honesta de valores",
    resumo: "Veja a faixa de preço por tipo de sofá e o que pode encarecer.",
    leitura: "4 min", data: "2026-04-09", categoria: "Preços",
    keywords: ["preço higienização sofá", "quanto custa limpar sofá", "valor higienização estofado"],
    intro: "O preço de higienização de sofá varia bastante. Tamanho, tecido, nível de sujeira e cidade pesam. Aqui vai uma tabela honesta de referência para você não cair em preço inflado nem em barato suspeito.",
    secoes: [
      {
        h2: "Faixa de preço por tipo (referência Grande BH 2026)",
        paragrafos: ["Valores médios praticados por profissional sério:"],
        bullets: [
          "Sofá 2 lugares: R$ 150 a R$ 250",
          "Sofá 3 lugares: R$ 180 a R$ 320",
          "Sofá retrátil 3 lugares: R$ 250 a R$ 400",
          "Sofá de canto pequeno: R$ 350 a R$ 500",
          "Sofá de canto grande (L com chaise): R$ 450 a R$ 700",
          "Poltrona individual: R$ 80 a R$ 130",
        ],
      },
      {
        h2: "O que pode encarecer",
        paragrafos: ["Estes fatores justificam preço acima da média:"],
        bullets: [
          "Mancha de xixi de pet (precisa neutralizante extra)",
          "Tecido muito delicado (chenille fina, veludo importado)",
          "Sofá com mais de 5 anos sem higienização (sujeira impregnada)",
          "Necessidade de retirada de almofada e tratamento separado",
        ],
      },
      {
        h2: "Cuidado com preço muito abaixo",
        paragrafos: [
          "Sofá 3 lugares por R$ 80 geralmente significa: água + sabão + escova. Sem extração profissional. Resultado: sofá molhado por 2 dias, cheiro de mofo depois, halo amarelado em 1 semana. Não vale a economia.",
        ],
      },
    ],
  },
  {
    slug: "quanto-custa-higienizar-colchao",
    titulo: "Quanto custa higienizar colchão? Referência por tamanho",
    resumo: "Solteiro, casal, queen, king: o que cobrar é justo em cada caso.",
    leitura: "3 min", data: "2026-04-08", categoria: "Preços",
    keywords: ["preço higienização colchão", "quanto custa limpar colchão", "valor limpeza colchão"],
    intro: "Higienização de colchão tem preço mais previsível que de sofá. Tamanho é o fator dominante.",
    secoes: [
      {
        h2: "Tabela de referência (BH e região, 2026)",
        paragrafos: ["Profissional com extratora e produto antialérgico:"],
        bullets: [
          "Colchão solteiro: R$ 100 a R$ 150",
          "Colchão casal: R$ 130 a R$ 200",
          "Colchão queen: R$ 160 a R$ 230",
          "Colchão king: R$ 190 a R$ 280",
          "Colchão de berço: R$ 80 a R$ 120",
        ],
      },
      {
        h2: "Vale a impermeabilização junto",
        paragrafos: [
          "Pacote 'higienização + impermeabilização' costuma sair 30% a 40% mais barato que contratar separado. Se você já tem motivo para impermeabilizar (criança pequena, pet, transpiração noturna), é o melhor custo-benefício.",
        ],
      },
    ],
  },
  {
    slug: "quanto-custa-lavagem-detalhada-carro",
    titulo: "Lavagem detalhada de carro: quanto custa e o que esperar pelo preço",
    resumo: "De simples a premium, veja o que cabe em cada faixa.",
    leitura: "4 min", data: "2026-04-07", categoria: "Preços",
    keywords: ["preço lavagem detalhada", "quanto custa estética automotiva", "valor detalhamento carro"],
    intro: "Lavagem detalhada de carro tem variação enorme — de R$ 250 a R$ 2.500 — dependendo do que está incluído. Veja o que esperar de cada faixa.",
    secoes: [
      {
        h2: "Faixas e o que incluem",
        paragrafos: ["Referência para carro de porte médio:"],
        bullets: [
          "R$ 250 a R$ 400: detalhamento interno básico, lavagem externa cuidadosa, finalização com cera líquida",
          "R$ 400 a R$ 700: detalhamento completo interno + externo, descontaminação, cera de qualidade",
          "R$ 700 a R$ 1.200: tudo do anterior + polimento de revisão + selante",
          "R$ 1.200 a R$ 2.500: pacote premium com vitrificação ou ceramic coating",
        ],
      },
      {
        h2: "Para quem cada faixa faz sentido",
        paragrafos: [
          "Uso diário urbano: pacote básico semestral resolve.",
          "Carro de domingo / colecionador: vale o intermediário com polimento anual.",
          "Carro novo ou premium: justifica o ceramic coating para proteção de longo prazo.",
        ],
      },
    ],
  },
  {
    slug: "vale-pacote-mensal-de-lavagem",
    titulo: "Pacote mensal de lavagem detalhada vale a pena?",
    resumo: "Plano de assinatura virou moda. Veja quando é boa ideia e quando é cilada.",
    leitura: "4 min", data: "2026-04-06", categoria: "Preços",
    keywords: ["pacote mensal lavagem carro", "assinatura lavagem", "plano lavagem detalhada"],
    intro: "Pacotes mensais com 2 a 4 lavagens por mês a preço fixo viraram comuns. A pergunta é: vale ou não? Depende de quanto você usa o carro e qual a sua exigência.",
    secoes: [
      {
        h2: "Quando vale",
        paragrafos: ["Faz sentido nestes cenários:"],
        bullets: [
          "Carro de uso diário em região com muita poeira/poluição",
          "Carro premium onde você quer manter sempre apresentável",
          "Quem não tem tempo/disposição para cuidar pessoalmente",
          "Frota de empresa (custo previsível)",
        ],
      },
      {
        h2: "Quando não vale",
        paragrafos: ["Cilada nestes casos:"],
        bullets: [
          "Você lava por conta a cada 15 dias e está contente",
          "Carro fica parado a maior parte da semana",
          "Pacote inclui só lavagem 'rápida' (sem detalhamento real)",
          "Sem cláusula de cancelamento clara",
        ],
      },
      {
        h2: "Dica antes de assinar",
        paragrafos: [
          "Faça uma lavagem avulsa na loja primeiro. Se a qualidade for boa, considera o pacote. Pacote vendido antes da prova é alerta amarelo.",
        ],
      },
    ],
  },
  {
    slug: "barato-sai-caro-higienizacao",
    titulo: "Higienização barata: por que sai caro no fim das contas",
    resumo: "5 problemas reais de quem contratou pelo menor preço.",
    leitura: "5 min", data: "2026-04-05", categoria: "Preços",
    keywords: ["higienização barata problemas", "preço baixo limpeza sofá", "cuidado preço baixo"],
    intro: "Anúncio de 'higienização de sofá por R$ 80' parece bom até dar errado. Como profissional que recebe semanalmente clientes 'consertando' trabalho mal feito, listo aqui os 5 problemas mais comuns — e por que eles inviabilizam a economia inicial.",
    secoes: [
      {
        h2: "Os 5 problemas mais comuns",
        paragrafos: ["Em ordem de frequência:"],
        bullets: [
          "Sofá molhado por 3 dias (não tinha extratora, só borrifou e esfregou)",
          "Halo amarelado em torno da mancha original (limpou só onde estava sujo)",
          "Cheiro de mofo em 2 semanas (umidade ficou no miolo)",
          "Tecido encolhido ou cor desbotada (produto errado)",
          "Cobrança de 'extras' que apareceram durante o serviço",
        ],
      },
      {
        h2: "O que faz preço justo",
        paragrafos: [
          "Profissional sério tem: extratora própria, produto profissional (não sabão em pó), tempo de execução compatível com o serviço, garantia de satisfação. Esses 4 itens custam — e justificam preço de mercado. Quem cobra muito abaixo, está abrindo mão de algum deles.",
          "Peça referência, fotos de antes/depois reais, e desconfie de orçamento por telefone sem perguntar tipo de tecido e tamanho.",
        ],
      },
    ],
  },
];

export const DICAS_50: Post[] = BRIEFINGS.map(montar);
