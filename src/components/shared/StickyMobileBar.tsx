import React from 'react';
import { BusinessConfig, PageRoute } from '../../data/mehndiData';
import { trackEvent } from '../../utils/analyticsAndLinks';
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';

interface StickyMobileBarProps {
  currentPage: PageRoute;
  businessConfig: BusinessConfig;
  onOpenBookingModal: (context?: { service?: string; ctaPosition?: string }) => void;
  onNavigate: (page: PageRoute) => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  currentPage,
  businessConfig,
  onOpenBookingModal,
  onNavigate,
}) => {
  return (
    <div
      role="region"
      aria-label="Quick mobile booking actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 h-14 bg-[#23382D] border-t border-[#C69B55]/40 px-3 flex items-center justify-between gap-2 shadow-lg"
    >
      <button
        type="button"
        onClick={() => {
          trackEvent('whatsapp_click', { page: currentPage, cta_position: 'mobile_sticky' });
          onOpenBookingModal({ ctaPosition: 'mobile_sticky' });
        }}
        className="flex-1 h-10 rounded-lg bg-[#C69B55] text-[#201D1A] font-semibold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>WhatsApp Enquiry</span>
      </button>

      {businessConfig.phoneNumber ? (
        <a
          href={`tel:${businessConfig.phoneNumber}`}
          onClick={() =>
            trackEvent('phone_click', { page: currentPage, cta_position: 'mobile_sticky' })
          }
          className="h-10 px-4 rounded-lg border border-[#C69B55]/50 text-[#F8F2E8] font-medium text-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-[#C69B55]" />
          <span>Call</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => {
            trackEvent('booking_start', { page: currentPage, cta_position: 'mobile_sticky' });
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="h-10 px-4 rounded-lg border border-[#C69B55]/50 text-[#F8F2E8] font-medium text-xs flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-[#C69B55]" />
          <span>Request Slot</span>
        </button>
      )}
    </div>
  );
};
