import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const LOGO_URL =
  "https://static.readdy.ai/image/018ddc3d7817427364c0cb1bbc5d42bd/32e517323d28e10a21b405e6a4433e12.jpeg";
const COMPANY_EMAIL = "omtrallc02@gmail.com";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"es" | "en">(() =>
    i18n.language?.startsWith("en") ? "en" : "es"
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentLang(i18n.language?.startsWith("en") ? "en" : "es");
  }, [i18n.language]);

  const toggleLang = () => {
    const next = currentLang === "es" ? "en" : "es";
    setCurrentLang(next);
    i18n.changeLanguage(next);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: t("nav_home"), id: "home" },
    { label: t("nav_about"), id: "nosotros" },
    { label: t("nav_products"), id: "productos" },
    { label: t("nav_gallery"), id: "galeria" },
    { label: t("nav_contact"), id: "contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="cursor-pointer flex items-center gap-3">
          <div className="h-12 flex items-center justify-center">
            <img
              src={LOGO_URL}
              alt="Logo"
              className="h-12 w-auto object-contain max-w-[160px]"
            />
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer hover:text-[#8ab83a] ${
                scrolled ? "text-[#2d5016]" : "text-white"
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#8ab83a] text-xs font-semibold cursor-pointer transition-all duration-200 hover:bg-[#8ab83a] hover:text-white whitespace-nowrap"
            style={{ color: scrolled ? "#2d5016" : "white", borderColor: scrolled ? "#4a7c2f" : "#8ab83a" }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-translate-2 text-sm" />
            </div>
            {t("lang_toggle")}
          </button>

          {/* CTA Button */}
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#4a7c2f] text-white text-sm font-semibold rounded-full cursor-pointer hover:bg-[#2d5016] transition-colors duration-200 whitespace-nowrap inline-flex items-center justify-center"
          >
            {t("nav_cta")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden cursor-pointer text-2xl ${scrolled ? "text-[#2d5016]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[#2d5016] text-sm font-medium text-left py-2 border-b border-gray-100 cursor-pointer hover:text-[#8ab83a]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 text-[#4a7c2f] text-sm font-semibold py-2 cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-translate-2" />
            </div>
            {t("lang_toggle")}
          </button>
        </div>
      )}
    </nav>
  );
}
