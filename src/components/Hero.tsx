import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fashionable woman in elegant outfit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-white/80 via-soft-pink/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-in">
          Love What You Wear
        </h1>
        
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up">
          Discover effortless style with shreyasen's handpicked collection.
        </p>
        
        <div className="animate-scale-in">
          <Button 
            size="lg" 
            className="btn-primary text-lg px-12 py-4 shadow-soft hover:shadow-hover"
            asChild
          >
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full" />
      </div>
    </section>
  );
};

export default Hero;