import { useTheme } from "../contexts/themeContext";

type FeaturedType = "project" | "experience";

interface FeaturedCardProps {
  type: FeaturedType;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function FeaturedCard({
  type,
  label,
  children,
}: FeaturedCardProps) {
  const { theme } = useTheme();

  const styles = {
    project: {
      border:
        theme === "light"
          ? "border-green-500 bg-green-50"
          : "border-green-400 bg-green-900/20",
      badge: "bg-green-500",
    },
    experience: {
      border:
        theme === "light"
          ? "border-blue-500 bg-blue-50"
          : "border-blue-400 bg-blue-900/20",
      badge: "bg-blue-500",
    },
  }[type];

  return (
    <div
      className={`relative w-full md:w-1/2 mb-8 rounded-lg shadow-2xl border-4 ${styles.border}`}
    >
      <div
        className={`absolute -top-4 left-4 ${styles.badge} text-white px-4 py-1 rounded-full text-sm font-bold font-monospace`}
      >
        ⭐ {label}
      </div>

      <div className="pt-4">{children}</div>
    </div>
  );
}
