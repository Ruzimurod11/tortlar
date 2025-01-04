import React from "react";
import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss";
import axios from "axios";

type PaginationProps = {
   categoryPag: number;
   value: number;
   onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
   categoryPag,
   value,
   onChangePage,
}) => {
   const [pageCount, setPageCount] = React.useState(1);
   const category = categoryPag > 0 ? categoryPag : "";
   const fetchPosts = async () => {
      try {
         const res = await axios.get(
            `https://676c1a4abc36a202bb86b884.mockapi.io/items?category=${category}`
         );

         setPageCount(res.data.length);
      } catch (error) {
         console.log(error);
      }
   };

   React.useEffect(() => {
      fetchPosts();
      onChangePage(1);
   }, [category]);

   console.log(pageCount);

   const pageTotalCount = pageCount > 1 ? Math.ceil(pageCount / 4) : 1;

   return (
      <ReactPaginate
         className={s.root}
         breakLabel="..."
         nextLabel=">"
         onPageChange={(event) => onChangePage(event.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={pageTotalCount}
         forcePage={value - 1}
         previousLabel="<"
         // renderOnZeroPageCount={null}
      />
   );
};
