export type LinkVariant = "default" | "button";

export interface NavLink {
  label: string;
  href: string;
  title?: string;
  external?: boolean;
  variant?: LinkVariant;
}

export interface HeroData {
  greeting: string;
  name: string;
  roles: string[];
  statusLabel: string;
  resumeUrl: string;
  email: string;
}

export interface AboutData {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  projectCtaUrl: string;
  hireMeUrl: string;
}

export type SkillIconKey =
  | "react"
  | "node"
  | "express"
  | "mongodb"
  | "git"
  | "github"
  | "gitlab";

export type SkillTone = "success" | "info" | "warning" | "danger";

export interface SkillItem {
  name: string;
  level: number;
  iconKey: SkillIconKey;
  tone?: SkillTone;
}

export interface SkillCategory {
  id: "web" | "tools";
  label: string;
  items: SkillItem[];
}

export interface ProjectLink {
  type: "client" | "server" | "repo" | "live";
  url: string;
  label: string;
}

export interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  techStack: string[];
  links: ProjectLink[];
}

export type ContactIconKey = "mail" | "whatsapp" | "messenger" | "telegram";

export interface ContactMethod {
  platform: string;
  value: string;
  href: string;
  iconKey: ContactIconKey;
}

export interface ContactFormConfig {
  recipientEmail: string;
  autoresponse: string;
  nextUrl: string;
  copyRecipients: string[];
  subject: string;
  template: "table";
}

export type SocialIconKey = "linkedin" | "github" | "facebook";

export interface SocialLink {
  platform: string;
  href: string;
  iconKey: SocialIconKey;
}

export interface PortfolioData {
  ownerName: string;
  brandName: string;
  logoSrc: string;
  navLinks: NavLink[];
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  contactMethods: ContactMethod[];
  contactForm: ContactFormConfig;
  socials: SocialLink[];
}

export const portfolioData: PortfolioData = {
  ownerName: "Md. Sohan Millat Sakib",
  brandName: "Portfolio",
  logoSrc: "/logo2.png",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skill", href: "#skills" },
    { label: "Project", href: "#projects", title: "View my projects" },
    { label: "Contact", href: "#contact" },
    {
      label: "Blog",
      href: "https://smsakib5.blogspot.com/2018/03/home-page.smsakib5.html?m=1",
      external: true,
    },
    {
      label: "Resume",
      href: "https://raw.githubusercontent.com/MillatSakib/my-cv/7159ca905d4afda37a4fa61b7a319fafeeffd068/Md_Sohan_Millat_Sakib.pdf",
      external: true,
      title: "Download my resume",
      variant: "button",
    },
  ],
  hero: {
    greeting: "Hello! I am",
    name: "Md. Sohan Millat Sakib",
    roles: ["MERN Stack Web Developer.", "Problem Solver.", "Blogger."],
    statusLabel: "Programmer",
    resumeUrl:
      "https://raw.githubusercontent.com/MillatSakib/my-cv/7159ca905d4afda37a4fa61b7a319fafeeffd068/Md_Sohan_Millat_Sakib.pdf",
    email: "millatsakib01@gmail.com",
  },
  about: {
    title: "About Me",
    description:
      "Hello! I'm Md. Sohan Millat Sakib, a passionate full stack web developer. I love learning, sharing knowledge publicly, and building useful web experiences with JavaScript. I stay strategic, goal-oriented, and focused on outcomes. I am currently completing my graduation in Computer Science and Engineering at Green University of Bangladesh, Narayanganj.",
    imageSrc: "/images/sohan-millat-sakib.png",
    imageAlt: "Md. Sohan Millat Sakib",
    projectCtaUrl: "#projects",
    hireMeUrl: "https://www.linkedin.com/in/millatsakib/",
  },
  skills: [
    {
      id: "web",
      label: "WEB",
      items: [
        { name: "React", level: 95, iconKey: "react", tone: "success" },
        { name: "Node.js", level: 70, iconKey: "node", tone: "success" },
        { name: "Express.js", level: 70, iconKey: "express", tone: "success" },
        { name: "MongoDB", level: 85, iconKey: "mongodb", tone: "success" },
      ],
    },
    {
      id: "tools",
      label: "Tools",
      items: [
        { name: "Git", level: 85, iconKey: "git", tone: "success" },
        { name: "GitHub", level: 90, iconKey: "github", tone: "success" },
        { name: "GitLab", level: 75, iconKey: "gitlab", tone: "danger" },
      ],
    },
  ],
  projects: [
    {
      title: "PetConnect",
      description:
        "A pet adoption and donation campaign platform where users can post adoption listings and fundraising campaigns, while admins verify donation requests.",
      imageSrc: "/images/Project4.png",
      imageAlt: "PetConnect project preview",
      links: [
        {
          type: "client",
          url: "https://github.com/MillatSakib/PetConnect-Client",
          label: "Client repo",
        },
        {
          type: "server",
          url: "https://github.com/MillatSakib/PetConnect-Server",
          label: "Server repo",
        },
        {
          type: "live",
          url: "https://petconnect0.netlify.app/",
          label: "Live site",
        },
      ],
      techStack: [
        "React",
        "Tailwind",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Shadcn/UI",
        "Firebase",
      ],
    },
    {
      title: "biKolpo",
      description:
        "A recommendation platform where users can post problems with products or services and receive better alternatives from the community.",
      imageSrc: "/images/project1.jpg",
      imageAlt: "biKolpo project preview",
      links: [
        {
          type: "client",
          url: "https://github.com/MillatSakib/biKolpo_Client",
          label: "Client repo",
        },
        {
          type: "server",
          url: "https://github.com/MillatSakib/biKolpo_server",
          label: "Server repo",
        },
        {
          type: "live",
          url: "https://bikolpo.netlify.app/",
          label: "Live site",
        },
      ],
      techStack: ["React", "Tailwind", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Eco Voyager",
      description:
        "A travel-sharing site where users post visited tourist spots, personal expenses, and trip details with update and delete support.",
      imageSrc: "/images/project2.jpg",
      imageAlt: "Eco Voyager project preview",
      links: [
        {
          type: "client",
          url: "https://github.com/MillatSakib/Eco_Voyager_Client",
          label: "Client repo",
        },
        {
          type: "server",
          url: "https://github.com/MillatSakib/Eco_Voyager_Server",
          label: "Server repo",
        },
        {
          type: "live",
          url: "https://eco-voyager.netlify.app/",
          label: "Live site",
        },
      ],
      techStack: ["React", "Tailwind", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Haven Hunt",
      description:
        "A real estate platform to browse, buy, and shortlist properties with a clean property exploration workflow.",
      imageSrc: "/images/project3.jpg",
      imageAlt: "Haven Hunt project preview",
      links: [
        {
          type: "repo",
          url: "https://github.com/MillatSakib/Haven-Hunt",
          label: "Repository",
        },
        {
          type: "live",
          url: "https://real-estate-ph.netlify.app/",
          label: "Live site",
        },
      ],
      techStack: ["React", "Tailwind", "Firebase"],
    },
  ],
  contactMethods: [
    {
      platform: "Gmail",
      value: "millatsakib.01@gmail.com",
      href: "mailto:millatsakib.01@gmail.com",
      iconKey: "mail",
    },
    {
      platform: "WhatsApp",
      value: "+8801613931087",
      href: "https://api.whatsapp.com/send/?phone=8801613931087",
      iconKey: "whatsapp",
    },
    {
      platform: "Messenger",
      value: "/millatsakib.cse",
      href: "https://www.facebook.com/millatsakib.cse/",
      iconKey: "messenger",
    },
    {
      platform: "Telegram",
      value: "/millatsakib",
      href: "http://t.me/millatsakib",
      iconKey: "telegram",
    },
  ],
  contactForm: {
    recipientEmail: "millatsakib01@gmail.com",
    autoresponse: "Hey, Thank you for messaging me. I will reply as soon as possible",
    nextUrl: "https://millatsakib.github.io",
    copyRecipients: ["millatsakib7@gmail.com", "millatsakib03@gmail.com"],
    subject: "New message sent from your portfolio",
    template: "table",
  },
  socials: [
    {
      platform: "LinkedIn",
      href: "https://www.linkedin.com/in/millatsakib/",
      iconKey: "linkedin",
    },
    {
      platform: "GitHub",
      href: "https://github.com/MillatSakib",
      iconKey: "github",
    },
    {
      platform: "Facebook",
      href: "https://www.facebook.com/millatsakib.cse/",
      iconKey: "facebook",
    },
  ],
};
