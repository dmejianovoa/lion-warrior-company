// Producto del catálogo de DistriLion (refleja ProductResponse del backend)
export interface Product {
  idProduct: number;
  productName: string;
  productDescription: string;
  priceRetail: number;
  priceWholesale: number;
  currentStock: number;
  minimunStock: number;
}
