import { Button } from '@/components/ui/button';
import aboutImage from '@/assets/about-image.jpg';

const About = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-soft">
              <img
                src={aboutImage}
                alt="About shreyasen - A woman in stylish clothing"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blush to-beige rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                About shreyasen
              </h2>
              <div className="space-y-6 text-lg text-foreground/80">
                <p>
                  shreyasen is more than a brand — it's a lifestyle rooted in comfort, 
                  elegance, and confidence. We craft pieces for women who want to look 
                  great and feel even better, from dreamy dresses to daily essentials.
                </p>
                <p>
                  Every piece in our collection is thoughtfully designed and carefully 
                  selected to celebrate the modern woman's journey. We believe that 
                  style should be effortless, sustainable, and accessible to all.
                </p>
                <p>
                  Founded with love and a passion for timeless fashion, we're committed 
                  to creating beautiful clothes that make you feel as good as you look.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                Our Story
              </Button>
              <Button variant="outline" className="border-stone text-foreground hover:bg-soft-pink">
                Size Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;