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
    slug: "vespasiano",
    nome: "Vespasiano",
    estado: "Minas Gerais",
    estadoSigla: "MG",
    bairros: makeBairros([
      "Centro",
      "Caieiras",
      "Morro Alto",
      "Célvia",
      "Santa Clara",
      "Nova Pampulha",
      "Jardim da Glória",
      "Parque Jardim Itaú",
      "Bernardo de Souza",
      "Vila Esportiva",
      "Santa Cruz",
      "Distrito Industrial",
      "Jardim Alterosa",
      "Santa Maria",
      "Novo Horizonte",
      "Serra Dourada",
      "Parque Verde",
      "Vale Formoso",
      "Conjunto Habitacional Morro Alto",
      "Jardim Encantado",
    ]),
  },
  {
    slug: "sao-jose-da-lapa",
    nome: "São José da Lapa",
    estado: "Minas Gerais",
    estadoSigla: "MG",
    bairros: makeBairros([
      "Centro",
      "Dom Pedro I",
      "Inácia de Carvalho",
      "Cachoeira",
      "Parque Jardim Encantado",
      "Jardim das Acácias",
      "Vila Ical",
      "Parque São João",
      "Parque Real",
      "Nova Granja",
      "Vale do Amanhecer",
      "Chácaras Reunidas",
      "Belo Vale",
      "Parque das Andorinhas",
      "Jardim Primavera",
      "São Benedito",
      "Recanto da Lagoa",
      "Estância da Mata",
      "Condomínio Vale Verde",
      "Parque Jardim Alterosa",
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
