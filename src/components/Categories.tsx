import React, { memo } from "react";
type CategoriesProps = {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
};
const Categories = memo(({ activeIndex, setActiveIndex }: CategoriesProps) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                setActiveIndex(i);
              }}
              className={activeIndex === i ? "active" : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
