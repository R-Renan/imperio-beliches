// SkeletonItem.tsx
import { Skeleton } from "../ui/skeleton";

interface SkeletonItemProps {
  loading: boolean;
}

const SkeletonItem = ({ loading = true }: SkeletonItemProps) => {
  if (loading) {
    return (
      <div className="p-4 flex flex-col justify-between items-center gap-4 bg-white rounded-lg shadow-md h-[400px] w-[250px]">
        {/* Skeleton da Imagem */}
        <Skeleton className="w-full h-40 mb-4 rounded-lg" />

        {/* Skeleton do Título e Descrição */}
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-24 mb-4" />

        {/* Skeleton das Estrelas */}
        <div className="flex">
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-4" />
        </div>

        {/* Skeleton do Preço */}
        <Skeleton className="h-6 w-20 mt-4 mb-2" />
        <Skeleton className="h-4 w-32" />

        {/* Skeleton do Botão */}
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    );
  }

  return null; // Adicionado retorno para quando loading for false
};

export default SkeletonItem;
