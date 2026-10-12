import React from 'react';
import {
  CookieConsentState,
  getCookieConsent,
  saveCookieConsent,
} from '../../utils/analyticsAndLinks';
import { Shield, X } from 'lucide-react';

interface CookieConsentBannerProps {
  forceOpen: boolean;
  onCloseForceOpen: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  forceOpen,
  onCloseForceOpen,
}) => {
  const [consent, setConsent] = React.useState<CookieConsentState>(() => getCookieConsent());
  const [showPreferences, setShowPreferences] = React.useState(false);

  // Per Frontend Design Constitution: No Arrival Popups before 10s dwell + user interaction intent
  const [dwellReady, setDwellReady] = React.useState(false);

  React.useEffect(() => {
    if (consent.decided) return;
    let timerDone = false;
    let interacted = false;

    const timer = window.setTimeout(() => {
      timerDone = true;
      if (interacted) setDwellReady(true);
    }, 10500);

    const onInteract = () => {
      interacted = true;
      if (timerDone) setDwellReady(true);
    };

    window.addEventListener('scroll', onInteract, { passive: true, once: true });
    window.addEventListener('pointerdown', onInteract, { passive: true, once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onInteract);
      window.removeEventListener('pointerdown', onInteract);
    };
  }, [consent.decided]);

  const isVisible = forceOpen || (!consent.decided && dwellReady);
  if (!isVisible) return null;

  const handleAcceptAll = () => {
    const next: CookieConsentState = {
      decided: true,
      necessary: true,
      analytics: true,
      marketing: false,
    };
    saveCookieConsent(next);
    setConsent(next);
    onCloseForceOpen();
  };

  const handleRejectNonEssential = () => {
    const next: CookieConsentState = {
      decided: true,
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveCookieConsent(next);
    setConsent(next);
    onCloseForceOpen();
  };

  const handleSaveCustom = () => {
    const next: CookieConsentState = {
      ...consent,
      decided: true,
      necessary: true,
    };
    saveCookieConsent(next);
    setConsent(next);
    setShowPreferences(false);
    onCloseForceOpen();
  };

  return (
    <div
      role="region"
      aria-label="Cookie and privacy consent"
      className="fixed bottom-16 md:bottom-5 right-4 left-4 md:left-auto md:max-w-md z-40 bg-[#F8F2E8] border border-[#C69B55]/60 rounded-2xl p-5 shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#23382D]">
          <Shield className="w-4 h-4 text-[#7A4935]" />
          <span>Cookie & Analytics Preferences</span>
        </div>
        {forceOpen && (
          <button
            type="button"
            aria-label="Close cookie preferences"
            onClick={onCloseForceOpen}
            className="text-[#716961] hover:text-[#201D1A] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-[#716961] leading-relaxed">
        We use essential storage for site functionality and optional anonymous analytics to improve
        our Bhubaneswar mehndi portfolio experience. No personal enquiry text is ever sent to
        analytics.
      </p>

      {showPreferences && (
        <div className="mt-3 pt-3 border-t border-[#EADCC8] space-y-2 text-xs">
          <label className="flex items-center justify-between">
            <span className="font-medium text-[#201D1A]">Necessary (Always Active)</span>
            <input type="checkbox" checked disabled className="accent-[#23382D]" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-medium text-[#201D1A]">Anonymous Event Analytics</span>
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
              className="accent-[#23382D]"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="font-medium text-[#201D1A]">Marketing Pixels</span>
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
              className="accent-[#23382D]"
            />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="px-3.5 py-2 rounded-lg bg-[#23382D] text-[#F8F2E8] text-xs font-semibold cursor-pointer"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={handleRejectNonEssential}
          className="px-3.5 py-2 rounded-lg border border-[#716961]/40 text-[#201D1A] text-xs font-medium cursor-pointer"
        >
          Reject Non-Essential
        </button>
        {showPreferences ? (
          <button
            type="button"
            onClick={handleSaveCustom}
            className="px-3.5 py-2 rounded-lg bg-[#C69B55] text-[#201D1A] text-xs font-semibold cursor-pointer"
          >
            Save Preferences
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowPreferences(true)}
            className="px-2.5 py-2 text-xs font-medium text-[#7A4935] underline cursor-pointer"
          >
            Preferences
          </button>
        )}
      </div>
    </div>
  );
};
