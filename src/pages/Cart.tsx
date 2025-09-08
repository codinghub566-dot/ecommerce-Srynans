import { useState } from 'react';
import { Minus, Plus, X, ShoppingBag, Shield, RotateCcw, Truck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setIsPromoApplied(true);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Your Shopping Bag is Empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/shop">
              <Button size="lg" className="font-medium">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">Shopping Bag</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Your Shopping Bag
          </h1>
          <Link to="/shop">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.category}`} className="card-elegant p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-foreground text-lg mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          {item.category && <span>Category: {item.category}</span>}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-foreground text-lg">
                          ₹{item.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="font-semibold text-foreground">
                        Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="card-elegant p-6">
              <h3 className="font-medium text-foreground mb-4">Promo Code</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={applyPromoCode}
                  disabled={isPromoApplied}
                >
                  Apply
                </Button>
              </div>
              {isPromoApplied && (
                <div className="mt-2 text-sm text-green-600">
                  ✓ Promo code applied successfully!
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="card-elegant p-6">
              <h3 className="font-medium text-foreground mb-4">Order Summary</h3>
              
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (WELCOME10)</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                {subtotal < 999 && (
                  <div className="text-xs text-muted-foreground">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full mt-6 h-12 text-base font-medium">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="card-elegant p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span className="text-foreground">14-day Easy Returns</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Free Shipping on ₹999+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;