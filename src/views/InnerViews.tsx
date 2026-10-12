import React from 'react';
import { motion } from 'motion/react';
import {
  GalleryItem,
  DesignCategory,
  GALLERY_ITEMS,
  SERVICES_LIST,
  PACKAGE_TIERS,
  BusinessConfig,
  IMAGES,
  PageRoute,
} from '../data/mehndiData';
import {
  buildGoogleMapsUrl,
  buildAppleMapsUrl,
  buildWhatsAppUrl,
  trackEvent,
} from '../utils/analyticsAndLinks';
import {
  Eye,
  MessageCircle,
  Clock,
  Layers,
  Check,
  MapPin,
  Phone,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

/* ============================================================================
 * 1. GALLERY PAGE (/gallery)
 * ========================================================================== */
interface GalleryViewProps {
  onSelectGalleryItem: (item: GalleryItem) => void;
  onOpenBookingModal: (context?: {
    service?: string;
    designTitle?: string;
    ctaPosition?: string;
  }) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onSelectGalleryItem,
  onOpenBookingModal,
}) => {
  const [activeFilter, setActiveFilter] = React.useState<DesignCategory>('All');

  const categories: DesignCategory[] = [
    'All',
    'Bridal',
    'Arabic',
    'Indian',
    'Minimal',
    'Jewellery',
    'Occasion',
  ];

  const items = React.useMemo(() => {
    if (activeFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((i) => i.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-medium text-[#7A4935] tracking-wide">
          <span>PORTFOLIO & DESIGN LOOKBOOK</span>
          <span aria-hidden="true"> · </span>
          <span>KRISHNA MEHNDI ARTIST BHUBANESWAR</span>
        </div>
        <h1 className="font-display text-[38px] sm:text-[52px] font-semibold text-[#201D1A] leading-tight">
          Mehndi Design Portfolio
        </h1>
        <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
          Filter by tradition—Bridal, Arabic, Indian, Minimal Khafif, Jewellery style, or Festive
          Occasion. Click any card to inspect motif details in high resolution or request a quote
          for that style on WhatsApp.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Portfolio category filter"
        className="flex items-center gap-1.5 p-1.5 bg-[#EADCC8] rounded-xl overflow-x-auto border border-[#C69B55]/30 no-scrollbar"
      >
        {categories.map((cat) => {
          const isSelected = activeFilter === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              type="button"
              onClick={() => {
                setActiveFilter(cat);
                trackEvent('view_gallery', {
                  page: 'gallery',
                  design_category: cat,
                  cta_position: 'gallery_filter',
                });
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#23382D] text-[#F8F2E8] shadow-sm'
                  : 'text-[#201D1A] hover:bg-[#F8F2E8]/70'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="group bg-[#F8F2E8] rounded-2xl overflow-hidden border border-[#C69B55]/35 flex flex-col justify-between transition-colors hover:border-[#C69B55] shadow-sm"
          >
            <div>
              <div
                onClick={() => {
                  trackEvent('gallery_image_open', {
                    page: 'gallery',
                    design_category: item.category,
                  });
                  onSelectGalleryItem(item);
                }}
                className="relative aspect-[4/3] overflow-hidden bg-[#23382D] cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={`${item.title} - ${item.category} mehndi design`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#F8F2E8]">
                  <span className="text-xs font-medium text-[#C69B55]">
                    {item.category} · {item.durationEstimate}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold">
                    <Eye className="w-3.5 h-3.5 text-[#C69B55]" />
                    Inspect
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h2 className="font-display text-2xl font-semibold text-[#201D1A]">
                  {item.title}
                </h2>
                <p className="text-xs text-[#7A4935] font-medium">{item.motifDetails}</p>
                <p className="text-xs sm:text-sm text-[#716961] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-[#EADCC8] flex items-center justify-between gap-2">
              <span className="text-xs text-[#716961]">{item.coverage}</span>
              <button
                type="button"
                onClick={() =>
                  onOpenBookingModal({
                    service: `${item.category} Mehndi`,
                    designTitle: item.title,
                    ctaPosition: 'gallery_card',
                  })
                }
                className="px-3.5 py-2 rounded-lg bg-[#23382D] hover:bg-[#1a2b22] text-[#F8F2E8] text-xs font-semibold whitespace-nowrap cursor-pointer"
              >
                Enquire Design
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. SERVICES PAGE (/services)
 * ========================================================================== */
interface ServicesViewProps {
  onOpenBookingModal: (context?: { service?: string; ctaPosition?: string }) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenBookingModal }) => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-medium text-[#7A4935] tracking-wide">
          <span>SERVICES & APPLICATION TIMINGS</span>
          <span aria-hidden="true"> · </span>
          <span>BHUBANESWAR MEHNDI STUDIO</span>
        </div>
        <h1 className="font-display text-[38px] sm:text-[52px] font-semibold text-[#201D1A] leading-tight">
          Mehndi Services & Packages
        </h1>
        <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
          Detailed overview of bridal, Arabic, Indian, Khafif, jewellery-style, and occasion mehndi
          services. Exact pricing is confirmed directly by the artist once your event date, coverage
          length, and guest count are shared.
        </p>
      </div>

      {/* Detailed Service Cards */}
      <div className="space-y-6">
        {SERVICES_LIST.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F8F2E8] border border-[#C69B55]/40 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-4 bg-[#23382D] aspect-[4/3] lg:aspect-auto">
              <img
                src={service.image}
                alt={service.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A4935] font-medium">
                  <span>
                    Service {service.index} · {service.category} Tradition
                  </span>
                  <span>Ideal For: {service.idealFor}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#23382D]">
                  {service.index}. {service.name}
                </h2>

                <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
                  {service.detailedDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="p-3 rounded-xl bg-[#EADCC8]/55">
                    <div className="text-xs text-[#716961] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#7A4935]" />
                      <span>Application Time</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#201D1A] mt-1 tabular-nums">
                      {service.estimatedTime}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EADCC8]/55">
                    <div className="text-xs text-[#716961] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#7A4935]" />
                      <span>Typical Coverage</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#201D1A] mt-1">
                      {service.coverageScope}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EADCC8]/55">
                    <div className="text-xs text-[#716961]">Tariff Status</div>
                    <div className="text-xs sm:text-sm font-semibold text-[#7A4935] mt-1">
                      {service.sampleStartingRange}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#716961]">
                  Includes 100% organic herbal cones and natural aftercare guidance.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('service_enquiry', {
                      service: service.name,
                      page: 'services',
                      cta_position: 'services_page_card',
                    });
                    onOpenBookingModal({
                      service: service.name,
                      ctaPosition: 'services_page_card',
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#23382D] hover:bg-[#1a2b22] text-[#F8F2E8] text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#C69B55]" />
                  Enquire About {service.name}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Package Comparison */}
      <div className="pt-8 border-t border-[#C69B55]/30 space-y-6">
        <h2 className="font-display text-3xl font-semibold text-[#201D1A]">
          Event Booking Formats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGE_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="p-6 rounded-2xl bg-[#EADCC8]/50 border border-[#C69B55]/35 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="text-xs font-medium text-[#7A4935]">{tier.duration}</div>
                <h3 className="font-display text-2xl font-semibold text-[#23382D]">{tier.name}</h3>
                <p className="text-xs text-[#716961]">{tier.subtitle}</p>
                <ul className="space-y-2 pt-3 text-xs text-[#201D1A]">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#23382D] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenBookingModal({ service: tier.name, ctaPosition: 'services_packages' })
                }
                className="w-full py-2.5 px-4 rounded-lg bg-[#23382D] text-[#F8F2E8] text-xs font-semibold cursor-pointer"
              >
                Check {tier.name} Availability
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. ABOUT PAGE (/about)
 * ========================================================================== */
interface AboutViewProps {
  businessConfig: BusinessConfig;
  onOpenBookingModal: (context?: { service?: string; ctaPosition?: string }) => void;
  onOpenOwnerConfig: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  businessConfig,
  onOpenBookingModal,
  onOpenOwnerConfig,
}) => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="text-xs font-medium text-[#7A4935] tracking-wide">
            <span>ABOUT THE STUDIO</span>
            <span aria-hidden="true"> · </span>
            <span>BHUBANESWAR, ODISHA</span>
          </div>
          <h1 className="font-display text-[38px] sm:text-[52px] font-semibold text-[#201D1A] leading-tight">
            Dedicated to Fine Freehand Henna & Natural Stain Craft
          </h1>
          <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
            {businessConfig.businessName} is a Bhubaneswar-based mehndi studio focused on bridal,
            festive, and ceremonial henna artistry. Our approach pairs traditional Indian and Odia
            wedding symbolism with contemporary Arabic and minimalist Khafif sensibilities.
          </p>
          <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
            We believe the mehndi sitting should be one of the most peaceful moments of a wedding
            celebration. Every cone is hand-rolled and filled with fresh triple-sifted herbal henna
            paste mixed with pure essential oils for a soothing fragrance and rich, natural maroon
            stain.
          </p>

          <div className="p-4 rounded-xl bg-[#EADCC8]/70 border border-[#C69B55]/40 text-xs text-[#201D1A] space-y-1.5">
            <div className="font-semibold text-[#23382D] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7A4935]" />
              <span>Biography & Experience Verification Note</span>
            </div>
            <p className="text-[#716961]">
              In accordance with the project specification, specific years-in-business counts,
              personal artist biography claims, and completed wedding tallies are kept as
              configurable placeholders until verified directly by the business owner.
            </p>
            <button
              type="button"
              onClick={onOpenOwnerConfig}
              className="text-[#7A4935] font-semibold underline cursor-pointer"
            >
              Open Verification Settings →
            </button>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenBookingModal({ ctaPosition: 'about_page' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#23382D] text-[#F8F2E8] text-sm font-semibold cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#C69B55]" />
              Enquire With the Artist
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden border border-[#C69B55]/40 aspect-[3/4]">
            <img
              src={IMAGES.artistWorking}
              alt="Artist applying bridal mehndi with handcrafted henna cone"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#C69B55]/40 aspect-[3/4]">
            <img
              src={IMAGES.bridalHero}
              alt="Detailed Indian bridal mehndi stain on palms"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Natural Henna & Aftercare Guide */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#23382D] text-[#F8F2E8] border border-[#C69B55]/35 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs text-[#C69B55] font-medium uppercase tracking-wider">
            Our 3-Stage Natural Stain Care Protocol
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">
            How to Achieve a Deep Maroon Bridal Stain
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#EADCC8]/90">
          <div className="p-5 rounded-xl bg-[#F8F2E8]/5 border border-[#C69B55]/25 space-y-2">
            <div className="font-display text-xl font-semibold text-[#C69B55]">
              01. 6–8 Hour Paste Retention
            </div>
            <p>
              Keep the dried henna paste on the skin for at least 6 to 8 hours (or overnight for
              bridal work) and dab lightly with a lemon-sugar sealant so the lawsone dye binds
              deeply.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#F8F2E8]/5 border border-[#C69B55]/25 space-y-2">
            <div className="font-display text-xl font-semibold text-[#C69B55]">
              02. Oil Removal — Zero Water
            </div>
            <p>
              Scrape off dried paste gently using mustard oil, coconut oil, or eucalyptus balm.
              Avoid washing hands with soap and water for the first 12 hours after paste removal.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#F8F2E8]/5 border border-[#C69B55]/25 space-y-2">
            <div className="font-display text-xl font-semibold text-[#C69B55]">
              03. 48-Hour Oxidation Peak
            </div>
            <p>
              Natural henna stains bright pumpkin-orange initially and naturally darkens through
              warmth and oxidation into a rich burgundy-maroon over 36 to 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. CONTACT & ENQUIRY PAGE (/contact)
 * ========================================================================== */
interface ContactViewProps {
  businessConfig: BusinessConfig;
  onOpenBookingModal: (context?: { service?: string; ctaPosition?: string }) => void;
  onOpenOwnerConfig: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  businessConfig,
  onOpenBookingModal,
  onOpenOwnerConfig,
}) => {
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [eventType, setEventType] = React.useState('Bridal Mehndi');
  const [eventDate, setEventDate] = React.useState('');
  const [locality, setLocality] = React.useState('Ashok Nagar, Bhubaneswar');
  const [guestCount, setGuestCount] = React.useState('1 (Bride)');
  const [notes, setNotes] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [lastSubmitTime, setLastSubmitTime] = React.useState<number>(0);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    // Rate limit check (TRD Section 25)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      nextErrors.form = 'Please wait a few seconds before submitting another enquiry.';
    }

    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your name (at least 2 characters).';
    }
    const cleanDigits = phone.replace(/[^0-9]/g, '');
    if (cleanDigits.length < 10 || cleanDigits.length > 13) {
      nextErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!eventDate) {
      nextErrors.eventDate = 'Please select your approximate event date.';
    }
    if (locality.trim().length < 3) {
      nextErrors.locality = 'Please specify your locality in Bhubaneswar or Odisha.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLastSubmitTime(now);
    setSubmitted(true);
    trackEvent('booking_submit', {
      service: eventType,
      page: 'contact',
      cta_position: 'contact_form',
    });
    trackEvent('booking_success', {
      service: eventType,
      page: 'contact',
      cta_position: 'contact_form',
    });
  };

  const handleLaunchWhatsAppFromForm = () => {
    trackEvent('whatsapp_click', {
      service: eventType,
      page: 'contact',
      cta_position: 'contact_form_followup',
    });
    const url = buildWhatsAppUrl(businessConfig.whatsappNumber, {
      event: eventType,
      date: eventDate,
      location: locality,
      peopleCount: guestCount,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-medium text-[#7A4935] tracking-wide">
          <span>CONTACT & APPOINTMENT ENQUIRY</span>
          <span aria-hidden="true"> · </span>
          <span>BHUBANESWAR, ODISHA</span>
        </div>
        <h1 className="font-display text-[38px] sm:text-[52px] font-semibold text-[#201D1A] leading-tight">
          Book Your Mehndi Session or Request a Tariff Quote
        </h1>
        <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
          Reach out directly via WhatsApp or complete the appointment request form below. No user
          account is required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Validated Enquiry Form */}
        <div className="lg:col-span-7 bg-[#F8F2E8] border border-[#C69B55]/40 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#23382D]">
            Online Appointment Enquiry Form
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#716961]">
            Submitting this form prepares your structured booking summary so you can send it
            instantly via WhatsApp or save it for artist callback.
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 p-6 rounded-2xl bg-[#287A4B]/10 border border-[#287A4B] space-y-4"
            >
              <div className="flex items-center gap-2.5 text-[#287A4B] font-semibold text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Enquiry Summary Prepared Successfully</span>
              </div>
              <p className="text-xs sm:text-sm text-[#201D1A] leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your enquiry for{' '}
                <strong>{eventType}</strong> on <strong>{eventDate}</strong> in{' '}
                <strong>{locality}</strong> ({guestCount}) is ready. Click below to transmit it
                directly on WhatsApp for fastest confirmation.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleLaunchWhatsAppFromForm}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#23382D] text-[#F8F2E8] text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#C69B55]" />
                  Send Enquiry on WhatsApp Now
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-3 rounded-lg border border-[#716961]/40 text-xs font-medium text-[#201D1A] cursor-pointer"
                >
                  Edit Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={validateAndSubmit} noValidate className="mt-6 space-y-4">
              {errors.form && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-[#B42318]/10 border border-[#B42318] text-xs text-[#B42318]"
                >
                  {errors.form}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#201D1A] mb-1.5"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Ananya Mohanty"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/45 text-sm text-[#201D1A]"
                  />
                  {errors.fullName && (
                    <p role="alert" className="mt-1 text-xs text-[#B42318]">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold text-[#201D1A] mb-1.5"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/45 text-sm text-[#201D1A]"
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1 text-xs text-[#B42318]">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-xs font-semibold text-[#201D1A] mb-1.5"
                  >
                    Mehndi Service Category *
                  </label>
                  <select
                    id="contact-service"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/45 text-sm text-[#201D1A]"
                  >
                    <option value="Bridal Mehndi">Bridal Mehndi (Full Hands & Feet)</option>
                    <option value="Arabic Mehndi">Arabic Mehndi</option>
                    <option value="Indian Traditional Mehndi">Indian Traditional Mehndi</option>
                    <option value="Khafif Mehndi">Khafif Minimal Mehndi</option>
                    <option value="Jewellery Style Mehndi">Jewellery Style Mehndi</option>
                    <option value="Sangeet / Occasion Group Mehndi">
                      Sangeet / Occasion Group Mehndi
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-date"
                    className="block text-xs font-semibold text-[#201D1A] mb-1.5"
                  >
                    Event / Application Date *
                  </label>
                  <input
                    id="contact-date"
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/45 text-sm text-[#201D1A]"
                  />
                  {errors.eventDate && (
                    <p role="alert" className="mt-1 text-xs text-[#B42318]">
                      {errors.eventDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-locality"
                    className="block text-xs font-semibold text-[#201D1A] mb-1.5"
                  >
                    Venue / Locality in Bhubaneswar *
                  </label>
                  <input
                    id="contact-locality"
                    type="text"
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g., Ashok Nagar, Patia, Saheed Nagar"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/45 text-sm text-[#201D1A]"
                  />
                  {errors.locality && (
                    <p role="alert" className="mt-1 text-xs text-[#B42318]">
                      {errors.locality}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-guests"
                    className="block text-xs font-semibold text-[#201D1A] mb-1.5"
                  >
                    Number of People
                  </label>
                  <select
                    id="contact-guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/45 text-sm text-[#201D1A]"
                  >
                    <option value="1 (Bride)">1 (Bride)</option>
                    <option value="1 Bride + 3–5 Family Members">
                      1 Bride + 3–5 Family Members
                    </option>
                    <option value="2–5 Guests (Festive)">2–5 Guests (Festive)</option>
                    <option value="10–25 Guests (Sangeet)">10–25 Guests (Sangeet)</option>
                    <option value="25+ Guests (Large Event)">25+ Guests (Large Event)</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-notes"
                  className="block text-xs font-semibold text-[#201D1A] mb-1.5"
                >
                  Design Preferences or Special Notes (Optional)
                </label>
                <textarea
                  id="contact-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share arm coverage length (wrist, mid-arm, elbow) or preferred motifs..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/45 text-sm text-[#201D1A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-[#23382D] hover:bg-[#1a2b22] text-[#F8F2E8] font-semibold text-sm transition-colors cursor-pointer"
              >
                Prepare Booking Enquiry
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Contact Channels, Location & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#23382D] text-[#F8F2E8] border border-[#C69B55]/40 space-y-4">
            <div className="text-xs text-[#C69B55] font-medium uppercase tracking-wider">
              Fastest Response Channel
            </div>
            <h3 className="font-display text-2xl font-semibold">
              Direct WhatsApp & Phone Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#EADCC8]/85 leading-relaxed">
              Open our interactive WhatsApp builder to send your event date, location, and guest
              count in a single tap.
            </p>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenBookingModal({ ctaPosition: 'contact_sidebar' })
                }
                className="w-full py-3 px-4 rounded-lg bg-[#C69B55] hover:bg-[#d3a966] text-[#201D1A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp Enquiry Builder
              </button>

              {businessConfig.phoneNumber ? (
                <a
                  href={`tel:${businessConfig.phoneNumber}`}
                  onClick={() =>
                    trackEvent('phone_click', { page: 'contact', cta_position: 'contact_sidebar' })
                  }
                  className="w-full py-3 px-4 rounded-lg border border-[#C69B55]/50 text-[#F8F2E8] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C69B55]" />
                  Call {businessConfig.phoneNumber}
                </a>
              ) : (
                <div className="p-3.5 rounded-xl bg-[#F8F2E8]/10 border border-[#C69B55]/30 text-xs text-[#EADCC8] space-y-1.5">
                  <div className="font-semibold flex items-center gap-1.5 text-[#C69B55]">
                    <AlertCircle className="w-4 h-4" />
                    <span>Phone Number Pending Owner Verification</span>
                  </div>
                  <p className="opacity-85">
                    To prevent calls to unverified directory numbers, direct phone calling activates
                    once the owner confirms their number.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenOwnerConfig}
                    className="text-[#C69B55] underline font-semibold cursor-pointer"
                  >
                    Configure Verified Phone in Owner Settings →
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#EADCC8]/55 border border-[#C69B55]/35 space-y-4">
            <h3 className="font-display text-2xl font-semibold text-[#23382D]">
              Address & Operating Hours
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#201D1A]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A4935] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">{businessConfig.businessName}</div>
                  <div className="text-[#716961]">
                    {businessConfig.addressLine}, {businessConfig.city}, {businessConfig.state}{' '}
                    {businessConfig.postalCode}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#7A4935] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Business Hours</div>
                  <div className="text-[#716961]">{businessConfig.workingHours}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={buildGoogleMapsUrl(businessConfig)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('map_google_click', { page: 'contact', cta_position: 'contact_page' })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#23382D] text-[#F8F2E8] text-xs font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C69B55]" />
              </a>

              <a
                href={buildAppleMapsUrl(businessConfig)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('map_apple_click', { page: 'contact', cta_position: 'contact_page' })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#23382D]/40 text-[#201D1A] text-xs font-semibold"
              >
                <span>Open in Apple Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#7A4935]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 5. LEGAL PAGES (/privacy, /terms, /cookies) — TRD Sections 22, 23, 24
 * ========================================================================== */
interface LegalViewProps {
  page: 'privacy' | 'terms' | 'cookies';
  businessConfig: BusinessConfig;
  onNavigate: (page: PageRoute) => void;
  onOpenCookieBanner: () => void;
}

export const LegalView: React.FC<LegalViewProps> = ({
  page,
  businessConfig,
  onNavigate,
  onOpenCookieBanner,
}) => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#C69B55]/30 pb-4 text-xs sm:text-sm">
        {(
          [
            { label: 'Privacy Policy', id: 'privacy' },
            { label: 'Terms & Booking Guidelines', id: 'terms' },
            { label: 'Cookie Policy & Preferences', id: 'cookies' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
              page === tab.id
                ? 'bg-[#23382D] text-[#F8F2E8]'
                : 'bg-[#EADCC8]/60 text-[#201D1A] hover:bg-[#EADCC8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {page === 'privacy' && (
        <article className="space-y-6 text-sm text-[#201D1A] leading-relaxed">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#23382D]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#716961]">
            Effective for {businessConfig.businessName}, {businessConfig.city},{' '}
            {businessConfig.state}
          </p>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              1. Information Collected & Enquiry Handling
            </h2>
            <p className="text-[#716961]">
              When you use our appointment enquiry form or WhatsApp builder, you may enter your
              name, phone number, event date, locality in Bhubaneswar, and guest count. We do not
              require visitors to create user accounts or passwords.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              2. Analytics & Zero-PII Telemetry
            </h2>
            <p className="text-[#716961]">
              Interaction events (such as button clicks on WhatsApp CTAs, gallery filters, or Maps
              links) record only anonymous context such as service category and device type. Names,
              phone numbers, and custom enquiry messages are never transmitted to analytics
              processors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              3. Third-Party Redirection (WhatsApp & Maps)
            </h2>
            <p className="text-[#716961]">
              Clicking "Enquire via WhatsApp", "Open in Google Maps", or "Open in Apple Maps"
              redirects you to external services operated by Meta Platforms, Google LLC, or Apple
              Inc. Their respective privacy policies govern data processed on those platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              4. Data Retention, Security & Your Rights
            </h2>
            <p className="text-[#716961]">
              Enquiry details shared for booking coordination are used solely to confirm artist
              availability and deliver your requested mehndi service. You may request correction or
              deletion of your enquiry record at any time through our contact page.
            </p>
          </section>
        </article>
      )}

      {page === 'terms' && (
        <article className="space-y-6 text-sm text-[#201D1A] leading-relaxed">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#23382D]">
            Terms & Booking Guidelines
          </h1>
          <p className="text-xs text-[#716961]">
            Service terms for {businessConfig.businessName} ({businessConfig.city}) — Subject to
            final owner confirmation
          </p>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              1. Informational Purpose & Enquiry vs. Confirmed Booking
            </h2>
            <p className="text-[#716961]">
              Submitting an online enquiry or opening a WhatsApp conversation constitutes a booking
              request and does not automatically guarantee date reservation. A booking is confirmed
              only after the artist verifies date availability, agrees on tariff and scope, and
              confirms any applicable advance deposit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              2. Pricing, Deposits, Rescheduling & Travel Fees
            </h2>
            <p className="text-[#716961]">
              Final pricing depends on hand coverage length, intricacy of bridal motifs, and total
              guest count. For home or hotel venue appointments across Bhubaneswar, Cuttack, or
              Puri, applicable travel allowances and cancellation/rescheduling windows are shared in
              writing prior to booking confirmation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              3. Skin Sensitivity & Natural Henna Ingredients
            </h2>
            <p className="text-[#716961]">
              While we advocate 100% natural herbal henna mixed with essential oils (such as
              eucalyptus or clove), clients with known plant, citrus, or essential-oil sensitivities
              should inform the artist prior to application and request a small patch test.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#23382D]">
              4. Portfolio Photographs & Intellectual Property
            </h2>
            <p className="text-[#716961]">
              Photographs of completed hand designs may be taken for portfolio display only with the
              client’s explicit permission. All custom mehndi compositions and website content
              remain the intellectual property of their respective creators.
            </p>
          </section>
        </article>
      )}

      {page === 'cookies' && (
        <article className="space-y-6 text-sm text-[#201D1A] leading-relaxed">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#23382D]">
            Cookies & Consent Preferences
          </h1>
          <p className="text-[#716961]">
            We use essential local storage to remember your consent preferences and optional
            privacy-safe analytics to understand which mehndi categories visitors explore most.
            Optional analytics never load or record events without your consent.
          </p>
          <div>
            <button
              type="button"
              onClick={onOpenCookieBanner}
              className="px-5 py-2.5 rounded-lg bg-[#23382D] text-[#F8F2E8] text-xs font-semibold cursor-pointer"
            >
              Manage Cookie Consent Preferences
            </button>
          </div>
        </article>
      )}
    </div>
  );
};
