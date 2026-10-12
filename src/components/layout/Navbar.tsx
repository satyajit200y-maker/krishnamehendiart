import React from 'react';
import { PageRoute, BusinessConfig } from '../../data/mehndiData';
import { trackEvent } from '../../utils/analyticsAndLinks';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenBookingModal: (context?: { service?: string; ctaPosition?: string }) => void;
  businessConfig: BusinessConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'Services', route: 'services' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    trackEvent('page_view', { page: route, cta_position: 'navbar' });
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8 bg-transparent">
        {/* Zone 1: Single text element wordmark (Top Bar Contract) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#23382D] whitespace-nowrap shrink-0"
        >
          Krishna Mehndi Artist
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#201D1A]"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.route;
            return (
              <a
                key={item.route}
                href={`#${item.route}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.route);
                }}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#C69B55] text-[#23382D] font-semibold'
                    : 'border-transparent text-[#716961] hover:text-[#201D1A] hover:border-[#C69B55]/50'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              trackEvent('whatsapp_click', { page: currentPage, cta_position: 'navbar' });
              onOpenBookingModal({ ctaPosition: 'navbar' });
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#F8F2E8] bg-[#23382D] hover:bg-[#1a2b22] border border-[#C69B55]/40 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Now
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#23382D] hover:bg-[#EADCC8]/60 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F8F2E8] border-b border-[#C69B55]/30 px-4 pt-3 pb-6 space-y-3">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#EADCC8] text-[#23382D] font-semibold'
                      : 'text-[#201D1A] hover:bg-[#EADCC8]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#EADCC8] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('whatsapp_click', { page: currentPage, cta_position: 'mobile_menu' });
                onOpenBookingModal({ ctaPosition: 'mobile_menu' });
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#23382D] text-[#F8F2E8] font-semibold text-sm text-center border border-[#C69B55]/40 cursor-pointer"
            >
              Enquire via WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
