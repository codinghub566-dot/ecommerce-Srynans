import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory } from '@/data/products';

const Sale = () => {
  const products = getProductsByCategory('sale');

  return (
    <CategoryPage
      title="Sale"
      description="Don't miss out on our exclusive deals and discounted pieces"
      products={products}
      categoryName="sale"
    />
  );
};

export default Sale;