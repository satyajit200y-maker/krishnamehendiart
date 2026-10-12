import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PageRoute,
  BusinessConfig,
  GalleryItem,
  DesignCategory,
  GALLERY_ITEMS,
  SERVICES_LIST,
  PACKAGE_TIERS,
  PROCESS_STEPS,
  FAQ_ITEMS,
  IMAGES,
  HERO_SLIDES,
} from '../data/mehndiData';
import {
  buildGoogleMapsUrl,
  buildAppleMapsUrl,
  trackEvent,
} from '../utils/analyticsAndLinks';
import {
  ArrowRight,
  MessageCircle,
  MapPin,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Check,
  Eye,
  X,
} from 'lucide-react';

interface HomeViewProps {
  businessConfig: BusinessConfig;
  onNavigate: (page: PageRoute) => void;
  onOpenBookingModal: (context?: {
    service?: string;
    designTitle?: string;
    ctaPosition?: string;
  }) => void;
  onSelectGalleryItem: (item: GalleryItem) => void;
  onOpenOwnerConfig: () => void;
  onDismissDisclosure?: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const HomeView: React.FC<HomeViewProps> = ({
  businessConfig,
  onNavigate,
  onOpenBookingModal,
  onSelectGalleryItem,
  onOpenOwnerConfig,
  onDismissDisclosure,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<DesignCategory>('All');
  const [openFaqId, setOpenFaqId] = React.useState<string | null>('faq-1');
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  const [isHeroPaused, setIsHeroPaused] = React.useState(false);
  const [bannerDismissed, setBannerDismissed] = React.useState(false);

  // Dynamic one-by-one background & showcase rotation
  React.useEffect(() => {
    if (isHeroPaused) return;
    const interval = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4800);
    return () => window.clearInterval(interval);
  }, [isHeroPaused]);

  const categories: DesignCategory[] = [
    'All',
    'Bridal',
    'Arabic',
    'Indian',
    'Minimal',
    'Jewellery',
    'Occasion',
  ];

  const filteredGallery = React.useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_ITEMS.slice(0, 6);
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="space-y-0">
      {/* Subtle Demo Verification Notice Banner (TRD Data Caution) */}
      {businessConfig.showDemoDisclosure && !bannerDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="bg-transparent backdrop-blur-md border-b border-[#C69B55]/30 px-4 py-2.5 text-xs text-[#201D1A] relative z-20"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-transparent">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#7A4935] shrink-0" />
              <span>
                <strong className="font-semibold text-[#23382D]">
                  {businessConfig.operatingStatusLabel}:
                </strong>{' '}
                Contact details, tariffs, and sample lookbook photography are configurable
                placeholders pending owner confirmation.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={onOpenOwnerConfig}
                className="text-[#7A4935] font-semibold underline hover:text-[#23382D] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Configure Verification Status →
              </button>
              <button
                type="button"
                aria-label="Close verification notice banner"
                onClick={() => {
                  setBannerDismissed(true);
                  onDismissDisclosure?.();
                }}
                className="inline-flex items-center justify-center w-6 h-6 rounded-md text-[#7A4935] hover:text-[#23382D] hover:bg-[#23382D]/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 1. DYNAMIC FULL-BLEED 18K HD HERO SECTION WITH ONE-BY-ONE BACKGROUND SLIDESHOW */}
      <section
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        className="relative min-h-[680px] lg:min-h-[760px] flex flex-col justify-between overflow-hidden bg-[#18261E] text-[#F8F2E8] border-b border-[#C69B55]/40"
      >
        {/* Dynamic Background Image Switcher (Changes One-by-One with Ken Burns scale) */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.25, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
          {/* Multi-layered editorial contrast scrims for guaranteed legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#142019]/95 via-[#18261E]/80 to-[#18261E]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142019]/95 via-transparent to-[#142019]/50" />
        </div>

        {/* Foreground Hero Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Line-by-Line Animated Editorial Typography */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT_EXPO }}
                className="text-xs sm:text-sm font-medium tracking-widest uppercase text-[#C69B55]"
              >
                <span>KRISHNA MEHNDI ARTIST</span>
                <span aria-hidden="true"> · </span>
                <span>
                  {businessConfig.city}, {businessConfig.state}
                </span>
              </motion.div>

              <div className="space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT_EXPO }}
                  className="font-display text-[42px] sm:text-[56px] lg:text-[72px] font-semibold text-[#F8F2E8] leading-[1.06] tracking-tight"
                >
                  Beautiful Mehndi,{' '}
                  <span className="italic font-normal text-[#C69B55]">
                    Made for Your Special Moments.
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: EASE_OUT_EXPO }}
                className="text-base sm:text-lg text-[#EADCC8]/90 leading-relaxed max-w-2xl"
              >
                Intricate Indian bridal storytelling, flowing shaded Arabic trails, symmetric palm
                mandalas, and delicate jewellery-style henna crafted with 100% natural herbal cones
                for weddings and celebrations across Bhubaneswar.
              </motion.p>

              {/* Primary & Secondary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.32, ease: EASE_OUT_EXPO }}
                className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    trackEvent('hero_book_click', { page: 'home', cta_position: 'hero_primary' });
                    onOpenBookingModal({
                      service: 'Bridal Mehndi (Full Hands & Feet)',
                      ctaPosition: 'hero_primary',
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#C69B55] hover:bg-[#d4ab66] text-[#201D1A] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-[#201D1A]" />
                  Book Appointment
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    trackEvent('view_gallery', { page: 'home', cta_position: 'hero_secondary' });
                    onNavigate('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-[#23382D]/80 hover:bg-[#23382D] text-[#F8F2E8] font-semibold text-sm sm:text-base border border-[#C69B55]/50 transition-colors whitespace-nowrap cursor-pointer backdrop-blur-sm"
                >
                  <span>View Designs</span>
                  <ArrowRight className="w-4 h-4 text-[#C69B55]" />
                </motion.button>
              </motion.div>

              {/* Dynamic Slide Control & Progress Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#C69B55]/25"
              >
                <div className="space-y-1">
                  <div className="text-xs text-[#C69B55] font-medium">
                    {currentSlide.category}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-medium text-[#F8F2E8]"
                    >
                      {currentSlide.title}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous background slide"
                    onClick={handlePrevSlide}
                    className="w-9 h-9 rounded-lg bg-[#23382D]/80 hover:bg-[#C69B55] text-[#F8F2E8] hover:text-[#201D1A] border border-[#C69B55]/40 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 px-2">
                    {HERO_SLIDES.map((slide, idx) => {
                      const isCurrent = idx === activeSlideIndex;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          aria-label={`View slide ${idx + 1}: ${slide.title}`}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            isCurrent ? 'w-7 bg-[#C69B55]' : 'w-2 bg-[#F8F2E8]/40 hover:bg-[#F8F2E8]/70'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    aria-label="Next background slide"
                    onClick={handleNextSlide}
                    className="w-9 h-9 rounded-lg bg-[#23382D]/80 hover:bg-[#C69B55] text-[#F8F2E8] hover:text-[#201D1A] border border-[#C69B55]/40 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Synchronized Interactive Spotlight Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.2, ease: EASE_OUT_EXPO }}
              className="lg:col-span-5"
            >
              <div className="relative h-[360px] sm:h-[440px] lg:h-full min-h-[360px] rounded-2xl overflow-hidden border border-[#C69B55]/60 bg-[#23382D] shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-[#F8F2E8]">
                  <div>
                    <div className="text-xs text-[#C69B55] font-medium">
                      Featured Frame {activeSlideIndex + 1} / {HERO_SLIDES.length}
                    </div>
                    <div className="font-display text-xl font-semibold">
                      {currentSlide.title}
                    </div>
                    <p className="text-xs text-[#EADCC8]/80 mt-0.5 line-clamp-1">
                      {currentSlide.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectGalleryItem(GALLERY_ITEMS[activeSlideIndex % GALLERY_ITEMS.length])
                    }
                    className="px-3.5 py-2 rounded-lg bg-[#23382D]/90 hover:bg-[#C69B55] text-xs font-semibold text-[#F8F2E8] hover:text-[#201D1A] border border-[#C69B55]/50 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    Inspect Detail
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-Width Studio Highlights Bar Below Hero Split */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: EASE_OUT_EXPO }}
            className="mt-10 pt-8 border-t border-[#C69B55]/30 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div>
              <div className="text-xs text-[#EADCC8]/75">Primary Service Area</div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#F8F2E8]">
                Bhubaneswar, Odisha
              </div>
              <div className="mt-0.5 text-xs text-[#C69B55]">
                Ashok Nagar · Unit-2 & On-Venue
              </div>
            </div>

            <div>
              <div className="text-xs text-[#EADCC8]/75">Signature Specialties</div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#F8F2E8]">
                6 Mehndi Traditions
              </div>
              <div className="mt-0.5 text-xs text-[#C69B55]">
                Bridal · Arabic · Indian · Khafif
              </div>
            </div>

            <div>
              <div className="text-xs text-[#EADCC8]/75">Henna Formulation</div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#F8F2E8]">
                100% Herbal Paste
              </div>
              <div className="mt-0.5 text-xs text-[#C69B55]">
                Zero PPD · Triple-Sifted Leaf
              </div>
            </div>

            <div>
              <div className="text-xs text-[#EADCC8]/75">Booking Channel</div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#F8F2E8]">
                Direct WhatsApp
              </div>
              <div className="mt-0.5 text-xs text-[#C69B55]">
                No Account or Login Needed
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PORTFOLIO / GALLERY SHOWCASE WITH INTERACTIVE FILTERS & STAGGERED ANIMATION */}
      <section id="designs" className="py-16 lg:py-24 bg-[#EADCC8]/45 border-b border-[#C69B55]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-medium text-[#7A4935] tracking-wide">
                <span>CURATED MEHNDI LOOKBOOK</span>
                <span aria-hidden="true"> · </span>
                <span>STYLE REFERENCE CATALOG</span>
              </div>
              <h2 className="font-display text-[32px] sm:text-[44px] font-semibold text-[#201D1A] leading-tight">
                Explore Mehndi Designs by Tradition
              </h2>
              <p className="text-sm sm:text-base text-[#716961]">
                Browse reference compositions across full-hand bridal, shaded Arabic vines,
                traditional mandalas, and modern jewellery henna. Click any photograph to inspect
                sitting time and motif details.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                trackEvent('view_gallery', { page: 'home', cta_position: 'section_header' });
                onNavigate('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#23382D] hover:text-[#7A4935] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Open Full Portfolio ({GALLERY_ITEMS.length} Designs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Interactive Filter Bar (Functional Segmented Buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
            role="tablist"
            aria-label="Filter mehndi designs by category"
            className="mt-8 flex items-center gap-1.5 p-1.5 bg-[#EADCC8] rounded-xl overflow-x-auto max-w-full border border-[#C69B55]/30"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    trackEvent('view_gallery', {
                      page: 'home',
                      design_category: cat,
                      cta_position: 'home_filter',
                    });
                  }}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#23382D] text-[#F8F2E8] shadow-sm'
                      : 'text-[#201D1A] hover:bg-[#F8F2E8]/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* Animated Staggered Gallery Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  trackEvent('gallery_image_open', {
                    page: 'home',
                    design_category: item.category,
                  });
                  onSelectGalleryItem(item);
                }}
                className="group bg-[#F8F2E8] rounded-2xl overflow-hidden border border-[#C69B55]/30 flex flex-col cursor-pointer transition-colors duration-200 hover:border-[#C69B55] shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#23382D]">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.category} mehndi design`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#F8F2E8]">
                    <span className="text-xs font-medium text-[#C69B55]">
                      {item.category} · {item.durationEstimate}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F8F2E8] group-hover:translate-x-0.5 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-[#C69B55]" />
                      View Design
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#201D1A] group-hover:text-[#23382D]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#716961] line-clamp-2">{item.description}</p>
                  </div>
                  <div className="pt-2 border-t border-[#EADCC8] flex items-center justify-between text-xs text-[#7A4935]">
                    <span>{item.coverage}</span>
                    <span className="font-semibold text-[#23382D] group-hover:translate-x-1 transition-transform">
                      Enquire →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICE CATEGORIES (Editorial Numbered List - TRD Section 2 & 3) */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-medium text-[#7A4935] tracking-wide">
              <span>MEHNDI SERVICES IN BHUBANESWAR</span>
              <span aria-hidden="true"> · </span>
              <span>BRIDAL & OCCASION SPECIALTIES</span>
            </div>
            <h2 className="font-display text-[32px] sm:text-[44px] font-semibold text-[#201D1A] leading-tight">
              Crafted for Weddings, Festivals & Intimate Celebrations
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              trackEvent('service_view', { page: 'home', cta_position: 'services_section' });
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#23382D] hover:text-[#7A4935] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Compare Sitting Times & Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.07, ease: EASE_OUT_EXPO }}
              whileHover={{ y: -4 }}
              className="bg-[#F8F2E8] border border-[#C69B55]/35 rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:border-[#C69B55] transition-colors shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7A4935] font-medium">
                  <span className="tabular-nums">
                    {service.index}. {service.category} Style
                  </span>
                  <span className="tabular-nums">{service.estimatedTime}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-[#23382D]">
                  {service.index}. {service.name}
                </h3>

                <p className="text-sm text-[#716961] leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="pt-2 text-xs text-[#201D1A] space-y-1">
                  <div>
                    <span className="text-[#716961]">Coverage: </span>
                    <span className="font-medium">{service.coverageScope}</span>
                  </div>
                  <div>
                    <span className="text-[#716961]">Ideal For: </span>
                    <span className="font-medium">{service.idealFor}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADCC8] flex items-center justify-between gap-3">
                <span className="text-xs text-[#7A4935] font-medium">{service.priceStatus}</span>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('service_enquiry', {
                      service: service.name,
                      page: 'home',
                      cta_position: 'service_card',
                    });
                    onOpenBookingModal({
                      service: service.name,
                      ctaPosition: 'service_card',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#23382D] hover:bg-[#1a2b22] text-[#F8F2E8] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C69B55]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. BRIDAL SHOWCASE SECTION (TRD Section 3.5) */}
      <section className="py-16 lg:py-24 bg-[#23382D] text-[#F8F2E8] border-y border-[#C69B55]/35 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="text-xs font-medium text-[#C69B55] tracking-wide">
                <span>BESPOKE BRIDAL MEHNDI STUDIO</span>
                <span aria-hidden="true"> · </span>
                <span>BHUBANESWAR & ODISHA WEDDINGS</span>
              </div>

              <h2 className="font-display text-[34px] sm:text-[48px] font-semibold text-[#F8F2E8] leading-tight">
                Heirloom Bridal Henna Tailored to Your Wedding Story
              </h2>

              <p className="text-sm sm:text-base text-[#EADCC8]/90 leading-relaxed">
                Bridal mehndi is more than ornament—it is an intimate pre-wedding ritual. Every
                bridal commission balances fine symmetrical mandalas, lotus and peacock motifs,
                custom couple initials, and breathable jaali work so your hands photograph
                beautifully from the Haldi through the reception.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F8F2E8]/5 border border-[#C69B55]/25">
                  <div className="font-display text-lg font-semibold text-[#C69B55]">
                    Custom Motif Integration
                  </div>
                  <p className="mt-1 text-xs text-[#EADCC8]/80 leading-relaxed">
                    Incorporate wedding dates, couple initials, temple architecture, or classic
                    varmala silhouettes seamlessly into palm and forearm layouts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F2E8]/5 border border-[#C69B55]/25">
                  <div className="font-display text-lg font-semibold text-[#C69B55]">
                    Deep Maroon Stain Science
                  </div>
                  <p className="mt-1 text-xs text-[#EADCC8]/80 leading-relaxed">
                    Prepared with triple-sifted Sojat henna and pure eucalyptus-clove essential oil
                    blends for rich, natural 48-hour stain maturity.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('whatsapp_click', {
                      service: 'Bridal Mehndi',
                      page: 'home',
                      cta_position: 'bridal_showcase',
                    });
                    onOpenBookingModal({
                      service: 'Bridal Mehndi (Full Hands & Feet)',
                      ctaPosition: 'bridal_showcase',
                    });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C69B55] hover:bg-[#d3a966] text-[#201D1A] font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Request Bridal Consultation
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#C69B55]/45 text-[#F8F2E8] hover:bg-[#F8F2E8]/10 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Browse Bridal Gallery
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT_EXPO }}
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="rounded-2xl overflow-hidden border border-[#C69B55]/35 aspect-[3/4]">
                <img
                  src={IMAGES.bridalHero}
                  alt="Full hand bridal mehndi palm and forearm detail"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4 flex flex-col justify-between">
                <div className="rounded-2xl overflow-hidden border border-[#C69B55]/35 aspect-[4/3]">
                  <img
                    src={IMAGES.indianMandala}
                    alt="Symmetric peacock and lotus mandala palm mehndi"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#C69B55]/35 aspect-[4/3]">
                  <img
                    src={IMAGES.sangeetFestiveHands}
                    alt="Festive lotus and marigold sangeet mehndi on hands"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US & ABOUT THE ARTIST PREVIEW */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl overflow-hidden border border-[#C69B55]/40 aspect-[4/3] bg-[#23382D]">
              <img
                src={IMAGES.sangeetFestiveHands}
                alt="Symmetric lotus and floral mehndi stain on hands"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="text-xs font-medium text-[#7A4935] tracking-wide">
              <span>ARTISANAL CRAFTSMANSHIP</span>
              <span aria-hidden="true"> · </span>
              <span>WHY CHOOSE KRISHNA MEHNDI ARTIST</span>
            </div>

            <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#201D1A] leading-tight">
              Calm, Unhurried Artistry with Pure Herbal Henna Cones
            </h2>

            <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
              Every celebration deserves clean linework, skin-safe ingredients, and punctual
              scheduling. Rather than rushing through mass-produced stencils, each design is drawn
              freehand to flatter the natural proportions of your hands and wrists.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#EADCC8]/50 border border-[#C69B55]/30">
                <div className="font-semibold text-sm text-[#23382D]">
                  100% Chemical-Free Herbal Paste
                </div>
                <p className="mt-1 text-xs text-[#716961]">
                  Freshly mixed organic henna cones free from synthetic dyes, ammonia, or PPD.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EADCC8]/50 border border-[#C69B55]/30">
                <div className="font-semibold text-sm text-[#23382D]">
                  Bespoke Bridal & Festival Designs
                </div>
                <p className="mt-1 text-xs text-[#716961]">
                  From full Kalinga & Rajasthani bridal work to airy Arabic and jewellery-style
                  trails.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EADCC8]/50 border border-[#C69B55]/30">
                <div className="font-semibold text-sm text-[#23382D]">
                  On-Venue Comfort in Bhubaneswar
                </div>
                <p className="mt-1 text-xs text-[#716961]">
                  Home and wedding-venue appointments across Bhubaneswar so brides can relax with
                  family.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EADCC8]/50 border border-[#C69B55]/30">
                <div className="font-semibold text-sm text-[#23382D]">
                  Transparent Verification Standards
                </div>
                <p className="mt-1 text-xs text-[#716961]">
                  Clear scope, sitting duration estimates, and written WhatsApp confirmation before
                  every event.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#23382D] hover:text-[#7A4935] cursor-pointer"
              >
                <span>Read More About Our Studio Approach & Hygiene Standards</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. PACKAGES / STARTING PRICES (Configurable Placeholders per TRD Data Caution) */}
      <section className="py-16 lg:py-24 bg-[#EADCC8]/45 border-y border-[#C69B55]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="max-w-2xl space-y-2"
          >
            <div className="text-xs font-medium text-[#7A4935] tracking-wide">
              <span>PACKAGES & CONSULTATION TARIFFS</span>
              <span aria-hidden="true"> · </span>
              <span>OWNER CONFIRMATION POLICY</span>
            </div>
            <h2 className="font-display text-[32px] sm:text-[44px] font-semibold text-[#201D1A] leading-tight">
              Flexible Booking Formats for Brides, Families & Guests
            </h2>
            <p className="text-sm sm:text-base text-[#716961]">
              Mehndi pricing depends on hand coverage length, motif density, and total guest count.
              Exact tariff figures remain configurable placeholders until confirmed by the owner.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PACKAGE_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: EASE_OUT_EXPO }}
                whileHover={{ y: -5 }}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border ${
                  tier.highlighted
                    ? 'bg-[#23382D] text-[#F8F2E8] border-[#C69B55] shadow-lg'
                    : 'bg-[#F8F2E8] text-[#201D1A] border-[#C69B55]/35'
                }`}
              >
                <div className="space-y-4">
                  <div
                    className={`text-xs font-medium ${
                      tier.highlighted ? 'text-[#C69B55]' : 'text-[#7A4935]'
                    }`}
                  >
                    {tier.duration} · {tier.verificationNote}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold">{tier.name}</h3>

                  <p
                    className={`text-xs sm:text-sm ${
                      tier.highlighted ? 'text-[#EADCC8]/85' : 'text-[#716961]'
                    }`}
                  >
                    {tier.subtitle}
                  </p>

                  <div
                    className={`py-3 border-y ${
                      tier.highlighted ? 'border-[#C69B55]/30' : 'border-[#EADCC8]'
                    }`}
                  >
                    <div className="text-xs opacity-75">Tariff Status</div>
                    <div className="font-display text-xl sm:text-2xl font-semibold mt-0.5">
                      {tier.priceLabel}
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm pt-1">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            tier.highlighted ? 'text-[#C69B55]' : 'text-[#23382D]'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('pricing_view', {
                        service: tier.name,
                        page: 'home',
                        cta_position: 'package_card',
                      });
                      onOpenBookingModal({
                        service: tier.name,
                        ctaPosition: 'package_card',
                      });
                    }}
                    className={`w-full py-3.5 px-5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      tier.highlighted
                        ? 'bg-[#C69B55] hover:bg-[#d3a966] text-[#201D1A]'
                        : 'bg-[#23382D] hover:bg-[#1a2b22] text-[#F8F2E8]'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Request {tier.name} Quote
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW THE BOOKING & APPLICATION PROCESS WORKS (TRD Section 3.10) */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="max-w-2xl space-y-2"
        >
          <div className="text-xs font-medium text-[#7A4935] tracking-wide">
            <span>SIMPLE 4-STEP JOURNEY</span>
            <span aria-hidden="true"> · </span>
            <span>FROM ENQUIRY TO DEEP MAROON STAIN</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[44px] font-semibold text-[#201D1A] leading-tight">
            How Your Mehndi Appointment Works
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#F8F2E8] border border-[#C69B55]/35 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="font-display text-3xl font-semibold text-[#7A4935] tabular-nums">
                  {item.step}.
                </div>
                <h3 className="font-display text-xl font-semibold text-[#23382D]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#716961] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. CLIENT REVIEWS & VERIFICATION HONESTY SECTION (TRD Section 21 & 33) */}
      <section className="py-16 lg:py-20 bg-[#EADCC8]/50 border-y border-[#C69B55]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="max-w-3xl space-y-3"
          >
            <div className="text-xs font-medium text-[#7A4935] tracking-wide">
              <span>CLIENT REVIEWS & TESTIMONIAL INTEGRITY</span>
              <span aria-hidden="true"> · </span>
              <span>ZERO FABRICATED RATINGS POLICY</span>
            </div>
            <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#201D1A] leading-tight">
              Verified Client Testimonials & Brides’ Feedback
            </h2>
            <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
              In strict compliance with our studio verification policy, we never display fabricated
              star ratings or synthetic customer reviews. Confirmed testimonials from Bhubaneswar
              brides and event hosts are published here only after direct owner verification.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                slot: 'Verification Slot 01',
                category: 'Bridal Mehndi · Bhubaneswar',
                placeholderText:
                  'Reserved for verified bridal client feedback confirming stain richness, sitting comfort, and design customization.',
              },
              {
                slot: 'Verification Slot 02',
                category: 'Engagement & Arabic Mehndi',
                placeholderText:
                  'Reserved for verified engagement or Roka client feedback from Ashok Nagar / Saheed Nagar bookings.',
              },
              {
                slot: 'Verification Slot 03',
                category: 'Sangeet & Festive Group Booking',
                placeholderText:
                  'Reserved for verified family host review regarding group guest turnaround and punctuality.',
              },
            ].map((card, idx) => (
              <motion.div
                key={card.slot}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                className="p-6 rounded-2xl bg-[#F8F2E8] border border-[#C69B55]/35 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="text-xs font-medium text-[#7A4935]">{card.category}</div>
                  <div className="font-display text-lg font-semibold text-[#23382D]">
                    {card.slot} — Awaiting Owner Import
                  </div>
                  <p className="text-xs text-[#716961] leading-relaxed">{card.placeholderText}</p>
                </div>
                <div className="pt-3 border-t border-[#EADCC8] text-xs text-[#716961] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C69B55]" />
                  <span>Authentic Google Profile review sync pending</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (TRD Section 3.12) */}
      <section className="py-16 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="text-center space-y-2"
        >
          <div className="text-xs font-medium text-[#7A4935] tracking-wide">
            <span>BRIDAL & HENNA CARE FAQ</span>
            <span aria-hidden="true"> · </span>
            <span>BHUBANESWAR BOOKING GUIDE</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[44px] font-semibold text-[#201D1A]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: EASE_OUT_EXPO }}
                className="rounded-xl bg-[#F8F2E8] border border-[#C69B55]/35 overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    const next = isOpen ? null : faq.id;
                    setOpenFaqId(next);
                    if (next) {
                      trackEvent('faq_open', { page: 'home', service: faq.question });
                    }
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EADCC8]/35 transition-colors"
                >
                  <span className="font-display text-lg sm:text-xl font-semibold text-[#201D1A]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7A4935] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-5 pt-2 text-sm text-[#716961] leading-relaxed border-t border-[#EADCC8]/70"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 10. LOCATION & SERVICE AREA IN BHUBANESWAR (TRD Section 14, 15, 16) */}
      <section className="py-16 lg:py-24 bg-[#EADCC8]/45 border-t border-[#C69B55]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="lg:col-span-6 space-y-5 flex flex-col justify-center"
            >
              <div className="text-xs font-medium text-[#7A4935] tracking-wide">
                <span>STUDIO LOCATION & SERVICE AREAS</span>
                <span aria-hidden="true"> · </span>
                <span>BHUBANESWAR, ODISHA</span>
              </div>

              <h2 className="font-display text-[32px] sm:text-[42px] font-semibold text-[#201D1A] leading-tight">
                Serving Brides & Celebrations Across Bhubaneswar
              </h2>

              <p className="text-sm sm:text-base text-[#716961] leading-relaxed">
                Located in the heart of Bhubaneswar near Unit-2 / Ashok Nagar, with on-location
                bridal and sangeet appointments available across major residential neighborhoods and
                wedding venues upon confirmation.
              </p>

              <div className="p-5 rounded-2xl bg-[#F8F2E8] border border-[#C69B55]/40 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#7A4935] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-[#201D1A]">
                      {businessConfig.businessName}
                    </div>
                    <div className="text-xs sm:text-sm text-[#716961] mt-0.5">
                      {businessConfig.addressLine}, {businessConfig.city}, {businessConfig.state}{' '}
                      {businessConfig.postalCode}
                    </div>
                    <div className="text-xs text-[#7A4935] mt-1">{businessConfig.landmarkNote}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#EADCC8]">
                  <Clock className="w-5 h-5 text-[#7A4935] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#716961]">
                    <strong className="text-[#201D1A] font-semibold">Hours:</strong>{' '}
                    {businessConfig.workingHours}
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={buildGoogleMapsUrl(businessConfig)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('map_google_click', { page: 'home', cta_position: 'location_card' })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#23382D] text-[#F8F2E8] text-xs font-semibold hover:bg-[#1a2b22] transition-colors whitespace-nowrap"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#C69B55]" />
                  </a>

                  <a
                    href={buildAppleMapsUrl(businessConfig)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('map_apple_click', { page: 'home', cta_position: 'location_card' })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#23382D]/35 text-[#201D1A] text-xs font-semibold hover:bg-[#EADCC8] transition-colors whitespace-nowrap"
                  >
                    <span>Open in Apple Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#7A4935]" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Neighbourhoods & Local SEO Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
              className="lg:col-span-6 bg-[#F8F2E8] border border-[#C69B55]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#7A4935]">
                  Bhubaneswar Neighbourhoods & Venue Coverage
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#23382D]">
                  On-Location Bridal & Sangeet Service Areas
                </h3>
                <p className="text-xs sm:text-sm text-[#716961] leading-relaxed">
                  Subject to artist schedule confirmation, home and wedding-hotel visits can be
                  requested for the following areas in and around Bhubaneswar:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {businessConfig.serviceAreas.map((area) => (
                    <div
                      key={area}
                      className="px-3.5 py-2.5 rounded-lg bg-[#EADCC8]/55 text-xs font-medium text-[#201D1A] flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#23382D] shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#716961]">
                  Planning a wedding outside Bhubaneswar? Enquire for travel feasibility.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#23382D] hover:text-[#7A4935] whitespace-nowrap cursor-pointer"
                >
                  Open Full Contact Page →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. FINAL BOOKING CTA BANNER */}
      <section className="py-16 lg:py-20 bg-[#23382D] text-[#F8F2E8] border-t border-[#C69B55]/30">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <div className="text-xs font-medium text-[#C69B55] tracking-widest uppercase">
            Reserve Your Wedding or Festive Date
          </div>
          <h2 className="font-display text-[34px] sm:text-[48px] font-semibold text-[#F8F2E8] leading-tight">
            Ready to Plan Your Mehndi Design?
          </h2>
          <p className="text-sm sm:text-base text-[#EADCC8]/85 max-w-2xl mx-auto leading-relaxed">
            Share your event date, Bhubaneswar location, and preferred mehndi style on WhatsApp or
            through our appointment enquiry form to check availability.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                trackEvent('whatsapp_click', { page: 'home', cta_position: 'bottom_cta' });
                onOpenBookingModal({ ctaPosition: 'bottom_cta' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-[#C69B55] hover:bg-[#d3a966] text-[#201D1A] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Enquire via WhatsApp
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[#C69B55]/50 hover:bg-[#F8F2E8]/10 text-[#F8F2E8] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer"
            >
              Use Online Enquiry Form
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
