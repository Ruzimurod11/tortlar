import { CartItem } from "../redux/slices/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
   return items.reduce((sum, obj) => obj.price * obj.size * obj.count + sum, 0);
};
