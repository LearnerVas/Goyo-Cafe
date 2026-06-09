import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reserve a Table | GOYO Cafe & Restaurant',
  description:
    'Book your premium dining experience at GOYO. Reserve a table in our luxury dining room or barista tasting counters.',
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const errorMessage = params.error

  async function createReservation(formData: FormData) {
    'use server'

    const customerName = formData.get('customer_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const reservationDate = formData.get('reservation_date') as string
    const reservationTime = formData.get('reservation_time') as string
    const guestsStr = formData.get('guests') as string
    const specialRequests = formData.get('special_requests') as string

    // ── Validation ──
    if (!customerName || customerName.trim().length < 2) {
      redirect('/book?error=Name must be at least 2 characters.')
    }
    if (!email || !email.includes('@')) {
      redirect('/book?error=Please enter a valid email address.')
    }
    if (!phone || phone.trim().length < 6) {
      redirect('/book?error=Please enter a valid phone number.')
    }
    if (!reservationDate) {
      redirect('/book?error=Please select a date for your reservation.')
    }
    if (!reservationTime) {
      redirect('/book?error=Please select a reservation time.')
    }
    const guests = parseInt(guestsStr, 10)
    if (isNaN(guests) || guests < 1 || guests > 8) {
      redirect('/book?error=Number of guests must be between 1 and 8.')
    }

    // ── Insert into Supabase ──
    const supabase = await createClient()

    const { error } = await supabase.from('reservations').insert([
      {
        customer_name: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        reservation_date: reservationDate,
        reservation_time: reservationTime,
        guests,
        special_requests: specialRequests?.trim() || null,
      },
    ])

    if (error) {
      console.error('Reservation insert error:', error)
      redirect(`/book?error=${encodeURIComponent('Reservation failed: ' + error.message)}`)
    }

    redirect('/?success=true')
  }

  return (
    <div className="min-h-screen bg-background py-20 px-6 relative font-sans">
      {/* Ambient glow */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-radial-glow -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
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
            Reservations
          </span>

          <h1 className="font-serif text-5xl md:text-6xl tracking-wide font-light">
            Book a{' '}
            <span className="italic font-normal text-gold-gradient">Table</span>
          </h1>

          <p className="text-foreground/50 max-w-lg mx-auto text-xs md:text-sm font-sans tracking-wide leading-relaxed font-light">
            Experience culinary intimacy. Plan your visit to our luxury dining
            room or barista tasting counters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8">
          {/* ── Left Column: Dining Policies ── */}
          <div className="lg:col-span-5 space-y-8 bg-[#121212] border border-[#2A2A2A] p-8 font-sans">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl tracking-wider text-accent-gold font-light">
                Dining Atelier Policies
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed font-light">
                To maintain the premium ambience and quality of service, we
                kindly request our guests to review the following reservation
                guidelines:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-accent-gold font-serif text-lg">01</span>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold">
                    Grace Period
                  </h4>
                  <p className="text-xs text-foreground/40 mt-1 font-light">
                    Reservations are held for a maximum of 15 minutes. Please
                    call us if you are running late.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-accent-gold font-serif text-lg">02</span>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold">
                    Dress Code
                  </h4>
                  <p className="text-xs text-foreground/40 mt-1 font-light">
                    Smart casual attire is appreciated. We reserve the right to
                    enforce entry guidelines.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-accent-gold font-serif text-lg">03</span>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold">
                    Special Requests
                  </h4>
                  <p className="text-xs text-foreground/40 mt-1 font-light">
                    All dietary restrictions and allergies should be specified.
                    Chef&apos;s custom menu requires 48 hours notice.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2A2A2A] space-y-2 text-xs">
              <p className="text-foreground/50 font-light">
                Direct Reservation Concierge:
              </p>
              <p className="text-accent-gold font-medium tracking-wider">
                +1 (555) 019-2831
              </p>
              <p className="text-foreground/40 font-light">
                concierge@goyocafe.com
              </p>
            </div>
          </div>

          {/* ── Right Column: Reservation Form ── */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#2A2A2A] p-8 md:p-10 font-sans">
            {/* Error banner */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-950/30 border border-red-500/20 text-red-400 text-xs tracking-wide">
                {errorMessage}
              </div>
            )}

            <form action={createReservation} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="customer_name"
                    className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="customer_name"
                      name="customer_name"
                      type="text"
                      required
                      placeholder="Jean Laurent"
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jean.laurent@luxury.com"
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="space-y-2">
                  <label
                    htmlFor="guests"
                    className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium"
                  >
                    Number of Guests
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <select
                      id="guests"
                      name="guests"
                      required
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option
                          key={num}
                          value={num}
                          className="bg-background text-foreground"
                        >
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <label
                    htmlFor="reservation_date"
                    className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                    <input
                      id="reservation_date"
                      name="reservation_date"
                      type="date"
                      required
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label
                    htmlFor="reservation_time"
                    className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium"
                  >
                    Time Slot
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <select
                      id="reservation_time"
                      name="reservation_time"
                      required
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Time</option>
                      <optgroup
                        label="Breakfast & Brunch"
                        className="bg-background text-accent-gold"
                      >
                        <option value="08:00 AM">08:00 AM</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                      </optgroup>
                      <optgroup
                        label="Lunch & Afternoon Tea"
                        className="bg-background text-accent-gold"
                      >
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </optgroup>
                      <optgroup
                        label="Dinner"
                        className="bg-background text-accent-gold"
                      >
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                        <option value="09:00 PM">09:00 PM</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label
                  htmlFor="special_requests"
                  className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium"
                >
                  Special Requests / Dietary Restrictions
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-4 text-foreground/30"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  <textarea
                    id="special_requests"
                    name="special_requests"
                    rows={4}
                    placeholder="Specify allergies, celebratory events (e.g. anniversary), or preferred seating (bar vs lounge)..."
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-accent-gold text-background text-xs tracking-[0.25em] uppercase hover:bg-accent-gold-hover hover:scale-[1.01] active:scale-100 transition-all duration-300 font-bold shadow-gold-glow hover:shadow-gold-glow-hover"
                >
                  Submit Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
