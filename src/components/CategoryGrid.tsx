import { ArrowRight } from 'lucide-react';

const CategoryGrid = () => {
  const categories = [
    {
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80',
      href: '#dresses',
    },
    {
      name: 'Tops',
      image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=500&q=80',
      href: '#tops',
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80',
      href: '#accessories',
    },
    {
      name: 'New Arrivals',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
      href: '#new-arrivals',
      featured: true,
    },
    {
      name: 'Sale',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80',
      href: '#sale',
      badge: 'Up to 50% Off',
    },
    {
      name: 'Essentials',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
      href: '#essentials',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="categories">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Shop by Category
        </h2>
        <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto">
          Explore our carefully curated collections designed for every occasion and style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <a
            key={category.name}
            href={category.href}
            className={`group relative overflow-hidden rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 hover:scale-105 ${
              category.featured ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-warm-white mb-2">
                    {category.name}
                  </h3>
                  {category.badge && (
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      {category.badge}
                    </span>
                  )}
                </div>
                <div className="p-2 bg-warm-white/20 backdrop-blur-sm rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;