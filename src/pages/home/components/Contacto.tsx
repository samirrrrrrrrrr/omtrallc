import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "../../../hooks/useInView";

const COMPANY_EMAIL = "omtrallc02@gmail.com";

export default function Contacto() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgLen, setMsgLen] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const { ref: titleRef, inView: titleIn } = useInView();
  const { ref: infoRef, inView: infoIn } = useInView();
  const { ref: formRef, inView: formIn } = useInView();

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-10";
  const vis = "opacity-100 translate-y-0";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    const form = e.currentTarget;
    
    // Cooldown check
    const now = Date.now();
    const cooldownMs = 60000; // 60 seconds
    if (now - lastSubmitTime < cooldownMs) {
      const waitTime = Math.ceil((cooldownMs - (now - lastSubmitTime)) / 1000);
      setErrorMsg(`Por favor, espera ${waitTime} segundos antes de enviar otro mensaje para evitar spam.`);
      return;
    }

    // Honeypot check
    const botField = (form.elements.namedItem("bot_field") as HTMLInputElement)?.value;
    if (botField) {
      setSubmitted(true);
      form.reset();
      setMsgLen(0);
      return;
    }

    const name = (form.elements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const phone = (form.elements.namedItem("telefono") as HTMLInputElement)?.value || "";
    const msg = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
    const empresa = (form.elements.namedItem("empresa") as HTMLInputElement)?.value || "";
    const asunto = (form.elements.namedItem("asunto") as HTMLInputElement)?.value || "";
    
    if (msg.length > 500) return;

    if (!name.trim() || !email.trim()) {
      setErrorMsg("Por favor completa los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (phone && !/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      setErrorMsg("Por favor, introduce un número de teléfono válido.");
      return;
    }

    const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, '');

    setLoading(true);

    try {
      const subject = sanitize(asunto || "Consulta desde la web");
      const body = [
        `Nombre: ${sanitize(name)}`,
        `Email: ${email}`,
        `Teléfono: ${sanitize(phone)}`,
        `Empresa: ${sanitize(empresa)}`,
        "",
        "Mensaje:",
        sanitize(msg),
      ].join("\n");

      window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
      setLastSubmitTime(Date.now());
      form.reset();
      setMsgLen(0);
    } catch {
      /* noop */
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-14 md:py-24 bg-[#f8faf4]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Badge + Title */}
        <div ref={titleRef} className={`${base} ${titleIn ? vis : hidden}`}>
          <div className="flex justify-center mb-4">
            <span className="text-xs font-bold text-[#4a7c2f] bg-[#4a7c2f]/10 px-4 py-1.5 rounded-full">
              {t("contact_badge")}
            </span>
          </div>
          <h2
            className="text-2xl md:text-4xl font-bold text-[#1a2e0d] text-center mb-3 md:mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("contact_title")}
          </h2>
          <p className="text-gray-500 text-center text-sm max-w-xl mx-auto mb-8 md:mb-12">
            {t("contact_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">
          {/* Info */}
          <div
            ref={infoRef}
            className={`lg:col-span-2 flex flex-col gap-5 md:gap-6 ${base} ${infoIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Map */}
            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden">
              <iframe
                title="Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.1!2d-81.1837!3d28.5383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77b6b6b6b6b6b%3A0x0!2s3801+Avalon+Park+E+Blvd%2C+Orlando%2C+FL+32828!5e0!3m2!1ses!2sus!4v1700000000000!5m2!1ses!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              {[
                { icon: "ri-map-pin-line", title: t("contact_address_title"), val: t("contact_address"), href: undefined },
                { icon: "ri-phone-line", title: t("contact_phone_title"), val: "+ 7869123424", href: "tel:+14076147979" },
                { icon: "ri-mail-line", title: t("contact_email_title"), val: COMPANY_EMAIL, href: `mailto:${COMPANY_EMAIL}` },
                { icon: "ri-time-line", title: t("contact_hours_title"), val: t("contact_hours"), href: undefined },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-[#4a7c2f]/10 text-[#4a7c2f] flex-shrink-0">
                    <i className={`${item.icon} text-sm md:text-base`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1a2e0d]">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-xs md:text-sm text-gray-500 hover:text-[#4a7c2f] transition-colors">{item.val}</a>
                    ) : (
                      <p className="text-xs md:text-sm text-gray-500">{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className={`lg:col-span-3 bg-white rounded-2xl p-5 md:p-8 ${base} ${formIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{ transitionDelay: "100ms" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-10 md:py-12">
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#4a7c2f]/10 text-[#4a7c2f]">
                  <i className="ri-checkbox-circle-line text-3xl md:text-4xl" />
                </div>
                <p className="text-[#1a2e0d] font-semibold text-base md:text-lg text-center">{t("form_success")}</p>
                <button
                  className="mt-2 text-sm text-[#4a7c2f] underline cursor-pointer"
                  onClick={() => setSubmitted(false)}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                data-readdy-form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 md:gap-4"
              >
                {/* Honeypot field - visually hidden */}
                <input
                  type="text"
                  name="bot_field"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                {errorMsg && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    {errorMsg}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#1a2e0d] mb-1 block">{t("form_name")}</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4a7c2f] transition-colors"
                      placeholder={t("form_name")}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2e0d] mb-1 block">{t("form_company")}</label>
                    <input
                      type="text"
                      name="empresa"
                      className="w-full border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4a7c2f] transition-colors"
                      placeholder={t("form_company")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#1a2e0d] mb-1 block">{t("form_email")}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4a7c2f] transition-colors"
                      placeholder={t("form_email")}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a2e0d] mb-1 block">{t("form_phone")}</label>
                    <input
                      type="tel"
                      name="telefono"
                      className="w-full border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4a7c2f] transition-colors"
                      placeholder="+57"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1a2e0d] mb-1 block">{t("form_subject")}</label>
                  <input
                    type="text"
                    name="asunto"
                    className="w-full border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4a7c2f] transition-colors"
                    placeholder={t("form_subject")}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1a2e0d] mb-1 block">{t("form_message")}</label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={500}
                    onChange={(e) => setMsgLen(e.target.value.length)}
                    className="w-full border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4a7c2f] transition-colors resize-none"
                    placeholder={t("form_message")}
                  />
                  <p className="text-xs text-gray-400 text-right">{msgLen}/500</p>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2 mb-1">
                  {t("form_consent")}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#4a7c2f] hover:bg-[#2d5016] text-white font-semibold rounded-lg cursor-pointer transition-colors duration-200 text-sm whitespace-nowrap disabled:opacity-60"
                >
                  {loading ? t("form_sending") : t("form_submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
