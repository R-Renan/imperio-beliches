import { useState, useEffect, useCallback } from "react";
import Filters from "./Filters";
import PRODUCTS from "../../assets/all_products";
import Items from "./Items";
import FilterLabel from "./FilterLabel";
import SkeletonItem from "./SkeletonItem";
import Pagination from "./Pagination";

import { Product } from "../../lib/types";

const AllProducts = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noProducts, setNoProducts] = useState(false);
  const [filters, setFilters] = useState<{ type: string; label: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filterProducts = useCallback(
    (products: Product[]) => {
      let filtered = [...products];

      if (searchName) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      if (selectedSubCategory) {
        filtered = filtered.filter(
          (item) =>
            String(item.sub_category)?.toLowerCase() ===
            selectedSubCategory.toLowerCase()
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

      return filtered;
    },
    [searchName, selectedSubCategory, selectedRating, sortPrice]
  );

  useEffect(() => {
    setLoading(true);
    const filtered = filterProducts(PRODUCTS);

    setTimeout(() => {
      setFilteredProducts(filtered);
      setNoProducts(filtered.length === 0);
      setLoading(false);
    }, 500);
  }, [
    searchName,
    selectedCategory,
    selectedSubCategory,
    selectedRating,
    sortPrice,
    filterProducts,
  ]);

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
      });
    if (sortPrice)
      filters.push({
        type: "price",
        label: `Ordenado por preço: ${sortPrice === "asc" ? "Menor" : "Maior"}`,
      });
    setFilters(filters);
    setCurrentPage(1);
  }, [searchName, selectedCategory, selectedRating, sortPrice]);

  const handleRemoveFilter = (type: string) => {
    switch (type) {
      case "name":
        setSearchName("");
        break;
      case "category":
        setSelectedCategory("");
        break;
      case "rating":
        setSelectedRating("");
        break;
      case "price":
        setSortPrice("");
        break;
      default:
        break;
    }
    setFilters(filters.filter((filter) => filter.type !== type));
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <section className="max-padd-container">
      <div className="flex justify-between my-5 ">
        <h4 className="border-l-4 pl-2 border-secondary text-2xl font-bold mb-5">
          Todos os produtos
        </h4>
        {loading || noProducts ? null : (
          <h5 className="h-full">
            <span className="font-bold">
              Mostrando {indexOfFirstProduct + 1}-
              {indexOfLastProduct > filteredProducts.length
                ? filteredProducts.length
                : indexOfLastProduct}
            </span>{" "}
            de {filteredProducts.length} produtos
          </h5>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <Filters
            searchName={searchName}
            setSearchName={setSearchName}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            sortPrice={sortPrice}
            setSortPrice={setSortPrice}
          />
        </div>

        <div className="w-full">
          <FilterLabel filters={filters} onRemoveFilter={handleRemoveFilter} />

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-28 mt-6">
            {loading || noProducts
              ? Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonItem key={index} loading={true} />
                ))
              : currentProducts.map((item) => (
                  <Items key={item.id} {...item} loading={false} />
                ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </section>
  );
};

export default AllProducts;
