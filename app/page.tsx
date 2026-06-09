import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial-glow -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center px-6">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1800"
            alt="GOYO Cafe Premium Interior"
            fill
            className="object-cover opacity-35 scale-105 filter blur-[1px] brightness-75 hover:scale-100 transition-all duration-[20s] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <p className="text-accent-gold text-xs tracking-[0.4em] uppercase font-sans font-medium">
            Est. 2026 — Sensory Atelier
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] font-light leading-tight">
            Quiet Luxury. <br />
            <span className="text-gold-gradient font-normal italic">Masterful Craft.</span>
          </h1>
          <p className="text-foreground/60 max-w-xl mx-auto text-sm md:text-base font-sans leading-relaxed font-light">
            A curated oasis where coffee extraction meets spatial poetry. Indulge in artisanal micro-roasts and meticulous culinary design.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 bg-accent-gold text-background font-sans text-xs tracking-[0.25em] uppercase hover:bg-accent-gold-hover hover:scale-105 transition-all duration-500 rounded-none font-semibold shadow-gold-glow hover:shadow-gold-glow-hover"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-foreground/20 text-foreground font-sans text-xs tracking-[0.25em] uppercase hover:border-accent-gold hover:text-accent-gold transition-all duration-500 rounded-none font-semibold"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-accent-charcoal-border/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-accent-gold text-xs tracking-[0.3em] uppercase font-sans font-medium block">
                Our Narrative
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-[0.05em] font-light">
                Crafting the Art of <span className="italic font-normal text-gold-gradient">Slowing Down</span>
              </h2>
            </div>
            <p className="text-foreground/70 text-sm md:text-base leading-relaxed font-light font-sans">
              At GOYO, we believe dining is a form of active meditation. We design each item on our menu and every square inch of our space to act as a gentle invitation to pause, observe, and experience.
            </p>
            <p className="text-foreground/50 text-sm leading-relaxed font-light font-sans">
              From our single-origin micro-lots, roasted in micro-batches, to our organic pastries shaped by hand before dawn, we hold ourselves to an uncompromising standard.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-8 border-t border-accent-charcoal-border/20">
              <div>
                <span className="font-serif text-3xl text-accent-gold">01</span>
                <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold mt-1">Micro-Lot Coffee</h4>
                <p className="text-xs text-foreground/45 mt-2 font-light">Directly traded single origins with distinct terroir profiles.</p>
              </div>
              <div>
                <span className="font-serif text-3xl text-accent-gold">02</span>
                <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold mt-1">Culinary Art</h4>
                <p className="text-xs text-foreground/45 mt-2 font-light">Pastries and dining inspired by minimalist plating and rich heritage.</p>
              </div>
            </div>
          </div>

          {/* Graphic/Image grid */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 relative h-[450px]">
              <Image
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200"
                alt="GOYO Specialty Brewing"
                fill
                className="object-cover border border-accent-charcoal-border/50 scale-100 hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="col-span-4 relative h-[300px] -ml-8 mt-16 shadow-gold-glow">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200"
                alt="GOYO Cafe Table Aesthetic"
                fill
                className="object-cover border border-accent-gold/20 scale-100 hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Signatures Section */}
      <section className="py-24 bg-[#121212] border-y border-accent-charcoal-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-accent-gold text-xs tracking-[0.3em] uppercase font-sans font-medium block">
              Curated Selection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-[0.05em] font-light">
              Signature Creations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Signature 1 */}
            <div className="group bg-[#1A1A1A] border border-accent-charcoal-border/30 overflow-hidden hover:border-accent-gold/30 transition-all duration-500">
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1510972527409-cef79031062c?q=80&w=600"
                  alt="Golden Shimmer Latte"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-lg tracking-wider text-foreground group-hover:text-accent-gold transition-colors">
                    Golden Shimmer Latte
                  </h3>
                  <span className="text-accent-gold font-sans text-sm">$8.50</span>
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed font-light font-sans">
                  Double espresso infused with house-made madagascar vanilla bean syrup, micro-textured oat milk, and a delicate dust of edible gold.
                </p>
              </div>
            </div>

            {/* Signature 2 */}
            <div className="group bg-[#1A1A1A] border border-accent-charcoal-border/30 overflow-hidden hover:border-accent-gold/30 transition-all duration-500">
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600"
                  alt="Aura Almond Croissant"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-lg tracking-wider text-foreground group-hover:text-accent-gold transition-colors">
                    Aura Almond Croissant
                  </h3>
                  <span className="text-accent-gold font-sans text-sm">$7.00</span>
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed font-light font-sans">
                  Twenty-four hour fermented sourdough laminated with premium french butter, filled with sweet almond frangipane and toasted slices.
                </p>
              </div>
            </div>

            {/* Signature 3 */}
            <div className="group bg-[#1A1A1A] border border-accent-charcoal-border/30 overflow-hidden hover:border-accent-gold/30 transition-all duration-500">
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600"
                  alt="Smoked Wagyu Benedict"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-lg tracking-wider text-foreground group-hover:text-accent-gold transition-colors">
                    Smoked Wagyu Benedict
                  </h3>
                  <span className="text-accent-gold font-sans text-sm">$26.00</span>
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed font-light font-sans">
                  A5 Wagyu beef thinly sliced, poached farm eggs, smoked-tea hollandaise, served on toasted artisanal brioche.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-12">
            <Link
              href="/menu"
              className="inline-block px-8 py-3 bg-transparent border border-accent-gold text-accent-gold text-xs tracking-widest uppercase hover:bg-accent-gold hover:text-background font-sans transition-all duration-500 rounded-none gold-glow"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation CTA Block */}
      <section className="relative py-28 flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200"
            alt="Private Dining Table"
            fill
            className="object-cover opacity-20 brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-3xl text-center space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl tracking-wide font-light">
            Reserve Your Private Atelier Experience
          </h2>
          <p className="text-foreground/60 text-xs md:text-sm font-sans tracking-wide max-w-xl mx-auto leading-relaxed">
            Ensure availability in our private dining rooms and barista bars. Experience a personalized menu curated by our Chef de Cuisine.
          </p>
          <div className="pt-6">
            <Link
              href="/book"
              className="px-8 py-4 bg-accent-gold text-background text-xs tracking-[0.25em] uppercase hover:bg-accent-gold-hover transition-all duration-500 font-sans font-bold shadow-gold-glow hover:shadow-gold-glow-hover"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
