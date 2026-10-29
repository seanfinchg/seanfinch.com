import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lineProblem } from "./check-content.mjs";

const none = new Set();
const h = (v) => createHash("sha256").update(v).digest("hex").slice(0, 16);

test("blocks street addresses", () => {
  assert.equal(lineProblem("Mail it to 42 Maple Grove Lane please", none), "street address");
  assert.equal(lineProblem("1600 N Pennsylvania Ave.", none), "street address");
});

test("blocks phone numbers and SSNs", () => {
  assert.equal(lineProblem("call (617) 555-0123", none), "phone number");
  assert.equal(lineProblem("617.555.0123", none), "phone number");
  assert.equal(lineProblem("ssn 123-45-6789", none), "SSN");
});

test("blocks confidentiality markers", () => {
  assert.equal(lineProblem("This deck is CONFIDENTIAL", none), "confidential marker");
  assert.equal(lineProblem("internal-only roadmap", none), "confidential marker");
  assert.equal(lineProblem("covered under NDA", none), "confidential marker");
});

test("blocks personal emails but allows site and noreply addresses", () => {
  assert.equal(lineProblem("reach jane.doe@gmail.com", none), "email address");
  assert.equal(lineProblem("contact@seanfinch.com", none), null);
  assert.equal(lineProblem("Co-Authored-By: Bot <noreply@example.com>", none), null);
  assert.equal(lineProblem("1234+bot@users.noreply.github.com", none), null);
});

test("blocks private terms by hash, as words and phrases", () => {
  const priv = new Set([h("elmwood"), h("secret cove")]);
  assert.equal(lineProblem("near Elmwood park", priv), "private term");
  assert.equal(lineProblem("down by Secret  Cove", priv), "private term");
  assert.equal(lineProblem("a secret plan", priv), null);
});

test("does not flag ordinary site content", () => {
  for (const line of [
    "Defender XDR rollout across 500+ endpoints",
    "cut reviews from three hours to a five-minute scan across 16 GRC controls",
    "Shot on a Nikon D610 at f/1.8, 1/160s, ISO 3200",
    "version 2026.10.1 released",
    "const STREET = 12;",
    "Orange County, California",
  ]) {
    assert.equal(lineProblem(line, none), null, line);
  }
});
