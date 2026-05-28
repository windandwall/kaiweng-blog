'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-foreground">~/</span>
            <span className="text-foreground/70 group-hover:text-foreground transition-colors">
              峰峦是否天晴
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {SITE_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent rounded-md -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-accent transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {SITE_CONFIG.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    pathname === item.href
                      ? 'text-foreground bg-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
