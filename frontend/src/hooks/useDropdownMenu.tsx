import { useState, useEffect } from "react";

export const useDropdownMenu = (delay = 2) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBellHovered, setIsBellHovered] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  // Efeito de debounce para controlar o estado de `isMenuOpen`
  useEffect(() => {
    const handler = setTimeout(() => {
      // Abrir o menu se o mouse estiver sobre o ícone
      if (isBellHovered) {
        setIsMenuOpen(true);
      } else if (!isDropdownHovered) {
        // Fechar o menu se não estiver sobre o dropdown
        setIsMenuOpen(false);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [isBellHovered, isDropdownHovered, delay]);

  const handleBellMouseEnter = () => setIsBellHovered(true);
  const handleBellMouseLeave = () => setIsBellHovered(false);
  const handleDropdownMouseEnter = () => setIsDropdownHovered(true);
  const handleDropdownMouseLeave = () => setIsDropdownHovered(false);

  return {
    isMenuOpen,
    handleBellMouseEnter,
    handleBellMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
  };
};
