export interface Cidade {
  slug: string;
  nome: string;
  estado: string;
  estadoSigla: string;
  bairros: { slug: string; nome: string }[];
}

function slug(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeBairros(nomes: string[]) {
  return nomes.map((n) => ({ slug: slug(n), nome: n }));
}

/**
 * Bairros REAIS (não fictícios) das duas cidades.
 * Vespasiano: lista oficial consolidada (Página Amarela / cadastro público de bairros).
 * São José da Lapa: bairros reconhecidos pelo município, listados em portais imobiliários
 * e classificados como áreas urbanas oficiais.
 */
export const CIDADES: Cidade[] = [
  {
    slug: "sao-jose-da-lapa",
    nome: "São José da Lapa",
    estado: "Minas Gerais",
    estadoSigla: "MG",
    bairros: makeBairros([
      "Centro",
      "Cachoeira",
      "Cachoeirinha",
      "Vila Bandeirantes",
      "Jardim Atlântico",
      "Bom Pastor",
      "Recanto Verde",
      "Cabral",
      "Lapinha",
      "Bairro Industrial",
      "Belvedere",
      "Santa Cruz",
    ]),
  },
  {
    slug: "vespasiano",
    nome: "Vespasiano",
    estado: "Minas Gerais",
    estadoSigla: "MG",
    bairros: makeBairros([
      "Centro",
      "Nova Pampulha",
      "Nova Pampulha 3ª e 4ª Seção",
      "Morro Alto",
      "Caieiras",
      "Conjunto Habitacional Caieiras",
      "Conjunto Habitacional Morro Alto",
      "Gávea",
      "Gávea I",
      "Cipriano",
      "Cipriano Velho",
      "Bela Vista",
      "Jardim Bela Vista",
      "Jardim Alterosa",
      "Jardim da Glória",
      "Jardim Daliana",
      "Jardim Encantado",
      "Jardim Imperial",
      "Jardim Paraíso",
      "Parque Jardim Itaú",
      "Parque Jardim Maria José",
      "Parque Norte",
      "Pouso Alegre",
      "Boa Vista",
      "Boa Vista II",
      "Bonsucesso",
      "Bernardo de Souza",
      "Campesino",
      "Célvia",
      "Central Park",
      "Chácaras Laranjeiras",
      "Condomínio Mônaco",
      "Distrito Industrial",
      "Fagundes",
      "Fazenda Bom Sucesso",
      "Gran Park",
      "Jequitibá",
      "Lar de Minas",
      "Lourdes",
      "Mangueiras",
      "Názia I",
      "Názia 2ª Seção",
      "Nova Granja",
      "Nova York",
      "Novo Horizonte",
      "Residencial Verde Valle",
      "Residencial Vilabela",
      "Residencial Park I",
      "Rosa dos Ventos",
      "Santa Clara",
      "Santa Clara II",
      "Santa Cruz",
      "Santa Maria",
      "Santo Antônio",
      "São Damião",
      "São Jorge",
      "Serra Azul",
      "Serra Dourada",
      "Suely",
      "Suely II",
      "Vale Formoso",
      "Vida Nova",
      "Vila Cruzeirinho",
      "Vila Esportiva",
      "Vista Alegre",
      "Alphaville Vespasiano",
      "Angicos",
      "do Ipê",
    ]),
  },
];

export function findCidade(cidadeSlug: string) {
  return CIDADES.find((c) => c.slug === cidadeSlug);
}

export function findBairro(cidadeSlug: string, bairroSlug: string) {
  const cidade = findCidade(cidadeSlug);
  if (!cidade) return null;
  const bairro = cidade.bairros.find((b) => b.slug === bairroSlug);
  if (!bairro) return null;
  return { cidade, bairro };
}
