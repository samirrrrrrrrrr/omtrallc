import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "../../../hooks/useInView";

const mainImage = {
  src: "/images/products/nosotros.webp",
  alt: "Oil packaging and distribution",
};

const features = [
  {
    titleKey: "about_feature_quality_title",
    descriptionKey: "about_feature_quality_desc",
    icon: "ri-shield-check-line",
  },
  {
    titleKey: "about_feature_distribution_title",
    descriptionKey: "about_feature_distribution_desc",
    icon: "ri-truck-line",
  },
  {
    titleKey: "about_feature_customer_title",
    descriptionKey: "about_feature_customer_desc",
    icon: "ri-hand-heart-line",
  },
  {
    titleKey: "about_feature_certified_title",
    descriptionKey: "about_feature_certified_desc",
    icon: "ri-award-line",
  },
];

export default function Nosotros() {
  const { t } = useTranslation();
  const { ref: sectionRef, inView } = useInView({ threshold: 0.18, once: true });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="nosotros" className="py-14 md:py-24 bg-white">
      <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <span className="text-xs font-semibold text-[#4a7c2f] bg-[#4a7c2f]/10 px-4 py-1.5 rounded-full mb-4">
            {t("about_badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1a2e0d] text-center leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("about_title")}
          </h2>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-12 items-center">
          <div
            className="relative rounded-[32px] overflow-hidden shadow-[0_35px_90px_rgba(15,23,42,0.09)] min-h-[420px] bg-slate-100"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-sm">
                <i className="ri-flask-line text-[#4a7c2f] text-xl" />
                <span className="text-sm font-semibold text-slate-900">{t("about_process_label")}</span>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col gap-6"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}
          >
            <p className="max-w-xl text-sm uppercase tracking-[0.24em] text-[#4a7c2f]/90 font-semibold">
              {t("about_partner")}
            </p>
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-semibold text-[#12200d] tracking-tight">
                {t("about_strategy")}
              </h3>
              <p className="text-gray-600 text-base leading-8">
                {t("about_p3")}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => {
                const isActive = activeCard === index;
                return (
                  <div
                    key={feature.titleKey}
                    className={`group rounded-3xl border border-slate-200 bg-slate-50/90 p-5 transition duration-300 ${isActive ? "shadow-[0_20px_50px_rgba(15,23,42,0.12)] bg-white" : "shadow-sm"}`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                    style={{
                      transform: inView ? "translateY(0)" : "translateY(18px)",
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.6s ease ${0.15 + index * 0.06}s, transform 0.6s ease ${0.15 + index * 0.06}s`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4a7c2f]/10 text-[#4a7c2f] text-xl">
                        <i className={feature.icon} />
                      </span>
                      <h4 className="text-base font-semibold text-slate-900">{t(feature.titleKey)}</h4>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{t(feature.descriptionKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
