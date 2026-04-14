/** True when `pathname` matches this route (including nested paths, except `/`). */
export function isNavPathActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
