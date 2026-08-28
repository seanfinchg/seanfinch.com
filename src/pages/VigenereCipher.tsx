import { useState, useMemo, useCallback, type JSX } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ToolsWrapper from "@/components/wrappers/ToolsWrapper";
import { Checkbox } from "@/components/ui/checkbox";

export default function VigenereCipher(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [keyword, setKeyword] = useState("KEY");
  const [copiedEncoded, setCopiedEncoded] = useState(false);
  const [copiedDecoded, setCopiedDecoded] = useState(false);
  const [keepCapitalization, setKeepCapitalization] = useState(true);
  const [keepPunctuation, setKeepPunctuation] = useState(true);

  // Vigenère cipher shift function — each letter is shifted by the
  // corresponding letter of the (repeating) keyword.
  const vigenereShift = useCallback(
    (text: string, decode: boolean): string => {
      if (!text) return "";
      const key = keyword.replace(/[^a-zA-Z]/g, "").toUpperCase();
      if (!key) return text;

      let keyIndex = 0;
      return text
        .split("")
        .map((char) => {
          if (/[a-zA-Z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 65 : 97;
            const charCode = char.charCodeAt(0);
            const keyShift = key.charCodeAt(keyIndex % key.length) - 65;
            keyIndex++;
            const shiftAmount = decode ? -keyShift : keyShift;
            const shifted = ((charCode - base + shiftAmount + 26) % 26) + base;
            let result = String.fromCharCode(shifted);

            if (!keepCapitalization) {
              result = result.toLowerCase();
            }

            return result;
          }
          return keepPunctuation ? char : "";
        })
        .join("");
    },
    [keyword, keepCapitalization, keepPunctuation],
  );

  const encoded = useMemo(
    () => vigenereShift(inputText, false),
    [inputText, vigenereShift],
  );

  const decoded = useMemo(
    () => vigenereShift(inputText, true),
    [inputText, vigenereShift],
  );

  const copyToClipboard = useCallback(
    async (text: string, type: "encoded" | "decoded") => {
      try {
        await navigator.clipboard.writeText(text);
        if (type === "encoded") {
          setCopiedEncoded(true);
          setTimeout(() => { setCopiedEncoded(false); }, 2000);
        } else {
          setCopiedDecoded(true);
          setTimeout(() => { setCopiedDecoded(false); }, 2000);
        }
        toast.success("Copied to clipboard");
      } catch {
        toast.error("Failed to copy to clipboard");
      }
    },
    [],
  );

  return (
    <ToolsWrapper
      backUrl="/projects/cipher-tools"
      backLabel="Back to Cipher Tools"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Vigenère Cipher Encoder/Decoder</h1>
        <p className="text-muted-foreground">
          Encode and decode text using the classic Vigenère cipher with a
          repeating keyword
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
                <Label htmlFor="input-text">Text to Encode/Decode</Label>
                <Textarea
                  id="input-text"
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => { setInputText(e.target.value); }}
                  rows={8}
                  className="font-mono"
                />
              </div>

              {/* Keyword */}
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  type="text"
                  placeholder="Enter a keyword..."
                  value={keyword}
                  onChange={(e) => { setKeyword(e.target.value); }}
                  className="w-full font-mono uppercase"
                />
                <p className="text-xs text-muted-foreground">
                  Non-letter characters are ignored; the keyword repeats to
                  match the length of your text.
                </p>
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

        {/* Results Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="encode">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Encoded Text</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { void copyToClipboard(encoded, "encoded"); }}
                    disabled={!encoded}
                  >
                    {copiedEncoded ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copiedEncoded ? "Copied!" : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {inputText ? (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                      <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                        {encoded}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                      <p className="text-muted-foreground">
                        Enter text to see encoded result
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="decode" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Decoded Text</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { void copyToClipboard(decoded, "decoded"); }}
                    disabled={!decoded}
                  >
                    {copiedDecoded ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copiedDecoded ? "Copied!" : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {inputText ? (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                      <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                        {decoded}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                      <p className="text-muted-foreground">
                        Enter encrypted text to see the decoded result
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>About Vigenère Cipher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">How It Works</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Each letter is shifted by a keyword letter&apos;s position</li>
                <li>• A = 0, B = 1, ... Z = 25 for the keyword shift</li>
                <li>• The keyword repeats to cover the full message</li>
                <li>• A polyalphabetic cipher — unlike Caesar&apos;s single shift</li>
                <li>• Case and punctuation preserved</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Use Cases</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Educational cryptography learning</li>
                <li>• Historical cipher demonstrations</li>
                <li>• Puzzles and word games</li>
                <li>• Stronger obfuscation than a single Caesar shift</li>
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
                    breakable via Kasiski examination and frequency analysis
                  </div>
                  <div>• Short or reused keywords weaken it further</div>
                  <div>• Use for educational purposes only</div>
                  <div>
                    • For real security, use modern encryption (AES, RSA)
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Historical Context</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Described by Giovan Battista Bellaso (1553)</div>
                  <div>• Later misattributed to Blaise de Vigenère</div>
                  <div>• Called &quot;le chiffre indéchiffrable&quot; for 300 years</div>
                  <div>• Broken by Babbage and Kasiski in the 1800s</div>
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
