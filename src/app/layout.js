import jsxDEV from "react/jsx-dev-runtime";
import "./globals.css";

export const metadata = {
  title: "Desafio Técnico Next.js + SQLite",
  description: "Desafio Técnico com Next.js + SQLite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
