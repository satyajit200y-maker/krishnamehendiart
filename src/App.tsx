/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PageRoute,
  BusinessConfig,
  INITIAL_BUSINESS_CONFIG,
  GalleryItem,
} from './data/mehndiData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './views/HomeView';
import {
  GalleryView,
  ServicesView,
  AboutView,
  ContactView,
  LegalView,
} from './views/InnerViews';
import { ImageViewerModal } from './components/shared/ImageViewerModal';
import { BookingModal } from './components/shared/BookingModal';
import { OwnerConfigModal } from './components/shared/OwnerConfigModal';
import { StickyMobileBar } from './components/shared/StickyMobileBar';
import { CookieConsentBanner } from './components/shared/CookieConsentBanner';
import { trackEvent } from './utils/analyticsAndLinks';

const BUSINESS_CONFIG_STORAGE_KEY = 'krishna_mehndi_business_config_v1';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<PageRoute>('home');
  const [businessConfig, setBusinessConfig] = React.useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(BUSINESS_CONFIG_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_CONFIG;
    } catch {
      return INITIAL_BUSINESS_CONFIG;
    }
  });

  const [selectedGalleryItem, setSelectedGalleryItem] = React.useState<GalleryItem | null>(null);
  const [bookingModalState, setBookingModalState] = React.useState<{
    isOpen: boolean;
    service?: string;
    designTitle?: string;
    ctaPosition?: string;
  }>({ isOpen: false });

  const [ownerConfigOpen, setOwnerConfigOpen] = React.useState(false);
  const [forceCookieBanner, setForceCookieBanner] = React.useState(false);

  // Sync dynamic document title & canonical metadata per route (TRD Section 17)
  React.useEffect(() => {
    const titles: Record<PageRoute, string> = {
      home: 'Krishna Mehndi Artist Bhubaneswar | Bridal & Occasion Mehndi',
      gallery: 'Mehndi Design Portfolio | Krishna Mehndi Artist Bhubaneswar',
      services: 'Bridal, Arabic & Occasion Mehndi Services | Bhubaneswar',
      about: 'About Krishna Mehndi Artist | Natural Herbal Henna Studio Bhubaneswar',
      contact: 'Book Mehndi Appointment in Bhubaneswar | Krishna Mehndi Artist',
      privacy: 'Privacy Policy | Krishna Mehndi Artist Bhubaneswar',
      terms: 'Terms & Booking Guidelines | Krishna Mehndi Artist Bhubaneswar',
      cookies: 'Cookies & Consent Policy | Krishna Mehndi Artist Bhubaneswar',
    };
    document.title = titles[currentPage];
    trackEvent('page_view', { page: currentPage });
  }, [currentPage]);

  const handleUpdateBusinessConfig = (next: BusinessConfig) => {
    setBusinessConfig(next);
    try {
      localStorage.setItem(BUSINESS_CONFIG_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const handleOpenBookingModal = (context?: {
    service?: string;
    designTitle?: string;
    ctaPosition?: string;
  }) => {
    setBookingModalState({
      isOpen: true,
      service: context?.service || 'Bridal Mehndi (Full Hands & Feet)',
      designTitle: context?.designTitle || '',
      ctaPosition: context?.ctaPosition || 'page_cta',
    });
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F8F2E8] text-[#201D1A]">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenBookingModal={handleOpenBookingModal}
        businessConfig={businessConfig}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === 'home' && (
              <HomeView
                businessConfig={businessConfig}
                onNavigate={setCurrentPage}
                onOpenBookingModal={handleOpenBookingModal}
                onSelectGalleryItem={setSelectedGalleryItem}
                onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
                onDismissDisclosure={() =>
                  handleUpdateBusinessConfig({ ...businessConfig, showDemoDisclosure: false })
                }
              />
            )}

            {currentPage === 'gallery' && (
              <GalleryView
                onSelectGalleryItem={setSelectedGalleryItem}
                onOpenBookingModal={handleOpenBookingModal}
              />
            )}

            {currentPage === 'services' && (
              <ServicesView onOpenBookingModal={handleOpenBookingModal} />
            )}

            {currentPage === 'about' && (
              <AboutView
                businessConfig={businessConfig}
                onOpenBookingModal={handleOpenBookingModal}
                onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
              />
            )}

            {currentPage === 'contact' && (
              <ContactView
                businessConfig={businessConfig}
                onOpenBookingModal={handleOpenBookingModal}
                onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
              />
            )}

            {(currentPage === 'privacy' ||
              currentPage === 'terms' ||
              currentPage === 'cookies') && (
              <LegalView
                page={currentPage}
                businessConfig={businessConfig}
                onNavigate={setCurrentPage}
                onOpenCookieBanner={() => setForceCookieBanner(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenBookingModal={handleOpenBookingModal}
        onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
        businessConfig={businessConfig}
      />

      {/* Sticky Mobile Conversion Bar (under 15% mobile viewport height cap) */}
      <StickyMobileBar
        currentPage={currentPage}
        businessConfig={businessConfig}
        onOpenBookingModal={handleOpenBookingModal}
        onNavigate={setCurrentPage}
      />

      {/* High-Resolution Portfolio Lightbox */}
      <ImageViewerModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        onEnquireDesign={(item) => {
          setSelectedGalleryItem(null);
          handleOpenBookingModal({
            service: `${item.category} Mehndi`,
            designTitle: item.title,
            ctaPosition: 'lightbox_modal',
          });
        }}
      />

      {/* Pre-filled WhatsApp Enquiry Builder Modal */}
      <BookingModal
        isOpen={bookingModalState.isOpen}
        onClose={() => setBookingModalState({ isOpen: false })}
        businessConfig={businessConfig}
        initialService={bookingModalState.service}
        initialDesignTitle={bookingModalState.designTitle}
        ctaPosition={bookingModalState.ctaPosition}
        onOpenOwnerConfig={() => setOwnerConfigOpen(true)}
      />

      {/* TRD Phase 1 Owner Verification & Placeholder Settings */}
      <OwnerConfigModal
        isOpen={ownerConfigOpen}
        onClose={() => setOwnerConfigOpen(false)}
        config={businessConfig}
        onUpdateConfig={handleUpdateBusinessConfig}
      />

      {/* Non-intrusive Cookie & Analytics Consent */}
      <CookieConsentBanner
        forceOpen={forceCookieBanner}
        onCloseForceOpen={() => setForceCookieBanner(false)}
      />
    </div>
  );
}

