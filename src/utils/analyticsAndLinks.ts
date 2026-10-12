import { BusinessConfig } from '../data/mehndiData';

export type AnalyticsEventName =
  | 'page_view'
  | 'hero_book_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'view_gallery'
  | 'gallery_image_open'
  | 'service_view'
  | 'service_enquiry'
  | 'pricing_view'
  | 'booking_start'
  | 'booking_submit'
  | 'booking_success'
  | 'map_google_click'
  | 'map_apple_click'
  | 'instagram_click'
  | 'faq_open';

export interface AnalyticsProperties {
  service?: string;
  page?: string;
  cta_position?: string;
  device_type?: 'mobile' | 'tablet' | 'desktop';
  design_category?: string;
}

export interface CookieConsentState {
  decided: boolean;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt?: string;
}

const CONSENT_STORAGE_KEY = 'krishna_mehndi_cookie_consent_v1';

export function getCookieConsent(): CookieConsentState {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return { decided: false, necessary: true, analytics: false, marketing: false };
    }
    return JSON.parse(raw);
  } catch {
    return { decided: false, necessary: true, analytics: false, marketing: false };
  }
}

export function saveCookieConsent(consent: CookieConsentState): void {
  try {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ ...consent, necessary: true, updatedAt: new Date().toISOString() })
    );
  } catch {
    // ignore storage errors in restricted environments
  }
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Privacy-safe analytics event dispatcher.
 * Never transmits PII (names, phone numbers, or custom enquiry text).
 * Respects cookie consent state before dispatching optional analytics.
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  props: Omit<AnalyticsProperties, 'device_type'> = {}
): void {
  const consent = getCookieConsent();
  const payload: AnalyticsProperties = {
    ...props,
    device_type: getDeviceType(),
  };

  // Dispatch custom DOM event for consent-approved analytics listeners
  if (typeof window !== 'undefined' && consent.analytics) {
    window.dispatchEvent(
      new CustomEvent('kma_analytics_event', {
        detail: { eventName, payload, timestamp: Date.now() },
      })
    );
  }
}

export interface WhatsAppEnquiryParams {
  event?: string;
  date?: string;
  location?: string;
  peopleCount?: string;
  serviceName?: string;
  designTitle?: string;
}

/**
 * Generates the exact TRD pre-filled WhatsApp enquiry message.
 */
export function buildWhatsAppMessage(params: WhatsAppEnquiryParams = {}): string {
  const eventLine = params.event || params.serviceName || '';
  const dateLine = params.date || '';
  const locationLine = params.location || 'Bhubaneswar';
  const peopleLine = params.peopleCount || '';
  const designNote = params.designTitle ? `\nSelected Reference Design: ${params.designTitle}` : '';

  return `Hi Krishna Mehndi Artist,

I found your website and would like to enquire about a mehndi booking.

Event: ${eventLine}
Date: ${dateLine}
Location: ${locationLine}
Number of people: ${peopleLine}${designNote}

Could you please share availability and pricing?`;
}

export function buildWhatsAppUrl(phone: string, params: WhatsAppEnquiryParams = {}): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(buildWhatsAppMessage(params));
  if (!cleanPhone) {
    return `https://wa.me/?text=${encodedText}`;
  }
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}

export function buildGoogleMapsUrl(config: BusinessConfig): string {
  const query = encodeURIComponent(
    `${config.businessName}, ${config.addressLine}, ${config.city}, ${config.state} ${config.postalCode}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function buildAppleMapsUrl(config: BusinessConfig): string {
  const address = encodeURIComponent(
    `${config.addressLine}, ${config.city}, ${config.state} ${config.postalCode}, India`
  );
  return `https://maps.apple.com/?ll=${config.coordinates.lat},${config.coordinates.lng}&q=${address}`;
}
