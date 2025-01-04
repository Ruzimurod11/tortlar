import React from "react";
import s from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => (
   <div className={s.root}>
      <h1>
         <span>😕</span> <br />
         Not Found
      </h1>
      <p className={s.description}> This page not found </p>
   </div>
);

export default NotFoundBlock;
