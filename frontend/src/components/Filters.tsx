// Filters.tsx
import { FC } from "react";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select";
import { Search, SortDesc, Star } from "lucide-react";
import CATEGORIES from "../assets/category";

interface FiltersProps {
  searchName: string;
  setSearchName: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  sortPrice: string;
  setSortPrice: (value: string) => void;
}

const Filters: FC<FiltersProps> = ({
  searchName,
  setSearchName,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  sortPrice,
  setSortPrice,
}) => {
  return (
    <div className="bg-white p-4 mt-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4">
      {/* Busca por Nome */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar por nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="pr-10"
        />
        <Search className="absolute right-2 top-2 w-5 h-5 text-gray-400" />
      </div>

      {/* Filtro por Categoria */}
      <div className="relative">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            Selecione a categoria
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filtro por Avaliação */}
      <div className="relative">
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger className="w-full">
            <Star className="w-5 h-5 text-gray-400 mr-2" />
            Filtrar por avaliação
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 estrelas ou mais</SelectItem>
            <SelectItem value="3">3 estrelas ou mais</SelectItem>
            <SelectItem value="2">2 estrelas ou mais</SelectItem>
            <SelectItem value="1">1 estrela ou mais</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ordenação por preço */}
      <div className="relative">
        <Select value={sortPrice} onValueChange={setSortPrice}>
          <SelectTrigger className="w-full">
            <SortDesc className="w-5 h-5 text-gray-400 mr-2" />
            Ordenar por preço
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Menor preço</SelectItem>
            <SelectItem value="desc">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
