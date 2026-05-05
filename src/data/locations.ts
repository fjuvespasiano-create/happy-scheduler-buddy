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

export const CIDADES: Cidade[] = [
  {
    slug: "sao-jose-da-lapa",
    nome: "São José da Lapa",
    estado: "Minas Gerais",
    estadoSigla: "MG",
    bairros: makeBairros([
      "Centro",
      "Bom Pastor",
      "Várzea",
      "Camargos",
      "Bandeirantes",
      "Cachoeirinha",
      "Industrial",
      "Vargem das Flores",
      "Santa Cruz",
      "Bela Vista",
      "Jardim Atlântico",
      "Recanto Verde",
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
      "Caieiras",
      "Morro Alto",
      "Vespasiano Industrial",
      "Solar do Barreiro",
      "Marimbá",
      "Santa Clara",
      "Jardim das Alterosas",
      "Vila Esportiva",
      "Cristina",
      "Sevilha",
      "Vila Esperança",
      "Gávea",
      "Vila Aeroporto",
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
