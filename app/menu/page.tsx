'use client'

import { useState } from 'react'
import Image from 'next/image'

type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  category: 'coffee' | 'pastries' | 'dining'
  image: string
  tag?: string
}

const MENU_ITEMS: MenuItem[] = [
  // Coffee
  {
    id: 'c1',
    name: 'Single-Origin V60 Pour Over',
    description: 'Ethiopian Yirgacheffe with bright notes of jasmine, bergamot, and sweet black tea.',
    price: '$7.50',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600',
    tag: 'Roaster Select'
  },
  {
    id: 'c2',
    name: 'Velvet Flat White',
    description: 'Double shot of house espresso with silky, micro-textured milk poured with precision.',
    price: '$6.50',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=600'
  },
  {
    id: 'c3',
    name: 'Kyoto Cold Drip',
    description: 'Slow-dripped for 12 hours through ice water, revealing complex sweet and chocolatey undertones.',
    price: '$9.00',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600',
    tag: 'Limited'
  },
  {
    id: 'c4',
    name: 'Spanish Rose Cortado',
    description: 'Espresso mixed with equal parts warm milk, organic rose water, and cardamon syrup.',
    price: '$7.00',
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600'
  },

  // Pastries
  {
    id: 'p1',
    name: 'Aura Almond Croissant',
    description: 'Twenty-four hour fermented sourdough laminated with premium french butter, filled with sweet almond frangipane and toasted slices.',
    price: '$7.00',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600',
    tag: 'Award Winning'
  },
  {
    id: 'p2',
    name: 'Pistachio Matcha Cruffin',
    description: 'A hybrid croissant-muffin, rolled in sugar, filled with organic Uji matcha cream and Sicilian pistachio butter.',
    price: '$8.50',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600'
  },
  {
    id: 'p3',
    name: 'Classic Pain au Chocolat',
    description: 'Laminated pastry dough filled with double bars of Valrhona dark chocolate (70% cocoa).',
    price: '$6.00',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=600'
  },

  // Dining
  {
    id: 'd1',
    name: 'Smoked Wagyu Benedict',
    description: 'A5 Wagyu beef thinly sliced, poached farm eggs, smoked-tea hollandaise, served on toasted artisanal brioche.',
    price: '$26.00',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600',
    tag: 'Signature'
  },
  {
    id: 'd2',
    name: 'Truffle Wild Mushroom Gnocchi',
    description: 'House-made potato gnocchi tossed in creamy black truffle sauce, wild chanterelle mushrooms, and aged parmigiano-reggiano.',
    price: '$32.00',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600'
  },
  {
    id: 'd3',
    name: 'Saffron Seafood Risotto',
    description: 'Arborio rice cooked in rich seafood broth, infused with Iranian saffron, topped with seared diver scallops and prawns.',
    price: '$38.00',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600',
    tag: 'Chef Choice'
  }
]

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'coffee' | 'pastries' | 'dining'>('all')

  const filteredItems = activeTab === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeTab)

  return (
    <div className="min-h-screen bg-background py-20 px-6 relative">
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-radial-glow -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-sans font-medium block">
            Atelier Menu
          </span>
          <h1 className="font-serif text-5xl md:text-6xl tracking-wide font-light">
            Our Sensory <span className="italic font-normal text-gold-gradient">Offerings</span>
          </h1>
          <p className="text-foreground/50 max-w-lg mx-auto text-xs md:text-sm font-sans tracking-wide leading-relaxed font-light">
            Each recipe is a balance of traditional technique and modern gastronomy, crafted with organic ingredients sourced from small-scale farmers.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center border-b border-accent-charcoal-border/30 max-w-xl mx-auto">
          {(['all', 'coffee', 'pastries', 'dining'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`flex-1 pb-4 text-[10px] md:text-xs tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 relative border-b-2 ${
                activeTab === category
                  ? 'text-accent-gold border-accent-gold'
                  : 'text-foreground/40 border-transparent hover:text-foreground/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#121212] border border-accent-charcoal-border/40 hover:border-accent-gold/20 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                {item.tag && (
                  <span className="absolute top-4 left-4 bg-background/90 text-accent-gold border border-accent-gold/30 text-[9px] tracking-widest uppercase px-3 py-1 font-semibold font-sans">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Text details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 font-sans">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-serif text-lg tracking-wider text-foreground group-hover:text-accent-gold transition-colors font-medium">
                      {item.name}
                    </h3>
                    <span className="text-accent-gold font-sans text-sm font-semibold shrink-0">
                      {item.price}
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
      </div>
    </div>
  )
}
