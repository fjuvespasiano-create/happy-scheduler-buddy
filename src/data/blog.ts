export interface Post {
  slug: string;
  titulo: string;
  resumo: string;
  data: string;
  leitura: string;
  categoria: string;
  conteudo: { tipo: "h2" | "p" | "ul" | "cta"; texto?: string; itens?: string[] }[];
  keywords: string[];
}

export const POSTS: Post[] = [
  {
    slug: "como-tirar-cheiro-de-xixi-de-cachorro-do-sofa",
    titulo: "Como tirar cheiro de xixi de cachorro do sofá (de verdade)",
    resumo: "O passo a passo que usamos profissionalmente para eliminar o odor na raiz — sem mascarar com perfume.",
    data: "2026-04-12",
    leitura: "5 min",
    categoria: "Sofá",
    keywords: ["cheiro de xixi sofá", "tirar urina pet sofá", "higienização sofá pet"],
    conteudo: [
      { tipo: "p", texto: "Se o seu cachorro fez xixi no sofá, perfume e pano úmido só vão piorar — o cheiro volta dobrado depois. O segredo é quebrar a molécula do ácido úrico com enzimas." },
      { tipo: "h2", texto: "Por que perfume não resolve" },
      { tipo: "p", texto: "A urina seca cristaliza dentro do tecido e da espuma. Quando umedece (calor, suor, ar úmido), o cheiro reativa. Limpadores comuns não chegam fundo." },
      { tipo: "h2", texto: "Solução caseira (paliativa)" },
      { tipo: "ul", itens: [
        "Absorva o líquido com papel toalha (sem esfregar)",
        "Borrife água com vinagre branco (1:1) e deixe agir 10 min",
        "Polvilhe bicarbonato e aspire após 30 min",
        "Repita se necessário",
      ]},
      { tipo: "h2", texto: "Solução profissional (definitiva)" },
      { tipo: "p", texto: "Higienização profissional com extratora e enzima específica para urina. Em 1h a 2h o problema acaba — e ainda removemos manchas, ácaros e bactérias." },
      { tipo: "cta" },
    ],
  },
  {
    slug: "preco-higienizacao-de-sofa-mg",
    titulo: "Preço de higienização de sofá em MG: o que muda no valor",
    resumo: "Tabela referência por tamanho, tipo de tecido e nível de sujeira. Sem letras miúdas.",
    data: "2026-03-22",
    leitura: "4 min",
    categoria: "Preços",
    keywords: ["preço higienização sofá", "valor lavar sofá", "quanto custa higienizar sofá"],
    conteudo: [
      { tipo: "p", texto: "Quem busca higienização de sofá em São José da Lapa, Vespasiano e região costuma encontrar valores entre R$120 e R$450. Veja por que." },
      { tipo: "h2", texto: "Fatores que mudam o preço" },
      { tipo: "ul", itens: [
        "Número de lugares (2, 3, retrátil, canto)",
        "Tipo de tecido (suede, veludo, courino, linho)",
        "Nível de sujeira e manchas",
        "Necessidade de tratamento de odor (pet, mofo)",
        "Distância do atendimento",
      ]},
      { tipo: "h2", texto: "Faixa de preço média" },
      { tipo: "ul", itens: [
        "Sofá 2 lugares: R$120 a R$180",
        "Sofá 3 lugares: R$160 a R$240",
        "Retrátil/Canto: R$280 a R$450",
        "Cadeira/Poltrona: R$60 a R$100",
      ]},
      { tipo: "p", texto: "Mande uma foto no WhatsApp e enviamos o valor exato em minutos." },
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
    keywords: ["frequência higienização colchão", "quando limpar colchão"],
    conteudo: [
      { tipo: "p", texto: "Você passa cerca de 1/3 da vida no colchão. Mesmo com lençol limpo, ácaros e fungos se acumulam por baixo." },
      { tipo: "h2", texto: "Recomendação por perfil" },
      { tipo: "ul", itens: [
        "Adulto saudável: a cada 6 meses",
        "Alérgico (rinite, asma): a cada 3 meses",
        "Criança e bebê: a cada 3 meses",
        "Casa com pet: a cada 3-4 meses",
        "Após gripe forte ou virose: imediatamente",
      ]},
      { tipo: "cta" },
    ],
  },
  {
    slug: "higienizacao-automotiva-vale-a-pena",
    titulo: "Higienização automotiva interna: vale a pena pagar?",
    resumo: "Quando a estética interna do carro deixa de ser luxo e vira manutenção obrigatória.",
    data: "2026-01-30",
    leitura: "4 min",
    categoria: "Automotiva",
    keywords: ["higienização automotiva vale a pena", "limpeza interna carro"],
    conteudo: [
      { tipo: "p", texto: "Carro fechado vira estufa de fungos. Bancos, ar-condicionado, carpete e teto absorvem suor, comida e umidade." },
      { tipo: "h2", texto: "Quando higienizar" },
      { tipo: "ul", itens: [
        "Antes de revender (valoriza até R$2.000)",
        "Depois de viagens longas",
        "Quando o ar-condicionado solta cheiro",
        "Anual, no mínimo",
      ]},
      { tipo: "cta" },
    ],
  },
  {
    slug: "limpeza-pos-obra-checklist",
    titulo: "Checklist de limpeza pós-obra: o que não pode ficar para depois",
    resumo: "O que uma faxina pós-obra precisa entregar antes da mudança.",
    data: "2026-01-10",
    leitura: "5 min",
    categoria: "Pós-Obra",
    keywords: ["checklist pós obra", "limpeza pós obra"],
    conteudo: [
      { tipo: "h2", texto: "Itens críticos" },
      { tipo: "ul", itens: [
        "Remoção de respingos de tinta e cimento",
        "Vidros, box e espelhos sem manchas",
        "Pisos polidos e sem poeira fina",
        "Rodapés, batentes e portas limpos",
        "Banheiros higienizados (rejunte, vasos, ralos)",
        "Cozinha pronta para receber móveis",
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

export function findPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
