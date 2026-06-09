import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GOYO Cafe & Restaurant | Premium Minimalist Dining',
  description: 'Immerse yourself in a luxurious minimalist dining experience. Handcrafted specialty coffees, artisan pastries, and premium main dining.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-accent-gold/30 selection:text-accent-gold-hover">
        {/* Luxury Top Banner */}
        <div className="bg-[#121212] text-[10px] tracking-[0.2em] uppercase py-2 text-center text-accent-gold border-b border-accent-charcoal-border/40 font-sans">
          Reservations Open: Experience High-End Culinary Artistry
        </div>

        {/* Premium Sticky Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-accent-charcoal-border/30 transition-premium">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-serif text-2xl font-bold tracking-[0.25em] text-gold-gradient hover:opacity-90 transition-opacity">
              GOYO
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center space-x-10 text-xs tracking-[0.2em] uppercase font-sans">
              <Link href="/" className="text-foreground/80 hover:text-accent-gold transition-colors duration-300">
                Home
              </Link>
              <Link href="/menu" className="text-foreground/80 hover:text-accent-gold transition-colors duration-300">
                Menu
              </Link>
              <Link href="/book" className="text-foreground/80 hover:text-accent-gold transition-colors duration-300">
                Reservations
              </Link>
              <Link href="/auth" className="text-foreground/80 hover:text-accent-gold transition-colors duration-300">
                Sign In
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link
                href="/book"
                className="hidden sm:inline-block px-6 py-2.5 bg-transparent border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-background text-xs tracking-[0.2em] uppercase font-sans transition-all duration-500 rounded-none gold-glow"
              >
                Book Table
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        {/* Luxury Footer */}
        <footer className="bg-accent-charcoal border-t border-accent-charcoal-border/40 py-16 text-foreground/75 text-sm font-sans">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="font-serif text-xl tracking-[0.2em] text-accent-gold uppercase font-semibold">GOYO</h3>
              <p className="text-xs text-foreground/50 leading-relaxed font-light font-sans">
                An artistic culinary sanctuary designed to inspire, comfort, and redefine high-end minimalist dining.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs tracking-[0.2em] uppercase text-accent-gold font-medium font-sans">Hours</h4>
              <ul className="space-y-2 text-xs text-foreground/60 font-light font-sans">
                <li>Monday – Friday: 7:00 AM – 10:00 PM</li>
                <li>Saturday – Sunday: 8:00 AM – 11:00 PM</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs tracking-[0.2em] uppercase text-accent-gold font-medium font-sans">Contact</h4>
              <ul className="space-y-2 text-xs text-foreground/60 font-light font-sans">
                <li>128 Atelier Blvd, Luxury District</li>
                <li>reservations@goyocafe.com</li>
                <li>+1 (555) 019-2831</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs tracking-[0.2em] uppercase text-accent-gold font-medium font-sans">Stay Inspired</h4>
              <p className="text-xs text-foreground/50 leading-relaxed font-light font-sans">
                Subscribe to receive private dining invites and seasonal menu announcements.
              </p>
              <div className="flex border-b border-accent-gold/40 focus-within:border-accent-gold transition-colors py-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-transparent border-none outline-none text-xs w-full placeholder:text-foreground/30 text-foreground font-sans"
                />
                <button className="text-accent-gold text-xs tracking-wider uppercase font-medium hover:text-white transition-colors pl-2 font-sans">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-accent-charcoal-border/20 text-center text-xs text-foreground/30 font-light tracking-widest font-sans">
            © {new Date().getFullYear()} GOYO CAFE. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
