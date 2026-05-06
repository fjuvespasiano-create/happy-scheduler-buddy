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

// Bairros prioritários por cidade (foco em conversão, não exaustivo)
const BAIRROS_PRIORITARIOS: Record<string, string[]> = {
  "vespasiano": ["centro", "nova-pampulha", "morro-alto", "caieiras", "cristina", "solar-do-barreiro"],
  "sao-jose-da-lapa": ["centro", "bom-pastor", "varzea", "camargos", "bandeirantes"],
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
  const vizinhos = bairrosVizinhos(cidade, bairro.slug, 5);

  return {
    slug,
    titulo: `${servico.nome} no ${bairro.nome} (${cidade.nome}) — orçamento na hora`,
    resumo: `${servico.nome} profissional no ${local}. ${servico.precoBase}, agendamento rápido pelo WhatsApp.`,
    data: "2026-05-01",
    leitura: "5 min",
    categoria: servico.nomeCurto,
    tipo: "A",
    servicoSlug: servico.slug,
    cidadeSlug: cidade.slug,
    bairroSlug: bairro.slug,
    keywords: [
      `${servico.nome.toLowerCase()} ${bairro.nome}`,
      `${servico.nome.toLowerCase()} ${cidade.nome}`,
      `${servico.nomeCurto.toLowerCase()} ${bairro.nome} preço`,
      `${servico.nomeCurto.toLowerCase()} perto de mim`,
    ],
    conteudo: [
      { tipo: "humano", texto: `Se você está no ${bairro.nome}, em ${cidade.nome}, e seu ${servico.nomeCurto.toLowerCase()} está com cheiro ruim, manchas ou aspecto envelhecido, nosso atendimento chega rápido até a sua rua. Já atendemos vizinhos seus por aqui — e a maioria já marcou para o mesmo dia.` },
      { tipo: "prova" },
      { tipo: "cta" },
      { tipo: "antesdepois", legenda: `${servico.nome} no ${bairro.nome} — antes e depois` },
      { tipo: "h2", texto: `Por que contratar ${servico.nomeCurto.toLowerCase()} profissional no ${bairro.nome}` },
      { tipo: "ul", itens: servico.beneficios },
      { tipo: "h2", texto: `Problemas que resolvemos no ${bairro.nome}` },
      { tipo: "ul", itens: servico.problemas },
      { tipo: "h2", texto: `Como funciona o atendimento em ${cidade.nome}` },
      { tipo: "ul", itens: servico.processo.map((p) => `${p.titulo} — ${p.desc}`) },
      { tipo: "h2", texto: `Quanto custa ${servico.nomeCurto.toLowerCase()} no ${bairro.nome}` },
      { tipo: "p", texto: `${servico.precoBase}. O valor final depende do tamanho, tecido e nível de sujeira. Mande uma foto pelo WhatsApp e enviamos o preço exato em minutos — sem compromisso.` },
      { tipo: "urgencia" },
      { tipo: "h2", texto: `Bairros próximos que também atendemos em ${cidade.nome}` },
      { tipo: "ul", itens: vizinhos.map((b) => b.nome) },
      { tipo: "h2", texto: "Use o cupom LIMPA15" },
      { tipo: "p", texto: `Primeiro atendimento no ${bairro.nome}? Use o cupom LIMPA15 no WhatsApp e ganhe 15% de desconto.` },
      { tipo: "cta" },
    ],
  };
}

// Tipo B — Problema + Cidade
function gerarTipoB(problema: typeof PROBLEMAS[number], cidade: Cidade): Post {
  const servico = SERVICOS.find((s) => s.slug === problema.servicoSlug)!;
  return {
    slug: `${problema.slug}-${cidade.slug}`,
    titulo: `${problema.h1} em ${cidade.nome}? Veja como resolver`,
    resumo: `Como resolver ${problema.titulo} em ${cidade.nome} com método profissional. Sem mascarar, sem promessa vazia.`,
    data: "2026-04-20",
    leitura: "4 min",
    categoria: servico.nomeCurto,
    tipo: "B",
    servicoSlug: servico.slug,
    cidadeSlug: cidade.slug,
    problema: problema.slug,
    keywords: [
      `${problema.titulo} ${cidade.nome}`,
      `${problema.h1.toLowerCase()} ${cidade.nome}`,
      `como resolver ${problema.titulo}`,
    ],
    conteudo: [
      { tipo: "humano", texto: `${problema.h1} é mais comum do que parece em ${cidade.nome} — quem mora aqui sabe que o clima úmido piora tudo. A boa notícia: tem solução real, e ela não envolve receita caseira nem perfume.` },
      { tipo: "prova" },
      { tipo: "cta" },
      { tipo: "antesdepois", legenda: `${problema.h1} em ${cidade.nome} — resultado real` },
      { tipo: "h2", texto: "Por que o problema volta sempre" },
      { tipo: "p", texto: "A maioria das soluções caseiras só mascara: perfume, pano úmido, álcool. O que está fundo no tecido continua lá e reativa com o calor e a umidade." },
      { tipo: "h2", texto: "O que realmente resolve" },
      { tipo: "ul", itens: servico.processo.map((p) => `${p.titulo} — ${p.desc}`) },
      { tipo: "urgencia" },
      { tipo: "h2", texto: `Atendemos ${cidade.nome} no mesmo dia` },
      { tipo: "ul", itens: cidade.bairros.slice(0, 8).map((b) => b.nome) },
      { tipo: "cta" },
    ],
  };
}

// Tipo C — Preço/Decisão por cidade
function gerarTipoC(servico: Servico, cidade: Cidade): Post {
  return {
    slug: `quanto-custa-${servico.slug}-${cidade.slug}`,
    titulo: `Quanto custa ${servico.nomeCurto.toLowerCase()} em ${cidade.nome}? Tabela 2026`,
    resumo: `Faixas de preço reais de ${servico.nome.toLowerCase()} em ${cidade.nome} — sem letras miúdas.`,
    data: "2026-03-15",
    leitura: "3 min",
    categoria: "Preços",
    tipo: "C",
    servicoSlug: servico.slug,
    cidadeSlug: cidade.slug,
    keywords: [
      `quanto custa ${servico.nomeCurto.toLowerCase()} ${cidade.nome}`,
      `preço ${servico.nome.toLowerCase()} ${cidade.nome}`,
      `valor ${servico.nomeCurto.toLowerCase()} ${cidade.nome}`,
    ],
    conteudo: [
      { tipo: "humano", texto: `Quem busca ${servico.nome.toLowerCase()} em ${cidade.nome} quer transparência: quanto vai custar e o que está incluso. Aqui vai sem enrolação.` },
      { tipo: "prova" },
      { tipo: "h2", texto: "O que muda no valor" },
      { tipo: "ul", itens: [
        "Tamanho/quantidade de peças",
        "Tipo de tecido ou material",
        "Nível de sujeira e manchas",
        "Necessidade de tratar odor (pet, mofo)",
        `Distância dentro de ${cidade.nome}`,
      ]},
      { tipo: "h2", texto: "Faixa média" },
      { tipo: "p", texto: `${servico.precoBase}. Para um orçamento exato em ${cidade.nome}, mande uma foto no WhatsApp.` },
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
