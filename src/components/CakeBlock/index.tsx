import React from "react";
import cl from "classnames";
import s from "./PizzaBlock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { CartItem } from "../../redux/slices/cart/types";
import { addItem } from "../../redux/slices/cart/slice";

const typeNames = ["kremli", "qaymoqli"];

type CakeBlockProps = {
   id: string;
   title: string;
   price: number[];
   imageUrl: string;
   sizes: number[];
   types: number[];
};

export const CakeBlock: React.FC<CakeBlockProps> = ({
   title,
   price,
   imageUrl,
   sizes,
   types,
   id,
}) => {
   const [activeType, setActiveType] = React.useState(0);
   const [activeSize, setActiveSize] = React.useState(0);
   const [activePrice, setActivePrice] = React.useState(0);
   const [btnCount, setBtnCount] = React.useState(0);

   const cartItem = useSelector((state: RootState) =>
      state.cart.items.find(
         (obj) =>
            obj.id === id &&
            obj.type === typeNames[activeType] &&
            obj.size === sizes[activeSize]
      )
   );

   const dispatch = useDispatch();

   const addedCount = cartItem ? cartItem.count : 0;

   const onClickAdd = () => {
      const item: CartItem = {
         id,
         title,
         imageUrl,
         price: price[activePrice],
         type: typeNames[activeType],
         size: sizes[activeSize],
         count: 0,
      };

      dispatch(addItem(item));
      setBtnCount(btnCount + 1);
   };

   const onClickType = (type: number) => {
      setActiveType(type);
      setActivePrice(type);
   };

   const itemPrice = String(price[activePrice] * sizes[activeSize]).replace(
      /\B(?=(?:\d{3})*$)/g,
      " "
   );

   return (
      <div className={cl(s.page__practice, s.practice)}>
         <div className={cl(s.practice__container, s.__container)}>
            <div className={cl(s.practice__body)}>
               <div className={cl(s.practice__item, s.itemPractice)}>
                  <Link to={`/cake/${id}`}>
                     <div className={cl(s.itemPractice__image, s.__ibg)}>
                        <img src={imageUrl} alt="dafd" />
                     </div>
                     <h4> {title} </h4>
                  </Link>
                  <div className="pizza-block__selector">
                     <ul>
                        {types?.map((type, idx) => (
                           <li
                              key={type}
                              onClick={() => onClickType(type)}
                              className={activeType === idx ? "active" : ""}>
                              {typeNames[type]}
                           </li>
                        ))}
                     </ul>
                     <ul>
                        {sizes?.map((size, idx) => (
                           <li
                              key={idx}
                              onClick={() => setActiveSize(idx)}
                              className={activeSize === idx ? "active" : ""}>
                              {size} sm.
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="pizza-block__bottom">
                     <div className="pizza-block__price">{itemPrice} so'm</div>
                     <button
                        onClick={onClickAdd}
                        className={cl(
                           addedCount > 0 ? "active" : "",
                           "button button--outline button--add"
                        )}>
                        <svg
                           width="12"
                           height="12"
                           viewBox="0 0 12 12"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                              fill="white"
                           />
                        </svg>
                        <span>{addedCount > 0 ? "Qo'shildi" : "Qo'shish"}</span>
                        {addedCount > 0 && <i> {addedCount} </i>}
                     </button>
                  </div>
                  {/* /selector */}
               </div>
            </div>
         </div>
      </div>
   );
};
