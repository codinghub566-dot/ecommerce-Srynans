import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory } from '@/data/products';

const Dresses = () => {
  const products = getProductsByCategory('dresses');

  return (
    <CategoryPage
      title="Dresses"
      description="Discover our curated collection of elegant dresses for every occasion"
      products={products}
      categoryName="dresses"
    />
  );
};

export default Dresses;