import { Products } from "../types/mockdata";

export const sumPrice = (products: Products) => {
  return products?.datas.reduce((acc, cur) => acc + cur.price, 0);
};
