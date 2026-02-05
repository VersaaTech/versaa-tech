'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { generateBreadcrumbSchema, BreadcrumbItem } from '@/lib/schema';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Always include home as the first item
  const allItems: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    ...items,
  ];

  const schema = generateBreadcrumbSchema(allItems);

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-sm text-muted-foreground ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="h-4 w-4 mx-1 text-muted-foreground/50"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-foreground"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {isHome && <Home className="h-4 w-4" aria-hidden="true" />}
                    <span className={isHome ? 'sr-only' : ''}>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
