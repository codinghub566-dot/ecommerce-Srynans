import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onOpenChange }) => {
  const { items, itemCount, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const EmptyCartState = () => (
    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium text-muted-foreground mb-2">Your cart is empty</h3>
      <p className="text-sm text-muted-foreground/80 mb-6 max-w-48">
        Add some products to get started
      </p>
      <Button onClick={() => onOpenChange(false)} asChild>
        <Link to="/shop" className="w-full">
          Continue Shopping
        </Link>
      </Button>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center justify-between">
            <span>Shopping Cart ({itemCount})</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-2">
                        <h4 className="text-sm font-medium text-foreground line-clamp-2">
                          {item.name}
                        </h4>
                        {item.category && (
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-2 h-2" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-2 h-2" />
                        </Button>
                      </div>
                      
                      <div className="text-sm font-semibold text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                </div>
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
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => onOpenChange(false)}
                  asChild
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onOpenChange(false)}
                  asChild
                >
                  <Link to="/cart">
                    View Full Cart
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;