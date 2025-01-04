import Loadable from "react-loadable";
import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
// import NotFound from "./pages/NotFound";
// import Cart from "./pages/Cart";
// import FullCake from "./pages/FullCake";
import MainLayout from "./layouts/MainLayout";
import "./scss/app.scss";

// const Cart = React.lazy(
//    () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
// );

const Cart = Loadable({
   loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
   loading: () => <div>Savat yuklanmoqda...</div>,
});

const FullCake = React.lazy(
   () => import(/* webpackChunkName: "FullCake" */ "./pages/FullCake/")
);
const NotFound = React.lazy(
   () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

const App: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route
               path="/cart"
               element={
                  <React.Suspense fallback={<div>Savat yuklanmoqda...</div>}>
                     <Cart />
                  </React.Suspense>
               }
            />
            <Route
               path="/cake/:id"
               element={
                  <React.Suspense fallback={<div> yuklanmoqda...</div>}>
                     <FullCake />
                  </React.Suspense>
               }
            />
            <Route
               path="*"
               element={
                  <React.Suspense fallback={<div> yuklanmoqda...</div>}>
                     <NotFound />
                  </React.Suspense>
               }
            />
         </Route>
      </Routes>
   );
};

export default App;
