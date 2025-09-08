import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InstagramFeed = () => {
  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
      alt: 'Stylish woman in beige outfit',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
      alt: 'Fashion flat lay with accessories',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
      alt: 'Woman in elegant dress',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
      alt: 'Minimalist fashion styling',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80',
      alt: 'Casual chic outfit',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=400&q=80',
      alt: 'Elegant fashion details',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Follow @shreyasen.style
          </h2>
          <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Get inspired by our community and see how they style their favorite shreyasen pieces
          </p>
          <Button className="btn-primary inline-flex items-center gap-2">
            <Instagram className="w-5 h-5" />
            Follow Us
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-xl shadow-card hover:shadow-hover transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-8 h-8 text-warm-white drop-shadow-lg" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;