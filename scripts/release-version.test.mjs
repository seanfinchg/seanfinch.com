import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { monthPrefix, nextVersion } from "./release-version.mjs";

const nov = new Date("2026-11-15T12:00:00Z");

describe("monthPrefix", () => {
  it("uses a two-digit month", () => {
    assert.equal(monthPrefix(new Date("2026-05-10T12:00:00Z")), "2026.05");
  });

  it("uses the site owner's time zone, not UTC", () => {
    // 02:00 UTC on Dec 1 is still the evening of Nov 30 in New York.
    assert.equal(monthPrefix(new Date("2026-12-01T02:00:00Z")), "2026.11");
  });
});

describe("nextVersion", () => {
  it("starts at 1 for the first release of a month", () => {
    assert.equal(nextVersion(nov, []), "2026.11.1");
  });

  it("counts up from the highest release this month", () => {
    assert.equal(nextVersion(nov, ["2026.11.1", "2026.11.2"]), "2026.11.3");
  });

  it("compares numbers, not text", () => {
    assert.equal(nextVersion(nov, ["2026.11.9", "2026.11.10"]), "2026.11.11");
  });

  it("restarts at 1 in a new month", () => {
    assert.equal(nextVersion(nov, ["2026.10.4"]), "2026.11.1");
  });

  it("ignores tags that aren't releases", () => {
    const tags = ["v2026.11.5", "2026.11.0", "2026.11.x", "2026.110.1", "photos-2026", ""];
    assert.equal(nextVersion(nov, tags), "2026.11.1");
  });
});
