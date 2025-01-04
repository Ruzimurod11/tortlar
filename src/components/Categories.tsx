import React from "react";

type CategoriesProps = {
   value: number;
   onChangeCategory: (idx: number) => void;
};

export const categories = [
   "Barcha",
   "To'ylarga",
   "Bayramga",
   "Ismlarga",
   "Tavalludga",
   "Ommabop",
];

export const Categories: React.FC<CategoriesProps> = React.memo(
   ({ value, onChangeCategory }) => {
      return (
         <div className="categories">
            <ul>
               {categories?.map((categoryName, idx) => (
                  <li
                     key={idx}
                     onClick={() => onChangeCategory(idx)}
                     className={value === idx ? "active" : ""}>
                     {categoryName}
                  </li>
               ))}
            </ul>
         </div>
      );
   }
);
