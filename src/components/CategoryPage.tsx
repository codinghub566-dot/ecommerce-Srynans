import { useState, useMemo } from 'react';
import { Filter, Grid, List, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: string[];
  colors: string[];
  isNew: boolean;
  isBestseller: boolean;
}

interface CategoryPageProps {
  title: string;
  description: string;
  products: Product[];
  categoryName: string;
}

const CategoryPage = ({ title, description, products, categoryName }: CategoryPageProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [sortBy, setSortBy] = useState(categoryName === 'new-arrivals' ? 'newest' : 'bestselling');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
  const colors = ['Rose', 'Blush', 'Cream', 'Sage', 'Lavender', 'Navy', 'Black', 'White'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
      const colorMatch = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return sizeMatch && colorMatch && priceMatch;
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
  }, [products, selectedSizes, selectedColors, priceRange, sortBy]);

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
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 15000]);
  };

  const activeFiltersCount = selectedSizes.length + selectedColors.length;

  const getColorValue = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Rose': '#F8BBD9',
      'Blush': '#FEC5BB',
      'Cream': '#FAF0E6',
      'Sage': '#9CAF88',
      'Lavender': '#E6E6FA',
      'Navy': '#2E3440',
      'Black': '#2B2B2B',
      'White': '#FFFFFF'
    };
    return colorMap[color] || '#E5E7EB';
  };

  const FilterContent = () => (
    <div className="space-y-6">
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
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color) 
                  ? 'border-primary scale-110' 
                  : 'border-stone/30 hover:border-primary/50'
              }`}
              style={{ backgroundColor: getColorValue(color) }}
              title={color}
            />
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
            max={15000}
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
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
              <SelectItem value="bestselling">Best Selling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
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
                  className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to wishlist functionality
                          console.log('Added to wishlist:', product.name);
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="ghost" size="sm" className="p-2 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full">
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
                        className="w-full bg-background/90 text-foreground hover:bg-background backdrop-blur-sm border"
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
                      {product.colors.slice(0, 3).map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: getColorValue(color) }}
                          title={color}
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

export default CategoryPage;