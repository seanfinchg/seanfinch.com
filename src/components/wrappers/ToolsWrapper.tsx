import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/themeContext";
import { getThemeClasses } from "@/utils/themeUtils";

interface ToolsWrapperProps {
  children: React.ReactNode;
  backUrl?: string;
  backLabel?: string;
}

export default function ToolsWrapper({
  children,
  backUrl,
  backLabel = "Back",
}: ToolsWrapperProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${getThemeClasses(theme)} py-8`}>
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {backUrl && (
          <button
            onClick={() => navigate(backUrl)}
            className="text-blue-500 hover:text-blue-600 font-monospace text-lg transition-all mb-4 flex items-center gap-2"
            title={backLabel}
          >
            ← {backLabel}
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
