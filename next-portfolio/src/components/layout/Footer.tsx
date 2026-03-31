import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import type { SocialIconKey, SocialLink } from "@/models/portfolioModel";

interface FooterProps {
  ownerName: string;
  socials: SocialLink[];
  currentYear: number;
}

function SocialIcon({ iconKey }: { iconKey: SocialIconKey }) {
  if (iconKey === "linkedin") {
    return <FaLinkedinIn className="text-lg" />;
  }

  if (iconKey === "github") {
    return <FaGithub className="text-lg" />;
  }

  return <FaFacebookF className="text-lg" />;
}

export default function Footer({ ownerName, socials, currentYear }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/85 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition-all duration-200 hover:border-emerald-300 hover:text-emerald-300"
            >
              <SocialIcon iconKey={social.iconKey} />
            </a>
          ))}
        </div>

        <p className="text-sm text-slate-300">
          All rights reserved by {ownerName} ({currentYear})
        </p>
      </div>
    </footer>
  );
}
