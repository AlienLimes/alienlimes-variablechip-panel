import { test, expect } from '@grafana/plugin-e2e';

test('shows the chip options in the panel editor', async ({ gotoPanelEditPage, readProvisionedDashboard, page }) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  await gotoPanelEditPage({ dashboard, id: '1' });
  await expect(page.getByText('Chip colour', { exact: true })).toBeVisible();
  await expect(page.getByText('Variables to show', { exact: true })).toBeVisible();
});