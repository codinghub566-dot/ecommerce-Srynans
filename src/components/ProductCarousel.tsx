import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  
  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 768) return 2; // sm
      if (window.innerWidth < 1024) return 3; // md
      return 4; // lg+
    }
    return 4; // fallback
  };
  
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  
  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Silk Midi Dress',
      price: '₹14,999',
      originalPrice: '₹19,999',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
      isNew: true,
    },
    {
      id: 2,
      name: 'Cashmere Sweater',
      price: '₹9,999',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
      isSale: true,
    },
    {
      id: 3,
      name: 'Pleated Midi Skirt',
      price: '₹6,999',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80',
    },
    {
      id: 4,
      name: 'Linen Blazer',
      price: '₹12,499',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&q=80',
      isNew: true,
    },
    {
      id: 5,
      name: 'Wool Coat',
      price: '₹23,999',
      originalPrice: '₹31,999',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
      isSale: true,
    },
    {
      id: 6,
      name: 'Cotton Blouse',
      price: '₹5,999',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80',
    },
  ];

  const maxSlides = Math.max(1, Math.ceil(products.length - itemsPerView + 1));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-section" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto">
            Handpicked pieces that define modern elegance and effortless style
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white p-2 sm:p-3 rounded-full shadow-card"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white p-2 sm:p-3 rounded-full shadow-card"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          {/* Products Grid */}
          <div className="overflow-hidden px-4 sm:px-8 md:px-12">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2 sm:px-3"
                >
                  <div className="group card-elegant overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isNew && (
                          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            New
                          </span>
                        )}
                        {product.isSale && (
                          <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button variant="ghost" size="sm" className="p-2 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white rounded-full">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white rounded-full">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quick Add to Cart */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: parseInt(product.price.replace('₹', '').replace(',', '')),
                            image: product.image
                          })}
                          className="w-full bg-warm-white/90 text-foreground hover:bg-warm-white backdrop-blur-sm"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-foreground mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-primary' : 'bg-stone'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;