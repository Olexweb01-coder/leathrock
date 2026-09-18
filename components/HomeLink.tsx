"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * The logo. Navigating to "/" from "/" is a no-op in the router, so on the home
 * page we scroll back to the hero instead. Everywhere else it is a normal link.
 */
export default function HomeLink({ className, style, children }: {
  className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  const path = usePathname();
  const atHome = path === '/' || path === '';

  return (
    <Link
      className={className}
      style={style}
      href="/"
      aria-label={atHome ? 'Back to top' : 'Leathrock home'}
      onClick={(e) => {
        if (!atHome) return;
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
    >
      {children}
    </Link>
  );
}
