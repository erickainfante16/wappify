import { describe, expect, it } from "vitest";
import { cartTotals, seedServices } from "./store";

describe("cartTotals", () => {
  it("applies 16% IVA on subtotal", () => {
    const t = cartTotals([{ id: "starter", qty: 2 }], seedServices);
    expect(t.subtotal).toBe(998);
    expect(t.iva).toBe(159.68);
    expect(t.total).toBe(1157.68);
  });
});
