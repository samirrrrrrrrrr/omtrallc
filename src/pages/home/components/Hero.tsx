import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const COMPANY_EMAIL = "omtrallc02@gmail.com";

export default function Hero() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const base = "transition-all duration-700 ease-out";
  const hide = "opacity-0 translate-y-6";
  const show = "opacity-100 translate-y-0";

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://storage.readdy-site.link/project_files/07e9406b-6758-4e8c-9947-48a24f745e80/02a6bce6-d2a1-41f6-a136-46edf36283b4_10_la_palma_un_cultivo_clave_que_aporta_sostenibilidad_al_pais-e1620938959113.jpg?v=87c064ae6d571f1c3471e992f0f4ddcb"
          alt="Cultivo de palma"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-6 flex flex-col items-start justify-center min-h-screen pt-24 pb-16">
        {/* Badge */}
        <div
          className={`${base} ${visible ? show : hide} flex items-center gap-2 bg-[#8ab83a]/90 text-white text-xs font-bold px-3 md:px-4 py-1.5 rounded-full mb-4 md:mb-5 backdrop-blur-sm`}
          style={{ transitionDelay: "0ms" }}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-award-line" />
          </div>
          {t("hero_badge")}
        </div>

        {/* Title */}
        <h1
          className={`${base} ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-3 md:mb-4`}
          style={{ fontFamily: "'Playfair Display', serif", transitionDelay: "150ms" }}
        >
          {t("hero_title")}
          <br />
          <span className="text-[#8ab83a]">{t("hero_title2")}</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`${base} ${visible ? show : hide} text-white/85 text-sm md:text-lg max-w-xl mb-7 md:mb-10 leading-relaxed`}
          style={{ transitionDelay: "320ms" }}
        >
          {t("hero_subtitle")}
        </p>

        {/* Buttons */}
        <div
          className={`${base} ${visible ? show : hide} flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto`}
          style={{ transitionDelay: "480ms" }}
        >
          <button
            onClick={() => scrollTo("productos")}
            className="px-6 md:px-7 py-3 bg-[#4a7c2f] hover:bg-[#2d5016] text-white font-semibold rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap hover:scale-105 text-sm md:text-base text-center"
          >
            {t("hero_btn1")}
          </button>
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 md:px-7 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/50 font-semibold rounded-full cursor-pointer transition-all duration-200 backdrop-blur-sm whitespace-nowrap hover:scale-105 text-sm md:text-base text-center"
          >
            {t("hero_btn2")}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-5 h-5 flex items-center justify-center text-white/60">
            <i className="ri-arrow-down-s-line text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
