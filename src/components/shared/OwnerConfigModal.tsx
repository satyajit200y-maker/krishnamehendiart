import React from 'react';
import { BusinessConfig, INITIAL_BUSINESS_CONFIG } from '../../data/mehndiData';
import { X, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';

interface OwnerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  onUpdateConfig: (next: BusinessConfig) => void;
}

export const OwnerConfigModal: React.FC<OwnerConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [draft, setDraft] = React.useState<BusinessConfig>(config);
  const [savedNotice, setSavedNotice] = React.useState(false);

  React.useEffect(() => {
    setDraft(config);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(draft);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setDraft(INITIAL_BUSINESS_CONFIG);
    onUpdateConfig(INITIAL_BUSINESS_CONFIG);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-config-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201D1A]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#F8F2E8] border border-[#C69B55]/50 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close owner settings"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EADCC8] text-[#201D1A] hover:bg-[#23382D] hover:text-[#F8F2E8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#7A4935]">
          <ShieldAlert className="w-4 h-4" />
          <span>TRD Phase 1 — Business Verification Controls</span>
        </div>

        <h2
          id="owner-config-title"
          className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#23382D]"
        >
          Owner Verification & Placeholder Configurator
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-[#716961] leading-relaxed">
          Per the TRD data caution, the public listing currently shows the business as temporarily
          closed and lacks a verified phone number. Use this panel to test how the website behaves
          before and after owner verification.
        </p>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-[#EADCC8]/70 border border-[#C69B55]/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-[#201D1A]">
                Verified Operating Status
              </div>
              <div className="text-xs text-[#716961]">
                Toggle on once the owner confirms the studio is actively taking bookings
              </div>
            </div>
            <input
              type="checkbox"
              aria-label="Confirm business is currently operating"
              checked={draft.isVerifiedOperating}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  isVerifiedOperating: e.target.checked,
                  operatingStatusLabel: e.target.checked
                    ? 'Verified Operating · Accepting Bookings in Bhubaneswar'
                    : 'Listing Status: Verification Pending (Directory shows Temporarily Closed)',
                })
              }
              className="w-5 h-5 accent-[#23382D] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                Verified WhatsApp Number (with +91)
              </label>
              <input
                type="tel"
                placeholder="e.g., +919876543210 (Leave blank if unverified)"
                value={draft.whatsappNumber}
                onChange={(e) => setDraft({ ...draft, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                Verified Call Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g., +919876543210 (Leave blank if unverified)"
                value={draft.phoneNumber}
                onChange={(e) => setDraft({ ...draft, phoneNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#201D1A] mb-1">
              Verified Street Address (Bhubaneswar)
            </label>
            <input
              type="text"
              value={draft.addressLine}
              onChange={(e) => setDraft({ ...draft, addressLine: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#201D1A] mb-1">
              Operating Hours
            </label>
            <input
              type="text"
              value={draft.workingHours}
              onChange={(e) => setDraft({ ...draft, workingHours: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C69B55]/40 text-sm text-[#201D1A]"
            />
          </div>

          {savedNotice && (
            <div className="p-3 rounded-lg bg-[#287A4B]/15 border border-[#287A4B] text-[#287A4B] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Verification settings updated across all CTAs and location cards.
            </div>
          )}

          <div className="pt-4 border-t border-[#EADCC8] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#7A4935] hover:bg-[#EADCC8]/60 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Unverified Demo Defaults
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-[#716961]/30 text-xs font-medium text-[#201D1A] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#23382D] text-[#F8F2E8] text-xs font-semibold border border-[#C69B55]/40 hover:bg-[#1a2b22] cursor-pointer"
              >
                Apply Verification State
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
