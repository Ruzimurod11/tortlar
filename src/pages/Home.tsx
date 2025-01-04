import React from "react";
import qs from "qs";
import { categories } from "../components/Categories";
import { list } from "../components/Sort";
import {
   Skeleton,
   CakeBlock,
   Categories,
   Sort,
   Pagination,
} from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { selectCakeData } from "../redux/slices/cake/selectors";
import {
   setCategoryId,
   setCurrentPage,
   setFilters,
} from "../redux/slices/filter/slice";
import { fetchCakes } from "../redux/slices/cake/asyncActions";
import { Cake, SearchCakeParams } from "../redux/slices/cake/types";
import axios from "axios";

const Home: React.FC = () => {
   const navigate = useNavigate();
   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

   const { categoryId, currentPage, sort, searchValue } =
      useSelector(selectFilter);

   const { items, status } = useSelector(selectCakeData);
   const sortType = sort.sortProperty;

   const dispatch = useAppDispatch();

   const onChangeCategory = React.useCallback((idx: number) => {
      dispatch(setCategoryId(idx));
   }, []);

   // ====================

   // =====================

   const getCakes = async () => {
      const order = sortType.includes("-") ? "asc" : "desc";
      const sortBy = sortType.replace("-", "");
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
         fetchCakes({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
         })
      );

      window.scrollTo(0, 0);
   };

   React.useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
         });

         navigate(`?${queryString}`);

         if (!window.location.search) {
            dispatch(fetchCakes({} as SearchCakeParams));
         }
      }

      isMounted.current = true;
   }, [categoryId, sortType, searchValue, currentPage]);

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   };

   React.useEffect(() => {
      getCakes();
   }, [categoryId, sortType, searchValue, currentPage]);

   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(
            window.location.search.substring(1)
         ) as unknown as SearchCakeParams;

         const sort = list.find((obj) => obj.sortProperty === params.sortBy);

         dispatch(
            setFilters({
               searchValue: params.search,
               categoryId: Number(params.category),
               currentPage: Number(params.currentPage),
               sort: sort || list[0],
            })
         );

         isSearch.current = true;
      }
   }, []);

   const cakes = items?.map((obj: Cake) => <CakeBlock key={obj.id} {...obj} />);

   const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

   return (
      <>
         <div className="content__top">
            <Categories
               value={categoryId}
               onChangeCategory={onChangeCategory}
            />
            <Sort value={sort} />
         </div>
         <h2 className="content__title">{categories[categoryId]} tortlar</h2>
         {status === "error" ? (
            <div className="content__error-info">
               <h2>Xatolik yuz berdi 😕</h2>
               <p>
                  Afsuski, tortlarni olishni iloji bo'lmadi. Keyinroq qaytadan
                  urinib ko'ring.
               </p>
            </div>
         ) : (
            <div className="content__items">
               {status === "loading" ? skeletons : cakes}
            </div>
         )}

         <Pagination
            categoryPag={categoryId}
            value={currentPage}
            onChangePage={onChangePage}
         />
      </>
   );
};

export default Home;
