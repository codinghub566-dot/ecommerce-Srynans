import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        toast({
          title: "✅ Item added to cart",
          description: `${product.name} quantity updated`,
          duration: 2000,
        });
        
        return updatedItems;
      } else {
        const newItem: CartItem = { ...product, quantity: 1 };
        
        toast({
          title: "✅ Item added to cart",
          description: `${product.name} has been added to your cart`,
          duration: 2000,
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value: CartContextType = {
    items,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};