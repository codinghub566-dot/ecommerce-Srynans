import CategoryPage from '@/components/CategoryPage';
import { getProductsByCategory } from '@/data/products';

const NewArrivals = () => {
  const products = getProductsByCategory('new-arrivals');

  return (
    <CategoryPage
      title="New Arrivals"
      description="Be the first to discover our latest collection of women's fashion"
      products={products}
      categoryName="new-arrivals"
    />
  );
};

export default NewArrivals;