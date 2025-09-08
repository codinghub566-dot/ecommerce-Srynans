import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory } from '@/data/products';

const Tops = () => {
  const products = getProductsByCategory('tops');

  return (
    <CategoryPage
      title="Tops"
      description="Explore our beautiful collection of tops, from casual to elegant"
      products={products}
      categoryName="tops"
    />
  );
};

export default Tops;