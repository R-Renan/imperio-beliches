import { Frown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center">
      <img src="/icon.png" />
      <h1 className="flex flex-row text-6xl font-bold mb-4">
        <Frown size={64} />
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Oops! Página não encontrada.
      </h2>
      <p className="text-gray-500 mb-8">
        Parece que você tentou acessar uma página que não existe.
      </p>

      <Button variant={"link"} className="text-muted-foreground">
        <Link to="/">Voltar para página inicial</Link>
      </Button>
    </div>
  );
};

export default NotFound;
