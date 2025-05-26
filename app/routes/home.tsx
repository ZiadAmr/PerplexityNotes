import type { Route } from "./+types/home";
import { Login } from "~/login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notes" },
    { name: "description", content: "Perplexity for notes" },
  ];
}

export default function Home() {
  return <Login />;
}
