import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const textStyle = { fontFamily: "futura-pt, sans-serif", fontWeight: 300 } as const;

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.15em]"
      style={textStyle}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span className="text-white">&gt;&gt;</span>}
            {!isLast && item.href ? (
              <Link
                href={item.href}
                className="text-white transition-opacity hover:opacity-80"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-white" : "text-white"}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
