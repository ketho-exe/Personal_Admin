import { NavigationItem, navigationItems } from "./navigation";

export function MobileNav() {
  return (
    <nav aria-label="Primary" className="mobile-nav">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.href}
          available={item.available}
          className="mobile-nav__link"
          href={item.href}
          label={item.label}
        />
      ))}
    </nav>
  );
}
