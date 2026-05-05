import React from "react";

const Footer: React.FC = () => (
  <footer
    className="w-full border-t border-slate-200/60 dark:border-white/[0.07]
    bg-white/60 dark:bg-neutral-900/70 backdrop-blur-md py-4 px-6"
  >
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
      <span
        className="font-monospace text-xs text-muted-foreground hover:text-sky-500 dark:hover:text-sky-400
          transition-colors cursor-pointer"
        onClick={() => window.open("https://seanfinch.com", "_blank")}
      >
        ❯ seanfinch.com
      </span>
      <p className="font-monospace text-xs text-muted-foreground">
        © 2025 Sean Finch · Orange County, CA
      </p>
      <p className="font-monospace text-[10px] text-muted-foreground opacity-50">
        React · TypeScript · Tailwind CSS
      </p>
    </div>
  </footer>
);

export default Footer;
