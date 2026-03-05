import { useTheme } from "@/contexts/themeContext";
import { getThemeClasses } from "@/utils/themeUtils";

interface ToolsWrapperProps {
  children: React.ReactNode;
}

export default function ToolsWrapper({ children }: ToolsWrapperProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${getThemeClasses(theme)} py-8`}>
      <div className="max-w-7xl mx-auto px-4 space-y-6">{children}</div>
    </div>
  );
}
