import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "../../../hooks/useInView";

/* ─── Types ─────────────────────────────────────────────── */
interface Presentation {
  label: string;
  icon: string;
  img: string;
}

interface OilProduct {
  id: string;
  nameKey: string;
  typeKey: string;
  accent: string;
  presentations: Presentation[];
}

interface Brand {
  id: string;
  labelKey: string;
  tagline: string;
  color: string;
  products: OilProduct[];
}

/* ─── Shared presentations for Delsarten line ───────────── */
const publicImage = (file: string) => `${import.meta.env.BASE_URL}images/products/${file}`;

const imageFallbacks: Record<string, string[]> = {
  "alimorca-soya-1000ml.png": [
    "alimorca-soya-1000ml.png",
    "alimorca-soya-900ml.png",
    "envasado.webp",
  ],
};

const resolveFallbackImage = (src: string) => {
  const fileName = src.split("/").pop() || src;
  return imageFallbacks[fileName] ? imageFallbacks[fileName].map(publicImage) : [src];
};

const delsartenPresentations = (seq: string): Presentation[] => [
  {
    label: "430 ml",
    icon: "ri-flask-line",
    img: publicImage("delsarten-oleina-430ml.png"),
  },

  {
    label: "500 ml",
    icon: "ri-flask-line",
    img: publicImage("delsarten-oleina-500ml.png"),
  },
  {
    label: "828 ml",
    icon: "ri-flask-line",
    img: publicImage("delsarten-oleina-828ml.png"),
  },
  {
    label: "900 ml",
    icon: "ri-flask-line",
    img: publicImage("delsarten-oleina-900ml.png"),
  },
  {
    label: "1 Litro",
    icon: "ri-cup-line",
    img: publicImage("delsarten-oleina-1000ml.png"),
  },
  {
    label: "9 Litros",
    icon: "ri-cup-line",
    img: publicImage("delsarten-oleina-9l.png"),
  },
  {
    label: "20 Litros",
    icon: "ri-archive-line",
    img: publicImage("delsarten-oleina-18l.png"),
  },
];

const delsartenSoyaPresentations = (): Presentation[] => [
  { label: "430 ml", icon: "ri-flask-line", img: publicImage("delsarten-430ml.png") },
  { label: "500 ml", icon: "ri-flask-line", img: publicImage("delsarten-500ml.png") },
  { label: "750 ml", icon: "ri-flask-line", img: publicImage("delsarten-750ml.png") },
  { label: "828 ml", icon: "ri-flask-line", img: publicImage("delsarten-828ml.png") },
  { label: "900 ml", icon: "ri-flask-line", img: publicImage("delsarten-900ml.png") },
  { label: "1 Litro", icon: "ri-cup-line", img: publicImage("delsarten-1000ml.png") },
  { label: "9 Litros", icon: "ri-cup-line", img: publicImage("delsarten-9l.png") },
  { label: "18 Litros", icon: "ri-archive-line", img: publicImage("delsarten-18l.png") },
];

const alimorcaPalmaPresentations = (): Presentation[] => [
  { label: "430 ml", icon: "ri-flask-line", img: publicImage("oleina-430ml.png") },
  { label: "500 ml", icon: "ri-flask-line", img: publicImage("oleina-500ml.png") },
  { label: "750 ml", icon: "ri-flask-line", img: publicImage("oleina-750ml.png") },
  { label: "828 ml", icon: "ri-flask-line", img: publicImage("oleina-828ml.png") },
  { label: "900 ml", icon: "ri-flask-line", img: publicImage("oleina-900ml.png") },
  { label: "1 Litro", icon: "ri-cup-line", img: publicImage("oleina-1000ml.png") },
  { label: "9 Litros", icon: "ri-cup-line", img: publicImage("oleina-9l.png") },
  { label: "18 Litros", icon: "ri-archive-line", img: publicImage("oleina-18l.png") },
];

/* ─── Data ───────────────────────────────────────────────── */
const brands: Brand[] = [
  {
    id: "delsarten",
    labelKey: "brand_delsarten",
    tagline: "brand_delsarten_tagline",
    color: "#4a7c2f",
    products: [
      {
        id: "ds-Oleina de Palma",
        nameKey: "Oleina de Palma Delsarten",
        typeKey: "Oleina de Palma",
        accent: "#e8f5e0",
        presentations: delsartenPresentations("ds-veg"),
      },
      {
        id: "ds-Soya",
        nameKey: "Aceite de soya Delsarten",
        typeKey: "Aceite Soya",
        accent: "#fef9e7",
        presentations: delsartenSoyaPresentations(),
      },
    ],
  },
  {
    id: "alimorca",
    labelKey: "brand_miaceite",
    tagline: "brand_miaceite_tagline",
    color: "#c47f17",
    products: [
      {
        id: "ma-soya",
        nameKey: "ma_soya_name",
        typeKey: "ma_soya_type",
        accent: "#fef9e7",
        presentations: [
          { label: "430ml", icon: "ri-flask-line", img: publicImage("alimorca-soya-430ml.png") },
          { label: "500 ml", icon: "ri-flask-line", img: publicImage("alimorca-soya-500ml.png") },
          { label: "750 ml", icon: "ri-flask-line", img: publicImage("alimorca-soya-750ml.png") },
          { label: "828 ml", icon: "ri-flask-line", img: publicImage("alimorca-soya-828ml.png") },
          { label: "900 ml", icon: "ri-flask-line", img: publicImage("alimorca-soya-900ml.png") },
          { label: "1 Litro", icon: "ri-flask-line", img: publicImage("alimorca-soya-1000ml.png") },
          { label: "9 Litros", icon: "ri-cup-line", img: publicImage("alimorca-soya-9l.png") },
          { label: "18 Litros", icon: "ri-archive-line", img: publicImage("alimorca-soya-18l.png") },
        ],
      },
      {
        id: "ma-palma",
        nameKey: "ma_palma_name",
        typeKey: "ma_palma_type",
        accent: "#f9f1dd",
        presentations: alimorcaPalmaPresentations(),
      },
    ],
  },
];

/* ─── Product Card ───────────────────────────────────────── */
function ProductCard({ product, brandColor }: { product: OilProduct; brandColor: string }) {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = product.presentations.length;

  const goTo = useCallback(
    (idx: number, manual = false) => {
      if (animating) return;
      if (manual) setPaused(true);
      setAnimating(true);
      setTimeout(() => {
        setActiveIdx((idx + total) % total);
        setAnimating(false);
      }, 260);
    },
    [animating, total]
  );

  const goPrev = useCallback(() => goTo(activeIdx - 1, true), [activeIdx, goTo]);
  const goNext = useCallback(() => goTo(activeIdx + 1, true), [activeIdx, goTo]);

  const goNextAuto = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % total);
      setAnimating(false);
    }, 260);
  }, [animating, total]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(goNextAuto, 3200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, goNextAuto]);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const active = product.presentations[activeIdx];

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col w-full"
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Image area */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden rounded-t-2xl"
        style={{
          background: `linear-gradient(180deg, ${brandColor} 0%, ${brandColor}B0 30%, rgba(255,214,90,0.40) 55%, rgba(255,255,255,0.95) 100%)`,
          minHeight: 320,
          padding: 28,
        }}
      >
        <div
          className="flex h-full w-full items-center justify-center cursor-zoom-in relative z-10"
          onClick={() => setSelectedImage(active.img)}
        >
          <img
            key={`${product.id}-${activeIdx}`}
            src={active.img}
            alt={`${t(product.nameKey)} ${active.label}`}
            onError={(event) => {
              const currentSrc = event.currentTarget.src;
              const fallbackList = resolveFallbackImage(currentSrc);
              const currentIndex = fallbackList.indexOf(currentSrc);
              const nextSrc = fallbackList[currentIndex + 1] || publicImage("envasado.webp");
              event.currentTarget.src = nextSrc;
            }}
            className="object-contain"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: 280,
              maxHeight: 280,
              objectFit: "contain",
              objectPosition: "center",
              opacity: animating ? 0 : 1,
              transform: animating ? "scale(0.88)" : "scale(1)",
              transition: "opacity 0.26s ease, transform 0.26s ease",
            }}
          />
        </div>

        {/* Badge */}
        <div
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.88)", color: brandColor }}
        >
          {t(product.typeKey)}
        </div>

        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
          style={{ background: "rgba(255,255,255,0.9)", border: `1.5px solid ${brandColor}44`, color: brandColor }}
          aria-label="Anterior"
        >
          <i className="ri-arrow-left-s-line text-base" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
          style={{ background: "rgba(255,255,255,0.9)", border: `1.5px solid ${brandColor}44`, color: brandColor }}
          aria-label="Siguiente"
        >
          <i className="ri-arrow-right-s-line text-base" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {product.presentations.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, true)}
              className="cursor-pointer rounded-full transition-all duration-200"
              style={{
                width: i === activeIdx ? 16 : 5,
                height: 5,
                background: i === activeIdx ? brandColor : brandColor + "44",
              }}
              aria-label={`Presentación ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:bg-white"
              aria-label="Cerrar imagen"
            >
              <i className="ri-close-line text-xl" />
            </button>
            <img
              src={selectedImage}
              alt="Vista ampliada del producto"
              className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-4">
        <h3
          className="text-lg font-bold text-[#1a2e0d] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t(product.nameKey)}
        </h3>

        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: brandColor }}>
          {t("products_presentations")}
        </p>

        {/* Scrollable pills */}
        <div
          className="flex gap-1.5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {product.presentations.map((p, i) => (
            <button
              key={i}
              onClick={() => goTo(i, true)}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap flex-shrink-0 transition-all duration-200"
              style={{
                background: i === activeIdx ? brandColor : "transparent",
                color: i === activeIdx ? "#fff" : brandColor,
                border: `1.5px solid ${i === activeIdx ? brandColor : brandColor + "55"}`,
              }}
            >
              <i className={`${p.icon} text-xs`} />
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function Productos() {
  const { t } = useTranslation();
  const [activeBrand, setActiveBrand] = useState(0);
  const { ref: sectionRef, inView } = useInView();

  const brand = brands[activeBrand];

  return (
    <section id="productos" className="py-16 md:py-28" style={{ background: "#f7f8f4" }}>
      <div className="w-full px-4 md:px-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs font-bold text-[#4a7c2f] bg-[#4a7c2f]/10 px-4 py-1.5 rounded-full">
            {t("products_badge")}
          </span>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1a2e0d] mt-4 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("products_title")}
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            {t("products_subtitle")}
          </p>
        </div>

        {/* Brand Tabs */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div
            className="flex rounded-xl p-1.5 gap-1.5 w-full max-w-xs"
            style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            {brands.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActiveBrand(i)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-300 whitespace-nowrap"
                style={{
                  background: i === activeBrand ? b.color : "transparent",
                  color: i === activeBrand ? "#fff" : "#666",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: i === activeBrand ? "#fff" : b.color }}
                />
                {t(b.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-xs font-medium mb-6 md:mb-10" style={{ color: brand.color }}>
          {t(brand.tagline)}
        </p>

        {/* Products Grid — 1 col mobile, 2 col tablet+ */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
        >
          {brand.products.map((product, i) => (
            <div
              key={product.id}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
              }}
            >
              <ProductCard product={product} brandColor={brand.color} />
            </div>
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-gray-400 mt-8 flex items-center justify-center gap-1.5">
          <i className="ri-hand-coin-line" />
          {t("products_hint")}
        </p>
      </div>
    </section>
  );
}
