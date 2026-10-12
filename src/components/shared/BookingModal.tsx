import React from 'react';
import { BusinessConfig } from '../../data/mehndiData';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  trackEvent,
} from '../../utils/analyticsAndLinks';
import { X, MessageCircle, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessConfig: BusinessConfig;
  initialService?: string;
  initialDesignTitle?: string;
  ctaPosition?: string;
  onOpenOwnerConfig: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  businessConfig,
  initialService = 'Bridal Mehndi',
  initialDesignTitle = '',
  ctaPosition = 'modal',
  onOpenOwnerConfig,
}) => {
  const [eventType, setEventType] = React.useState(initialService);
  const [eventDate, setEventDate] = React.useState('');
  const [location, setLocation] = React.useState('Bhubaneswar');
  const [peopleCount, setPeopleCount] = React.useState('1 (Bride)');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (initialService) setEventType(initialService);
  }, [initialService]);

  React.useEffect(() => {
    if (isOpen) {
      trackEvent('booking_start', {
        service: eventType,
        cta_position: ctaPosition,
      });
    }
  }, [isOpen, eventType, ctaPosition]);

  if (!isOpen) return null;

  const messagePreview = buildWhatsAppMessage({
    event: eventType,
    date: eventDate || 'Flexible / To be decided',
    location: location || 'Bhubaneswar',
    peopleCount: peopleCount || '1',
    designTitle: initialDesignTitle,
  });

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messagePreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleOpenWhatsApp = () => {
    trackEvent('whatsapp_click', {
      service: eventType,
      cta_position: ctaPosition,
    });
    trackEvent('booking_submit', {
      service: eventType,
      cta_position: ctaPosition,
    });
    const url = buildWhatsAppUrl(businessConfig.whatsappNumber, {
      event: eventType,
      date: eventDate || 'Flexible / To be decided',
      location: location || 'Bhubaneswar',
      peopleCount: peopleCount || '1',
      designTitle: initialDesignTitle,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201D1A]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#F8F2E8] border border-[#C69B55]/50 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close booking modal"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EADCC8] text-[#201D1A] hover:bg-[#23382D] hover:text-[#F8F2E8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 pr-8">
          <div className="text-xs font-medium text-[#7A4935]">
            <span>Direct WhatsApp Enquiry Builder</span>
            <span aria-hidden="true"> · </span>
            <span>No Account Required</span>
          </div>
          <h2
            id="booking-modal-title"
            className="font-display text-2xl sm:text-3xl font-semibold text-[#23382D]"
          >
            Enquire About Mehndi Availability
          </h2>
          <p className="text-xs sm:text-sm text-[#716961]">
            Customize your event details below to generate a pre-filled WhatsApp message for{' '}
            {businessConfig.businessName}.
          </p>
        </div>

        {!businessConfig.whatsappNumber && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#EADCC8]/80 border border-[#C69B55]/40 flex items-start gap-3 text-xs text-[#201D1A]">
            <AlertCircle className="w-4 h-4 text-[#7A4935] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[#23382D]">
                Owner WhatsApp Number Verification Pending
              </p>
              <p className="text-[#716961]">
                Per TRD data safeguards, no unverified third-party phone number is hardcoded. You
                can still launch WhatsApp with the pre-filled message or{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenOwnerConfig();
                  }}
                  className="text-[#7A4935] underline font-semibold cursor-pointer"
                >
                  configure a verified number in Owner Settings
                </button>
                .
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="wa-event-type"
              className="block text-xs font-semibold text-[#201D1A] mb-1.5"
            >
              Event / Mehndi Service
            </label>
            <select
              id="wa-event-type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
            >
              <option value="Bridal Mehndi (Full Hands & Feet)">
                Bridal Mehndi (Full Hands & Feet)
              </option>
              <option value="Engagement / Indo-Arabic Mehndi">
                Engagement / Indo-Arabic Mehndi
              </option>
              <option value="Arabic Floral Mehndi">Arabic Floral Mehndi</option>
              <option value="Indian Traditional Mandala Mehndi">
                Indian Traditional Mandala Mehndi
              </option>
              <option value="Jewellery / Khafif Minimal Mehndi">
                Jewellery / Khafif Minimal Mehndi
              </option>
              <option value="Sangeet / Festive Group Booking">
                Sangeet / Festive Group Booking
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="wa-event-date"
              className="block text-xs font-semibold text-[#201D1A] mb-1.5"
            >
              Preferred Event Date
            </label>
            <input
              id="wa-event-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
            />
          </div>

          <div>
            <label
              htmlFor="wa-location"
              className="block text-xs font-semibold text-[#201D1A] mb-1.5"
            >
              Locality in Bhubaneswar / Odisha
            </label>
            <input
              id="wa-location"
              type="text"
              placeholder="e.g., Ashok Nagar, Saheed Nagar, Patia"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
            />
          </div>

          <div>
            <label
              htmlFor="wa-people"
              className="block text-xs font-semibold text-[#201D1A] mb-1.5"
            >
              Number of People
            </label>
            <select
              id="wa-people"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
            >
              <option value="1 (Bride Only)">1 (Bride Only)</option>
              <option value="1 (Bride) + 2–5 Family Members">
                1 (Bride) + 2–5 Family Members
              </option>
              <option value="1–3 People (Festive / Occasion)">
                1–3 People (Festive / Occasion)
              </option>
              <option value="5–15 Guests (Intimate Sangeet)">
                5–15 Guests (Intimate Sangeet)
              </option>
              <option value="15+ Guests (Wedding Group Booking)">
                15+ Guests (Wedding Group Booking)
              </option>
            </select>
          </div>
        </div>

        {/* Pre-filled Message Preview matching TRD Section 12 */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-[#201D1A]">
              Pre-filled WhatsApp Message Preview
            </span>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#7A4935] hover:text-[#23382D] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#287A4B]" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Text
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-[#EADCC8]/65 border border-[#C69B55]/30 text-xs text-[#201D1A] whitespace-pre-wrap font-sans leading-relaxed">
            {messagePreview}
          </pre>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-[#23382D] hover:bg-[#1a2b22] text-[#F8F2E8] font-semibold text-sm flex items-center justify-center gap-2 border border-[#C69B55]/40 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#C69B55]" />
            Open WhatsApp with Enquiry
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-lg border border-[#716961]/30 text-sm font-medium text-[#201D1A] hover:bg-[#EADCC8]/50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
