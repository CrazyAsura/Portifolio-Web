import { expect, test } from '@playwright/test';

test('conteúdo, projetos e contatos aparecem sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Leon Mendonça');
  await expect(page.getByRole('heading', { name: '+Contábil', exact: true })).toBeVisible();
  await expect(page.locator('a[href="mailto:leoncdzt@gmail.com"]')).toBeVisible();
  await context.close();
});

test('navegação, tema persistente e layout responsivo', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Ativar tema claro' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('persist:portfolio-leon-v1'))).toContain('light');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Ativar tema escuro' })).toBeVisible();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
  await page.getByRole('link', { name: 'Explorar projetos' }).click();
  await expect.poll(() => page.locator('#projetos').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(80);
  await expect(page.locator('a.project-link')).toHaveCount(3);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('portfolio.png'), fullPage: true });
  expect(errors).toEqual([]);
});

test('cursor personalizado responde ao clique e preserva interação', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Cursor personalizado é exclusivo de mouse.');
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/lenis/);
  await page.mouse.move(250, 250);
  await expect(page.locator('html')).toHaveClass(/custom-cursor/);
  await expect(page.locator('.cursor-dot')).toHaveCSS('opacity', '1');
  await page.mouse.click(250, 250);
  await expect(page.locator('.cursor-ring')).toHaveCSS('opacity', '1');
  await expect(page.locator('.cursor-dot')).toHaveCSS('pointer-events', 'none');
  await page.keyboard.press('Tab');
  await expect(page.locator('html')).not.toHaveClass(/custom-cursor/);
});

test('redução de movimento e touch mantêm os controles nativos', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.mouse.move(250, 250);
  await expect(page.locator('html')).not.toHaveClass(/custom-cursor/);
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('link', { name: 'Explorar projetos' }).click();
  await expect(page).toHaveURL(/#projetos$/);
});
