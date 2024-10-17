import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface FilterLabelProps {
  filters: { type: string; label: string; icon?: JSX.Element }[];
  onRemoveFilter: (type: string) => void;
}

const FilterLabel: React.FC<FilterLabelProps> = ({
  filters,
  onRemoveFilter,
}) => {
  const [activeFilters, setActiveFilters] =
    useState<{ type: string; label: string; icon?: JSX.Element }[]>(filters);

  useEffect(() => {
    setActiveFilters(filters);
  }, [filters]);

  return (
    <div>
      {activeFilters.length > 0 && (
        <div className="mb-4">
          <p>Filtros ativos:</p>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div
                key={filter.type}
                className="bg-white px-3 py-1 rounded-md flex items-center gap-2"
              >
                <span>{filter.label}</span>
                {filter.icon && filter.icon}
                <div className="bg-gray-100 rounded-sm">
                  <X
                    onClick={() => onRemoveFilter(filter.type)}
                    className="text-destructive cursor-pointer"
                    size={18}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterLabel;
