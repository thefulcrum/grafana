<<<<<<< HEAD
export function isSoloRoute(path: string): boolean {
  return path?.toLowerCase().includes('/d-solo/');
=======
import { NavLinkDTO } from '@grafana/data';

export function isSoloRoute(path: string): boolean {
  return /(d-solo|dashboard-solo)/.test(path?.toLowerCase());
}

export function pluginHasRootPage(pluginId: string, navTree: NavLinkDTO[]): boolean {
  return Boolean(
    navTree
      .find((navLink) => navLink.id === 'apps')
      ?.children?.find((app) => app.id === `plugin-page-${pluginId}`)
      ?.children?.some((page) => page.url?.endsWith(`/a/${pluginId}`))
  );
>>>>>>> v12.1.0
}
