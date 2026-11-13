const SERVICES_LINKS = [
  "Branding",
  "UI-UX",
  "Web Application",
  "Mobile Application",
  "Software Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Internet of Things",
  "Data Science & Blockchain",
  "Ecommerce Development",
];

const USEFUL_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Our Approach", href: "#approach" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Client Stories", href: "#testimonials" },
];

const RESOURCE_LINKS = [
  { label: "Latest Insights", href: "#blogs" },
  { label: "Enterprise Expertise", href: "#services" },
  { label: "Delivery Architecture", href: "#why-choose-us" },
  { label: "Start a Conversation", href: "mailto:info@shanviatech.com" },
];

const CERTIFICATIONS = [
  { label: "MCA", src: "/images/badge1_emblem_clean.png" },
  { label: "GST", src: "/images/badge2_gst_clean.png" },
  { label: "ISO 9001", src: "/images/badge5_emblem2_clean.png" },
  { label: "ISO 27001", src: "/images/badge4_iso_clean.png" },
  { label: "MSME", src: "/images/badge3_msme_clean.png" },
  { label: "Startup India", src: "/images/badge6_startup_clean.png" },
];

const LOCATIONS = [
  {
    region: "INDIA • HQ",
    city: "Kolkata, West Bengal",
    address: "1177, Madurdaha, Hussainpur, Kolkata, West Bengal, India - 700107",
    code: "IN",
  },
  {
    region: "INDIA • R&D",
    city: "Kharagpur, West Bengal",
    address: "Malancha Road, Malancha, Opp. of ICICI Bank, Kharagpur, West Bengal, India - 721301",
    code: "IN",
  },
  {
    region: "NORTH AMERICA",
    city: "Cambridge Road, New Jersey",
    address: "Lafayette, Cambridge Road, New Jersey, US - 7848",
    code: "US",
  },
  {
    region: "MIDDLE EAST",
    city: "United Arab Emirates",
    address: "Biju Danial, Business Centre, Sharjah Publishing City Free Zone, United Arab Emirates",
    code: "AE",
  },
];

function FlagIcon({ code }: { code: string }) {
  if (code === "IN") {
    return (
      <span className="inline-flex flex-col w-4 h-3 rounded-[2px] overflow-hidden border border-white/15 shrink-0" aria-hidden="true">
        <span className="flex-1 bg-[#FF9933]" />
        <span className="flex-1 bg-white flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-[#000080]" />
        </span>
        <span className="flex-1 bg-[#138808]" />
      </span>
    );
  }
  if (code === "US") {
    return (
      <span className="inline-flex w-4 h-3 rounded-[2px] overflow-hidden border border-white/15 shrink-0 relative bg-[#B22234]" aria-hidden="true">
        <span className="absolute inset-y-0 left-0 w-2 bg-[#3C3B6E]" />
        <span className="w-full h-[1.5px] bg-white/90 mt-[2.5px]" />
        <span className="w-full h-[1.5px] bg-white/90 mt-[2.5px]" />
      </span>
    );
  }
  return (
    <span className="inline-flex w-4 h-3 rounded-[2px] overflow-hidden border border-white/15 shrink-0" aria-hidden="true">
      <span className="w-1 bg-[#FF0000]" />
      <span className="flex-1 flex flex-col">
        <span className="flex-1 bg-[#00732F]" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-black" />
      </span>
    </span>
  );
}

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#050c14] text-[var(--color-foam)] border-t border-white/10 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 40% at 15% 0%, rgba(11,108,176,0.2), transparent 65%), radial-gradient(ellipse 40% 35% at 85% 100%, rgba(40,178,245,0.12), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 pt-16 pb-10">
        {/* Top Brand & Direct Contact Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              SHANVIA <span className="text-[var(--color-cyan)]">TECH</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-slate-400">
              <span className="text-[var(--color-cyan)]">Take a step into the future</span>
              <span className="text-white/20">/</span>
              <span>CIN: U72900WB2022PTC258015</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919062453343"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-[var(--color-cyan)]/60 text-xs font-mono text-slate-200 hover:text-white transition-colors"
            >
              +91-9062453343
            </a>
            <a
              href="mailto:info@shanviatech.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-cyan)] text-[#04111d] font-mono text-xs font-semibold hover:brightness-110 transition-all"
            >
              info@shanviatech.com
            </a>
          </div>
        </div>

        {/* Open Multi-Column Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 sm:py-12 border-b border-white/10">
          <div className="lg:col-span-5 flex flex-col justify-between gap-7 pr-0 lg:pr-8">
            <div className="space-y-4">
              <p className="text-sm text-[var(--color-mist)] leading-relaxed">
                We house a team of experts with proficiency in custom Web Application Development,
                Mobile Apps Development, AI Development, Software Development, and Ecommerce.
              </p>

              <div className="pt-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-cyan)] mb-3">
                  Statutory Governance &amp; Certifications
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {CERTIFICATIONS.map((cert) => (
                    <div
                      key={cert.label}
                      title={cert.label}
                      className="w-12 h-12 rounded-full bg-white/95 p-1.5 border border-white/20 hover:border-[var(--color-cyan)] hover:scale-105 transition-all flex items-center justify-center shadow-sm"
                    >
                      <img
                        src={cert.src}
                        alt={cert.label}
                        className="w-full h-full object-contain rounded-full"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="space-y-1 text-xs">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  Marketing &amp; Support
                </div>
                <div className="text-slate-300">
                  +91-9062453343 &bull; info@shanviatech.com
                </div>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { label: "Facebook", text: "f", href: "https://facebook.com" },
                  { label: "X", text: "X", href: "https://x.com" },
                  { label: "LinkedIn", text: "in", href: "https://linkedin.com" },
                  { label: "Instagram", text: "ig", href: "https://instagram.com" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full border border-white/15 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] flex items-center justify-center font-mono text-[11px] text-slate-300 transition-colors"
                  >
                    {social.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-4">
                Services
              </div>
              <ul className="space-y-2">
                {SERVICES_LINKS.map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-xs sm:text-[13px] text-slate-300 hover:text-[var(--color-cyan)] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-4">
                Useful Links
              </div>
              <ul className="space-y-2">
                {USEFUL_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs sm:text-[13px] text-slate-300 hover:text-[var(--color-cyan)] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-4">
                Resources
              </div>
              <ul className="space-y-2">
                {RESOURCE_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs sm:text-[13px] text-slate-300 hover:text-[var(--color-cyan)] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Clean Horizontal 4-Office Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-b border-white/10">
          {LOCATIONS.map((loc) => (
            <div key={loc.city} className="border-l border-[var(--color-cyan)]/40 pl-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-cyan)] mb-1.5">
                {loc.region}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <FlagIcon code={loc.code} />
                <span className="font-display text-xs sm:text-sm font-bold text-white">
                  {loc.city}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {loc.address}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono text-slate-400">
          <div className="text-center sm:text-left">
            &copy; 2026 SHANVIA TECH SOLUTIONS PRIVATE LIMITED. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#contact" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[var(--color-cyan)] transition-colors cursor-pointer"
            >
              Back to Top
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
