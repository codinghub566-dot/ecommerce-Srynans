import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory } from '@/data/products';

const Essentials = () => {
  const products = getProductsByCategory('essentials');

  return (
    <CategoryPage
      title="Essentials"
      description="Timeless pieces for your everyday wardrobe essentials"
      products={products}
      categoryName="essentials"
    />
  );
};

export default Essentials;