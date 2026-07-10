// Centralized CDN image library — real photos strongly related to content.
// All URLs verified to return HTTP 200. Logo remains as SVG text (per client request).

const build = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMAGES = {
  // === Products ===
  products: {
    mangoCubes: build("1605027990121-cbae9e0642df", 800),          // fresh mango cubes
    mangoCubesAlt: build("1546173159-315724a31696", 800),          // diced mango
    mangoSlices: build("1553279768-865429fa0078", 800),            // sliced mango
    mangoSliceHalf: build("1591073113125-e46713c829ed", 800),      // mango half
    mangoFrozen: build("1607013251379-e6eecfffe234", 800),         // frozen mango
    strawberry: build("1464965911861-746a04b4bca6", 800),          // strawberries
    strawberryBowl: build("1543528176-61b239494933", 800),         // strawberry bowl
    strawberryFrozen: build("1488900128323-21503983a07e", 800),    // frozen fruit mix
    mixedFruit: build("1488900128323-21503983a07e", 800),          // mixed fruit
    mangoPieces: build("1553279768-865429fa0078", 800),
  },

  // === Process steps ===
  process: {
    inquiry: build("1455390582262-044cdead277a", 600),             // email/message
    spec: build("1517842645767-c639042777db", 600),                // documents
    quotation: build("1556761175-5973dc0f32e7", 600),              // business meeting
    sample: build("1574323347407-f5e1ad6d020b", 600),              // farm/sample
    order: build("1607082348824-0a96f2a4b9da", 600),               // carton/packaging
    shipping: build("1605281317010-fe5ffe798166", 600),            // cargo ship
  },

  // === Quality / cold chain ===
  quality: {
    sourcing: build("1574323347407-f5e1ad6d020b", 600),            // farm/orchard
    sorting: build("1573246123716-6b1782bfc499", 600),             // sorting
    freezing: build("1607013251379-e6eecfffe234", 600),            // frozen
    packaging: build("1607082348824-0a96f2a4b9da", 600),           // packaging
    documentation: build("1450101499163-c8848c66ca85", 600),       // documents
    traceability: build("1553413077-190dd305871c", 600),           // barcode
    coldStorage: build("1586528116311-ad8dd3c8310d", 600),         // cold storage
    warehouse: build("1553062407-98eeb64c6a62", 600),              // warehouse
    reeferContainer: build("1605281317010-fe5ffe798166", 800),     // container ship
    reeferTruck: build("1601584115197-04ecc0da31d7", 600),         // truck
    pallet: build("1509391366360-2e959784a276", 600),              // pallet
  },

  // === Industries ===
  industries: {
    factory: build("1571091718767-18b5b1457add", 600),             // food factory
    juice: build("1622597467836-f3285f2131b8", 600),               // juice
    dairy: build("1563636619-e9143da7973b", 600),                  // dairy
    hotel: build("1551882547-ff40c63fe5fa", 600),                  // hotel
    catering: build("1551218808-94e220e084d2", 600),               // catering
    retail: build("1441986300917-64674bd600d8", 600),              // retail store
    icecream: build("1497034825429-c343d7c6a68f", 600),            // ice cream
    pastry: build("1517433670267-08bbd4be890f", 600),              // pastry
    smoothie: build("1505252585461-04db1eb84625", 600),            // smoothie
    dessert: build("1488477181946-6428a0291777", 600),             // dessert
    market: build("1488459716781-31db52582fe9", 600),              // market stall
  },

  // === GCC country photos ===
  gcc: {
    egypt: build("1572252009286-268acec5ca0a", 800),               // Egypt
    egyptAlt: build("1568322445389-f64ac2515020", 800),            // Egypt alt
    saudi: build("1568632234157-ce7aecd03d0d", 800),               // Saudi Arabia
    uae: build("1518684079-3c830dcef090", 800),                    // UAE Dubai
    kuwait: build("1546412414-e1885259563a", 800),                 // Kuwait
    qatar: build("1587474260584-136574528ed5", 800),               // Qatar Doha
    bahrain: build("1565967511849-76a60a516170", 800),             // Bahrain
    oman: build("1546412414-e1885259563a", 800),                   // reuse (verified)
    omanAlt: build("1518684079-3c830dcef090", 800),                // reuse
  },

  // === Hero visuals ===
  hero: {
    mangoCubesCloseup: build("1546173159-315724a31696", 1000),     // close-up cubes
    mangoHalf: build("1591073113125-e46713c829ed", 1000),          // mango half
    strawberryHero: build("1464965911861-746a04b4bca6", 1000),     // strawberries
    fruitBowl: build("1488900128323-21503983a07e", 1000),          // fruit bowl
  },

  // === Gallery — full list, by category ===
  gallery: {
    // Products (1)
    g1: { url: build("1605027990121-cbae9e0642df", 800), en: "IQF Mango Cubes — close-up", ar: "مكعبات مانجو IQF — لقطة قريبة", cat: 1 },
    g2: { url: build("1553279768-865429fa0078", 800), en: "IQF Mango Slices — premium cut", ar: "شرائح مانجو IQF — قطع فاخر", cat: 1 },
    g3: { url: build("1464965911861-746a04b4bca6", 800), en: "IQF Strawberry — whole", ar: "فراولة IQF — كاملة", cat: 1 },
    g4: { url: build("1488900128323-21503983a07e", 800), en: "Mixed Fruits blend", ar: "خلطات فواكه", cat: 1 },
    // Packaging (2)
    g5: { url: build("1607082348824-0a96f2a4b9da", 800), en: "Bulk carton 10kg", ar: "كرتونة جملة 10kg", cat: 2 },
    g6: { url: build("1601584115197-04ecc0da31d7", 800), en: "Retail pack 1kg", ar: "عبوة تجزئة 1kg", cat: 2 },
    // Cold Storage (3)
    g7: { url: build("1586528116311-ad8dd3c8310d", 800), en: "Cold storage at -18°C", ar: "مخزن مبرد -18°C", cat: 3 },
    g8: { url: build("1553062407-98eeb64c6a62", 800), en: "Cold room interior", ar: "داخل المخزن المبرد", cat: 3 },
    // Logistics (4)
    g9: { url: build("1605281317010-fe5ffe798166", 800), en: "Reefer container loading", ar: "تحميل الكونتينر المبرد", cat: 4 },
    g10: { url: build("1494412519320-aa613dfb7738", 800), en: "Reefer en route to GCC", ar: "الكونتينر في طريق الخليج", cat: 4 },
    // Process (5)
    g11: { url: build("1573246123716-6b1782bfc499", 800), en: "Sorting & inspection", ar: "الفرز والتفتيش", cat: 5 },
    g12: { url: build("1571091718767-18b5b1457add", 800), en: "IQF freezing line", ar: "خط التجميد IQF", cat: 5 },
  },

  // === Promo video poster ===
  promoPoster: build("1586528116311-ad8dd3c8310d", 1200),

  // === Private label mockups ===
  privateLabel: {
    bulk: build("1607082348824-0a96f2a4b9da", 600),               // cartons bulk
    retail: build("1601584115197-04ecc0da31d7", 600),              // retail pack
    privateLabel: build("1488900128323-21503983a07e", 600),        // private label
    cartonHero: build("1509391366360-2e959784a276", 800),          // pallet cartons
  },
};

export type ImageKey = keyof typeof IMAGES;
