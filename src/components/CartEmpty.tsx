import React from "react";

import emptyCart from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

export const CartEmpty: React.FC = () => {
   return (
      <div className="content">
         <div className="container container--cart">
            <div className="cart cart--empty">
               <h2>
                  Savat bo'm-bo'sh <span>😕</span>
               </h2>
               <p>
                  Siz hali tort tanlamadingiz
                  <br />
                  Tort tanlash uchun asosiy sahifaga o'ting
               </p>
               <img src={emptyCart} alt="Empty cart" />
               <Link to="/" className="button button--black">
                  <span>Ortga qaytish</span>
               </Link>
            </div>
         </div>
      </div>
   );
};
