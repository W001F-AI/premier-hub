// Official Orange Premier Plans Data (With Exact Pre-Tax & After-Tax Prices + 50% 6-Month Promo)
export const PREMIER_TIERS = [
  {
    id: 'lite',
    name: 'Premier Lite',
    nameAr: 'بريميير لايت',
    price: 652,
    preTaxPrice: 520,
    promoPrice: 326,
    promoFormatted: '326 ج.م',
    priceFormatted: '652 ج.م',
    priceNote: '326 ج.م شهرياً لأول 6 شهور (خصم 50%) • ثم 652 ج.م شهرياً شامل الضريبة',
    color: '#ff7900',
    secondaryColor: '#ea580c',
    bgGlow: 'rgba(255, 121, 0, 0.28)',
    tag: 'الباقة المعتمدة مع الرقم',
    minutes: '2,500 دقيقة لكل الشبكات',
    internet: '15 جيجابايت موبايل إنترنت',
    family: 'فرد واحد',
    dslDiscount: '190 جنيه خصم Home DSL أو Wireless 5G',
    installmentLimit: 'تقسيط أجهزة حتى 150,000 جنيه',
    sms: '500 رسالة لكل الشبكات',
    intlMinutes: 'غير متوفر',
    roaming: '1 جيجا صالحة أسبوع مرتين في السنة',
    roamingRate: '8 جنيه للدقيقة لأول 1,500 دقيقة',
    entertainment: [
      { name: 'Spotify', duration: '12 شهر مجاناً' },
      { name: 'Prime Video', duration: '12 شهر مجاناً' },
      { name: 'W-tour', duration: 'خصم يصل إلى 30%' }
    ],
    newPerks: ['خصم 50% لأول 6 شهور', 'خصم W-tour يصل إلى 30%', 'قفل السعر لمدة سنة (One Year Tariff Lock)']
  },
  {
    id: 'plus',
    name: 'Premier Plus',
    nameAr: 'بريميير بلس',
    price: 861,
    preTaxPrice: 690,
    promoPrice: 430,
    promoFormatted: '430 ج.م',
    priceFormatted: '861 ج.م',
    priceNote: '430 ج.م شهرياً لأول 6 شهور (خصم 50%) • ثم 861 ج.م شهرياً شامل الضريبة',
    color: '#38bdf8',
    secondaryColor: '#0284c7',
    bgGlow: 'rgba(56, 189, 248, 0.28)',
    tag: 'الترقية العائلية',
    minutes: '3,500 دقيقة لكل الشبكات',
    internet: '20 جيجابايت موبايل إنترنت',
    family: 'فردين (2 أفراد)',
    dslDiscount: '210 جنيه على DSL أو 250 جنيه على 5G',
    installmentLimit: 'تقسيط أجهزة حتى 150,000 جنيه',
    sms: '2,000 رسالة لكل الشبكات',
    intlMinutes: '15 دقيقة دولية',
    roaming: '1.5 جيجا صالحة أسبوع مرتين في السنة',
    roamingRate: '8 جنيه للدقيقة لأول 1,500 دقيقة',
    entertainment: [
      { name: 'Spotify', duration: '12 شهر مجاناً' },
      { name: 'Prime Video', duration: '12 شهر مجاناً' },
      { name: 'W-tour', duration: 'خصم يصل إلى 30%' }
    ],
    newPerks: ['خصم 50% لأول 6 شهور', '15 دقيقة دولية', 'مشاركة الخط مع فرد إضافي']
  },
  {
    id: 'select',
    name: 'Premier Select',
    nameAr: 'بريميير سيلكت',
    price: 1070,
    preTaxPrice: 860,
    promoPrice: 535,
    promoFormatted: '535 ج.م',
    priceFormatted: '1,070 ج.م',
    priceNote: '535 ج.م شهرياً لأول 6 شهور (خصم 50%) • ثم 1,070 ج.م شهرياً شامل الضريبة',
    color: '#10b981',
    secondaryColor: '#059669',
    bgGlow: 'rgba(168, 85, 247, 0.28)',
    tag: 'الأكثر شعبية لرجال الأعمال',
    minutes: '5,000 دقيقة لكل الشبكات',
    internet: '25 جيجابايت موبايل إنترنت',
    family: '3 أفراد',
    dslDiscount: '210 جنيه على DSL أو 250 جنيه على 5G',
    installmentLimit: 'تقسيط أجهزة حتى 150,000 جنيه',
    sms: '2,000 رسالة لكل الشبكات',
    intlMinutes: '30 دقيقة دولية',
    roaming: '10 جيجا صالحة أسبوع مرة في السنة',
    roamingRate: '8 جنيه للدقيقة لأول 1,500 دقيقة',
    entertainment: [
      { name: 'YouTube Premium', duration: '12 شهر مجاناً (جديد)' },
      { name: 'Spotify', duration: '12 شهر مجاناً' },
      { name: 'Prime Video', duration: '12 شهر مجاناً' },
      { name: 'TOD', duration: '3 شهور مجاناً' },
      { name: 'EGYPTAIR', duration: '208 ميل سفر مجاناً' },
      { name: 'W-tour', duration: 'خصم يصل إلى 30%' }
    ],
    newPerks: ['خصم 50% لأول 6 شهور', 'يوتيوب بريميوم 12 شهر', '208 ميل مصر للطيران']
  },
  {
    id: 'ultra',
    name: 'Premier Ultra',
    nameAr: 'بريميير ألترا',
    price: 1489,
    preTaxPrice: 1200,
    promoPrice: 745,
    promoFormatted: '745 ج.م',
    priceFormatted: '1,489 ج.م',
    priceNote: '745 ج.م شهرياً لأول 6 شهور (خصم 50%) • ثم 1,489 ج.م شهرياً شامل الضريبة',
    color: '#eab308',
    secondaryColor: '#ca8a04',
    bgGlow: 'rgba(234, 179, 8, 0.28)',
    tag: 'فئة كبار الشخصيات',
    minutes: '7,000 دقيقة لكل الشبكات',
    internet: '40 جيجابايت موبايل إنترنت',
    family: '4 أفراد',
    dslDiscount: '290 جنيه على DSL أو 350 جنيه على 5G',
    installmentLimit: 'تقسيط أجهزة حتى 150,000 جنيه',
    sms: '2,000 رسالة لكل الشبكات',
    intlMinutes: '45 دقيقة دولية',
    roaming: '10 جيجا صالحة أسبوع مرتين في السنة',
    roamingRate: '8 جنيه للدقيقة لأول 1,500 دقيقة',
    entertainment: [
      { name: 'YouTube Premium', duration: '12 شهر مجاناً (جديد)' },
      { name: 'Spotify', duration: '12 شهر مجاناً' },
      { name: 'Prime Video', duration: '12 شهر مجاناً' },
      { name: 'TOD', duration: '6 شهور مجاناً' },
      { name: 'Gourmet', duration: 'خصم حتى 30% + مزايا Gourmet Gold مجاناً' },
      { name: 'EGYPTAIR', duration: '333 ميل سفر مجاناً' },
      { name: 'W-tour', duration: 'خصم يصل إلى 30%' }
    ],
    newPerks: ['خصم 50% لأول 6 شهور', 'خصم Gourmet 30% + Gold', 'TOD 6 شهور مجاناً']
  },
  {
    id: 'platinum',
    name: 'Premier Platinum',
    nameAr: 'بريميير بلاتينوم',
    price: 2134,
    preTaxPrice: 1725,
    promoPrice: 1067,
    promoFormatted: '1,067 ج.م',
    priceFormatted: '2,134 ج.م',
    priceNote: '1,067 ج.م شهرياً لأول 6 شهور (خصم 50%) • ثم 2,134 ج.م شهرياً شامل الضريبة',
    color: '#c084fc',
    secondaryColor: '#9333ea',
    bgGlow: 'rgba(192, 132, 252, 0.32)',
    tag: 'القمة المطلقة (Life Time VIP)',
    minutes: '10,000 دقيقة لكل الشبكات',
    internet: '70 جيجابايت موبايل إنترنت',
    family: '5 أفراد',
    dslDiscount: '420 جنيه على DSL أو 350 جنيه على 5G',
    installmentLimit: 'تقسيط أجهزة حتى 150,000 جنيه',
    sms: '2,000 رسالة لكل الشبكات',
    intlMinutes: '60 دقيقة دولية',
    roaming: '10 جيجا صالحة أسبوع 3 مرات في السنة + 30 دقيقة صادرة + 30 دقيقة استقبال',
    roamingRate: '8 جنيه للدقيقة لأول 1,500 دقيقة',
    entertainment: [
      { name: 'YouTube Premium', duration: 'مدى الحياة مجاناً (Life Time)' },
      { name: 'Prime Video', duration: 'مدى الحياة مجاناً (Life Time)' },
      { name: 'TOD', duration: 'مدى الحياة مجاناً (Life Time)' },
      { name: 'Spotify', duration: '12 شهر مجاناً' },
      { name: 'Gourmet', duration: 'خصم حتى 30% + مزايا Gourmet Gold مجاناً' },
      { name: 'EGYPTAIR', duration: '416 ميل سفر مجاناً' },
      { name: 'W-tour', duration: 'خصم يصل إلى 30%' }
    ],
    newPerks: ['خصم 50% لأول 6 شهور', 'يوتيوب وبرايم وفيديو وTOD مدى الحياة', '416 ميل مصر للطيران', 'تجوال مكالمات وإنترنت مجاني']
  }
];

// Official Available Numbers from Image 1 (Clean without 222 hardcoding)
export const OFFICIAL_NUMBERS = [
  {
    id: 'num-01',
    msisdn: '1231096222',
    rawNumber: '01231096222',
    formatted: '012 3109 6222',
    series: 'سلسلة 3109',
    badge: 'سلسلة 3109',
    highlight: 'نهاية 6222'
  },
  {
    id: 'num-02',
    msisdn: '1231095222',
    rawNumber: '01231095222',
    formatted: '012 3109 5222',
    series: 'سلسلة 3109',
    badge: 'سلسلة 3109',
    highlight: 'نهاية 5222'
  },
  {
    id: 'num-03',
    msisdn: '1231094222',
    rawNumber: '01231094222',
    formatted: '012 3109 4222',
    series: 'سلسلة 3109',
    badge: 'سلسلة 3109',
    highlight: 'نهاية 4222'
  },
  {
    id: 'num-04',
    msisdn: '1231086222',
    rawNumber: '01231086222',
    formatted: '012 3108 6222',
    series: 'سلسلة 3108',
    badge: 'سلسلة 3108',
    highlight: 'نهاية 6222'
  },
  {
    id: 'num-05',
    msisdn: '1231085222',
    rawNumber: '01231085222',
    formatted: '012 3108 5222',
    series: 'سلسلة 3108',
    badge: 'سلسلة 3108',
    highlight: 'نهاية 5222'
  },
  {
    id: 'num-06',
    msisdn: '1231084222',
    rawNumber: '01231084222',
    formatted: '012 3108 4222',
    series: 'سلسلة 3108',
    badge: 'سلسلة 3108',
    highlight: 'نهاية 4222'
  },
  {
    id: 'num-07',
    msisdn: '1231079222',
    rawNumber: '01231079222',
    formatted: '012 3107 9222',
    series: 'سلسلة 3107',
    badge: 'سلسلة 3107',
    highlight: 'نهاية 9222'
  },
  {
    id: 'num-08',
    msisdn: '1231075222',
    rawNumber: '01231075222',
    formatted: '012 3107 5222',
    series: 'سلسلة 3107',
    badge: 'سلسلة 3107',
    highlight: 'نهاية 5222'
  },
  {
    id: 'num-09',
    msisdn: '1231074222',
    rawNumber: '01231074222',
    formatted: '012 3107 4222',
    series: 'سلسلة 3107',
    badge: 'سلسلة 3107',
    highlight: 'نهاية 4222'
  },
  {
    id: 'num-10',
    msisdn: '1231069222',
    rawNumber: '01231069222',
    formatted: '012 3106 9222',
    series: 'سلسلة 3106',
    badge: 'سلسلة 3106',
    highlight: 'نهاية 9222'
  },
  {
    id: 'num-11',
    msisdn: '1231068222',
    rawNumber: '01231068222',
    formatted: '012 3106 8222',
    series: 'سلسلة 3106',
    badge: 'سلسلة 3106',
    highlight: 'نهاية 8222'
  },
  {
    id: 'num-12',
    msisdn: '1231064222',
    rawNumber: '01231064222',
    formatted: '012 3106 4222',
    series: 'سلسلة 3106',
    badge: 'سلسلة 3106',
    highlight: 'نهاية 4222'
  },
  {
    id: 'num-13',
    msisdn: '1231059222',
    rawNumber: '01231059222',
    formatted: '012 3105 9222',
    series: 'سلسلة 3105',
    badge: 'سلسلة 3105',
    highlight: 'نهاية 9222'
  },
  {
    id: 'num-14',
    msisdn: '1231058222',
    rawNumber: '01231058222',
    formatted: '012 3105 8222',
    series: 'سلسلة 3105',
    badge: 'سلسلة 3105',
    highlight: 'نهاية 8222'
  },
  {
    id: 'num-15',
    msisdn: '1231057222',
    rawNumber: '01231057222',
    formatted: '012 3105 7222',
    series: 'سلسلة 3105',
    badge: 'سلسلة 3105',
    highlight: 'نهاية 7222'
  },
  {
    id: 'num-16',
    msisdn: '1231046222',
    rawNumber: '01231046222',
    formatted: '012 3104 6222',
    series: 'سلسلة 3104',
    badge: 'سلسلة 3104',
    highlight: 'نهاية 6222'
  },
  {
    id: 'num-17',
    msisdn: '1231038222',
    rawNumber: '01231038222',
    formatted: '012 3103 8222',
    series: 'سلسلة 3103',
    badge: 'سلسلة 3103',
    highlight: 'نهاية 8222'
  },
  {
    id: 'num-18',
    msisdn: '1231092227',
    rawNumber: '01231092227',
    formatted: '012 3109 2227',
    series: 'سلسلة 3109',
    badge: 'سلسلة 3109',
    highlight: 'نهاية 2227'
  },
  {
    id: 'num-19',
    msisdn: '1231092224',
    rawNumber: '01231092224',
    formatted: '012 3109 2224',
    series: 'سلسلة 3109',
    badge: 'سلسلة 3109',
    highlight: 'نهاية 2224'
  },
  {
    id: 'num-20',
    msisdn: '1231082229',
    rawNumber: '01231082229',
    formatted: '012 3108 2229',
    series: 'سلسلة 3108',
    badge: 'سلسلة 3108',
    highlight: 'نهاية 2229'
  }
];

export const NUMBER_SERIES = [
  { id: 'all', name: 'جميع الأرقام المتاحة' },
  { id: '3109', name: 'سلسلة 3109' },
  { id: '3108', name: 'سلسلة 3108' },
  { id: '3107', name: 'سلسلة 3107' },
  { id: '3106', name: 'سلسلة 3106' },
  { id: '3105', name: 'سلسلة 3105' }
];

export const WHATSAPP_CONTACT = {
  phone: '201205979779',
  cleanUrl: 'https://api.whatsapp.com/send/?phone=201205979779'
};
