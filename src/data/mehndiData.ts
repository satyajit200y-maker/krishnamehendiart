export type PageRoute =
  | 'home'
  | 'gallery'
  | 'services'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cookies';

export type DesignCategory =
  | 'All'
  | 'Bridal'
  | 'Arabic'
  | 'Indian'
  | 'Minimal'
  | 'Jewellery'
  | 'Occasion';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<DesignCategory, 'All'>;
  subtitle: string;
  coverage: string;
  durationEstimate: string;
  image: string;
  description: string;
  motifDetails: string;
  isDemoSample: boolean;
}

export interface ServiceItem {
  id: string;
  index: string;
  name: string;
  category: Exclude<DesignCategory, 'All'>;
  shortDescription: string;
  detailedDescription: string;
  estimatedTime: string;
  coverageScope: string;
  priceStatus: string;
  sampleStartingRange: string;
  idealFor: string;
  image: string;
}

export interface PackageTier {
  id: string;
  name: string;
  subtitle: string;
  coverage: string;
  duration: string;
  priceLabel: string;
  verificationNote: string;
  features: string[];
  highlighted?: boolean;
}

export interface BusinessConfig {
  businessName: string;
  city: string;
  state: string;
  postalCode: string;
  addressLine: string;
  landmarkNote: string;
  isVerifiedOperating: boolean;
  operatingStatusLabel: string;
  whatsappNumber: string; // Empty or placeholder until owner confirms
  phoneNumber: string; // Empty or placeholder until owner confirms
  workingHours: string;
  serviceAreas: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  showDemoDisclosure: boolean;
}

export const INITIAL_BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'Krishna Mehndi Artist',
  city: 'Bhubaneswar',
  state: 'Odisha',
  postalCode: '751009',
  addressLine: 'Unit-2 / Ashok Nagar',
  landmarkNote: 'Directory listing shows Unit-2 / Ashok Nagar, Bhubaneswar 751009 (Pending final owner confirmation)',
  isVerifiedOperating: false,
  operatingStatusLabel: 'Listing Status: Verification Pending (Directory shows Temporarily Closed)',
  whatsappNumber: '',
  phoneNumber: '',
  workingHours: 'By Appointment · 9:00 AM – 8:00 PM (Subject to Owner Confirmation)',
  serviceAreas: [
    'Ashok Nagar & Unit-2',
    'Saheed Nagar',
    'Jaydev Vihar',
    'Patia & Chandrasekharpur',
    'Khandagiri & Old Town',
    'Cuttack & Puri (On-location Bridal by Confirmation)'
  ],
  coordinates: {
    lat: 20.2647,
    lng: 85.8394,
  },
  showDemoDisclosure: true,
};

import bridalHeroImg from '@/src/assets/images/bridal_full_hand_hero_1791805266606.jpg';
import arabicBackhandImg from '@/src/assets/images/arabic_floral_backhand_1791805284711.jpg';
import indianMandalaImg from '@/src/assets/images/indian_mandala_palm_1791805297116.jpg';
import jewelleryKhafifImg from '@/src/assets/images/jewellery_khafif_mehndi_1791805308897.jpg';
import sangeetFestiveHandsImg from '@/src/assets/images/sangeet_festive_mehndi_hands_1791806266445.jpg';
import heroSlideRoyalBridalImg from '@/src/assets/images/hero_bg_royal_bridal_18k_1791806277293.jpg';
import heroSlideMandalaGoldImg from '@/src/assets/images/hero_bg_mandala_gold_18k_1791806289693.jpg';
import heroSlideArabicCoutureImg from '@/src/assets/images/hero_bg_arabic_couture_18k_1791806304909.jpg';

export const IMAGES = {
  bridalHero: bridalHeroImg,
  arabicBackhand: arabicBackhandImg,
  indianMandala: indianMandalaImg,
  jewelleryKhafif: jewelleryKhafifImg,
  artistWorking: sangeetFestiveHandsImg,
  heroSlideRoyalBridal: heroSlideRoyalBridalImg,
  heroSlideMandalaGold: heroSlideMandalaGoldImg,
  heroSlideArabicCouture: heroSlideArabicCoutureImg,
  sangeetFestiveHands: sangeetFestiveHandsImg,
};

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  category: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-royal-bridal',
    image: IMAGES.heroSlideRoyalBridal,
    title: 'Royal Kalinga & Rajasthani Bridal Couture',
    subtitle: 'Full-hand heirloom bridal henna over crimson & antique gold Banarasi silk',
    category: 'Bridal Masterpiece · 18K Ultra-HD Showcase',
  },
  {
    id: 'slide-mandala-gold',
    image: IMAGES.heroSlideMandalaGold,
    title: 'Symmetric Peacock & Chakra Palm Mandala',
    subtitle: 'Precision concentric linework crafted with 100% triple-sifted herbal henna',
    category: 'Indian Traditional · 18K Ultra-HD Showcase',
  },
  {
    id: 'slide-arabic-couture',
    image: IMAGES.heroSlideArabicCouture,
    title: 'Emerald & Gold Jewellery-Style Henna',
    subtitle: 'Delicate wrist cuffs and shaded floral trails for engagements & receptions',
    category: 'Arabic & Jewellery · 18K Ultra-HD Showcase',
  },
  {
    id: 'slide-sangeet-lotus',
    image: IMAGES.sangeetFestiveHands,
    title: 'Festive Lotus & Marigold Sangeet Artistry',
    subtitle: 'Rich maroon bridal & festive stains for Bhubaneswar celebrations',
    category: 'Festive & Sangeet · 18K Ultra-HD Showcase',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'royal-odisha-bridal-full',
    title: 'Royal Kalinga Full-Hand Bridal',
    category: 'Bridal',
    subtitle: 'Full palms, forearms & intricate गठबंधन (wedding) motifs',
    coverage: 'Both Hands (Elbow Length) & Feet',
    durationEstimate: '4 – 6 Hours',
    image: IMAGES.bridalHero,
    description:
      'Traditional full-coverage Indian bridal mehndi featuring fine peacock arches, lotus mandalas, varmala silhouettes, and dense negative-space shading crafted for rich maroon staining.',
    motifDetails: 'Peacock jharokha · Lotus lattice · Custom couple initials',
    isDemoSample: true,
  },
  {
    id: 'shaded-arabic-vine',
    title: 'Flowing Shaded Arabic Trail',
    category: 'Arabic',
    subtitle: 'Diagonal floral cascade with bold leaf outlines',
    coverage: 'Back Hand & Wrist Trail',
    durationEstimate: '45 – 60 Minutes',
    image: IMAGES.arabicBackhand,
    description:
      'Contemporary Arabic floral trail sweeping from the wrist to the index finger, pairing bold outer contours with delicate inner shading that complements engagement rings and bracelets.',
    motifDetails: 'Rose cluster · Shaded leaves · Breathable skin spacing',
    isDemoSample: true,
  },
  {
    id: 'symmetric-mandala-palms',
    title: 'Symmetric Peacock & Chakra Mandala',
    category: 'Indian',
    subtitle: 'Concentric palm centerpiece with finger-tip caps',
    coverage: 'Both Palms & Wrist Cuffs',
    durationEstimate: '1.5 – 2 Hours',
    image: IMAGES.indianMandala,
    description:
      'Harmonious twin-palm mandala anchored by twin peacocks and fine concentric dot-work, ideal for Roka ceremonies, traditional pujas, and classic wedding guests.',
    motifDetails: 'Concentric chakra · Twin mayur · Traditional finger tips',
    isDemoSample: true,
  },
  {
    id: 'hathphool-jewellery-style',
    title: 'Hathphool Jewellery & Khafif Lace',
    category: 'Jewellery',
    subtitle: 'Delicate beaded chains & ring-bracelet illusions',
    coverage: 'Dorsal Hands & Fingers',
    durationEstimate: '45 – 75 Minutes',
    image: IMAGES.jewelleryKhafif,
    description:
      'Refined jewellery-inspired henna mimicking fine gold hathphool chains, chandelier cuffs, and minimal finger rings with micro-dot draping.',
    motifDetails: 'Beaded drape chains · Cuff bracelet · Ring connectors',
    isDemoSample: true,
  },
  {
    id: 'khafif-fine-filigree',
    title: 'Khafif Micro-Filigree Arrangement',
    category: 'Minimal',
    subtitle: 'Airy modern negative space with ultra-fine needle lines',
    coverage: 'Wrist to Fingertips',
    durationEstimate: '40 – 60 Minutes',
    image: IMAGES.jewelleryKhafif,
    description:
      'Lightweight Khafif composition designed for modern bridesmaids and cocktail evenings where subtle elegance and quick drying time are prioritized.',
    motifDetails: 'Micro-florals · Fine dot trails · Minimalist cuffs',
    isDemoSample: true,
  },
  {
    id: 'sangeet-occasion-artisan',
    title: 'Sangeet & Festive Group Artistry',
    category: 'Occasion',
    subtitle: 'Custom festive patterns for Raja, Teej, Karwa Chauth & Sangeet',
    coverage: 'Customizable Per Guest',
    durationEstimate: '20 – 40 Minutes / Guest',
    image: IMAGES.artistWorking,
    description:
      'Live artisanal cone work tailored for family celebrations, sangeet nights, and Odisha festivals including Raja Parba and Savitri Brata.',
    motifDetails: 'Festive florals · Quick-dry cones · Custom guest lengths',
    isDemoSample: true,
  },
  {
    id: 'indo-arabic-bridal-fusion',
    title: 'Indo-Arabic Engagement Fusion',
    category: 'Bridal',
    subtitle: 'Dense Indian jaali work framed in flowing Arabic borders',
    coverage: 'Three-Quarter Forearms',
    durationEstimate: '2.5 – 3.5 Hours',
    image: IMAGES.bridalHero,
    description:
      'A balanced fusion combining traditional Indian mesh (jaali) detailing with airy Arabic diagonal flow, crafted for engagement and reception brides.',
    motifDetails: 'Jaali mesh · Diagonal बेल (vine) · Detailed cuffs',
    isDemoSample: true,
  },
  {
    id: 'moroccan-geometric-cuff',
    title: 'Moroccan & Contemporary Geometric',
    category: 'Minimal',
    subtitle: 'Crisp diamond lattices and symmetrical wrist linework',
    coverage: 'Palms or Back Hands',
    durationEstimate: '35 – 50 Minutes',
    image: IMAGES.arabicBackhand,
    description:
      'Architectural geometric lines and diamond grid motifs inspired by Moroccan henna traditions, offering a bold modern contrast to floral styles.',
    motifDetails: 'Diamond lattice · Chevron bands · Clean symmetry',
    isDemoSample: true,
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'bridal-mehndi',
    index: '01',
    name: 'Bridal Mehndi',
    category: 'Bridal',
    shortDescription:
      'Bespoke full-hand and feet bridal storytelling with traditional Indian, Rajasthani, or Kalinga-inspired motifs.',
    detailedDescription:
      'Designed around your wedding lehenga and personal story. Includes intricate palm symmetry, forearm architecture, custom couple initials or wedding motifs, and matching bridal feet designs using 100% organic, triple-sifted herbal henna cones.',
    estimatedTime: '4 to 6 Hours (Depending on length & intricacy)',
    coverageScope: 'Full Hands (Up to Elbows) + Bridal Feet',
    priceStatus: 'Quote on Confirmation',
    sampleStartingRange: 'Owner Price Confirmation Pending',
    idealFor: 'Wedding Day Brides · Reception Brides',
    image: IMAGES.bridalHero,
  },
  {
    id: 'arabic-mehndi',
    index: '02',
    name: 'Arabic Mehndi',
    category: 'Arabic',
    shortDescription:
      'Flowing diagonal floral trails with bold outlines, shaded petals, and elegant negative space.',
    detailedDescription:
      'Characterized by sweeping vine compositions that elongate the fingers and wrist. Arabic mehndi uses less skin coverage than full bridal work, allowing quicker application and dramatic contrast against skin tones.',
    estimatedTime: '45 to 75 Minutes (Both Hands)',
    coverageScope: 'Wrist to Fingertips · Front & Back Options',
    priceStatus: 'Quote on Confirmation',
    sampleStartingRange: 'Owner Price Confirmation Pending',
    idealFor: 'Engagements · Bridesmaids · Festive Gatherings',
    image: IMAGES.arabicBackhand,
  },
  {
    id: 'indian-mehndi',
    index: '03',
    name: 'Indian Traditional Mehndi',
    category: 'Indian',
    shortDescription:
      'Classic dense fill work featuring peacocks, lotus mandalas, kalash, and fine jaali patterns.',
    detailedDescription:
      'Rooted in timeless Indian heritage, this style emphasizes intricate micro-detailing, concentric palm mandalas, paisley (ambi) borders, and cohesive finger-tip caps that yield a deep, long-lasting ceremonial stain.',
    estimatedTime: '1.5 to 3 Hours',
    coverageScope: 'Palms to Mid-Forearm',
    priceStatus: 'Quote on Confirmation',
    sampleStartingRange: 'Owner Price Confirmation Pending',
    idealFor: 'Roka · Haldi · Karwa Chauth · Traditional Ceremonies',
    image: IMAGES.indianMandala,
  },
  {
    id: 'khafif-mehndi',
    index: '04',
    name: 'Khafif Mehndi',
    category: 'Minimal',
    shortDescription:
      'Ultra-fine Gulf-inspired floral layering with delicate shading and intricate micro-filigree.',
    detailedDescription:
      'Khafif blends airy Arabic composition with hyper-detailed micro-petals and fine dot work. It delivers a couture, lace-like appearance without feeling heavy on the hands.',
    estimatedTime: '60 to 90 Minutes',
    coverageScope: 'Hands & Wrists',
    priceStatus: 'Quote on Confirmation',
    sampleStartingRange: 'Owner Price Confirmation Pending',
    idealFor: 'Cocktail Nights · Ring Ceremonies · Modern Brides',
    image: IMAGES.jewelleryKhafif,
  },
  {
    id: 'jewellery-style',
    index: '05',
    name: 'Jewellery Style Mehndi',
    category: 'Jewellery',
    shortDescription:
      'Ornamental henna mimicking hathphool chains, kadas, chandbalis, and delicate ring harnesses.',
    detailedDescription:
      'Crafted with precision bead-chains and scalloped cuffs that follow the natural bone structure of the wrist and back of the hand, creating the illusion of fine heritage jewellery.',
    estimatedTime: '45 to 75 Minutes',
    coverageScope: 'Dorsal Hands, Wrists & Fingers',
    priceStatus: 'Quote on Confirmation',
    sampleStartingRange: 'Owner Price Confirmation Pending',
    idealFor: 'Engagement Photoshoots · Baby Showers · Minimalist Brides',
    image: IMAGES.jewelleryKhafif,
  },
  {
    id: 'moroccan-occasion',
    index: '06',
    name: 'Moroccan & Occasion Mehndi',
    category: 'Occasion',
    shortDescription:
      'Geometric Moroccan linework and flexible group bookings for family sangeets and Odisha festivals.',
    detailedDescription:
      'Whether you prefer crisp geometric diamond motifs or festive floral bands for 10 to 50+ guests during Sangeet nights, Raja Parba, or Savitri Brata, sessions are structured either per-hand or on an hourly artist booking basis.',
    estimatedTime: '15 to 30 Minutes per Guest (Group Bookings)',
    coverageScope: 'Custom Per Guest or Hourly Sangeet Package',
    priceStatus: 'Quote on Confirmation',
    sampleStartingRange: 'Owner Price Confirmation Pending',
    idealFor: 'Sangeet Nights · Raja Festival · Family Celebrations',
    image: IMAGES.artistWorking,
  },
];

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'intimate-occasion',
    name: 'Festive & Occasion Session',
    subtitle: 'For engagements, Roka, Karwa Chauth, Raja Parba & individual guests',
    coverage: 'Both hands (Palm & Back) up to wrist or quarter forearm',
    duration: 'Approx. 45 – 90 mins',
    priceLabel: 'Custom Quote via WhatsApp',
    verificationNote: 'Final starting tariff subject to owner confirmation',
    features: [
      'Choice of Arabic, Mandala, or Jewellery style',
      'Freshly hand-rolled organic herbal henna cones',
      'Essential clove & eucalyptus aftercare guidance',
      'Studio or home-visit option in Bhubaneswar (subject to confirmation)'
    ],
  },
  {
    id: 'signature-bridal',
    name: 'Signature Bridal Couture',
    subtitle: 'Comprehensive bridal henna for weddings in Bhubaneswar & nearby cities',
    coverage: 'Full hands up to elbows + bespoke bridal feet composition',
    duration: 'Approx. 4 – 6 hours',
    priceLabel: 'Request Bridal Tariff Sheet',
    verificationNote: 'Custom quote based on coverage length & motif density',
    features: [
      'Personalized design consultation & motif planning',
      'Intricate portrait/silhouette, peacock, lotus & jaali work',
      '100% chemical-free, triple-sifted Sojat herbal henna paste',
      'Complimentary post-application seal & stain-darkening balm kit'
    ],
    highlighted: true,
  },
  {
    id: 'sangeet-family-group',
    name: 'Sangeet & Family Group Booking',
    subtitle: 'Dedicated mehndi artist team for wedding guests and family events',
    coverage: 'Flexible strips, mandalas, or Arabic trails for 10–40+ guests',
    duration: '3 to 6 Hour Slot Booking',
    priceLabel: 'Per-Guest or Hourly Package',
    verificationNote: 'Group rates confirmed upon event headcount & location',
    features: [
      'Coordinated design menu for quick guest turnaround',
      'Additional assistant artists available on request',
      'On-venue service across Bhubaneswar & Cuttack',
      'Dedicated slot scheduling for bride’s immediate family'
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Share Your Event Details',
    description:
      'Select your preferred mehndi style from our portfolio and send your event date, Bhubaneswar locality, and guest count via WhatsApp or the enquiry form.',
  },
  {
    step: '02',
    title: 'Design & Availability Confirmation',
    description:
      'Discuss coverage length (wrist, mid-arm, or full elbow bridal), custom motifs, and receive transparent pricing directly from the artist.',
  },
  {
    step: '03',
    title: 'Fresh Organic Cone Preparation',
    description:
      'Every batch of henna paste is freshly mixed 24 hours prior to your appointment using pure sifted henna leaves and essential oils—never harsh chemical dyes.',
  },
  {
    step: '04',
    title: 'Relaxed Application & Rich Stain Care',
    description:
      'Enjoy a calm, unhurried application session followed by step-by-step natural aftercare instructions so your stain matures into a deep maroon peak within 48 hours.',
  },
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How many days before the wedding should I book my bridal mehndi session?',
    answer:
      'For the deepest maroon stain on your wedding day, bridal mehndi should ideally be applied 2 days (48 hours) before the main ceremony. Fresh natural henna starts bright orange when the paste is removed and oxidizes to a rich dark reddish-brown over 36 to 48 hours.',
  },
  {
    id: 'faq-2',
    question: 'Do you use 100% natural herbal henna, or does it contain chemical dyes?',
    answer:
      'We strictly advocate 100% natural, triple-sifted herbal henna mixed with pure essential oils and lemon-sugar sealant. We do not recommend PPD (black henna) or synthetic chemical cones, ensuring safe skin contact for sensitive bridal skin.',
  },
  {
    id: 'faq-3',
    question: 'Do you provide home service across Bhubaneswar?',
    answer:
      'Yes, home and wedding-venue appointments are the primary format for bridal and group sangeet bookings across Bhubaneswar (including Ashok Nagar, Saheed Nagar, Patia, Jaydev Vihar, and Khandagiri). Exact travel terms are confirmed during booking.',
  },
  {
    id: 'faq-4',
    question: 'Why are exact prices listed as "Pending Owner Confirmation" on this demo website?',
    answer:
      'To uphold complete transparency, this digital portfolio does not publish unverified third-party directory prices. Mehndi tariffs depend on design density, arm length, and guest count, and are shared directly once confirmed by the business owner.',
  },
  {
    id: 'faq-5',
    question: 'How long does a full bridal mehndi session take?',
    answer:
      'A traditional elbow-length bridal design on both hands and feet typically takes between 4 and 6 hours, depending on the complexity of jaali work, figures, and drying intervals.',
  },
  {
    id: 'faq-6',
    question: 'How can I confirm if Krishna Mehndi Artist is available for my event date?',
    answer:
      'Use the WhatsApp Enquiry Builder or the Appointment Request Form on this website to generate a pre-filled enquiry with your event date, location, and guest count.',
  },
];
