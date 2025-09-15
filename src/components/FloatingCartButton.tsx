import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from '@/components/CartDrawer';

const FloatingCartButton = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount, items } = useCart();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Only show on mobile when there are items in cart
  if (itemCount === 0) return null;

  return (
    <>
      {/* Fixed floating button for mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <Button 
          onClick={() => setIsCartOpen(true)}
          className="w-full h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between px-6"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            </div>
            <span className="font-medium">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">
              ₹{subtotal.toLocaleString()}
            </div>
            <div className="text-xs opacity-90">
              View Cart
            </div>
          </div>
        </Button>
      </div>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default FloatingCartButton;