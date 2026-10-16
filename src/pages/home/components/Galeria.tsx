import { useTranslation } from "react-i18next";
import { useInView } from "../../../hooks/useInView";

const cards = [
  {
    img: "https://static.readdy.ai/image/018ddc3d7817427364c0cb1bbc5d42bd/20441a165c6e74fff7e1ab490379a54d.jpeg",
    icon: "ri-settings-3-line",
    number: "1.",
    titleKey: "gallery_card1_title",
    descKey: "gallery_card1_desc",
  },
  {
    img: "/images/products/envasado.webp",
    icon: "ri-box-3-line",
    number: "2.",
    titleKey: "gallery_card2_title",
    descKey: "gallery_card2_desc",
  },
  {
    img: "/images/products/cajas.png",
    icon: "ri-clipboard-line",
    number: "3.",
    titleKey: "gallery_card3_title",
    descKey: "gallery_card3_desc",
  },
  {
    img: "/images/products/almacenamiento.avif",
    icon: "ri-store-2-line",
    number: "4.",
    titleKey: "gallery_card4_title",
    descKey: "gallery_card4_desc",
  },
];

export default function Galeria() {
  const { t } = useTranslation();
  const { ref: sectionRef, inView } = useInView();

  return (
    <section
      id="galeria"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4f8f0 0%, #fafbf8 60%, #ffffff 100%)" }}
    >
      <div className="absolute top-0 left-0 w-52 h-52 pointer-events-none z-0 opacity-40">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="60" cy="80" rx="55" ry="25" fill="#7db356" opacity="0.35" transform="rotate(-40 60 80)" />
          <ellipse cx="30" cy="130" rx="48" ry="20" fill="#a0c878" opacity="0.25" transform="rotate(-55 30 130)" />
          <ellipse cx="90" cy="40" rx="38" ry="16" fill="#b5d48e" opacity="0.2" transform="rotate(-25 90 40)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none z-0 opacity-30">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="140" cy="70" rx="50" ry="22" fill="#7db356" opacity="0.3" transform="rotate(40 140 70)" />
          <ellipse cx="170" cy="120" rx="42" ry="18" fill="#a0c878" opacity="0.2" transform="rotate(55 170 120)" />
        </svg>
      </div>

      <div className="w-full px-4 md:px-8 max-w-[1300px] mx-auto relative z-10">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <div className="mb-4 text-[#2d4e1a]">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="20" width="36" height="22" rx="2" stroke="#2d4e1a" strokeWidth="2.2" fill="none" />
              <rect x="16" y="28" width="6" height="14" rx="1" stroke="#2d4e1a" strokeWidth="2" fill="none" />
              <rect x="26" y="28" width="6" height="14" rx="1" stroke="#2d4e1a" strokeWidth="2" fill="none" />
              <path d="M4 22L24 8L44 22" stroke="#2d4e1a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <rect x="20" y="8" width="8" height="12" rx="1" stroke="#2d4e1a" strokeWidth="1.8" fill="none" />
            </svg>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-[2.9rem] font-bold text-[#1a2e0d] text-center mb-5"
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.15 }}
          >
            {t("gallery_title")}
          </h2>
          <p className="text-gray-500 text-center text-[15px] md:text-base max-w-lg leading-relaxed">
            {t("gallery_subtitle")}
          </p>

          <div className="flex items-center gap-3 mt-8 text-[#5a8a3a]">
            <div className="w-10 h-[1.5px] bg-[#5a8a3a] rounded-full"></div>
            <i className="ri-leaf-line text-base" />
            <div className="w-10 h-[1.5px] bg-[#5a8a3a] rounded-full"></div>
          </div>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-visible flex flex-col bg-white"
              style={{
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${i * 110}ms, transform 0.65s ease ${i * 110}ms`,
              }}
            >
              <div className="rounded-t-2xl overflow-hidden relative" style={{ height: 220 }}>
                <img
                  src={card.img}
                  alt={t(card.titleKey)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-center" style={{ marginTop: -28, marginBottom: 0, position: "relative", zIndex: 10 }}>
                <div
                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                  style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.11)" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#f0f7ea] flex items-center justify-center text-[#2d5c14]">
                    <i className={`${card.icon} text-[19px]`} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center px-5 pt-4 pb-7 flex-grow">
                <h3
                  className="text-[16px] font-bold text-[#1a2e0d] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {card.number} {t(card.titleKey)}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed flex-grow">
                  {t(card.descKey)}
                </p>
                <div className="w-8 h-[2px] bg-[#5a8a3a] rounded-full mt-6 opacity-60"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
