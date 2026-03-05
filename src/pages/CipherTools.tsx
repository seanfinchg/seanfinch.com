import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { getThemeClasses } from "../utils/themeUtils";

interface CipherTool {
  name: string;
  path: string;
  description: string;
  status: "available" | "coming-soon";
}

const cipherTools: CipherTool[] = [
  {
    name: "Caesar Cipher",
    path: "/projects/cipher-tools/caesar",
    description:
      "Encode and decode text using the classic Caesar cipher with adjustable shift values, brute-force decryption, and customizable options.",
    status: "available",
  },
  {
    name: "Vigenère Cipher",
    path: "#",
    description:
      "Advanced polyalphabetic substitution cipher using a keyword for encryption and decryption.",
    status: "coming-soon",
  },
  {
    name: "Playfair Cipher",
    path: "#",
    description:
      "Digraph substitution cipher that encrypts pairs of letters using a 5×5 key table.",
    status: "coming-soon",
  },
  {
    name: "Rail Fence Cipher",
    path: "#",
    description:
      "Transposition cipher that writes the message in a zigzag pattern across multiple rails.",
    status: "coming-soon",
  },
];

function CipherTools() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cipher Tools - Sean Finch • SoCal";
  }, []);

  return (
    <div
      className={`flex justify-center min-h-screen ${getThemeClasses(theme)}`}
    >
      <div className="w-full max-w-6xl mx-4 md:mx-8 py-16">
        <div className="mb-8">
          <button
            onClick={() => navigate("/projects")}
            className="text-blue-500 hover:text-blue-600 font-monospace text-lg transition-all flex items-center gap-2"
            title="Back to Projects"
          >
            ← Back to Projects
          </button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-jost">
            Cipher Tools
          </h1>
          <p className="text-lg font-raleway max-w-2xl mx-auto">
            Interactive cryptography tools for encoding, decoding, and analyzing
            classical ciphers. All encryption happens locally in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cipherTools.map((tool) => (
            <div
              key={tool.name}
              className={`p-6 rounded-lg shadow-lg border-2 transition-all ${
                theme === "light"
                  ? "border-gray-300 bg-white hover:border-indigo-500"
                  : "border-gray-700 bg-gray-800 hover:border-indigo-400"
              } ${tool.status === "coming-soon" ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold font-jost">{tool.name}</h2>
                {tool.status === "coming-soon" && (
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      theme === "light"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-yellow-900 text-yellow-200"
                    }`}
                  >
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="mb-4 font-raleway text-sm">{tool.description}</p>
              {tool.status === "available" ? (
                <Link
                  to={tool.path}
                  className={`inline-block px-6 py-2 font-medium rounded-lg transition-colors ${
                    theme === "light"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-indigo-500 text-white hover:bg-indigo-600"
                  }`}
                >
                  Open Tool
                </Link>
              ) : (
                <button
                  disabled
                  className={`inline-block px-6 py-2 font-medium rounded-lg cursor-not-allowed ${
                    theme === "light"
                      ? "bg-gray-300 text-gray-500"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>

        <div
          className={`mt-12 p-6 rounded-lg border-2 ${
            theme === "light"
              ? "bg-blue-50 border-blue-200"
              : "bg-blue-900/20 border-blue-700"
          }`}
        >
          <h3 className="text-xl font-bold mb-3 font-jost">
            About Classical Ciphers
          </h3>
          <p className="font-raleway mb-2">
            These tools implement classical cryptographic ciphers that were used
            throughout history for secret communication. While fascinating from
            an educational and historical perspective, these ciphers are{" "}
            <strong>not secure for modern use</strong>.
          </p>
          <p className="font-raleway">
            ⚠️ <strong>Security Note:</strong> Classical ciphers are easily
            cracked with modern techniques. For real-world security, use modern
            encryption standards like AES or RSA.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CipherTools;
