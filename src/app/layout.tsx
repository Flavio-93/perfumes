import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { businessData } from "@/data/businessContent";
import { CartProvider } from "@/context/CartContext";
import { StockProvider } from "@/context/StockContext";
import { SearchProvider } from "@/context/SearchContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Perfumes Árabes en Perú 100% Originales | ISF Fragance Oud & Beauty",
  description: businessData.seoDescription || businessData.tagline,
  keywords: [
    "perfumes arabes peru",
    "perfumes arabes lima",
    "perfumes de dubai peru",
    "comprar perfumes arabes peru",
    "lattafa peru",
    "afnan peru",
    "armaf peru",
    "club de nuit peru",
    "khamrah peru",
    "9pm afnan peru",
    "french avenue peru",
    "al haramain peru",
    "decants perfumes arabes peru",
    "perfumeria arabe lima",
    "tienda de perfumes arabes peru"
  ],
  authors: [{ name: businessData.name }],
  creator: businessData.name,
  publisher: businessData.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Perfumes Árabes en Perú 100% Originales | ISF Fragance Oud & Beauty",
    description: "Tienda online de perfumes árabes originales importados de Dubái en Perú. Lattafa, Afnan, Armaf, French Avenue y decants con envíos rápidos a todo el Perú.",
    type: "website",
    locale: "es_PE",
    siteName: businessData.name,
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "ISF Fragance Oud & Beauty - Perfumes Árabes Originales en Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfumes Árabes en Perú 100% Originales | ISF Fragance",
    description: "Compra perfumes árabes importados de Dubái en Perú. Catálogo completo con envíos a Lima y provincias.",
    images: ["/logo.png"],
  },
  other: {
    "geo.region": "PE-LMA",
    "geo.placename": "Lima, Perú",
    "geo.position": "-12.046374;-77.042793",
    "ICBM": "-12.046374, -77.042793"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org para SEO Local y Geo-Targeting en Perú
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "additionalType": "https://schema.org/Store",
    "name": businessData.name,
    "legalName": businessData.legalName,
    "alternateName": "ISF Perfumes Árabes Perú",
    "description": businessData.seoDescription,
    "image": "/logo.png",
    "telephone": `+${businessData.whatsappNumber}`,
    "email": businessData.email,
    "priceRange": "S/. 25 - S/. 320",
    "currenciesAccepted": "PEN",
    "paymentAccepted": "Yape, Plin, Transferencia BCP, BBVA, Interbank, Tarjeta de Crédito, Tarjeta de Débito",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lima",
      "addressRegion": "Lima",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -12.046374,
      "longitude": -77.042793
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Perú"
      },
      {
        "@type": "City",
        "name": "Lima"
      },
      {
        "@type": "City",
        "name": "Arequipa"
      },
      {
        "@type": "City",
        "name": "Trujillo"
      },
      {
        "@type": "City",
        "name": "Cusco"
      },
      {
        "@type": "City",
        "name": "Chiclayo"
      },
      {
        "@type": "City",
        "name": "Piura"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo de Perfumes Árabes Originales",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Perfumes Árabes Frascos Sellados",
            "description": "Perfumes originales importados de Dubái: Lattafa, Afnan, Armaf, French Avenue, Al Haramain con envío en Perú."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Decants y Muestras de Perfumes Árabes 3ml",
            "description": "Muestras de alta precisión para probar el aroma antes de comprar en Perú."
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": businessData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <html lang="es-PE" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="geo.region" content="PE-LMA" />
        <meta name="geo.placename" content="Lima, Perú" />
        <meta name="geo.position" content="-12.046374;-77.042793" />
        <meta name="ICBM" content="-12.046374, -77.042793" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <CartProvider>
          <StockProvider>
            <SearchProvider>{children}</SearchProvider>
          </StockProvider>
        </CartProvider>
      </body>
    </html>
  );
}
