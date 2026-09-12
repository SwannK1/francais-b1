import { expect, test } from "@playwright/test";

const PREMIUM_ROUTE = "/parcours/module/raconter-une-experience-personnelle";
const PREMIUM_ACTIVITY = "Raconter une expérience à un proche";

async function login(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto(`/connexion?next=${encodeURIComponent(PREMIUM_ROUTE)}`);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mot de passe").fill(password);
  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.waitForURL(`**${PREMIUM_ROUTE}`);
}

function monitorCriticalBrowserErrors(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return () => expect(errors, "Aucune erreur critique ne doit atteindre la console navigateur").toEqual([]);
}

test("le compte QA premium utilise l'auth réelle et reçoit le contenu protégé", async ({ page }) => {
  const expectNoBrowserErrors = monitorCriticalBrowserErrors(page);
  await login(page, process.env.QA_USER_EMAIL!, process.env.QA_USER_PASSWORD!);

  const session = await page.request.get("/api/auth/me");
  expect(session.ok()).toBe(true);
  const { user } = await session.json();
  expect(user.id).toBeTruthy();
  expect(new Date(user.premiumUntil).getTime()).toBeGreaterThan(Date.now());

  const progressMerge = await page.request.post("/api/progress/merge", {
    data: { progress: null },
  });
  expect(progressMerge.ok()).toBe(true);
  expect((await progressMerge.json()).progress.moduleProgress).toEqual(expect.any(Array));

  await expect(page.getByRole("heading", { name: "Raconter une expérience personnelle" })).toBeVisible();
  await page.getByRole("button", { name: "Produire" }).click();
  await expect(page.getByText(PREMIUM_ACTIVITY)).toBeVisible();
  await expect(page.getByText("Voir l'offre complète")).toHaveCount(0);
  await page.context().storageState({ path: "playwright/.auth/qa-user.json" });
  expectNoBrowserErrors();
});

test("le compte QA gratuit reste bloqué et ne reçoit pas l'activité premium", async ({ page }) => {
  const expectNoBrowserErrors = monitorCriticalBrowserErrors(page);
  await login(page, process.env.QA_FREE_USER_EMAIL!, process.env.QA_FREE_USER_PASSWORD!);

  const session = await page.request.get("/api/auth/me");
  expect(session.ok()).toBe(true);
  const { user } = await session.json();
  expect(user.id).toBeTruthy();
  expect(user.premiumUntil).toBeNull();

  await expect(page.getByRole("link", { name: "Voir l'offre complète" })).toBeVisible();
  await expect(page.getByText(PREMIUM_ACTIVITY)).toHaveCount(0);
  expectNoBrowserErrors();
});
