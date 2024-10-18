import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select";
import { Search, SortDesc, Star, StarHalf } from "lucide-react";
import PRODUCTS from "../assets/all_products";
import CATEGORIES from "../assets/category";
import Item from "./Item";
import FilterLabel from "./FilterLabel";
import SkeletonItem from "./SkeletonItem";

function renderStars(selectedRating: string) {
  const rating = Number(selectedRating);
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} size={16} className="text-yellow-500" />
    );
  }
  if (halfStar) {
    stars.push(<StarHalf size={16} className="text-yellow-500" />);
  }
  return stars;
}

const PopularProducts = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<typeof PRODUCTS>([]);
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);
  const [filters, setFilters] = useState<{ type: string; label: string }[]>([]);

  useEffect(() => {
    setLoading(true);
    setNoProducts(false);
    let filtered = [...PRODUCTS];

    if (searchName) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) =>
          String(item.category)?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }
    if (selectedRating) {
      filtered = filtered.filter(
        (item) => item.rating && item.rating >= Number(selectedRating)
      );
    }
    if (sortPrice === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setNoProducts(filtered.length === 0);
    setLoading(true);
  }, [searchName, selectedCategory, selectedRating, sortPrice]);

  useEffect(() => {
    const filters = [];
    if (searchName)
      filters.push({ type: "name", label: `Nome: ${searchName}` });
    if (selectedCategory)
      filters.push({
        type: "category",
        label: `Categoria: ${selectedCategory}`,
      });
    if (selectedRating)
      filters.push({
        type: "rating",
        label: `Avaliação: ${selectedRating} estrelas`,
        icon: <div className="flex">{renderStars(selectedRating)}</div>,
      });
    if (sortPrice)
      filters.push({
        type: "price",
        label: `Ordenado por preço: ${sortPrice === "asc" ? "Menor" : "Maior"}`,
      });
    setFilters(filters);
  }, [searchName, selectedCategory, selectedRating, sortPrice]);

  const handleRemoveFilter = (type: string) => {
    if (type === "name") setSearchName("");
    else if (type === "category") setSelectedCategory("");
    else if (type === "rating") setSelectedRating("");
    else if (type === "price") setSortPrice("");

    setFilters(filters.filter((filter) => filter.type !== type));
  };

  return (
    <section className="max-padd-container p-12 xl:py-28">
      {/* Título */}
      <h4 className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5">
        Populares
      </h4>

      {/* Barra de Filtros */}
      <div className="max-padd-container p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Busca por Nome */}
        <div className="relative w-full md:w-auto">
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
        <div className="relative w-full md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-auto">
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
        <div className="relative w-full md:w-auto">
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="w-full md:w-auto">
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
        <div className="relative w-full md:w-auto">
          <Select value={sortPrice} onValueChange={setSortPrice}>
            <SelectTrigger className="w-full md:w-auto">
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

      {/* Filtros Ativos */}
      <FilterLabel filters={filters} onRemoveFilter={handleRemoveFilter} />

      {/* Skeleton ou Lista de Produtos */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-6">
        {loading || noProducts
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonItem key={index} loading={true} />
            ))
          : filteredProducts.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                desc={item.desc}
                category={item.category}
                category_name={item.category_name}
                rating={item.rating}
                quant={item.quant}
                quantvend={item.quantvend}
                unit={item.unit}
                image={item.image}
                price={item.price}
                parc={item.parc}
                parc_quant={item.parc_quant}
                price_unit={item.price_unit}
                free_shipping={item.free_shipping}
                offer={item.offer}
                porc_offer={item.porc_offer}
                offer_price={item.offer_price}
                old_price={item.old_price}
                loading={false} // Passa false quando o carregamento termina
              />
            ))}
      </div>
    </section>
  );
};

export default PopularProducts;
