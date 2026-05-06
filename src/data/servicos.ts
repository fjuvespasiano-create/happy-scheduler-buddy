export interface Servico {
  slug: string;
  nome: string;
  nomeCurto: string;
  h1: (local?: string) => string;
  metaTitle: (local?: string) => string;
  metaDescription: (local?: string) => string;
  emoji: string;
  precoBase: string;
  duracao: string;
  beneficios: string[];
  problemas: string[];
  processo: { titulo: string; desc: string }[];
  diferenciais: string[];
  faq: { q: string; a: string }[];
  keywords: string[];
}

const semLocal = (texto: string, local?: string) =>
  local ? `${texto} em ${local}` : texto;

export const SERVICOS: Servico[] = [
  {
    slug: "higienizacao-de-sofa",
    nome: "Higienização de Sofá",
    nomeCurto: "Sofá",
    emoji: "🛋️",
    precoBase: "A partir de R$ 120",
    duracao: "1h a 2h",
    h1: (l) => semLocal("Higienização de Sofá Profissional", l),
    metaTitle: (l) =>
      `Higienização de Sofá ${l ? `em ${l}` : "São José da Lapa e Vespasiano"} | Auto Limpeza Pro`,
    metaDescription: (l) =>
      `Limpeza profunda de sofás ${l ? `em ${l}` : "na região"} a partir de R$120. Remove ácaros, manchas e odores. Secagem rápida, produtos antialérgicos. Orçamento no WhatsApp.`,
    keywords: [
      "higienização de sofá",
      "limpeza de sofá",
      "lavagem de sofá a seco",
      "remover manchas de sofá",
      "tirar cheiro de xixi do sofá",
    ],
    problemas: [
      "Manchas difíceis (gordura, vinho, café, sangue)",
      "Cheiro de xixi de pet ou suor",
      "Acúmulo de ácaros causando alergia",
      "Sofá com aparência envelhecida",
      "Mofo, bolor e bactérias",
    ],
    beneficios: [
      "Remove até 99% dos ácaros e bactérias",
      "Elimina odores na raiz (não disfarça)",
      "Devolve a cor e o aspecto de novo",
      "Seguro para crianças, alérgicos e pets",
      "Secagem em 3 a 6 horas",
    ],
    processo: [
      { titulo: "1. Diagnóstico gratuito", desc: "Avaliamos o tecido, manchas e nível de sujeira no local." },
      { titulo: "2. Aspiração profunda", desc: "Equipamento profissional remove sujeira sólida e ácaros." },
      { titulo: "3. Pré-tratamento de manchas", desc: "Produtos específicos por tipo de mancha e tecido." },
      { titulo: "4. Extração úmida", desc: "Injeção e extração com solução higienizadora antialérgica." },
      { titulo: "5. Finalização e perfumação", desc: "Aroma neutro, secagem rápida e entrega impecável." },
    ],
    diferenciais: [
      "Equipe uniformizada e treinada",
      "Produtos importados e antialérgicos",
      "Garantia de satisfação ou refazemos",
      "Pagamento somente após aprovação",
    ],
    faq: [
      { q: "Quanto custa higienizar um sofá?", a: "O preço varia conforme o tamanho e tecido. Sofás de 2 e 3 lugares começam em R$120. Pedimos uma foto no WhatsApp e enviamos o orçamento exato em minutos." },
      { q: "Quanto tempo leva para secar?", a: "Entre 3 e 6 horas, dependendo da ventilação do ambiente. Em dias secos, fica liberado para uso no mesmo dia." },
      { q: "Os produtos são seguros para bebês e pets?", a: "Sim. Usamos produtos antialérgicos, biodegradáveis e sem cheiro forte, liberados para uso doméstico." },
      { q: "Vocês removem cheiro de xixi de cachorro?", a: "Sim. Aplicamos enzimas que quebram a molécula da urina, eliminando o odor na raiz e não apenas mascarando." },
      { q: "Atendem no mesmo dia?", a: "Sim, sujeito à disponibilidade. Chame no WhatsApp pela manhã e tentamos encaixar você ainda hoje." },
    ],
  },
  {
    slug: "higienizacao-de-colchao",
    nome: "Higienização de Colchão",
    nomeCurto: "Colchão",
    emoji: "🛏️",
    precoBase: "A partir de R$ 100",
    duracao: "45min a 1h30",
    h1: (l) => semLocal("Higienização de Colchão Antialérgico", l),
    metaTitle: (l) =>
      `Limpeza de Colchão ${l ? `em ${l}` : "São José da Lapa e Vespasiano"} | Auto Limpeza Pro`,
    metaDescription: (l) =>
      `Higienização de colchões ${l ? `em ${l}` : "na região"} com remoção de ácaros, fungos e odores. Ideal para alérgicos e crianças. Orçamento rápido no WhatsApp.`,
    keywords: [
      "higienização de colchão",
      "limpeza de colchão",
      "remover ácaros do colchão",
      "tirar mancha de colchão",
    ],
    problemas: [
      "Crises de rinite, asma e bronquite",
      "Manchas amareladas de suor e urina",
      "Cheiro impregnado",
      "Coceira e alergia ao deitar",
    ],
    beneficios: [
      "Sono mais saudável e sem alergias",
      "Eliminação de ácaros e fungos",
      "Colchão com aparência e cheiro de novo",
      "Recomendado a cada 6 meses",
    ],
    processo: [
      { titulo: "1. Aspiração HEPA", desc: "Remove ácaros, pele morta e poeira fina." },
      { titulo: "2. Tratamento antimanchas", desc: "Aplicação localizada conforme o tipo de sujeira." },
      { titulo: "3. Higienização úmida", desc: "Solução antialérgica injetada e extraída." },
      { titulo: "4. Secagem acelerada", desc: "Equipamento profissional reduz o tempo de espera." },
    ],
    diferenciais: [
      "Atende casas com crianças e idosos",
      "Sem cheiro químico forte",
      "Atendimento residencial discreto",
    ],
    faq: [
      { q: "Com que frequência higienizar o colchão?", a: "A cada 6 meses para casas comuns e a cada 3 meses para alérgicos, crianças e pets." },
      { q: "Mancha amarela sai?", a: "A maioria sim. Manchas antigas podem clarear bastante; avaliamos honestamente antes de cobrar." },
      { q: "Posso dormir no mesmo dia?", a: "Sim, desde que respeite o tempo de secagem (geralmente 4 a 6 horas)." },
    ],
  },
  {
    slug: "higienizacao-automotiva-interna",
    nome: "Higienização Automotiva Interna",
    nomeCurto: "Automotiva",
    emoji: "🚗",
    precoBase: "A partir de R$ 250",
    duracao: "3h a 5h",
    h1: (l) => semLocal("Higienização Automotiva Interna Profissional", l),
    metaTitle: (l) =>
      `Higienização Automotiva ${l ? `em ${l}` : "São José da Lapa e Vespasiano"} | Auto Limpeza Pro`,
    metaDescription: (l) =>
      `Estética automotiva interna completa ${l ? `em ${l}` : "na região"}: bancos, teto, carpete, painel e ar-condicionado. Carro com cheiro e aparência de novo.`,
    keywords: [
      "higienização automotiva",
      "limpeza interna de carro",
      "estética automotiva",
      "lavagem detalhada carro",
    ],
    problemas: [
      "Bancos manchados e encardidos",
      "Cheiro ruim de mofo, comida ou pet",
      "Carpete e tapetes sujos",
      "Pó acumulado em painel e saídas de ar",
    ],
    beneficios: [
      "Carro entregue com cheiro de novo",
      "Bancos, teto e carpete higienizados",
      "Valorização para revenda",
      "Ambiente livre de fungos e bactérias",
    ],
    processo: [
      { titulo: "1. Aspiração total", desc: "Bancos, carpetes, porta-malas e frestas." },
      { titulo: "2. Higienização de bancos e teto", desc: "Tecido, couro ou couro ecológico." },
      { titulo: "3. Limpeza de painel e plásticos", desc: "Hidratação e proteção UV." },
      { titulo: "4. Higienização do ar-condicionado", desc: "Elimina fungos e cheiros." },
      { titulo: "5. Finalização e perfumação", desc: "Pronto para você dirigir." },
    ],
    diferenciais: [
      "Atendemos em domicílio com nosso equipamento",
      "Pacotes para frotas e Uber/99",
      "Hidratação de couro com produto importado",
    ],
    faq: [
      { q: "Atendem em casa ou no trabalho?", a: "Sim. Levamos toda a estrutura — só precisamos de um ponto de água e energia próximos." },
      { q: "Quanto tempo leva?", a: "De 3 a 5 horas, dependendo do tamanho e do estado do veículo." },
      { q: "Tem desconto para Uber/99?", a: "Sim, temos pacotes mensais para motoristas de aplicativo." },
    ],
  },
  {
    slug: "limpeza-pos-obra",
    nome: "Limpeza Pós-Obra",
    nomeCurto: "Pós-Obra",
    emoji: "🧱",
    precoBase: "A partir de R$ 8/m²",
    duracao: "Conforme o imóvel",
    h1: (l) => semLocal("Limpeza Pós-Obra Profissional", l),
    metaTitle: (l) =>
      `Limpeza Pós-Obra ${l ? `em ${l}` : "São José da Lapa e Vespasiano"} | Auto Limpeza Pro`,
    metaDescription: (l) =>
      `Limpeza pós-obra ${l ? `em ${l}` : "na região"}: remoção de cimento, tinta, poeira fina, vidros e pisos. Casa pronta para morar. Orçamento no WhatsApp.`,
    keywords: [
      "limpeza pós obra",
      "faxina pós obra",
      "limpeza de cimento queimado",
      "limpeza de vidro pós obra",
    ],
    problemas: [
      "Cimento e respingos de tinta no piso",
      "Poeira fina em todos os cantos",
      "Vidros, box e azulejos sujos",
      "Resíduos em portas e rodapés",
    ],
    beneficios: [
      "Casa pronta para você se mudar",
      "Equipe completa com equipamento próprio",
      "Sem dor de cabeça com faxina pesada",
    ],
    processo: [
      { titulo: "1. Vistoria", desc: "Medimos o imóvel e definimos prioridades." },
      { titulo: "2. Remoção de resíduos pesados", desc: "Restos de obra, tinta e cimento." },
      { titulo: "3. Limpeza profunda", desc: "Pisos, paredes, vidros, box, azulejos." },
      { titulo: "4. Polimento e finalização", desc: "Pronto para o cliente entrar." },
    ],
    diferenciais: [
      "Equipe própria, com EPIs",
      "Atendemos imobiliárias e construtoras",
      "Trabalho com nota fiscal",
    ],
    faq: [
      { q: "Vocês fornecem produtos e equipamentos?", a: "Sim, levamos tudo. Você só precisa receber a equipe." },
      { q: "Atendem apartamentos pequenos?", a: "Sim, do kitnet à cobertura. O orçamento é por m² ou por dia." },
      { q: "Trabalham com construtoras?", a: "Sim, temos pacotes recorrentes para construtoras e imobiliárias da região." },
    ],
  },
  {
    slug: "impermeabilizacao-de-estofados",
    nome: "Impermeabilização de Estofados",
    nomeCurto: "Impermeabilização",
    emoji: "🛡️",
    precoBase: "A partir de R$ 150",
    duracao: "1h a 2h",
    h1: (l) => semLocal("Impermeabilização de Sofás e Estofados", l),
    metaTitle: (l) =>
      `Impermeabilização de Sofá ${l ? `em ${l}` : "São José da Lapa e Vespasiano"} | Auto Limpeza Pro`,
    metaDescription: (l) =>
      `Proteja seu sofá ${l ? `em ${l}` : "na região"} contra líquidos, manchas e sujeira. Aplicação profissional com produto importado. Garantia e orçamento no WhatsApp.`,
    keywords: [
      "impermeabilização de sofá",
      "scotchgard sofá",
      "proteção de estofado",
      "nano proteção sofá",
    ],
    problemas: [
      "Líquidos que penetram no tecido",
      "Manchas que viram problema permanente",
      "Sofá novo sem proteção",
      "Pet em cima do estofado",
    ],
    beneficios: [
      "Líquidos escorrem em vez de penetrar",
      "Mais tempo entre uma higienização e outra",
      "Proteção que dura até 2 anos",
      "Não altera cor, textura ou cheiro",
    ],
    processo: [
      { titulo: "1. Higienização prévia", desc: "Aplicar em sofá sujo é desperdício; limpamos antes." },
      { titulo: "2. Aplicação uniforme", desc: "Produto profissional pulverizado por área." },
      { titulo: "3. Cura e teste", desc: "Demonstração com líquido após a secagem." },
    ],
    diferenciais: [
      "Combo com higienização sai mais barato",
      "Garantia por escrito",
      "Indicado para famílias com pet e crianças",
    ],
    faq: [
      { q: "Quanto tempo dura a impermeabilização?", a: "De 1 a 2 anos, dependendo do uso. Recomenda-se reaplicar junto com a próxima higienização." },
      { q: "Posso aplicar em sofá já usado?", a: "Sim, mas é necessário higienizar antes para o produto fixar corretamente." },
      { q: "Funciona contra xixi de pet?", a: "Sim, dá tempo de limpar antes que o líquido penetre. Não é à prova de impacto se ficar muito tempo." },
    ],
  },
];

export function findServico(slug: string) {
  return SERVICOS.find((s) => s.slug === slug);
}
