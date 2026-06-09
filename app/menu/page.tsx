import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu | GOYO Cafe & Restaurant',
  description:
    'Explore our curated selection of specialty coffees, artisan pastries, and premium main dining offerings.',
}

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  tag: string | null
  created_at: string
}

const CATEGORY_CONFIG: Record<string, { label: string; subtitle: string }> = {
  coffee: {
    label: 'Coffee',
    subtitle:
      'Single-origin micro-lots roasted in small batches, extracted with precision and intention.',
  },
  pastries: {
    label: 'Pastries',
    subtitle:
      'Hand-shaped before dawn with organic flour and premium European butter.',
  },
  dining: {
    label: 'Main Dining',
    subtitle:
      'Culinary compositions by our Chef de Cuisine, plated with minimalist artistry.',
  },
}

const CATEGORY_ORDER = ['coffee', 'pastries', 'dining']

export default async function MenuPage() {
  const supabase = await createClient()

  const { data: menuItems, error } = await supabase
    .from('menu')
    .select('*')
    .order('price', { ascending: true })

  if (error) {
    console.error('Error fetching menu:', error)
  }

  const items: MenuItem[] = menuItems ?? []

  // Group items by category
  const grouped: Record<string, MenuItem[]> = {}
  for (const item of items) {
    const cat = item.category?.toLowerCase() ?? 'other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(item)
  }

  // Determine the order of categories to display
  const categoryKeys = CATEGORY_ORDER.filter((key) => grouped[key]?.length > 0)

  return (
    <div className="min-h-screen bg-background py-20 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-radial-glow -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-20">
        {/* ── Header ── */}
        <div className="text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/40 hover:text-accent-gold text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-300 mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Return Home
          </Link>

          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-sans font-medium block">
            Atelier Menu
          </span>

          <h1 className="font-serif text-5xl md:text-6xl tracking-wide font-light">
            Our Sensory{' '}
            <span className="italic font-normal text-gold-gradient">
              Offerings
            </span>
          </h1>

          <p className="text-foreground/50 max-w-lg mx-auto text-xs md:text-sm font-sans tracking-wide leading-relaxed font-light">
            Each recipe is a balance of traditional technique and modern
            gastronomy, crafted with organic ingredients sourced from small-scale
            farmers.
          </p>
        </div>

        {/* ── Error state ── */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-sm font-sans">
              We're having trouble loading the menu. Please try again shortly.
            </p>
          </div>
        )}

        {/* ── Empty state ── */}
        {!error && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/40 text-sm font-sans font-light">
              Our menu is being curated. Please check back soon.
            </p>
          </div>
        )}

        {/* ── Category Sections ── */}
        {categoryKeys.map((catKey) => {
          const config = CATEGORY_CONFIG[catKey] ?? {
            label: catKey,
            subtitle: '',
          }
          const catItems = grouped[catKey]

          return (
            <section key={catKey} className="space-y-10">
              {/* Category heading */}
              <div className="flex items-center gap-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-3xl md:text-4xl tracking-wider font-light">
                    <span className="text-gold-gradient italic">
                      {config.label}
                    </span>
                  </h2>
                  <p className="text-foreground/40 text-xs font-sans tracking-wide font-light max-w-md">
                    {config.subtitle}
                  </p>
                </div>
                <div className="flex-1 h-px bg-accent-charcoal-border/30" />
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#121212] border border-accent-charcoal-border/40 hover:border-accent-gold/20 transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-[220px] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                      />
                      {item.tag && (
                        <span className="absolute top-4 left-4 bg-background/90 text-accent-gold border border-accent-gold/30 text-[9px] tracking-widest uppercase px-3 py-1 font-semibold font-sans">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2 font-sans">
                        <div className="flex justify-between items-baseline gap-4">
                          <h3 className="font-serif text-lg tracking-wider text-foreground group-hover:text-accent-gold transition-colors font-medium">
                            {item.name}
                          </h3>
                          <span className="text-accent-gold font-sans text-sm font-semibold shrink-0">
                            ${Number(item.price).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/50 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* ── Bottom CTA ── */}
        <div className="text-center pt-8 pb-4">
          <Link
            href="/book"
            className="inline-block px-8 py-3 bg-transparent border border-accent-gold text-accent-gold text-xs tracking-widest uppercase hover:bg-accent-gold hover:text-background font-sans transition-all duration-500 rounded-none gold-glow"
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </div>
  )
}
