import { createFileRoute } from "@tanstack/react-router";
import { BrazilFinanceDeck } from "../components/brazil-finance-deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Финансовая система Бразилии — аналитическая презентация 2026" },
      {
        name: "description",
        content:
          "Профессиональная презентация о регулировании, банках, платежах, валютном рынке и рынке капитала Бразилии.",
      },
      { property: "og:title", content: "Финансовая система Бразилии — 2026" },
      {
        property: "og:description",
        content: "Регуляторы, S1–S5, Basel III, капитал, FX, Pix и рынок капитала.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrazilFinanceDeck,
});