import { useState, useMemo } from 'react';
import { Filter, Grid, List, ChevronDown, Heart, Eye, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Embroidered Kurti Set',
      category: 'Kurti Sets',
      price: 2999,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Maroon', 'Pink'],
      isNew: true,
      isBestseller: false,
    },
    {
      id: 2,
      name: 'Silk Co-ord Set',
      category: 'Co-ords',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Beige', 'Blue'],
      isNew: false,
      isBestseller: true,
    },
    {
      id: 3,
      name: 'Traditional Banarasi Saree',
      category: 'Sarees',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
      sizes: ['One Size'],
      colors: ['Maroon', 'Green'],
      isNew: false,
      isBestseller: true,
    },
    {
      id: 4,
      name: 'Festive Anarkali',
      category: 'Festive Wear',
      price: 6799,
      image: 'https://images.unsplash.com/photo-1583391733981-24c37b0e4c93?w=400&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Pink', 'Blue'],
      isNew: true,
      isBestseller: false,
    },
    {
      id: 5,
      name: 'Handcrafted Earrings',
      category: 'Accessories',
      price: 899,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
      sizes: ['One Size'],
      colors: ['Beige', 'Black'],
      isNew: false,
      isBestseller: false,
    },
    {
      id: 6,
      name: 'Designer Lehenga Set',
      category: 'Festive Wear',
      price: 15999,
      originalPrice: 19999,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Maroon', 'Pink', 'Green'],
      isNew: false,
      isBestseller: true,
    },
  ];

  const categories = ['Kurti Sets', 'Co-ords', 'Sarees', 'Festive Wear', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
  const colors = ['Maroon', 'Beige', 'Blue', 'Black', 'Pink', 'Green'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
      const colorMatch = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return categoryMatch && sizeMatch && colorMatch && priceMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'bestselling':
        filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, selectedCategories, selectedSizes, selectedColors, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 50000]);
  };

  const activeFiltersCount = selectedCategories.length + selectedSizes.length + selectedColors.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="rounded border-stone text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSize(size)}
              className="h-8"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <Button
              key={color}
              variant={selectedColors.includes(color) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleColor(color)}
              className="h-8"
            >
              {color}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={50000}
            min={0}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Collection
          </h1>
          <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover handpicked pieces that celebrate Indian craftsmanship and modern elegance
          </p>
        </div>

        {/* Filters and Sort Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* View Toggle */}
            <div className="hidden sm:flex border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
          </div>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="bestselling">Bestselling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card-elegant p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-foreground">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group card-elegant overflow-hidden hover:shadow-hover transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <Badge className="bg-primary text-primary-foreground">New</Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-secondary text-secondary-foreground">Bestseller</Badge>
                      )}
                      {product.originalPrice && (
                        <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>
                      )}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="ghost" size="sm" className="p-2 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white rounded-full">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="ghost" size="sm" className="p-2 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white rounded-full">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>

                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category
                        })}
                        className="w-full bg-warm-white/90 text-foreground hover:bg-warm-white backdrop-blur-sm"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Available Colors */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground mr-2">Colors:</span>
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full border border-stone/30"
                          style={{
                            backgroundColor: 
                              color === 'Maroon' ? '#800000' :
                              color === 'Beige' ? '#F5F5DC' :
                              color === 'Blue' ? '#4169E1' :
                              color === 'Black' ? '#000000' :
                              color === 'Pink' ? '#FFC0CB' :
                              color === 'Green' ? '#228B22' : '#ccc'
                          }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More / Pagination */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="min-w-40">
                  Load More Products
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;