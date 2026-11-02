import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { breadcrumbsFor, categoryLabel } from "@/lib/seoMetadata";
import { productCategoryRoutes, serviceRoutes } from "@/lib/landingPages";
import { landingSupport } from "@/lib/landingSupport";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B] rounded";

export function Breadcrumbs({ path }: { path: string }) {
  const breadcrumbs = breadcrumbsFor(path);
  return (
    <nav aria-label="Breadcrumb" className="container pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-gray-400">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight aria-hidden="true" className="w-3 h-3" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span aria-current="page" className="text-gray-300">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className={`hover:text-white ${focus}`}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RelatedLandingLinks({ slug }: { slug: string }) {
  const related = landingSupport[slug];
  if (!related) return null;
  const links = [
    ...related.relatedProducts
      .map(target =>
        productCategoryRoutes.find(item => item.landing.slug === target)
      )
      .filter(Boolean)
      .map(item => ({
        name: categoryLabel(item!.name),
        path: `/products/${item!.landing.slug}`,
      })),
    ...related.relatedServices
      .map(target => serviceRoutes.find(item => item.landing.slug === target))
      .filter(Boolean)
      .map(item => ({
        name: item!.title,
        path: `/services/${item!.landing.slug}`,
      })),
    { name: "Security solutions for your property", path: "/solutions" },
  ];
  return (
    <section className="py-16 bg-[#0B0B0B] border-y border-white/5">
      <div className="container">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-7">
          Related products and services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`glass rounded-xl p-5 flex items-center justify-between gap-4 text-sm text-gray-300 hover:text-white hover:border-[#CC0000]/30 ${focus}`}
            >
              {item.name}
              <ArrowRight
                aria-hidden="true"
                className="w-4 h-4 text-[#CC0000] flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
