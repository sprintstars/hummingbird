import React from "react";

interface QuickButtonProps {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  filterValue: string; // The value to set when the button is clicked
  buttonText: string; // The text displayed on the button
}

const QuickFilterButton: React.FC<QuickButtonProps> = ({
  selectedFilter,
  setSelectedFilter,
  filterValue,
  buttonText,
}) => {
  const handleClick = () => {
    setSelectedFilter(filterValue);
  };

  const hoverColourClass =
    filterValue === "unhealthy first"
      ? "hover:bg-rose-400 hover:text-black"
      : "hover:bg-teal-50 hover:text-black";

  return (
    <>
      <button
        onClick={handleClick}
        className={`bg-transparent ${hoverColourClass}  font-semibold py-2 px-4 border text-teal-50 hover:border-transparent rounded ${
          selectedFilter === filterValue
            ? filterValue === "unhealthy first"
              ? "bg-rose-400 text-black"
              : "bg-teal-50 text-black"
            : ""
        }`}
      >
        {buttonText}
      </button>
    </>
  );
};

export default QuickFilterButton;
