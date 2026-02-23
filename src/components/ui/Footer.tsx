import { MdEmail, MdArrowOutward } from "react-icons/md";
import {
  FaCopyright,
  FaInstagram,
  FaLinkedinIn,
  FaSlack,
} from "react-icons/fa";
import Button from "./button/Button";
import DoubleScroll from "../../page/home/sections/DoubleScroll";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  headline?: string;
  subheadline?: string;
  companyLinks?: FooterLink[];
  contactName?: string;
  contactAddress?: string;
  contactEmail?: string;
}

const Footer = ({
  headline = "Unlock growth with strategic insights",
  subheadline = "Learn how systematic methods can support better portfolio outcomes.",
  companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
    { label: "Process", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  contactName = "Blossom Coder",
  contactAddress = "D-160 , 2nd floor , Industrial area , Mohali , Punjab",
  contactEmail = "contact@blossomcoder.com",
}: FooterProps) => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: <MdEmail size={18} />,
      href: `mailto:${contactEmail}`,
      label: "Email",
    },
    { icon: <FaInstagram size={18} />, href: "#", label: "Instagram" },
    { icon: <FaLinkedinIn size={18} />, href: "#", label: "LinkedIn" },
    { icon: <FaSlack size={18} />, href: "#", label: "Slack" },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a]">
      <div className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <h2
          className="text-white font-bold leading-tight mb-5 max-w-2xl"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
          }}
        >
          {headline}
        </h2>

        <p className="text-white/50 text-base leading-relaxed max-w-sm mb-10">
          {subheadline}
        </p>

        <div className="flex items-center w-full max-w-115 bg-white/10 border border-white/10 rounded-full pl-6 pr-1.5 py-1.5 gap-2">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 bg-transparent border-none outline-none text-white text-[0.95rem] placeholder-white/40"
          />

          <button className="bg-[#F58327] hover:bg-[#d9721e] text-white rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer border-none">
            Subscribe
          </button> 
        </div>
      </div>

      <DoubleScroll/>

      <div className="h-px bg-white/[0.07] mx-10" />

      <div className="grid grid-cols-3 items-start gap-8 px-10 py-12">
        <div>
          <p className="text-white/35 text-[0.7rem] tracking-[0.12em] uppercase mb-5 font-medium">
            Company
          </p>
          <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/75 hover:text-[#F58327] text-sm no-underline transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/35 text-[0.7rem] tracking-[0.12em] uppercase mb-5 font-medium">
            Contact
          </p>
          <p className="text-white/75 text-sm leading-relaxed mb-4">
            {contactName}
            <br />
            {contactAddress}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="text-white/75 hover:text-[#F58327] text-sm no-underline transition-colors duration-200"
          >
            {contactEmail}
          </a>
        </div>

        <div className="flex flex-col items-end justify-between h-full gap-8">
          <Button
            onClick={handleBackToTop}
            className="w-full flex items-center justify-center gap-2"
          >
            <span>Back to Top</span>
            <MdArrowOutward size={16} className="-rotate-45 shrink-0" />
          </Button>

          <div className="flex gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white/65 no-underline transition-all duration-200 hover:bg-[#F58327] hover:text-white hover:border-[#F58327]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.07] px-10 py-5 flex justify-between items-center">
        <p className="text-white/25 text-xs flex items-center gap-1">
          <FaCopyright /> {new Date().getFullYear()} {contactName}. All rights
          reserved.
        </p>
        <p className="text-white/25 text-xs m-0">Crafted with precision ✦</p>
      </div>
    </footer>
  );
};

export default Footer;
