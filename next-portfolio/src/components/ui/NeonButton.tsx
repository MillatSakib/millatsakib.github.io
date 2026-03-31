import type { ReactNode } from "react";

interface NeonButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  external?: boolean;
}

export default function NeonButton({
  href,
  children,
  className = "",
  title,
  external = false,
}: NeonButtonProps) {
  return (
    <a
      href={href}
      className={`neon-btn ${className}`}
      title={title}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="neon-border neon-border-top" aria-hidden="true" />
      <span className="neon-border neon-border-right" aria-hidden="true" />
      <span className="neon-border neon-border-bottom" aria-hidden="true" />
      <span className="neon-border neon-border-left" aria-hidden="true" />
      <span className="neon-btn-content">{children}</span>
    </a>
  );
}
