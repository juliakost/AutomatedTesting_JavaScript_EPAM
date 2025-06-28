import { test, expect } from "@playwright/test";

test.describe("Careers Tests", () => {
  test.use({ storageState: "state.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.epam.com");
  });

  test("should find some job openings for entered keyword and location", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Careers" }).nth(1).click();
    await page.getByRole("textbox", { name: "Keyword or job ID" }).click();
    await page.getByRole("textbox", { name: "Keyword or job ID" }).fill("test");

    await page.getByRole("textbox", { name: "Budapest" }).click();
    await page.getByRole("combobox").filter({ hasText: /^$/ }).fill("poland");
    await page
      .getByLabel("Poland", { exact: true })
      .getByText("Poland", { exact: true })
      .click();
    await page.getByRole("option", { name: "All Cities in Poland" }).click();

    await page.getByText("All Skills").click();
    await page
      .getByRole("treeitem", { name: "Software, System, and Test" })
      .locator("span")
      .click();
    await page.getByRole("button", { name: "Find" }).click();
    await expect(page.getByText(/We found \d+ job openings/)).toBeVisible();
  });
});
