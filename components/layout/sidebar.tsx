import { NavigationItem, navigationItems } from "./navigation";

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__brand">
        <p className="app-sidebar__eyebrow">Personal Admin</p>
        <h1>Household cockpit</h1>
        <p className="app-sidebar__copy">
          A calm overview of today&apos;s obligations, signals, and loose ends.
        </p>
      </div>
      <nav aria-label="Primary" className="app-sidebar__nav">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.href}
            available={item.available}
            className="app-nav-link"
            href={item.href}
            label={item.label}
          />
        ))}
      </nav>
    </aside>
  );
}
