import { CIDADES, type Cidade } from "./locations";
import { SERVICOS, type Servico } from "./servicos";

export type PostTipo = "A" | "B" | "C" | "manual";

export interface PostBloco {
  tipo: "h2" | "p" | "ul" | "cta" | "humano" | "prova" | "urgencia" | "antesdepois";
  texto?: string;
  itens?: string[];
  // antesdepois
  antes?: string;
  depois?: string;
  legenda?: string;
}

export interface Post {
  slug: string;
  titulo: string;
  resumo: string;
  data: string;
  leitura: string;
  categoria: string;
  keywords: string[];
  conteudo: PostBloco[];
  // SEO local (gerados automaticamente)
  tipo?: PostTipo;
  servicoSlug?: string;
  cidadeSlug?: string;
  bairroSlug?: string;
  problema?: string;
}

/* =========================================================================
 * POSTS MANUAIS (mantidos)
 * ======================================================================= */
const MANUAIS: Post[] = [
  {
    slug: "como-tirar-cheiro-de-xixi-de-cachorro-do-sofa",
    titulo: "Como tirar cheiro de xixi de cachorro do sofá (de verdade)",
    resumo: "O passo a passo que usamos profissionalmente para eliminar o odor na raiz — sem mascarar com perfume.",
    data: "2026-04-12",
    leitura: "5 min",
    categoria: "Sofá",
    tipo: "manual",
    keywords: ["cheiro de xixi sofá", "tirar urina pet sofá", "higienização sofá pet"],
    conteudo: [
      { tipo: "p", texto: "Se o seu cachorro fez xixi no sofá, perfume e pano úmido só vão piorar — o cheiro volta dobrado depois. O segredo é quebrar a molécula do ácido úrico com enzimas." },
      { tipo: "h2", texto: "Por que perfume não resolve" },
      { tipo: "p", texto: "A urina seca cristaliza dentro do tecido e da espuma. Quando umedece (calor, suor, ar úmido), o cheiro reativa." },
      { tipo: "h2", texto: "Solução caseira (paliativa)" },
      { tipo: "ul", itens: [
        "Absorva o líquido com papel toalha (sem esfregar)",
        "Borrife água com vinagre branco (1:1) e deixe agir 10 min",
        "Polvilhe bicarbonato e aspire após 30 min",
      ]},
      { tipo: "h2", texto: "Solução profissional (definitiva)" },
      { tipo: "p", texto: "Higienização profissional com extratora e enzima específica para urina. Em 1h a 2h o problema acaba." },
      { tipo: "cta" },
    ],
  },
  {
    slug: "de-quanto-em-quanto-tempo-higienizar-colchao",
    titulo: "De quanto em quanto tempo higienizar o colchão?",
    resumo: "A frequência ideal por perfil — alérgicos, crianças, pets e adulto saudável.",
    data: "2026-02-18",
    leitura: "3 min",
    categoria: "Colchão",
    tipo: "manual",
    keywords: ["frequência higienização colchão", "quando limpar colchão"],
    conteudo: [
      { tipo: "p", texto: "Você passa cerca de 1/3 da vida no colchão. Mesmo com lençol limpo, ácaros e fungos se acumulam por baixo." },
      { tipo: "h2", texto: "Recomendação por perfil" },
      { tipo: "ul", itens: [
        "Adulto saudável: a cada 6 meses",
        "Alérgico (rinite, asma): a cada 3 meses",
        "Criança e bebê: a cada 3 meses",
        "Casa com pet: a cada 3-4 meses",
      ]},
      { tipo: "cta" },
    ],
  },
  {
    slug: "impermeabilizacao-de-sofa-funciona",
    titulo: "Impermeabilização de sofá funciona mesmo? Veja como",
    resumo: "O que a impermeabilização realmente protege — e o que não protege.",
    data: "2025-12-15",
    leitura: "4 min",
    categoria: "Impermeabilização",
    tipo: "manual",
    keywords: ["impermeabilização sofá funciona", "scotchgard"],
    conteudo: [
      { tipo: "p", texto: "Funciona, mas com regras. O produto cria uma película invisível que faz o líquido escorrer em vez de penetrar." },
      { tipo: "h2", texto: "Protege contra" },
      { tipo: "ul", itens: ["Café, suco, refrigerante", "Xixi de pet (se limpar rápido)", "Manchas de gordura leve"] },
      { tipo: "h2", texto: "Não protege contra" },
      { tipo: "ul", itens: ["Caneta e tinta", "Líquidos parados por horas", "Rasgos e desgaste físico"] },
      { tipo: "cta" },
    ],
  },
];

/* =========================================================================
 * GERADOR AUTOMÁTICO — SEO LOCAL
 * Fórmula: [Serviço] + [Bairro/Cidade]  e  [Problema] + [Cidade]
 * ======================================================================= */

// Bairros prioritários por cidade — slugs REAIS validados em locations.ts
const BAIRROS_PRIORITARIOS: Record<string, string[]> = {
  "vespasiano": [
    "centro",
    "nova-pampulha",
    "morro-alto",
    "caieiras",
    "gavea",
    "jardim-imperial",
    "distrito-industrial",
    "jardim-alterosa",
  ],
  "sao-jose-da-lapa": [
    "centro",
    "cachoeira",
    "vila-bandeirantes",
    "jardim-atlantico",
    "bom-pastor",
    "recanto-verde",
  ],
};

const PROBLEMAS = [
  { slug: "mau-cheiro", titulo: "mau cheiro no sofá", h1: "Sofá com mau cheiro", servicoSlug: "higienizacao-de-sofa" },
  { slug: "mancha-dificil", titulo: "manchas difíceis no sofá", h1: "Manchas difíceis no sofá", servicoSlug: "higienizacao-de-sofa" },
  { slug: "acaro-alergia", titulo: "ácaros e alergia no colchão", h1: "Ácaros, alergia e rinite no colchão", servicoSlug: "higienizacao-de-colchao" },
  { slug: "xixi-pet", titulo: "xixi de pet no sofá", h1: "Xixi de pet no sofá", servicoSlug: "higienizacao-de-sofa" },
  { slug: "cheiro-carro", titulo: "cheiro ruim no carro", h1: "Cheiro ruim no carro", servicoSlug: "higienizacao-automotiva-interna" },
];

function slugify(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function bairrosVizinhos(cidade: Cidade, bairroSlug?: string, n = 4) {
  return cidade.bairros.filter((b) => b.slug !== bairroSlug).slice(0, n);
}

// Tipo A — Serviço + Bairro + Cidade (alta intenção)
function gerarTipoA(servico: Servico, cidade: Cidade, bairro: { slug: string; nome: string }): Post {
  const local = `${bairro.nome}, ${cidade.nome}`;
  const slug = `${servico.slug}-${bairro.slug}-${cidade.slug}`;
  const vizinhos = bairrosVizinhos(cidade, bairro.slug, 6);
  const nomeCurto = servico.nomeCurto.toLowerCase();

  return {
    slug,
    titulo: `${servico.nome} no ${bairro.nome} (${cidade.nome}) — orçamento na hora`,
    resumo: `${servico.nome} profissional no ${local}. ${servico.precoBase}, agendamento rápido pelo WhatsApp e atendimento no mesmo dia.`,
    data: "2026-05-01",
    leitura: "7 min",
    categoria: servico.nomeCurto,
    tipo: "A",
    servicoSlug: servico.slug,
    cidadeSlug: cidade.slug,
    bairroSlug: bairro.slug,
    keywords: [
      `${servico.nome.toLowerCase()} ${bairro.nome}`,
      `${servico.nome.toLowerCase()} ${cidade.nome}`,
      `${nomeCurto} ${bairro.nome} preço`,
      `${nomeCurto} ${bairro.nome} ${cidade.nome}`,
      `${nomeCurto} perto de mim`,
      `melhor ${nomeCurto} ${cidade.nome}`,
      `${servico.nome.toLowerCase()} a domicílio ${cidade.nome}`,
    ],
    conteudo: [
      { tipo: "humano", texto: `Se você mora no ${bairro.nome}, em ${cidade.nome}, e seu ${nomeCurto} está com cheiro ruim, manchas teimosas ou aspecto envelhecido, este guia foi escrito pensando em você. Nosso atendimento de ${servico.nome.toLowerCase()} chega rápido até a sua rua, com equipamento profissional, produtos antialérgicos e equipe treinada. Já atendemos vizinhos seus por aqui — e a maioria conseguiu marcar para o mesmo dia. A vantagem de morar no ${bairro.nome} é que estamos a poucos minutos de você: significa atendimento ágil, deslocamento curto e custo final mais justo.` },
      { tipo: "prova" },
      { tipo: "cta" },
      { tipo: "antesdepois", legenda: `${servico.nome} no ${bairro.nome} — antes e depois real` },

      { tipo: "h2", texto: `Por que contratar ${nomeCurto} profissional no ${bairro.nome}` },
      { tipo: "p", texto: `O ${bairro.nome} fica em uma região de ${cidade.nome} com clima úmido boa parte do ano. Essa umidade é o ambiente perfeito para ácaros, fungos e bactérias se proliferarem dentro do seu ${nomeCurto}, mesmo quando ele parece limpo por fora. A higienização caseira (pano úmido, vinagre, perfume) só remove a sujeira superficial — o que está fundo no tecido e na espuma continua lá e volta a aparecer em poucos dias. A limpeza profissional usa extratora industrial, produtos enzimáticos e técnica certa para o tipo de tecido. O resultado é diferente: cheiro neutro de verdade, cores recuperadas e ambiente mais saudável para a sua família.` },
      { tipo: "ul", itens: servico.beneficios },

      { tipo: "h2", texto: `Problemas que resolvemos no ${bairro.nome} e em ${cidade.nome}` },
      { tipo: "p", texto: `Cada bairro tem um perfil de problema. No ${bairro.nome} costumamos atender bastante família com criança pequena, alérgico, idoso e tutor de pet — e os pedidos mais comuns são esses:` },
      { tipo: "ul", itens: servico.problemas },
      { tipo: "p", texto: `Se você se identificou com algum item da lista, isso já é um forte sinal de que o ${nomeCurto} precisa de uma higienização profissional — não de mais um perfume mascarando o cheiro.` },

      { tipo: "h2", texto: `Como funciona o atendimento de ${servico.nome.toLowerCase()} no ${bairro.nome}` },
      { tipo: "p", texto: `O processo é simples, transparente e cabe na sua rotina. Você não precisa levar o ${nomeCurto} a lugar nenhum: vamos até a sua casa no ${bairro.nome} com todo o equipamento.` },
      { tipo: "ul", itens: servico.processo.map((p) => `${p.titulo} — ${p.desc}`) },
      { tipo: "p", texto: `Em média, o atendimento dura ${servico.duracao}. A secagem acontece em poucas horas e você já volta a usar o ${nomeCurto} no mesmo dia, com cheiro neutro e textura recuperada. Tudo é feito com produtos seguros para crianças, idosos, alérgicos e animais.` },

      { tipo: "h2", texto: `Quanto custa ${nomeCurto} no ${bairro.nome}` },
      { tipo: "p", texto: `${servico.precoBase}. O valor final em ${cidade.nome} depende de três variáveis: tamanho/quantidade de peças, tipo de tecido (suede, veludo, linho, couro ecológico) e nível de sujeira (manchas, odor de pet, mofo). Por isso, em vez de tabela fixa, a gente prefere ser justo: você manda uma foto pelo WhatsApp e recebe o preço exato em minutos, sem compromisso. Nada de letra miúda, taxa surpresa ou “orçamento só na hora”. No ${bairro.nome}, por estarmos próximos, normalmente não há cobrança extra de deslocamento.` },
      { tipo: "urgencia" },

      { tipo: "h2", texto: `Cuidados que você pode ter entre uma higienização e outra` },
      { tipo: "ul", itens: [
        "Aspirar o estofado a cada 7 a 15 dias, inclusive nas frestas",
        "Limpar manchas novas em até 24h, sempre dando leves toques (não esfregar)",
        "Manter o ambiente arejado para reduzir umidade — principal aliada de ácaros e mofo",
        "Evitar produtos de cozinha (detergente, água sanitária, álcool puro) sobre o tecido",
        "Combinar com impermeabilização para ganhar tempo entre limpezas",
      ]},
      { tipo: "p", texto: `Essas práticas simples não substituem a higienização profissional, mas ajudam o seu ${nomeCurto} a chegar mais limpo até o próximo atendimento — e prolongam a vida útil do estofado.` },

      { tipo: "h2", texto: `Bairros próximos que também atendemos em ${cidade.nome}` },
      { tipo: "p", texto: `Mesmo que você não esteja exatamente no ${bairro.nome}, atendemos toda a região com o mesmo padrão e a mesma agilidade. Alguns bairros vizinhos onde estamos com frequência:` },
      { tipo: "ul", itens: vizinhos.map((b) => b.nome) },

      { tipo: "h2", texto: "Use o cupom LIMPA15" },
      { tipo: "p", texto: `Primeiro atendimento no ${bairro.nome}? Use o cupom LIMPA15 ao mandar a foto do seu ${nomeCurto} no WhatsApp e ganhe 15% de desconto na higienização. Cupom válido para a primeira ordem de serviço por endereço.` },
      { tipo: "cta" },
    ],
  };
}

// Tipo B — Problema + Cidade
function gerarTipoB(problema: typeof PROBLEMAS[number], cidade: Cidade): Post {
  const servico = SERVICOS.find((s) => s.slug === problema.servicoSlug)!;
  const nomeCurto = servico.nomeCurto.toLowerCase();
  return {
    slug: `${problema.slug}-${cidade.slug}`,
    titulo: `${problema.h1} em ${cidade.nome}? Veja como resolver de verdade`,
    resumo: `Como resolver ${problema.titulo} em ${cidade.nome} com método profissional. Sem mascarar com perfume, sem promessa vazia.`,
    data: "2026-04-20",
    leitura: "6 min",
    categoria: servico.nomeCurto,
    tipo: "B",
    servicoSlug: servico.slug,
    cidadeSlug: cidade.slug,
    problema: problema.slug,
    keywords: [
      `${problema.titulo} ${cidade.nome}`,
      `${problema.h1.toLowerCase()} ${cidade.nome}`,
      `como resolver ${problema.titulo}`,
      `${problema.titulo} solução definitiva`,
      `${nomeCurto} ${cidade.nome}`,
    ],
    conteudo: [
      { tipo: "humano", texto: `${problema.h1} é mais comum do que parece em ${cidade.nome} — quem mora aqui sabe que o clima úmido da Região Metropolitana de Belo Horizonte piora tudo. A boa notícia é que existe solução real: ela não envolve receita caseira, perfume reforçado nem aquela promessa de “limpeza milagrosa” da internet. Neste guia você vai entender por que o problema acontece, por que ele volta sempre quando você só tenta disfarçar e o que realmente faz diferença para resolver de uma vez por todas, com método profissional.` },
      { tipo: "prova" },
      { tipo: "cta" },
      { tipo: "antesdepois", legenda: `${problema.h1} em ${cidade.nome} — resultado real` },

      { tipo: "h2", texto: "Por que esse problema volta sempre" },
      { tipo: "p", texto: `A maioria das soluções caseiras só mascara o problema: perfume disfarça por algumas horas, pano úmido empurra a sujeira para o fundo do tecido, álcool resseca a fibra e ainda pode manchar. Em poucos dias, com o calor do corpo, a umidade do ar e o uso normal, tudo volta — muitas vezes pior do que estava antes. Especificamente em ${cidade.nome}, a umidade alta entre outubro e março acelera ainda mais o reaparecimento de odor, mancha e ácaro.` },

      { tipo: "h2", texto: "O que realmente resolve" },
      { tipo: "p", texto: `O método profissional ataca o problema na raiz — não a aparência. É um processo com etapas e equipamento próprio:` },
      { tipo: "ul", itens: servico.processo.map((p) => `${p.titulo} — ${p.desc}`) },
      { tipo: "p", texto: `Cada etapa existe por um motivo. A aspiração profunda tira o que o aspirador comum não alcança. O pré-tratamento age diretamente sobre a mancha, sem agredir o tecido. A extração úmida injeta solução higienizadora e suga junto com a sujeira dissolvida — é isso que diferencia uma limpeza “de fachada” de uma higienização de verdade.` },

      { tipo: "h2", texto: "Quanto tempo dura o resultado" },
      { tipo: "p", texto: `Quando bem feita, a higienização profissional dura entre 4 e 6 meses em uso normal. Em casa com pet, criança pequena ou alérgico, a recomendação é repetir a cada 3 meses. O importante é não esperar o problema voltar para agir — quanto antes, melhor o resultado e menor o custo.` },

      { tipo: "h2", texto: `Quando é hora de chamar um profissional em ${cidade.nome}` },
      { tipo: "ul", itens: [
        "Você sente cheiro ruim mesmo após limpar com perfume",
        "Mancha antiga reaparece quando o tempo esquenta",
        "Alguém da casa tem rinite, asma ou alergia frequente",
        "Tem pet que dorme ou faz xixi no estofado",
        "Faz mais de 6 meses desde a última limpeza profunda",
      ]},

      { tipo: "urgencia" },

      { tipo: "h2", texto: `Atendemos ${cidade.nome} no mesmo dia` },
      { tipo: "p", texto: `Cobrimos toda ${cidade.nome} com agenda flexível e sem custo de visita. Alguns dos bairros onde mais atuamos:` },
      { tipo: "ul", itens: cidade.bairros.slice(0, 10).map((b) => b.nome) },
      { tipo: "p", texto: `Manda uma foto no WhatsApp contando o que está acontecendo. Em minutos você recebe um diagnóstico honesto, faixa de preço e a primeira data disponível para atendimento na sua casa em ${cidade.nome}.` },
      { tipo: "cta" },
    ],
  };
}

// Tipo C — Preço/Decisão por cidade
function gerarTipoC(servico: Servico, cidade: Cidade): Post {
  const nomeCurto = servico.nomeCurto.toLowerCase();
  return {
    slug: `quanto-custa-${servico.slug}-${cidade.slug}`,
    titulo: `Quanto custa ${nomeCurto} em ${cidade.nome}? Tabela 2026 e o que afeta o preço`,
    resumo: `Faixas de preço reais de ${servico.nome.toLowerCase()} em ${cidade.nome} — sem letras miúdas, sem surpresa no fim.`,
    data: "2026-03-15",
    leitura: "5 min",
    categoria: "Preços",
    tipo: "C",
    servicoSlug: servico.slug,
    cidadeSlug: cidade.slug,
    keywords: [
      `quanto custa ${nomeCurto} ${cidade.nome}`,
      `preço ${servico.nome.toLowerCase()} ${cidade.nome}`,
      `valor ${nomeCurto} ${cidade.nome}`,
      `${nomeCurto} barato ${cidade.nome}`,
      `${nomeCurto} ${cidade.nome} 2026`,
    ],
    conteudo: [
      { tipo: "humano", texto: `Quem busca ${servico.nome.toLowerCase()} em ${cidade.nome} quer duas coisas: transparência sobre o preço e segurança de que o serviço entregue resultado de verdade. Este guia mostra a faixa real cobrada na cidade em 2026, o que altera o valor para mais ou para menos e como evitar os “orçamentos baratos” que acabam custando o dobro depois.` },
      { tipo: "prova" },

      { tipo: "h2", texto: "O que muda no valor" },
      { tipo: "ul", itens: [
        "Tamanho e quantidade de peças (sofá 2, 3, 4 lugares, retrátil, de canto)",
        "Tipo de tecido ou material (suede, veludo, linho, couro, courino)",
        "Nível de sujeira, idade das manchas e exposição a pets",
        "Necessidade de tratamento de odor (xixi, mofo, fumo, suor)",
        "Adicional de impermeabilização (opcional, recomendado)",
        `Distância e acesso dentro de ${cidade.nome}`,
      ]},
      { tipo: "p", texto: `Esses fatores explicam por que duas higienizações “iguais no nome” podem ter preços bem diferentes. Um sofá de canto em suede com xixi de pet exige mais produto, mais tempo e técnica específica em comparação a um sofá comum só com poeira acumulada.` },

      { tipo: "h2", texto: `Faixa média em ${cidade.nome}` },
      { tipo: "p", texto: `${servico.precoBase}. Em média, atendimentos em ${cidade.nome} ficam dentro dessa faixa porque trabalhamos próximo, sem repassar custo alto de deslocamento. Para um orçamento exato, basta mandar uma foto no WhatsApp — em minutos você recebe o valor final, sem compromisso.` },

      { tipo: "h2", texto: "Cuidado com o orçamento muito barato" },
      { tipo: "p", texto: `Preço muito abaixo da média geralmente significa serviço “de fachada”: equipamento doméstico, produto inadequado ao tecido ou ausência de extração — o que deixa a peça úmida por dias, propensa a mofo e cheiro azedo. O barato sai caro, principalmente em estofado caro como suede e veludo.` },

      { tipo: "h2", texto: "Quando vale a pena combinar com impermeabilização" },
      { tipo: "p", texto: `Se sua casa tem criança pequena, pet ou se o sofá fica em área de convivência (sala de TV, cozinha americana), vale somar a impermeabilização logo após a higienização. O custo adicional é pequeno comparado a uma nova higienização precoce — e protege contra líquidos derramados por meses.` },

      { tipo: "urgencia" },
      { tipo: "cta" },
    ],
  };
}

function gerarPosts(): Post[] {
  const out: Post[] = [];
  // Tipo A: serviço × bairro prioritário × cidade
  for (const cidade of CIDADES) {
    const prios = BAIRROS_PRIORITARIOS[cidade.slug] ?? [];
    for (const bairroSlug of prios) {
      const bairro = cidade.bairros.find((b) => b.slug === bairroSlug);
      if (!bairro) continue;
      for (const servico of SERVICOS) {
        // foca nos 3 serviços mais buscados por bairro para não inflar
        if (!["higienizacao-de-sofa", "higienizacao-de-colchao", "higienizacao-automotiva-interna"].includes(servico.slug)) continue;
        out.push(gerarTipoA(servico, cidade, bairro));
      }
    }
  }
  // Tipo B: problema × cidade
  for (const cidade of CIDADES) {
    for (const problema of PROBLEMAS) {
      out.push(gerarTipoB(problema, cidade));
    }
  }
  // Tipo C: preço × serviço × cidade
  for (const cidade of CIDADES) {
    for (const servico of SERVICOS) {
      out.push(gerarTipoC(servico, cidade));
    }
  }
  return out;
}

export const POSTS: Post[] = [...MANUAIS, ...gerarPosts()];

export function findPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

// FAQ derivada para schema + render no template
export function postFaq(post: Post): { q: string; a: string }[] {
  const servico = post.servicoSlug ? SERVICOS.find((s) => s.slug === post.servicoSlug) : undefined;
  const cidade = post.cidadeSlug ? CIDADES.find((c) => c.slug === post.cidadeSlug) : undefined;
  const local = cidade?.nome ?? "São José da Lapa e Vespasiano";
  const base: { q: string; a: string }[] = [];
  if (servico) {
    base.push({
      q: `Quanto custa ${servico.nomeCurto.toLowerCase()} em ${local}?`,
      a: `${servico.precoBase}. O valor final depende do tamanho, tecido e nível de sujeira. Envie uma foto no WhatsApp e devolvemos o preço exato em minutos.`,
    });
    base.push({
      q: `Quanto tempo demora?`,
      a: `${servico.duracao}. Dependendo do horário, conseguimos atender no mesmo dia em ${local}.`,
    });
    base.push({
      q: `Sai cheiro ruim do estofado?`,
      a: `Sim. Não mascaramos com perfume — usamos extratora e produtos antialérgicos que removem o odor na raiz.`,
    });
    base.push(...servico.faq.slice(0, 2));
  }
  return base.slice(0, 5);
}
