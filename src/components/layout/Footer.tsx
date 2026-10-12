import React from 'react';
import { PageRoute, BusinessConfig } from '../../data/mehndiData';
import {
  buildGoogleMapsUrl,
  buildAppleMapsUrl,
  trackEvent,
} from '../../utils/analyticsAndLinks';
import { MapPin, Phone, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenBookingModal: (context?: { service?: string; ctaPosition?: string }) => void;
  onOpenOwnerConfig: () => void;
  businessConfig: BusinessConfig;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal,
  onOpenOwnerConfig,
  businessConfig,
}) => {
  const handleNav = (page: PageRoute) => {
    trackEvent('page_view', { page, cta_position: 'footer' });
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#23382D] text-[#F8F2E8] border-t border-[#C69B55]/30 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C69B55]/20">
          {/* Column 1: Brand & Regional Trust Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-display text-2xl sm:text-3xl font-semibold text-[#F8F2E8] tracking-wide">
              {businessConfig.businessName}
            </div>
            <p className="text-sm text-[#EADCC8]/85 leading-relaxed max-w-sm">
              Bespoke bridal, Arabic, Indian traditional, and occasion mehndi artistry in{' '}
              {businessConfig.city}, {businessConfig.state}. Crafted with 100% natural herbal henna cones.
            </p>
            <div className="text-xs text-[#C69B55] tracking-wide pt-1">
              {businessConfig.addressLine} · {businessConfig.city} {businessConfig.postalCode}
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C69B55]">
              Portfolio & Pages
            </h3>
            <ul className="space-y-2.5 text-sm text-[#EADCC8]/90">
              {(
                [
                  { label: 'Home', route: 'home' },
                  { label: 'Design Gallery', route: 'gallery' },
                  { label: 'Mehndi Services', route: 'services' },
                  { label: 'About the Artist', route: 'about' },
                  { label: 'Contact & Booking', route: 'contact' },
                ] as { label: string; route: PageRoute }[]
              ).map((item) => (
                <li key={item.route}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.route)}
                    className="hover:text-[#C69B55] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Mehndi Specialties */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C69B55]">
              Mehndi Styles
            </h3>
            <ul className="space-y-2.5 text-sm text-[#EADCC8]/90">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-[#C69B55] transition-colors cursor-pointer text-left"
                >
                  Bridal Full-Hand & Feet Mehndi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-[#C69B55] transition-colors cursor-pointer text-left"
                >
                  Shaded Arabic & Indo-Arabic Trails
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-[#C69B55] transition-colors cursor-pointer text-left"
                >
                  Indian Mandala & Peacock Motifs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-[#C69B55] transition-colors cursor-pointer text-left"
                >
                  Jewellery Style & Khafif Minimal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-[#C69B55] transition-colors cursor-pointer text-left"
                >
                  Sangeet, Raja & Festive Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Direct Actions */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C69B55]">
              Bhubaneswar Location & Booking
            </h3>
            <div className="text-sm text-[#EADCC8]/90 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C69B55] shrink-0 mt-1" />
                <span>
                  {businessConfig.addressLine}, {businessConfig.city}, {businessConfig.state}{' '}
                  {businessConfig.postalCode}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <a
                  href={buildGoogleMapsUrl(businessConfig)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('map_google_click', { page: currentPage, cta_position: 'footer' })
                  }
                  className="inline-flex items-center gap-1 text-[#C69B55] hover:underline whitespace-nowrap"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
                <span aria-hidden="true" className="text-[#EADCC8]/40">
                  ·
                </span>
                <a
                  href={buildAppleMapsUrl(businessConfig)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('map_apple_click', { page: currentPage, cta_position: 'footer' })
                  }
                  className="inline-flex items-center gap-1 text-[#C69B55] hover:underline whitespace-nowrap"
                >
                  Open in Apple Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  trackEvent('whatsapp_click', { page: currentPage, cta_position: 'footer' });
                  onOpenBookingModal({ ctaPosition: 'footer' });
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C69B55] text-[#201D1A] font-semibold text-xs hover:bg-[#d3a966] transition-colors whitespace-nowrap cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </button>

              {businessConfig.phoneNumber ? (
                <a
                  href={`tel:${businessConfig.phoneNumber}`}
                  onClick={() =>
                    trackEvent('phone_click', { page: currentPage, cta_position: 'footer' })
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#C69B55]/50 text-[#F8F2E8] font-medium text-xs hover:bg-[#F8F2E8]/10 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C69B55]" />
                  Call {businessConfig.phoneNumber}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onOpenOwnerConfig}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#C69B55]/35 text-[#EADCC8]/85 text-xs hover:bg-[#F8F2E8]/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C69B55]" />
                  Phone Pending Owner Verification
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Data Caution Disclosure Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#EADCC8]/75">
          <div>
            © {new Date().getFullYear()} {businessConfig.businessName}, {businessConfig.city}.
            Portfolio Demo & Verification Specification.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleNav('privacy')}
              className="hover:text-[#F8F2E8] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => handleNav('terms')}
              className="hover:text-[#F8F2E8] transition-colors cursor-pointer"
            >
              Terms & Guidelines
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => handleNav('cookies')}
              className="hover:text-[#F8F2E8] transition-colors cursor-pointer"
            >
              Cookies & Consent
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenOwnerConfig}
              className="text-[#C69B55] hover:underline font-medium cursor-pointer"
            >
              Owner Verification Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
