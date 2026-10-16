const socials = [
  {
    icon: "ri-whatsapp-line",
    bg: "bg-[#25D366]",
    label: "WhatsApp",
    href: "https://wa.me/573001234567?text=Hola,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20de%20envasado%20de%20aceites",
  },
  {
    icon: "ri-facebook-fill",
    bg: "bg-[#1877F2]",
    label: "Facebook",
    href: "https://www.facebook.com/people/OMTRA-LLC/61594354490009/",
  },
  {
    icon: "ri-instagram-line",
    bg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    label: "Instagram",
    href: "https://www.instagram.com/omtrallc/",
  },
];

export default function FloatingSocial() {
  return (
    <div className="fixed bottom-6 md:bottom-10 right-3 md:right-5 z-50 flex flex-col items-end gap-2 md:gap-3">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          aria-label={s.label}
          className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center ${s.bg} text-white rounded-full cursor-pointer hover:scale-110 transition-transform duration-200`}
        >
          <i className={`${s.icon} text-lg md:text-xl`} />
        </a>
      ))}
    </div>
  );
}
