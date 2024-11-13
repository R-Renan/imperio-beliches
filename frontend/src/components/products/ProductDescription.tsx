import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"; // Certifique-se de que este caminho esteja correto
import { Button } from "../ui/button";

const ProductDescription = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews] = useState([
    { id: 1, user: "John Doe", rating: 5, comment: "Great product!" },
    { id: 2, user: "Jane Smith", rating: 4, comment: "Very comfortable." },
    {
      id: 3,
      user: "Samuel Green",
      rating: 3,
      comment: "Good, but could be better.",
    },
  ]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-padd-container mt-20">
      <Tabs defaultValue="description">
        <TabsList className="flex gap-3 mb-4">
          <TabsTrigger
            value="description"
            onClick={() => handleTabClick("description")}
          >
            <Button
              variant={"outline"}
              className={
                activeTab === "description"
                  ? "active-link"
                  : "text-tertiary shadow-sm"
              }
            >
              Descrição
            </Button>
          </TabsTrigger>
          <TabsTrigger value="care" onClick={() => handleTabClick("care")}>
            <Button
              variant={"outline"}
              className={
                activeTab === "care" ? "active-link" : "text-tertiary shadow-sm"
              }
            >
              Guia de cuidados
            </Button>
          </TabsTrigger>
          <TabsTrigger value="size" onClick={() => handleTabClick("size")}>
            <Button
              variant={"outline"}
              className={
                activeTab === "size" ? "active-link" : "text-tertiary shadow-sm"
              }
            >
              Guia de tamanhos
            </Button>
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            onClick={() => handleTabClick("reviews")}
          >
            <Button
              variant={"outline"}
              className={
                activeTab === "reviews"
                  ? "active-link"
                  : "text-tertiary shadow-sm"
              }
            >
              Avaliações
            </Button>
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da Descrição */}
        <TabsContent value="description">
          <div className="flex flex-col pb-16">
            <p className="text-sm">
              Aqui fica a descrição COMPLETA do produto.
            </p>
          </div>
        </TabsContent>

        {/* Conteúdo do Guia de Cuidados */}
        <TabsContent value="care">
          <div className="flex flex-col pb-16">
            <p className="text-sm">Instruções de cuidados para o produto.</p>
          </div>
        </TabsContent>

        {/* Conteúdo do Guia de Tamanhos */}
        <TabsContent value="size">
          <div className="flex flex-col pb-16">
            <p className="text-sm">
              Guia completo de tamanhos para este produto.
            </p>
          </div>
        </TabsContent>

        {/* Conteúdo das Avaliações */}
        <TabsContent value="reviews">
          <div className="flex flex-col pb-16 space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-md">{review.user}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`${
                            index < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm">
                Ainda não há avaliações para este produto.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDescription;
