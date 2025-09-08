import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCarousel from '@/components/ProductCarousel';
import About from '@/components/About';
import InstagramFeed from '@/components/InstagramFeed';
import EmailSignup from '@/components/EmailSignup';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <ProductCarousel />
        <About />
        <InstagramFeed />
        <EmailSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
