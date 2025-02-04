import MainTemplate from "@/app/templates/MainTemplate";
import { Metadata } from "next";

interface props {
  children: React.ReactNode;
}

const description =
  "O plano de internet perfeito para a sua casa: banda larga de ultravelocidade para curtir filmes, séries e jogar online com mais estabilidade!";
export const metadata: Metadata = {
  title: {
    absolute: `Alares Internet Fibra Óptica com instalação grátis`,
  },
  description: description,
  openGraph: {
    description: description,
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_WEB_URL,
    siteName: "Alares Internet",
  },
};

export default function InternetLayout({ children }: props) {
  return <MainTemplate>{children}</MainTemplate>;
}
