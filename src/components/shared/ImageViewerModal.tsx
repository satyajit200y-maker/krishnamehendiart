import React from 'react';
import { GalleryItem } from '../../data/mehndiData';
import { X, MessageCircle, Clock, Layers } from 'lucide-react';

interface ImageViewerModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onEnquireDesign: (item: GalleryItem) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  item,
  onClose,
  onEnquireDesign,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-design-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#201D1A]/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#F8F2E8] border border-[#C69B55]/40 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close design viewer"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[#201D1A]/75 text-[#F8F2E8] hover:bg-[#23382D] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Column */}
        <div className="md:col-span-7 bg-[#201D1A] flex items-center justify-center overflow-hidden max-h-[50vh] md:max-h-[85vh]">
          <img
            src={item.image}
            alt={`${item.title} - ${item.category} mehndi design in Bhubaneswar`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Column */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="text-xs font-medium text-[#7A4935] tracking-wide">
              <span>{item.category} Mehndi</span>
              <span aria-hidden="true"> · </span>
              <span>Sample Lookbook Reference</span>
            </div>

            <h2
              id="lightbox-design-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#201D1A]"
            >
              {item.title}
            </h2>

            <p className="text-sm text-[#716961] leading-relaxed">{item.description}</p>

            <div className="pt-3 border-t border-[#EADCC8] space-y-2.5 text-xs text-[#201D1A]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#7A4935] shrink-0" />
                <span>
                  <strong className="font-semibold">Coverage:</strong> {item.coverage}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7A4935] shrink-0" />
                <span className="tabular-nums">
                  <strong className="font-semibold">Estimated Sitting Time:</strong>{' '}
                  {item.durationEstimate}
                </span>
              </div>
              <div className="text-[#716961] pt-1">
                <strong className="text-[#201D1A] font-semibold">Key Motifs:</strong>{' '}
                {item.motifDetails}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#EADCC8] space-y-3">
            <p className="text-xs text-[#716961]">
              Note: Reference portfolio imagery is shown for style selection until the artist’s
              verified client gallery is uploaded.
            </p>
            <button
              type="button"
              onClick={() => onEnquireDesign(item)}
              className="w-full py-3 px-4 rounded-lg bg-[#23382D] hover:bg-[#1a2b22] text-[#F8F2E8] font-semibold text-sm flex items-center justify-center gap-2 border border-[#C69B55]/40 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#C69B55]" />
              Enquire About This Design on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
