import type { Cidade } from "./locations";

export interface FaqItem {
  q: string;
  a: string;
}

export function buildLocalFaq(cidade: Cidade, bairro?: { nome: string }): FaqItem[] {
  const local = bairro ? `${bairro.nome}, ${cidade.nome}` : cidade.nome;
  const localCurto = bairro ? bairro.nome : cidade.nome;

  return [
    {
      q: `Vocês fazem higienização de sofá em ${local}?`,
      a: `Sim! Atendemos ${local} com higienização completa de sofás de tecido, suede, couro e veludo. Removemos ácaros, manchas, odores de pet e xixi com produtos antialérgicos. Agendamento no mesmo dia em muitos casos.`,
    },
    {
      q: `Quanto custa limpar um sofá em ${localCurto}?`,
      a: `O valor de uma higienização de sofá em ${localCurto} varia conforme o número de lugares, tipo de tecido e condição. Sofás de 2 a 3 lugares começam a partir de R$ 149. Enviamos orçamento gratuito pelo WhatsApp em poucos minutos.`,
    },
    {
      q: `Em quanto tempo o sofá seca após a limpeza?`,
      a: `Após a higienização em ${localCurto}, o sofá fica pronto para uso em 3 a 6 horas, dependendo da ventilação e do tipo de tecido. Usamos extratoras profissionais que retiram a umidade na hora.`,
    },
    {
      q: `Os produtos são seguros para crianças e pets?`,
      a: `Sim. Trabalhamos com produtos antialérgicos, biodegradáveis e sem cheiro forte, seguros para bebês, crianças, idosos e animais de estimação. É a escolha certa para famílias em ${local}.`,
    },
    {
      q: `Vocês limpam colchões e cadeiras também em ${localCurto}?`,
      a: `Sim! Além de sofás, fazemos limpeza de colchões (king, queen, casal, solteiro), cadeiras de jantar, poltronas, puffs e tapetes. Atendemos residências e empresas em ${local}.`,
    },
    {
      q: `Como faço para agendar o serviço em ${localCurto}?`,
      a: `É simples: chame no WhatsApp, envie uma foto do sofá ou colchão e o endereço em ${local}. Nossa equipe envia o orçamento na hora e marca o melhor horário para você. O pagamento só é feito após o serviço aprovado.`,
    },
  ];
}
