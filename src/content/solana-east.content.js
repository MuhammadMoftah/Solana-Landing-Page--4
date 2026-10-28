/**
 * Solana East — Content Source of Truth (research snapshot)
 * File: solana-east.content.js
 *
 * Purpose:
 *   Structured content for rebuilding a Solana East project website with a new theme.
 *
 * Important:
 *   - This is a research snapshot, not a live feed.
 *   - Prices, availability, payment plans, and delivery dates can change.
 *   - Sources sometimes conflict. Conflicts are preserved in `researchNotes`
 *     rather than silently merged.
 *   - Asset paths are placeholders unless explicitly marked as source URLs.
 *   - Verify licensing/permission before reusing third-party images or copy.
 *
 * Usage:
 *   import solanaEastContent from "./solana-east.content.js";
 *   console.log(solanaEastContent.sections);
 */

const solanaEastContent = {
  schemaVersion: "1.0.0",
  contentStatus: "research-snapshot",
  lastResearched: "2026-10-13",
  locale: "en-EG",

  project: {
    id: "solana-east",
    name: "Solana East",
    displayName: "SOLANA East by ORA",
    developer: {
      name: "ORA Developers",
      website: "https://www.oradevelopers.com/",
      chairmanAndCEO: "Naguib Sawiris",
    },
    category: "residential-development",
    location: {
      country: "Egypt",
      city: "New Cairo",
      district: "Fifth Settlement",
      broaderArea: "East Cairo",
      address: null,
      coordinates: null,
      mapUrl: null,
      nearbyRoads: [
        "South Teseen Street",
        "North Teseen Street",
        "Middle Ring Road",
      ],
    },
    overview:
      "Solana East is a residential development by ORA Developers in New Cairo, East Cairo. The published project concept emphasizes landscaped green corridors, water features and lakes, walkable spaces, residential homes, and a retail and entertainment hub.",
    officialProjectWebsite:
      "https://www.oradevelopers.com/properties/solana-by-ora",
    projectGuideWebsite: "https://solanaeastegypt.com/",
    propertyFinderUrl:
      "https://www.propertyfinder.eg/en/new-projects/ora-developers/solana-east",
    officialBrochureUrl:
      "https://ebrochures.ora-egypt.com/assets/documents/Ora_Egypt/Ora_Egypt_Brochure_Digital_version_32_comp_final.pdf",
  },

  /**
   * The `sections` array is intended to drive page section rendering.
   * `type` is a semantic hint for the new UI, not a required design decision.
   */
  sections: [
    {
      id: "hero",
      title: "Discover Solana East",
      type: "hero",
      order: 1,
      status: "draft-content",
      content: {
        eyebrow: "SOLANA EAST BY ORA",
        heading: "A new perspective on living in East Cairo",
        description:
          "A residential destination in New Cairo shaped around open spaces, landscaped green corridors, water views, and places to connect.",
        primaryCta: {
          label: "Explore the project",
          target: "#project-overview",
        },
        secondaryCta: {
          label: "Request information",
          target: "#contact",
        },
        highlights: [
          "New Cairo, East Cairo",
          "Developed by ORA Developers",
          "Residential living with landscaped open spaces and water features",
        ],
      },
      assets: [
        {
          id: "hero-main-render",
          type: "image",
          src: null,
          sourcePage: "https://solanaeastegypt.com/",
          alt: "Architectural rendering of Solana East",
          caption:
            "Use an approved original project rendering; the current source page identifies its visuals as architectural renderings.",
          downloadStatus: "not-downloaded",
          rightsStatus: "verify-before-use",
        },
      ],
      sources: ["solana-east-guide", "property-finder", "ora-brochure"],
    },

    {
      id: "project-overview",
      title: "The Project",
      type: "overview",
      order: 2,
      status: "partially-researched",
      content: {
        heading: "A residential community connected by nature",
        description:
          "ORA's brochure describes Solana East as a development in East Cairo with an emphasis on openness, mobility, connection, walkable areas, social opportunities, and a landscape-led masterplan.",
        facts: [
          {
            label: "Developer",
            value: "ORA Developers",
            valueType: "string",
            sourceIds: ["ora-brochure", "property-finder"],
            confidence: "high",
          },
          {
            label: "Project location",
            value: "New Cairo, East Cairo, Egypt",
            valueType: "string",
            sourceIds: ["ora-brochure", "solana-east-guide", "property-finder"],
            confidence: "high",
          },
          {
            label: "Land area",
            value: 167.67,
            unit: "feddan",
            alternateValue: 704070,
            alternateUnit: "sqm",
            sourceIds: ["ora-brochure"],
            confidence: "high",
          },
          {
            label: "Number of units",
            value: 1063,
            unit: "units",
            sourceIds: ["ora-brochure"],
            confidence: "high",
          },
          {
            label: "Single-family BUA",
            value: 75537,
            unit: "sqm",
            sourceIds: ["ora-brochure"],
            confidence: "medium",
            note: "The brochure text extraction places this figure near the single-family/multiple-family mix. Verify against the visual PDF page before publishing.",
          },
          {
            label: "Residential product mix",
            value: {
              singleFamilyPercent: 70,
              multipleFamilyPercent: 30,
            },
            sourceIds: ["ora-brochure"],
            confidence: "medium",
            note: "Percentages are extracted from the brochure layout; confirm their visual association before presenting them as a precise unit mix.",
          },
        ],
      },
      assets: [],
      sources: ["ora-brochure", "solana-east-guide", "property-finder"],
    },

    {
      id: "masterplan",
      title: "The Masterplan",
      type: "masterplan",
      order: 3,
      status: "partially-researched",
      content: {
        heading: "Spaces that connect",
        description:
          "The brochure presents a landscape-led masterplan with lakes and water features, green corridors, pedestrian and cycling connections, and distinct character areas intended to connect residents with nature and community spaces.",
        concepts: [
          {
            id: "central-lakes",
            title: "Lakeside Living",
            description:
              "Water features and lakes are a central part of the project's visual and landscape concept.",
          },
          {
            id: "green-corridors",
            title: "Green Corridors",
            description:
              "Connected green paths support walking, cycling, and movement between different areas.",
          },
          {
            id: "connected-spaces",
            title: "Spaces That Connect",
            description:
              "The masterplan describes community, sports, retail, leisure, and landscaped spaces within the development.",
          },
          {
            id: "retail-hub",
            title: "Retail & Entertainment Hub",
            description:
              "The brochure describes a retail and entertainment destination with dining options.",
          },
        ],
        masterplanImage: {
          src: null,
          sourcePage: "https://solanaeastegypt.com/",
          sourceBrochure:
            "https://ebrochures.ora-egypt.com/assets/documents/Ora_Egypt/Ora_Egypt_Brochure_Digital_version_32_comp_final.pdf",
          alt: "Solana East masterplan",
          downloadStatus: "not-downloaded",
          rightsStatus: "verify-before-use",
        },
      },
      assets: [],
      sources: ["ora-brochure", "solana-east-guide", "property-finder"],
    },

    {
      id: "location",
      title: "Location & Connectivity",
      type: "location",
      order: 4,
      status: "needs-verification",
      content: {
        heading: "Connected to East Cairo",
        description:
          "Solana East is listed in New Cairo's Fifth Settlement. Property Finder mentions access to South Teseen Street, North Teseen Street, and the Middle Ring Road.",
        nearbyPlaces: [
          {
            name: "American University in Cairo (AUC)",
            travelTimeMinutes: 15,
            travelDistanceKm: null,
            sourceIds: ["ora-brochure", "solana-east-guide"],
            note: "The guide/brochure says approximately 15 minutes; Property Finder separately says 10 minutes. Do not publish one exact travel time until verified.",
          },
          {
            name: "Cairo–Suez Road",
            travelTimeMinutes: 20,
            travelDistanceKm: null,
            sourceIds: ["solana-east-guide"],
            note: "Approximate time quoted by the guide; route and traffic conditions may affect it.",
          },
          {
            name: "New Administrative Capital",
            travelTimeMinutes: 30,
            travelDistanceKm: null,
            sourceIds: ["solana-east-guide"],
            note: "Approximate time quoted by the guide. The ORA brochure gives a different estimate in its extracted text; verify before publishing.",
          },
          {
            name: "ZED East",
            travelTimeMinutes: 10,
            travelDistanceKm: null,
            sourceIds: ["property-finder"],
            note: "Listed by Property Finder; independently verify route and travel time.",
          },
          {
            name: "Ring Road / CFC",
            travelTimeMinutes: 20,
            travelDistanceKm: null,
            sourceIds: ["property-finder"],
            note: "The source groups Ring Road / CFC together; clarify the destination before using this as a location claim.",
          },
          {
            name: "Katameya Heights",
            travelTimeMinutes: 20,
            travelDistanceKm: null,
            sourceIds: ["property-finder"],
            note: "Approximate source claim; independently verify.",
          },
        ],
        map: {
          embedUrl: null,
          coordinates: null,
          note: "Exact project coordinates have not yet been verified.",
        },
      },
      assets: [],
      sources: ["ora-brochure", "solana-east-guide", "property-finder"],
    },

    {
      id: "residential-units",
      title: "Residential Units",
      type: "unit-types",
      order: 5,
      status: "partial-source-data",
      content: {
        heading: "Homes for different lifestyles",
        description:
          "Property Finder lists apartments, duplexes, townhouses, and villas. Its unit tables contain floor-plan labels and sizes; the listing data should be rechecked against current availability before publication.",
        unitTypes: [
          {
            id: "apartments",
            name: "Apartments",
            configurations: [
              {
                bedrooms: 1,
                sizeRangeSqm: [95, 99],
                layoutTypes: [
                  { type: "B", sizeSqm: 95 },
                  { type: "A", sizeSqm: 99 },
                ],
                sourceIds: ["property-finder"],
              },
              {
                bedrooms: 2,
                sourceReportedRangeSqm: [131, 162],
                layouts: [
                  { type: "A", sizeSqm: 139 },
                  { type: "B", sizeSqm: 144 },
                  { type: "C", sizeSqm: 136 },
                  { type: "D", sizeSqm: 131 },
                  { type: "E", sizeSqm: 162 },
                  { type: "F", sizeSqm: 134 },
                ],
                sourceIds: ["property-finder"],
              },
              {
                bedrooms: 3,
                sourceReportedRangeSqm: [163, 188],
                layouts: [
                  { type: "A", sizeSqm: 174 },
                  { type: "B", sizeSqm: 178 },
                  { type: "C", sizeSqm: 186 },
                  { type: "D", sizeSqm: 188 },
                  { type: "E", sizeSqm: 168 },
                  { type: "F", sizeSqm: 164 },
                  { type: "G", sizeSqm: 163 },
                  { type: "H", sizeSqm: 164 },
                  { type: "I", sizeSqm: 181 },
                ],
                sourceIds: ["property-finder"],
              },
            ],
          },
          {
            id: "duplexes",
            name: "Duplexes",
            configurations: [
              {
                bedrooms: 2,
                sizeSqm: 182,
                layoutTypes: [{ type: "A", sizeSqm: 182 }],
                sourceIds: ["property-finder"],
              },
              {
                bedrooms: 3,
                sizeSqm: 218,
                layoutTypes: [{ type: "A", sizeSqm: 218 }],
                sourceIds: ["property-finder"],
              },
            ],
          },
          {
            id: "townhouses",
            name: "Townhouses",
            configurations: [
              {
                bedrooms: 3,
                sourceReportedRangeSqm: [198, 250],
                layouts: [
                  { type: "A", sizeSqm: 198 },
                  { type: "B", sizeSqm: 221 },
                  { type: "C", sizeSqm: 250 },
                ],
                sourceStartingPriceEgp: 44000000,
                sourceIds: ["property-finder"],
              },
              {
                bedrooms: 4,
                sizeSqm: 237,
                layoutTypes: [{ type: "A", sizeSqm: 237 }],
                sourceStartingPriceEgp: 46000000,
                sourceIds: ["property-finder"],
              },
            ],
          },
          {
            id: "villas",
            name: "Villas",
            configurations: [
              {
                bedrooms: 4,
                sourceReportedRangeSqm: [319, 388],
                layouts: [
                  { type: "A", sizeSqm: 388 },
                  { type: "B", sizeSqm: 319 },
                  { type: "C", sizeSqm: 369 },
                ],
                sourceIds: ["property-finder"],
              },
            ],
          },
        ],
        floorPlans: {
          note: "Property Finder links several floor-plan images, but the files have not yet been downloaded into the local assets folder.",
          assets: [],
        },
      },
      assets: [],
      sources: ["property-finder"],
    },

    {
      id: "amenities",
      title: "Amenities & Facilities",
      type: "features",
      order: 6,
      status: "mixed-source-list",
      content: {
        heading: "Everyday convenience, wellness, and outdoor living",
        description:
          "The official ORA brochure lists core project features. Property Finder includes a broader amenities list; keep source attribution on individual features until each is confirmed by official project material.",
        features: [
          {
            id: "day-care",
            title: "Day Care",
            category: "family",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "pharmacy",
            title: "Pharmacy",
            category: "services",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "parks-water",
            title: "Parks & Water Features",
            category: "outdoors",
            sourceIds: ["ora-brochure", "property-finder"],
            verification: "brochure-listed",
          },
          {
            id: "clubhouse",
            title: "Clubhouse",
            category: "community",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "convenience-stores",
            title: "Convenience Stores",
            category: "retail",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "ev-charging",
            title: "Electric Charging Stations",
            category: "mobility",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "bike-running-lanes",
            title: "Bike & Running Lanes",
            category: "fitness",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "fitness-center",
            title: "Fitness Center",
            category: "fitness",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "football-academy",
            title: "Football Academy",
            category: "sports",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "clinics",
            title: "Clinics",
            category: "health",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "community-outlets",
            title: "Community Outlets",
            category: "community",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "entertainment-food",
            title: "Entertainment & Food and Beverage Centers",
            category: "retail-entertainment",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "sports-arena",
            title: "Sports Arena",
            category: "sports",
            sourceIds: ["ora-brochure"],
            verification: "brochure-listed",
          },
          {
            id: "retail-strip",
            title: "Retail Strip",
            category: "retail",
            sourceIds: ["ora-brochure", "property-finder"],
            verification: "brochure-listed",
          },
          {
            id: "swimming-pools",
            title: "Swimming Pools",
            category: "leisure",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "sports-courts",
            title: "Tennis, Basketball & Football Courts",
            category: "sports",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "jogging-tracks",
            title: "Jogging Tracks",
            category: "fitness",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "bbq-social-areas",
            title: "Social & BBQ Areas",
            category: "community",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "security",
            title: "24/7 Security",
            category: "security",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "parking",
            title: "Resident & Visitor Parking",
            category: "parking",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "kids-area",
            title: "Kids Area",
            category: "family",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "garage",
            title: "Garage",
            category: "parking",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "cafe-restaurants",
            title: "Cafés & Restaurants",
            category: "food",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "walkways",
            title: "Walkways",
            category: "outdoors",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "on-site-maintenance",
            title: "On-site Maintenance",
            category: "services",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
          {
            id: "laundry-dry-cleaning",
            title: "Laundry & Dry Cleaning Services",
            category: "services",
            sourceIds: ["property-finder"],
            verification: "third-party-source-only",
          },
        ],
      },
      assets: [],
      sources: ["ora-brochure", "property-finder"],
    },

    {
      id: "retail-entertainment",
      title: "Retail & Entertainment",
      type: "lifestyle",
      order: 7,
      status: "brochure-described",
      content: {
        heading: "A destination for dining and everyday experiences",
        description:
          "ORA's brochure says Solana East will feature an entertainment hub, a mall experience, and a range of dining options. The brochure also identifies retail strips, community outlets, entertainment and food-and-beverage centers.",
        highlights: [
          "Retail hub",
          "Dining options",
          "Community outlets",
          "Entertainment and food-and-beverage centers",
          "Retail strip",
        ],
        note: "These are brochure-described planned features; do not imply that they are currently open or operating.",
      },
      assets: [],
      sources: ["ora-brochure"],
    },

    {
      id: "prices",
      title: "Prices & Availability",
      type: "pricing",
      order: 8,
      status: "volatile-third-party-data",
      content: {
        currency: "EGP",
        disclaimer:
          "Prices and availability are time-sensitive and must be reconfirmed with the developer or an authorized sales representative before publication.",
        propertyFinderLaunchPriceEgp: 14000000,
        propertyFinderStartingPriceEgp: 13900000,
        unitPriceExamples: [
          {
            areaSqm: 95,
            priceEgp: 13955000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
          },
          {
            areaSqm: 99,
            priceEgp: 15724000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
          },
          {
            areaSqm: 128,
            priceEgp: 18707000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
          },
          {
            areaSqm: 128,
            priceEgp: 19627000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
            note: "Different price for the same stated area; unit-specific differences are not confirmed.",
          },
          {
            areaSqm: 132,
            priceEgp: 20378000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
          },
          {
            areaSqm: 132,
            priceEgp: 20564000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
            note: "Different price for the same stated area; unit-specific differences are not confirmed.",
          },
          {
            areaSqm: 171,
            priceEgp: 30331000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
          },
          {
            areaSqm: 173,
            priceEgp: 28160000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
          },
          {
            areaSqm: 173,
            priceEgp: 28415000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
            note: "Different price for the same stated area; unit-specific differences are not confirmed.",
          },
          {
            areaSqm: 177,
            priceEgp: 29532000,
            sourceIds: ["solana-east-guide"],
            sourceDate: "2026-09",
            status: "historical-source-example",
          },
        ],
        note:
          "The Solana East guide's listed examples were previously captured with a September 2026 reference. Confirm currency and current validity directly before displaying them as active offers.",
      },
      assets: [],
      sources: ["property-finder", "solana-east-guide"],
    },

    {
      id: "payment-plans",
      title: "Payment Plans",
      type: "payment-plans",
      order: 9,
      status: "needs-current-confirmation",
      content: {
        disclaimer:
          "Payment terms vary by unit, campaign, and date. Treat these as third-party listing claims until confirmed in writing.",
        plans: [
          {
            downPaymentPercent: 5,
            installmentYears: 6,
            sourceIds: ["property-finder"],
            status: "third-party-source-claim",
          },
          {
            downPaymentPercent: 5,
            installmentYears: 9,
            sourceIds: ["property-finder"],
            status: "third-party-source-claim",
          },
        ],
        propertyFinderPaymentPlanCards: [
          {
            option: 1,
            downPaymentPercent: 5,
            detail: "At sales launch",
          },
          {
            option: 2,
            downPaymentPercent: 5,
            detail: "At sales launch",
          },
          {
            option: 3,
            downPaymentPercent: 5,
            detail: "At sales launch",
          },
        ],
        note:
          "Property Finder's visible payment-plan cards do not expose all installment details in the captured page content. Do not invent durations or installment amounts.",
      },
      assets: [],
      sources: ["property-finder"],
    },

    {
      id: "timeline",
      title: "Project Timeline",
      type: "timeline",
      order: 10,
      status: "third-party-date",
      content: {
        milestones: [
          {
            id: "construction-start",
            title: "Construction Started",
            date: "2025-06-02",
            sourceIds: ["property-finder"],
          },
          {
            id: "expected-completion",
            title: "Expected Completion",
            date: "2030-04-30",
            sourceIds: ["property-finder"],
            note: "Property Finder lists April 2030 / Q2 2030. Verify with the developer before publishing as a commitment.",
          },
        ],
        deliveryDateDisplay: "April 2030",
        deliveryDateSource: "property-finder",
      },
      assets: [],
      sources: ["property-finder"],
    },

    {
      id: "gallery",
      title: "Gallery",
      type: "gallery",
      order: 11,
      status: "assets-not-downloaded",
      content: {
        description:
          "A gallery of approved architectural renderings, landscape visuals, masterplan imagery, and floor plans.",
        groups: [
          {
            id: "architecture",
            title: "Architecture",
            items: [],
          },
          {
            id: "landscape",
            title: "Landscape & Water Features",
            items: [],
          },
          {
            id: "masterplan",
            title: "Masterplan",
            items: [],
          },
          {
            id: "floor-plans",
            title: "Floor Plans",
            items: [],
          },
        ],
        note:
          "Image URLs have not yet been downloaded or inventoried. Populate items only after each asset is located, checked, and assigned a local path or stable source URL.",
      },
      assets: [],
      sources: ["ora-brochure", "solana-east-guide", "property-finder"],
    },

    {
      id: "developer",
      title: "About ORA Developers",
      type: "developer-profile",
      order: 12,
      status: "basic-information",
      content: {
        name: "ORA Developers",
        chairmanAndCEO: "Naguib Sawiris",
        description:
          "ORA describes its approach as creating lifestyle destinations that combine considered design, amenities, community, and quality of living.",
        website: "https://www.oradevelopers.com/",
        note:
          "Use the corporate site for current official company profile and brand assets. Do not copy Solana West-specific project facts into Solana East content.",
      },
      assets: [],
      sources: ["ora-brochure", "property-finder"],
    },

    {
      id: "faq",
      title: "Frequently Asked Questions",
      type: "faq",
      order: 13,
      status: "draft-content",
      content: {
        items: [
          {
            question: "Where is Solana East located?",
            answer:
              "Solana East is listed in New Cairo's Fifth Settlement in East Cairo, Egypt.",
            sourceIds: ["solana-east-guide", "property-finder"],
          },
          {
            question: "Who is developing Solana East?",
            answer: "Solana East is developed by ORA Developers.",
            sourceIds: ["ora-brochure", "property-finder"],
          },
          {
            question: "What types of homes are listed?",
            answer:
              "Property Finder lists apartments, duplexes, townhouses, and villas. Confirm current availability and exact unit specifications before making a purchase decision.",
            sourceIds: ["property-finder"],
          },
          {
            question: "When is the expected delivery?",
            answer:
              "Property Finder lists April 2030 as the expected completion/delivery date. Confirm the current contractual delivery date with the developer.",
            sourceIds: ["property-finder"],
          },
          {
            question: "Are published prices final?",
            answer:
              "No. Prices, availability, and purchase conditions may change. Request a dated written offer for a specific unit.",
            sourceIds: ["property-finder"],
          },
        ],
      },
      assets: [],
      sources: ["solana-east-guide", "property-finder", "ora-brochure"],
    },

    {
      id: "contact",
      title: "Request Information",
      type: "contact",
      order: 14,
      status: "third-party-contact",
      content: {
        heading: "Request the latest offer",
        description:
          "Ask for current availability, unit plans, prices, and payment terms for your preferred unit type and budget.",
        formFields: [
          { name: "name", label: "Full name", type: "text", required: true },
          { name: "phone", label: "Phone number", type: "tel", required: true },
          { name: "unitType", label: "Preferred unit type", type: "select", required: false },
          { name: "areaRange", label: "Preferred area", type: "text", required: false },
          { name: "budget", label: "Budget", type: "text", required: false },
          { name: "message", label: "Message", type: "textarea", required: false },
        ],
        thirdPartyContact: {
          phone: "+20 120 898 6606",
          sourceIds: ["solana-east-guide"],
          note:
            "This contact is displayed by the independent project guide, not verified here as an official ORA sales number. Confirm before using on a production site.",
        },
        disclaimer:
          "Submitting an inquiry does not reserve a unit or confirm a price. Current prices, availability, and contractual terms must be confirmed by an authorized representative.",
      },
      assets: [],
      sources: ["solana-east-guide"],
    },
  ],

  sources: [
    {
      id: "ora-project-page",
      name: "ORA Developers — Solana by ORA project page",
      url: "https://www.oradevelopers.com/properties/solana-by-ora",
      sourceType: "developer-website",
      relevance:
        "The supplied page is for Solana in New Zayed, not Solana East. Use only for corporate/developer context unless a fact explicitly applies to both projects.",
      trustLevel: "official-but-different-project",
    },
    {
      id: "solana-east-guide",
      name: "Solana East Egypt — Project Information Guide",
      url: "https://solanaeastegypt.com/",
      sourceType: "independent-project-guide",
      relevance:
        "Project overview, masterplan explanation, location guidance, contact details, and price examples.",
      trustLevel: "third-party",
    },
    {
      id: "property-finder",
      name: "Property Finder — Solana East by ORA Developers",
      url: "https://www.propertyfinder.eg/en/new-projects/ora-developers/solana-east",
      sourceType: "real-estate-listing",
      relevance:
        "Unit types and layouts, sample prices, payment-plan claims, timeline, amenities, and project descriptions.",
      trustLevel: "third-party-listing",
    },
    {
      id: "ora-brochure",
      name: "ORA Egypt corporate brochure (2024 digital version), Solana East pages",
      url: "https://ebrochures.ora-egypt.com/assets/documents/Ora_Egypt/Ora_Egypt_Brochure_Digital_version_32_comp_final.pdf",
      sourceType: "developer-brochure",
      relevance:
        "Official project concept, masterplan, land area, unit count, product-mix graphic, and planned amenities.",
      trustLevel: "official-brochure",
      note:
        "This is a corporate brochure containing both Solana West and Solana East. Use the Solana East pages only; do not mix West project data into East.",
    },
  ],

  researchNotes: [
    {
      id: "separate-projects",
      severity: "critical",
      note:
        "The supplied ORA web page URL says solana-by-ora and is about Solana in New Zayed. It is not a Solana East page. Solana East is the East Cairo/New Cairo project.",
    },
    {
      id: "land-area-and-unit-count",
      severity: "info",
      note:
        "The ORA brochure's Solana East section lists 167.67 feddan (704,070 sqm) and 1,063 units.",
    },
    {
      id: "price-conflicts",
      severity: "warning",
      note:
        "The sources contain different starting prices and price examples. Store prices with source and capture date; never merge into one definitive price without verification.",
    },
    {
      id: "unit-size-conflicts",
      severity: "warning",
      note:
        "Property Finder contains differing size ranges in narrative copy, tables, and FAQ content. The structured unit entries above preserve table values where available; validate against actual floor-plan assets and current developer inventory.",
    },
    {
      id: "location-time-conflicts",
      severity: "warning",
      note:
        "Travel-time claims vary between the ORA brochure, the independent guide, and Property Finder. Treat all times as approximate marketing claims and verify routes before publication.",
    },
    {
      id: "asset-collection-incomplete",
      severity: "warning",
      note:
        "This file currently indexes asset needs and source pages, but does not yet contain a downloaded local image library. Populate `assets/` and gallery items after downloading permitted files and recording original URLs.",
    },
    {
      id: "third-party-amenities",
      severity: "warning",
      note:
        "Amenities that appear only on Property Finder are marked third-party-source-only. Confirm them against official project materials before presenting them as confirmed developer commitments.",
    },
  ],

  assetManifest: {
    localRoot: "/assets/solana-east/",
    status: "not-downloaded",
    plannedFolders: [
      "hero/",
      "architecture/",
      "landscape/",
      "masterplan/",
      "unit-floor-plans/",
      "brochures/",
      "logos/",
      "video/",
    ],
    itemSchema: {
      id: "unique-asset-id",
      type: "image | video | pdf | logo | floor-plan",
      localPath: null,
      originalUrl: null,
      sourceId: null,
      alt: "",
      caption: "",
      rightsStatus: "verify-before-use",
      downloaded: false,
    },
  },
};

export default solanaEastContent;
