import { test, expect } from "@playwright/test";

test("catalog journey", async ({ page }) => {
  await page.goto("/catalogo");
  await expect(page.getByText("Catálogo de veículos")).toBeVisible();
});

test("lead journey", async ({ page }) => {
  await page.goto("/leads");
  await expect(page.getByText("Lead express")) .toBeVisible();
});

test("admin journey", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByText("Painel administrativo")).toBeVisible();
});
