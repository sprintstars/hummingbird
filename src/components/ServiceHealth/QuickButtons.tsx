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

  return (
    <>
      <button onClick={handleClick} className={selectedFilter === filterValue ? "underline" : ""}>
        {buttonText}
      </button>
    </>
  );
};

export default QuickFilterButton;
