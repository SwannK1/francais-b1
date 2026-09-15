import { describe, expect, it } from "vitest";
import { bucketForState } from "../summary";
import type { ReviewState } from "../types";

describe("bucketForState", () => {
  it("maitrisee -> acquis", () => {
    expect(bucketForState("maitrisee")).toBe("acquis");
  });

  it("en_apprentissage -> aConsolider", () => {
    expect(bucketForState("en_apprentissage")).toBe("aConsolider");
  });

  it("fragile -> aRevoir", () => {
    expect(bucketForState("fragile")).toBe("aRevoir");
  });

  it("a_revoir -> aRevoir", () => {
    expect(bucketForState("a_revoir")).toBe("aRevoir");
  });

  it("nouvelle -> null (rien à classer encore)", () => {
    expect(bucketForState("nouvelle")).toBeNull();
  });

  it("couvre les 5 états possibles sans en oublier un", () => {
    const allStates: ReviewState[] = ["nouvelle", "en_apprentissage", "fragile", "a_revoir", "maitrisee"];
    for (const state of allStates) {
      expect(() => bucketForState(state)).not.toThrow();
    }
  });
});
