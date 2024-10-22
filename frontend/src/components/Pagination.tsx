import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 10) {
      // Se o total de páginas for menor ou igual a 10, exibe todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant="link"
            onClick={() => setCurrentPage(i)}
            className={`w-10 h-10 text-base text-black ${
              currentPage === i ? "active-link" : ""
            }`}
          >
            {i}
          </Button>
        );
      }
    } else {
      // Se o total de páginas for maior que 10, exibe com elipses
      pages.push(
        <Button
          key={1}
          variant="link"
          onClick={() => setCurrentPage(1)}
          className={`w-10 h-10 text-base text-black ${
            currentPage === 1 ? "active-link" : ""
          }`}
        >
          1
        </Button>
      );
      if (currentPage > 4) {
        pages.push(
          <span
            key="start-dots"
            className="w-10 h-10 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

      for (
        let i = Math.max(2, currentPage - 2);
        i <= Math.min(currentPage + 2, totalPages - 1);
        i++
      ) {
        pages.push(
          <Button
            key={i}
            variant="link"
            onClick={() => setCurrentPage(i)}
            className={`w-10 h-10 text-base text-black ${
              currentPage === i ? "active-link" : ""
            }`}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 3) {
        pages.push(
          <span
            key="end-dots"
            className="w-10 h-10 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

      pages.push(
        <Button
          key={totalPages}
          variant="link"
          onClick={() => setCurrentPage(totalPages)}
          className={`w-10 h-10 text-base text-black ${
            currentPage === totalPages ? "active-link" : ""
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="py-8 text-center">
      {totalPages > 1 ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant="link"
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`flex text-black items-center px-4 py-2 rounded-md ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2">Anterior</span>
            </Button>

            {/* Números das páginas */}
            <div className="flex space-x-2">{renderPageNumbers()}</div>

            <Button
              variant="link"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex text-black items-center px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span className="mr-2">Próxima</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Não há mais páginas para exibir.</p>
      )}
    </div>
  );
};

export default Pagination;
