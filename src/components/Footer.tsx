import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '#new' },
      { name: 'Dresses', href: '#dresses' },
      { name: 'Tops & Blouses', href: '#tops' },
      { name: 'Accessories', href: '#accessories' },
      { name: 'Sale', href: '#sale' },
    ],
    help: [
      { name: 'Size Guide', href: '#size-guide' },
      { name: 'Shipping Info', href: '#shipping' },
      { name: 'Returns', href: '#returns' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact Us', href: '#contact' },
    ],
    company: [
      { name: 'About shreyasen', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Sustainability', href: '#sustainability' },
      { name: 'Press', href: '#press' },
      { name: 'Wholesale', href: '#wholesale' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
  ];

  return (
    <footer className="bg-foreground text-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-12 w-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-serif font-bold text-xl">
              SS
            </div>
            <p className="text-warm-white/80 max-w-md">
              shreyasen is more than a brand — it's a lifestyle rooted in comfort, 
              elegance, and confidence. Discover pieces that make you feel beautiful.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@shreyasen.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-warm-white/80 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-warm-white/80 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-warm-white/80 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-warm-white/60 text-sm">
              © 2024 shreyasen. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-2 bg-warm-white/10 hover:bg-primary rounded-full transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              
              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <a href="#privacy" className="text-warm-white/60 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-warm-white/60 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;