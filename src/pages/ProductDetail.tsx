import { useState } from 'react';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Plus, Minus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const product = {
    id: 1,
    name: 'Embroidered Floral Anarkali Set',
    price: 4599,
    originalPrice: 5999,
    rating: 4.8,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
      'https://images.unsplash.com/photo-1583391733981-24c37b0e4c93?w=600&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Maroon', 'Pink'],
    fabric: 'Pure Cotton with Chikankari Embroidery',
    stockCount: 2,
    features: [
      'Hand-embroidered with traditional chikankari',
      'Comfortable cotton fabric',
      'Includes matching dupatta',
      'Perfect for festivals and occasions'
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Silk Co-ord Set',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80',
      rating: 4.6
    },
    {
      id: 3,
      name: 'Designer Kurti Set',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Festive Lehenga',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
      rating: 4.9
    },
    {
      id: 5,
      name: 'Cotton Palazzo Set',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1583391733981-24c37b0e4c93?w=400&q=80',
      rating: 4.5
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Priya S.',
      rating: 5,
      comment: 'Absolutely gorgeous! The embroidery work is exquisite and the fit is perfect.',
      date: '2 weeks ago',
      verified: true,
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&q=80']
    },
    {
      id: 2,
      name: 'Ananya M.',
      rating: 4,
      comment: 'Beautiful piece, great quality fabric. Received many compliments!',
      date: '1 month ago',
      verified: true,
      images: []
    },
    {
      id: 3,
      name: 'Sneha K.',
      rating: 5,
      comment: 'Perfect for festive occasions. The color is exactly as shown.',
      date: '3 weeks ago',
      verified: true,
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&q=80']
    }
  ];

  const testimonials = [
    {
      name: '@fashionista_riya',
      text: 'Obsessed with my new ShreyasEn outfit! 💕',
      platform: 'Instagram'
    },
    {
      name: '@style_by_meera',
      text: 'Quality that speaks for itself. Highly recommend!',
      platform: 'Instagram'
    }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-stone'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
          <span>/</span>
          <span className="text-foreground">Anarkali Sets</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover rounded-xl"
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Image Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedImage ? 'bg-primary' : 'bg-warm-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === selectedImage ? 'border-primary' : 'border-stone/20'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                <Badge className="bg-destructive text-destructive-foreground">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>

              {/* Stock Warning */}
              {product.stockCount <= 5 && (
                <div className="flex items-center space-x-2 text-destructive text-sm mb-4">
                  <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
                  <span>Only {product.stockCount} left in stock!</span>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Separator />

            {/* Size Selection */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                    className="h-12 w-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Need help with sizing? Check our size guide
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 h-12 text-base font-medium"
                  disabled={!selectedSize}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="h-12 w-12 p-0"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" className="h-12 w-12 p-0">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
              
              <Button 
                variant="secondary" 
                className="w-full h-12 text-base font-medium"
                disabled={!selectedSize}
              >
                Buy Now
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-soft-pink/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-4 h-4 text-primary" />
                <span className="font-medium">Free shipping on orders above ₹999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Estimated delivery: 3-5 business days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="mb-16">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-medium">Product Details</AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Fabric & Care</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Fabric: {product.fabric}</li>
                    <li>• Machine wash cold</li>
                    <li>• Do not bleach</li>
                    <li>• Iron on low heat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">What's Included</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Anarkali kurta</li>
                    <li>• Matching palazzo pants</li>
                    <li>• Chiffon dupatta</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sizing">
              <AccordionTrigger className="text-lg font-medium">Size & Fit Info</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                <div className="space-y-4">
                  <p>Model is wearing size M and is 5'6" tall</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Size</th>
                          <th className="text-left py-2">Bust (inches)</th>
                          <th className="text-left py-2">Waist (inches)</th>
                          <th className="text-left py-2">Length (inches)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">XS</td>
                          <td className="py-2">32</td>
                          <td className="py-2">26</td>
                          <td className="py-2">46</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">S</td>
                          <td className="py-2">34</td>
                          <td className="py-2">28</td>
                          <td className="py-2">46</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">M</td>
                          <td className="py-2">36</td>
                          <td className="py-2">30</td>
                          <td className="py-2">47</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">L</td>
                          <td className="py-2">38</td>
                          <td className="py-2">32</td>
                          <td className="py-2">47</td>
                        </tr>
                        <tr>
                          <td className="py-2">XL</td>
                          <td className="py-2">40</td>
                          <td className="py-2">34</td>
                          <td className="py-2">48</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-medium">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-foreground/80 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Free Shipping</h4>
                      <p className="text-sm text-muted-foreground">On orders above ₹999</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RotateCcw className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Easy Returns</h4>
                      <p className="text-sm text-muted-foreground">15-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Secure Payment</h4>
                      <p className="text-sm text-muted-foreground">100% secure transactions</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold text-foreground">Customer Reviews</h2>
            <Button variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="card-elegant p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review.name}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-4">{review.comment}</p>
                  
                  {review.images.length > 0 && (
                    <div className="flex space-x-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Review"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="testimonials" className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card-elegant p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-section rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{testimonial.name.charAt(1)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.platform}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80">"{testimonial.text}"</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group card-elegant overflow-hidden hover:shadow-hover transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="ghost" size="sm" className="p-2 bg-warm-white/80 backdrop-blur-sm hover:bg-warm-white rounded-full">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;