import { useState, useMemo, useCallback, type JSX } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import ToolsWrapper from "@/components/wrappers/ToolsWrapper";
import { Checkbox } from "@/components/ui/checkbox";

export default function AtbashCipher(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [keepCapitalization, setKeepCapitalization] = useState(true);
  const [keepPunctuation, setKeepPunctuation] = useState(true);

  // Atbash mirrors each letter across the alphabet (A<->Z, B<->Y, ...).
  // The mapping is its own inverse, so encoding and decoding are identical.
  const atbashTransform = useCallback(
    (text: string): string => {
      if (!text) return "";
      return text
        .split("")
        .map((char) => {
          if (/[a-zA-Z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 65 : 97;
            const charCode = char.charCodeAt(0);
            const mirrored = 25 - (charCode - base) + base;
            let result = String.fromCharCode(mirrored);

            if (!keepCapitalization) {
              result = result.toLowerCase();
            }

            return result;
          }
          return keepPunctuation ? char : "";
        })
        .join("");
    },
    [keepCapitalization, keepPunctuation],
  );

  const transformed = useMemo(
    () => atbashTransform(inputText),
    [inputText, atbashTransform],
  );

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => { setCopied(false); }, 2000);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  }, []);

  return (
    <ToolsWrapper
      backUrl="/projects/cipher-tools"
      backLabel="Back to Cipher Tools"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Atbash Cipher Encoder/Decoder</h1>
        <p className="text-muted-foreground">
          Encode and decode text using the Atbash cipher — a reversed-alphabet
          substitution cipher
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input-text">Text to Transform</Label>
                <Textarea
                  id="input-text"
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => { setInputText(e.target.value); }}
                  rows={8}
                  className="font-mono"
                />
              </div>

              {/* Options */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keep-caps"
                    checked={keepCapitalization}
                    onCheckedChange={(checked) =>
                      { setKeepCapitalization(checked); }
                    }
                  />
                  <Label
                    htmlFor="keep-caps"
                    className="cursor-pointer text-sm font-normal"
                  >
                    Keep Capitalization
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keep-punct"
                    checked={keepPunctuation}
                    onCheckedChange={(checked) =>
                      { setKeepPunctuation(checked); }
                    }
                  />
                  <Label
                    htmlFor="keep-punct"
                    className="cursor-pointer text-sm font-normal"
                  >
                    Keep Punctuation & Spaces
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Transformed Text</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { void copyToClipboard(transformed); }}
                disabled={!transformed}
              >
                {copied ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              {inputText ? (
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                    {transformed}
                  </pre>
                </div>
              ) : (
                <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-muted-foreground">
                    Enter text to see the transformed result
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>About Atbash Cipher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">How It Works</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Reverses the alphabet: A ↔ Z, B ↔ Y, C ↔ X, ...</li>
                <li>• A fixed, keyless monoalphabetic substitution</li>
                <li>• The same operation both encodes and decodes</li>
                <li>• Case and punctuation preserved</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Use Cases</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Educational cryptography learning</li>
                <li>• Historical and biblical text puzzles</li>
                <li>• Simple text obfuscation</li>
                <li>• Historical cipher demonstrations</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold">Security Best Practices</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    ⚠️ <strong>Not secure for real-world encryption</strong> -
                    there is no key, so it&apos;s trivial to reverse
                  </div>
                  <div>• Vulnerable to frequency analysis</div>
                  <div>• Use for educational purposes only</div>
                  <div>
                    • For real security, use modern encryption (AES, RSA)
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Historical Context</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• One of the oldest known substitution ciphers</div>
                  <div>• Originally applied to the Hebrew alphabet</div>
                  <div>• Appears in the Book of Jeremiah</div>
                  <div>• A classic example alongside the Caesar cipher</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">
              All encryption happens locally in your browser. No data is sent to
              external servers, ensuring complete privacy and security.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolsWrapper>
  );
}
