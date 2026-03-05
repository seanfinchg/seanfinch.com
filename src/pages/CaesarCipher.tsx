"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ToolsWrapper from "@/components/wrappers/ToolsWrapper";
import { Checkbox } from "@/components/ui/checkbox";

export default function CaesarCipher() {
  const [inputText, setInputText] = useState("");
  const [shift, setShift] = useState(3);
  const [copiedEncoded, setCopiedEncoded] = useState(false);
  const [copiedDecoded, setCopiedDecoded] = useState(false);
  const [keepCapitalization, setKeepCapitalization] = useState(true);
  const [keepPunctuation, setKeepPunctuation] = useState(true);

  // Caesar cipher encoding function
  const caesarShift = (text: string, shiftAmount: number): string => {
    if (!text) return "";

    return text
      .split("")
      .map((char) => {
        // Only shift letters
        if (/[a-zA-Z]/.test(char)) {
          const isUpper = char === char.toUpperCase();
          const base = isUpper ? 65 : 97; // ASCII 'A' or 'a'
          const charCode = char.charCodeAt(0);
          // Add 26 before modulo to handle negative shifts correctly
          const shifted = ((charCode - base + shiftAmount + 26) % 26) + base;
          let result = String.fromCharCode(shifted);

          // Apply capitalization option
          if (!keepCapitalization) {
            result = result.toLowerCase();
          }

          return result;
        }
        // Keep or remove non-letters based on option
        return keepPunctuation ? char : "";
      })
      .join("");
  };

  // Compute encoded text
  const encoded = useMemo(() => {
    return caesarShift(inputText, shift);
  }, [inputText, shift, caesarShift]);

  // Compute decoded text (negative shift)
  const decoded = useMemo(() => {
    return caesarShift(inputText, -shift);
  }, [inputText, shift, caesarShift]);

  // Brute force - generate all possible shifts
  const bruteForceResults = useMemo(() => {
    if (!inputText) return [];
    return Array.from({ length: 25 }, (_, i) => {
      const shiftAmount = i + 1;
      return {
        shift: shiftAmount,
        result: caesarShift(inputText, -shiftAmount),
      };
    });
  }, [inputText, caesarShift]);

  // Copy to clipboard function
  const copyToClipboard = useCallback(
    async (text: string, type: "encoded" | "decoded" | "brute") => {
      try {
        await navigator.clipboard.writeText(text);
        if (type === "encoded") {
          setCopiedEncoded(true);
          setTimeout(() => setCopiedEncoded(false), 2000);
        } else if (type === "decoded") {
          setCopiedDecoded(true);
          setTimeout(() => setCopiedDecoded(false), 2000);
        }
        toast.success("Copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy to clipboard");
      }
    },
    [],
  );

  return (
    <ToolsWrapper>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Caesar Cipher Encoder/Decoder</h1>
        <p className="text-muted-foreground">
          Encode and decode text using the classic Caesar cipher with adjustable
          shift values
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
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="font-mono"
                />
              </div>

              {/* Shift Amount */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shift">Shift Amount</Label>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {shift}
                  </span>
                </div>
                <Slider
                  id="shift"
                  min={1}
                  max={25}
                  step={1}
                  value={[shift]}
                  onValueChange={(value) => setShift(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  min={1}
                  max={25}
                  value={shift}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= 25) setShift(val);
                  }}
                  className="w-full"
                />
              </div>

              {/* Options */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keep-caps"
                    checked={keepCapitalization}
                    onCheckedChange={(checked) =>
                      setKeepCapitalization(checked === true)
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
                      setKeepPunctuation(checked === true)
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
              <TabsTrigger value="brute">Brute Force</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Encoded Text</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(encoded, "encoded")}
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
                    onClick={() => copyToClipboard(decoded, "decoded")}
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
                        Enter text to see decoded result
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="brute" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Possible Shifts</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Try all 25 possible shifts to crack the cipher
                  </p>
                </CardHeader>
                <CardContent>
                  {inputText ? (
                    <div className="max-h-[600px] space-y-3 overflow-y-auto">
                      {bruteForceResults.map(({ shift: shiftVal, result }) => (
                        <div
                          key={shiftVal}
                          className="flex items-start gap-3 rounded-lg border bg-gray-50 p-3 dark:bg-gray-900"
                        >
                          <div className="flex min-w-[60px] flex-col items-center">
                            <span className="text-xs font-medium text-muted-foreground">
                              Shift
                            </span>
                            <span className="text-lg font-bold text-rose-600 dark:text-rose-400">
                              {shiftVal}
                            </span>
                          </div>
                          <div className="flex-1">
                            <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                              {result}
                            </pre>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(result, "brute")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                      <p className="text-muted-foreground">
                        Enter encrypted text to see all possible decodings
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
          <CardTitle>About Caesar Cipher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">How It Works</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Shifts each letter by a fixed number</li>
                <li>• A = D, B = E, C = F (shift 3)</li>
                <li>• Wraps around: X = A, Y = B, Z = C</li>
                <li>• ROT13 is Caesar cipher with shift 13</li>
                <li>• Case and punctuation preserved</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Use Cases</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Educational cryptography learning</li>
                <li>• Simple text obfuscation</li>
                <li>• Puzzles and word games</li>
                <li>• Historical cipher demonstrations</li>
                <li>• ROT13 for spoiler protection</li>
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
                    Caesar cipher is easily cracked with brute force
                  </div>
                  <div>• Only 25 possible keys (very weak)</div>
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
                  <div>• Named after Julius Caesar (100 BC)</div>
                  <div>• Used in Roman military communications</div>
                  <div>• One of the oldest known ciphers</div>
                  <div>• Foundation for modern cryptography</div>
                  <div>• Still used in ROT13 for spoiler text</div>
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
