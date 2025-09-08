// Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Shield, CheckCircle, ArrowLeft, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
    sameAsBilling: true,
    marketing: false,
  });

  // Use actual cart items
  const cartItems = items;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = formData.deliveryMethod === 'express' ? 199 : 0;
  const total = subtotal + shipping;

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if Razorpay is loaded
      if (!(window as any).Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }

      // Generate order number
      const orderNumber = `SS${Date.now()}`;
      
      const options = {
        key: 'rzp_test_5YYUTSEeP8c0hU', // Razorpay test key
        amount: total * 100, // Amount in paise (multiply by 100)
        currency: 'INR',
        name: 'Your Store',
        description: 'Online Purchase',
        order_id: orderNumber,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#8B5CF6', // Primary color
        },
        handler: function (response: any) {
          // Payment successful
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          
          // Navigate to success page
          navigate(`/order-success?orderNumber=${orderNumber}&paymentId=${response.razorpay_payment_id}`);
        },
        modal: {
          ondismiss: function() {
            // Payment cancelled
            setIsSubmitting(false);
            toast({
              title: "⚠️ Payment failed",
              description: "Payment was cancelled. Please try again.",
              variant: "destructive",
            });
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "⚠️ Payment failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Checkout
          </h1>
          <Link to="/cart">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="card-elegant p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketing}
                      onCheckedChange={(checked) => handleInputChange('marketing', checked)}
                    />
                    <Label htmlFor="marketing" className="text-sm text-muted-foreground">
                      Email me with news and offers
                    </Label>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="card-elegant p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Shipping Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      placeholder="Apartment, suite, etc."
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map(state => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        placeholder="110001"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="card-elegant p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Delivery Method</h2>
                </div>
                
                <RadioGroup
                  value={formData.deliveryMethod}
                  onValueChange={(value) => handleInputChange('deliveryMethod', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-soft-pink/30 transition-colors">
                    <RadioGroupItem value="standard" id="standard" />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="font-medium">Standard Delivery</Label>
                      <p className="text-sm text-muted-foreground">5-7 business days • Free</p>
                    </div>
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-soft-pink/30 transition-colors">
                    <RadioGroupItem value="express" id="express" />
                    <div className="flex-1">
                      <Label htmlFor="express" className="font-medium">Express Delivery</Label>
                      <p className="text-sm text-muted-foreground">2-3 business days • ₹199</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">₹199</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="card-elegant p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Payment Method</h2>
                </div>
                
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-soft-pink/30 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="w-5 h-5 text-primary" />
                    <Label htmlFor="card" className="font-medium">Credit / Debit Card</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-soft-pink/30 transition-colors">
                    <RadioGroupItem value="upi" id="upi" />
                    <Smartphone className="w-5 h-5 text-primary" />
                    <Label htmlFor="upi" className="font-medium">UPI (GPay, PhonePe, Paytm)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-soft-pink/30 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <Label htmlFor="cod" className="font-medium">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="card-elegant p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-6">Order Summary</h3>
                
                {/* Product List */}
                <div className="space-y-4 mb-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Your cart is empty</p>
                      <Link to="/shop">
                        <Button variant="outline" className="mt-4">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={`${item.id}-${item.category}`} className="flex space-x-3">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-lg"
                          />
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm mb-1 truncate">
                            {item.name}
                          </h4>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>{item.category}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <Separator className="my-4" />
                
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-6 h-12 text-base font-medium"
                  disabled={isSubmitting || cartItems.length === 0}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Processing..." : "Complete Order"}
                </Button>

                {/* Trust Indicators */}
                <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="text-center">
                    14-day return policy • Fast shipping across India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;