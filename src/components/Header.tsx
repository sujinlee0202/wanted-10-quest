import { Products } from "../types/mockdata";
import { sumPrice } from "../utils/sumPrice";

const Header = ({ products }: { products: Products }) => {
  return (
    <header>
      <div>원티드 10월 사전미션 : 무한스크롤</div>
      <div>합계 : {sumPrice(products)}</div>
    </header>
  );
};
export default Header;
