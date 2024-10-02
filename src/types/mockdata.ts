export interface MockData {
  productId: string;
  productName: string;
  price: number;
  boughtDate: string;
}

export interface Products {
  datas: MockData[];
  isEnd: boolean;
}
