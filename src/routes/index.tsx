import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CleanPro Agenda - Higienização, Estética Automotiva e Pós-Obra" },
      {
        name: "description",
        content:
          "Agenda online e gestão completa para empresas de higienização de estofados, estética automotiva e limpeza pós-obra. Agendamentos, ordens de serviço, caixa e equipe em um só app.",
      },
      { property: "og:title", content: "CleanPro Agenda - Higienização, Estética Automotiva e Pós-Obra" },
      {
        property: "og:description",
        content:
          "Agenda online e gestão completa para empresas de higienização de estofados, estética automotiva e limpeza pós-obra.",
      },
    ],
  }),
  component: Index,
});
