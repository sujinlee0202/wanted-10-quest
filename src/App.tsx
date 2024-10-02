import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { getMockData } from "./utils/getMockData";
import { MockData, Products } from "./types/mockdata";
import "./css/App.css";

function App() {
  const [products, setProducts] = useState<Products | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // end target : data가 최 하단인지 판별하기 위한 target
  const endPageRef = useRef<HTMLDivElement | null>(null);

  // page가 변경될때마다 mockdata 불러오기
  useEffect(() => {
    // 더이상 불러올 데이터가 없을 경우 데이터 패칭 멈추기
    if (products?.isEnd) return;

    setIsLoading(true);
    getMockData(page)
      .then((data: Products) => {
        setProducts((prevProducts) => {
          if (!prevProducts) return data;
          return {
            datas: [...prevProducts.datas, ...data.datas],
            isEnd: data.isEnd,
          };
        });
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  useEffect(() => {
    if (!endPageRef.current || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      },
      { threshold: 1 }
    );

    const currentRef = endPageRef.current;
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [isLoading]);

  if (!products) {
    return <div>제품이 없습니다</div>;
  }

  return (
    <main>
      <Header products={products} />
      <ul className='lists'>
        {products.datas.map((product: MockData) => {
          return (
            <li key={product.productId} className='list'>
              <div>id: {product.productId}</div>
              <div>name: {product.productName}</div>
              <div>date: {product.boughtDate}</div>
              <div>price: {product.price}</div>
            </li>
          );
        })}
        <div ref={endPageRef}></div>
      </ul>
    </main>
  );
}

export default App;
