import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory } from '@/data/products';

const Accessories = () => {
  const products = getProductsByCategory('accessories');

  return (
    <CategoryPage
      title="Accessories"
      description="Complete your look with our exquisite selection of accessories"
      products={products}
      categoryName="accessories"
    />
  );
};

export default Accessories;