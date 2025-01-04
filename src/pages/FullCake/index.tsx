import React from "react";
import axios from "axios";
import s from "./FullCake.module.scss";
import cl from "classnames";
import { useNavigate, useParams } from "react-router-dom";

const FullCake: React.FC = () => {
   const [cake, setCake] = React.useState<{
      imageUrl: string;
      title: string;
   }>();

   const { id } = useParams();
   const navigate = useNavigate();

   React.useEffect(() => {
      async function fetchCake() {
         try {
            const { data } = await axios.get(
               "https://676c1a4abc36a202bb86b884.mockapi.io/items/" + id
            );
            setCake(data);
         } catch (error) {
            alert("Ошибка при получении пиццы!");
            navigate("/");
         }
      }

      fetchCake();
   }, []);

   if (!cake) {
      return <>Загрузка...</>;
   }

   return (
      <div className={cl(s.practice__item, s.itemPractice)}>
         <div className={cl(s.__ibg, s.itemPractice__image)}>
            <img src={cake.imageUrl} alt="" />
         </div>
         <h2> {cake.title} </h2>
         <button
            onClick={() => navigate(-1)}
            className="button button--outline button--add">
            <span>Ortga</span>
         </button>
      </div>
   );
};

export default FullCake;
