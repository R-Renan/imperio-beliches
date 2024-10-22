const ProductDescription = () => {
  return (
    <div className="max-padd-container mt-20">
      <div className="flex gap-3 mb-4">
        <button className="btn-dark rounded-sm !text-xs !py-[6px]">
          Description:
        </button>
        <button className="btn-dark-outline rounded-sm !text-xs !py-[6px]">
          Care Guide
        </button>
        <button className="btn-dark-outline rounded-sm !text-xs !py-[6px]">
          Size Guide
        </button>
      </div>
      <div className="flex flex-col pb-16">
        <p className="text-sm">Aqui fica a descrição COMPLETA do produto</p>
      </div>
    </div>
  );
};

export default ProductDescription;
