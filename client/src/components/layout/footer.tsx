import { Link } from "wouter";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-footer-home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold">ACME</span>
            </Link>
            <p className="text-gray-400">
              Build your SaaS faster with our modern, production-ready template.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#features" className="hover:text-white transition-colors" data-testid="link-footer-features">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors" data-testid="link-footer-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-white transition-colors" data-testid="link-footer-docs">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors" data-testid="link-footer-about">
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors" data-testid="link-footer-blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors" data-testid="link-footer-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#help" className="hover:text-white transition-colors" data-testid="link-footer-help">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition-colors" data-testid="link-footer-community">
                  Community
                </a>
              </li>
              <li>
                <a href="#status" className="hover:text-white transition-colors" data-testid="link-footer-status">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ACME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
