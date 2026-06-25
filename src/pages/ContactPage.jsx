import React from "react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export default function ContactPage() {
  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/6282123456789",
      icon: <FaWhatsapp size={24} />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: <FaInstagram size={24} />,
    },
    {
      name: "TikTok",
      url: "https://tiktok.com",
      icon: <FaTiktok size={24} />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: <FaTwitter size={24} />,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <h1 className="mb-6 text-3xl font-black uppercase tracking-tighter text-zinc-900 md:text-4xl">
        Contact Us
      </h1>
      <p className="mb-10 max-w-lg text-sm leading-relaxed text-zinc-500">
        Have questions, feedback, or just want to say hi? Reach out to us and
        we'll get back to you as soon as possible.
      </p>

      {/* SOCIAL MEDIA ICONS */}
      <div className="flex items-center gap-6">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="group relative"
            aria-label={social.name}
          >
            <div className="text-zinc-900 transition-all duration-300 group-hover:text-zinc-600 group-hover:scale-110">
              {social.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
