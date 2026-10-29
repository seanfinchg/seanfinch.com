import { usePageMeta } from "../hooks/usePageMeta";
import { useTheme } from "../contexts/themeContext";
import SocialMediaButton from "../components/SocialMediaButton";
import { getThemeClasses } from "../utils/themeUtils";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  aboutBio,
  aboutStatus,
  aboutSummary,
  interests,
  leadership,
  skillGroups,
} from "../data/about";

const kicker =
  "font-monospace text-[11px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400";

const About: React.FC = () => {
  const { theme } = useTheme();
  const light = theme === "light";

  usePageMeta(
    "About",
    "About Sean Finch: incoming Security Engineer at Palo Alto Networks, previously Neuralink. Computer Science student, homelabber, vocalist, and street photographer at Northeastern University.",
  );

  const chip = `inline-flex items-center rounded-full border px-3 py-1 text-xs font-monospace transition-colors ${
    light
      ? "border-neutral-300 bg-white/70 text-neutral-700 hover:border-amber-500 hover:text-amber-700"
      : "border-neutral-700 bg-neutral-900/70 text-neutral-300 hover:border-amber-400/60 hover:text-amber-400"
  }`;

  const rule = light ? "border-neutral-200" : "border-neutral-800";
  const muted = light ? "text-neutral-600" : "text-neutral-400";

  return (
    <div className={`flex justify-center ${getThemeClasses(theme)}`}>
      <div className="w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero */}
        <header className="mb-12">
          <p className={`${kicker} tracking-[0.4em] mb-4`}>About</p>
          <h1 className="font-jost font-extrabold tracking-tight text-4xl sm:text-6xl leading-none mb-4">
            Sean Finch
          </h1>
          <p
            className={`font-raleway text-base sm:text-lg max-w-2xl mb-6 ${muted}`}
          >
            {aboutSummary}
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className={chip}>{aboutStatus.education}</span>
            <span
              className={`${chip} gap-2 border-green-500/40 ${
                light ? "text-green-700" : "text-green-400"
              }`}
            >
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse-dot inline-block"
              />
              {aboutStatus.job}
            </span>
          </div>
          <SocialMediaButton url="/resume.pdf">Resume</SocialMediaButton>
        </header>

        {/* Bio */}
        <section
          aria-labelledby="bio-heading"
          className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16"
        >
          <img
            src="/SeanPortrait-960.webp"
            srcSet="/SeanPortrait-480.webp 480w, /SeanPortrait-960.webp 960w, /SeanPortrait-1440.webp 1440w"
            sizes="(min-width: 768px) 320px, (min-width: 640px) 50vw, 75vw"
            width={960}
            height={1440}
            fetchPriority="high"
            alt="Portrait of Sean Finch"
            className="w-3/4 sm:w-1/2 md:w-80 md:shrink-0 self-start object-cover rounded-xl shadow-lg"
          />
          <div className="font-raleway text-base leading-relaxed max-w-2xl">
            <h2 id="bio-heading" className="sr-only">
              Bio
            </h2>
            {aboutBio.map((paragraph) => (
              <p key={paragraph} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section
          aria-labelledby="skills-heading"
          className={`border-t pt-10 mb-16 ${rule}`}
        >
          <p className={`${kicker} mb-2`}>Toolbox</p>
          <h2
            id="skills-heading"
            className="font-jost font-extrabold tracking-tight text-3xl mb-8"
          >
            Technical Skills
          </h2>
          <div className="space-y-6">
            {skillGroups.map(({ label, items }) => (
              <div key={label}>
                <h3
                  className={`font-monospace text-[10px] uppercase tracking-[0.3em] mb-3 ${muted}`}
                >
                  {label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className={chip}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3
                className={`font-monospace text-[10px] uppercase tracking-[0.3em] mb-3 ${muted}`}
              >
                Off the clock
              </h3>
              <ul className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li key={interest} className={chip}>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section
          aria-labelledby="leadership-heading"
          className={`border-t pt-10 ${rule}`}
        >
          <p className={`${kicker} mb-2`}>Service &amp; music</p>
          <h2
            id="leadership-heading"
            className="font-jost font-extrabold tracking-tight text-3xl mb-8"
          >
            Leadership
          </h2>
          <ol
            className={`relative max-w-2xl border-l ml-1.5 ${
              light ? "border-neutral-300" : "border-neutral-700"
            }`}
          >
            {leadership.map((entry) => (
              <li key={entry.name} className="relative pl-8 pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ${
                    entry.active
                      ? "bg-amber-500"
                      : light
                        ? "bg-neutral-400"
                        : "bg-neutral-600"
                  }`}
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-jost font-extrabold tracking-tight text-xl rounded-md hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {entry.name}
                    <FaExternalLinkAlt
                      aria-hidden="true"
                      size={11}
                      className="opacity-40 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <span className="rounded-full border border-amber-500/50 bg-amber-500/10 px-2.5 py-0.5 font-monospace text-[10px] uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
                    {entry.badge}
                  </span>
                </div>
                <p className={`font-raleway text-sm mb-3 ${muted}`}>
                  {entry.description}
                </p>
                <ul className="space-y-1.5">
                  {entry.roles.map(({ role, period, active }) => (
                    <li
                      key={role}
                      className="flex items-center gap-2 text-sm font-monospace"
                    >
                      <span className={active ? "font-semibold" : muted}>
                        {role}
                      </span>
                      <span
                        className={`ml-auto flex items-center gap-1.5 text-xs shrink-0 ${muted}`}
                      >
                        {active && (
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot inline-block"
                          />
                        )}
                        {period}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default About;
