import { useTranslation } from "react-i18next";

const LOGO_URL =
  "https://static.readdy.ai/image/018ddc3d7817427364c0cb1bbc5d42bd/32e517323d28e10a21b405e6a4433e12.jpeg";
const COMPANY_EMAIL = "omtrallc02@gmail.com";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1a2e0d] text-white pt-10 md:pt-14 pb-6">
      <div className="w-full px-4 md:px-6 max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-8 md:mb-10">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#8ab83a] bg-white flex-shrink-0">
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span
                className="text-base font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aceites 
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">{t("footer_desc")}</p>
            <div className="flex gap-2">
              {[
                { icon: "ri-facebook-fill", href: "https://www.facebook.com/people/OMTRA-LLC/61594354490009/", hover: "hover:bg-[#1877F2]" },
                { icon: "ri-instagram-line", href: "https://www.instagram.com/omtrallc/", hover: "hover:bg-[#E1306C]" },
                { icon: "ri-whatsapp-line", href: "https://wa.me/573001234567", hover: "hover:bg-[#25D366]" },
              ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/10 ${s.hover} transition-colors duration-200 cursor-pointer`}
                  >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold text-white mb-3">
              <a href="#home">{t("footer_links")}</a>
            </h4>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: t("nav_home"), id: "home" },
                { label: t("nav_about"), id: "nosotros" },
                { label: t("nav_products"), id: "productos" },
                { label: t("nav_gallery"), id: "galeria" },
                { label: t("nav_contact"), id: "contacto" },
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-gray-400 hover:text-[#8ab83a] text-xs transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-white mb-3">
              <a href="#servicios">{t("footer_services")}</a>
            </h4>
            <ul className="flex flex-col gap-1.5">
              {[t("footer_serv1"), t("footer_serv2")].map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo("servicios")}
                    className="text-gray-400 hover:text-[#8ab83a] text-xs transition-colors cursor-pointer text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white mb-3">
              <a href="#contacto">{t("footer_contact")}</a>
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { icon: "ri-map-pin-line", text: "Orlando, FL, USA", href: undefined },
                { icon: "ri-phone-line", text: "7869123424", href: "tel:7869123424" },
                { icon: "ri-mail-line", text: COMPANY_EMAIL, href: `mailto:${COMPANY_EMAIL}` },
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 flex items-center justify-center text-[#8ab83a] flex-shrink-0 mt-0.5">
                    <i className={c.icon} />
                  </div>
                  {c.href ? (
                    <a href={c.href} className="text-gray-400 hover:text-[#8ab83a] text-xs transition-colors break-all">{c.text}</a>
                  ) : (
                    <span className="text-gray-400 text-xs">{c.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {year} Aceites vegetales. {t("footer_rights")}
          </p>
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-gray-300 text-xs cursor-pointer transition-colors">
              {t("footer_policy")}
            </button>
            <button className="text-gray-500 hover:text-gray-300 text-xs cursor-pointer transition-colors">
              {t("footer_terms")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
