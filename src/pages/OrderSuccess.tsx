import { CheckCircle, ShoppingBag, Package, Clock, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const orderNumber = searchParams.get('orderNumber') || `SS${Date.now()}`;

  // Clear cart when order is successful
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            🎉 Order placed successfully!
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thank you for shopping with us. Your order will be delivered soon.
          </p>

          {/* Order Details */}
          <Card className="max-w-md mx-auto mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order Number</span>
                  <span className="font-medium text-foreground">{orderNumber}</span>
                </div>
                <Separator />
                <div className="flex items-center space-x-3 text-sm">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Order confirmed and being processed</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Expected delivery in 5-7 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button size="lg" className="min-w-48 font-medium">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="min-w-48 font-medium">
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-soft-pink/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-medium text-foreground mb-3">What happens next?</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• You'll receive an email confirmation shortly</p>
              <p>• We'll notify you when your order is shipped</p>
              <p>• Track your order status in your account</p>
              <p>• Questions? Contact our support team</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;