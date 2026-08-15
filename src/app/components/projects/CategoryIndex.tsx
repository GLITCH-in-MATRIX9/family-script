import Link from "next/link";
import PageShell from "./PageShell";
import type { BreadcrumbItem } from "./Breadcrumb";

interface CategoryItem {
  label: string;
  image: string;
  href?: string;
}

interface CategoryIndexProps {
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  items: CategoryItem[];
}

const fontBase = { fontFamily: "futura-pt, sans-serif" } as const;

export default function CategoryIndex({ title, description, breadcrumb, items }: CategoryIndexProps) {
  return (
    <PageShell breadcrumbItems={breadcrumb} contentAlign="start">
      <div className="w-full pt-6">
        <h1
          className="uppercase tracking-[0.04em]"
          style={{ ...fontBase, fontWeight: 500, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#e0b566" }}
        >
          {title}
        </h1>

        <p
          className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/85"
          style={{ ...fontBase, fontWeight: 300 }}
        >
          {description}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
          {items.map((item) => {
            const card = (
              <>
                <div className="aspect-[3/2] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div
                  className="mt-4 uppercase tracking-[0.1em] text-white"
                  style={{ ...fontBase, fontWeight: 400, fontSize: "1.1rem" }}
                >
                  {item.label}
                </div>
              </>
            );
            return item.href ? (
              <Link key={item.label} href={item.href} className="group block cursor-pointer">
                {card}
              </Link>
            ) : (
              <div key={item.label} className="group">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
