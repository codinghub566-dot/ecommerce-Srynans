import { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
        setTimeout(() => {
          toast({
            title: "Welcome to shreyasen! ✨",
            description: "You've been added to our mailing list. Get ready for exclusive offers!",
          });
          setEmail('');
          setIsLoading(false);
        }, 1000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blush via-soft-pink to-beige">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-medium text-primary">Stay in the Loop</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join the shreyasen Community
          </h2>
          
          <p className="font-sans text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            Be the first to discover new collections, exclusive offers, and style inspiration. 
            Get early access to sales and members-only perks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-warm-white/80 backdrop-blur-sm border-stone/30 focus:border-primary"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary h-12 px-8 whitespace-nowrap"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </form>

        <p className="text-sm text-foreground/60 mt-4">
          By subscribing, you agree to our privacy policy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default EmailSignup;