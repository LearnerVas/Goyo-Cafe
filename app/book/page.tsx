'use client'

import { useActionState } from 'react'
import { createReservation, ReservationFormState } from './actions'
import { Calendar, Clock, Users, MessageSquare, User, Mail, Phone as PhoneIcon, CheckCircle2 } from 'lucide-react'

const initialState: ReservationFormState = {
  success: false,
  message: '',
}

export default function BookPage() {
  const [state, formAction, isPending] = useActionState(createReservation, initialState)

  return (
    <div className="min-h-screen bg-background py-20 px-6 relative font-sans">
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-radial-glow -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-sans font-medium block">
            Reservations
          </span>
          <h1 className="font-serif text-5xl md:text-6xl tracking-wide font-light">
            Book a <span className="italic font-normal text-gold-gradient">Table</span>
          </h1>
          <p className="text-foreground/50 max-w-lg mx-auto text-xs md:text-sm font-sans tracking-wide leading-relaxed font-light">
            Experience culinary intimacy. Plan your visit to our luxury dining room or barista tasting counters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8">
          {/* Left Column: Guidelines / Details */}
          <div className="lg:col-span-5 space-y-8 bg-[#121212] border border-[#2A2A2A] p-8 font-sans">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl tracking-wider text-accent-gold font-light">Dining Atelier Policies</h3>
              <p className="text-xs text-foreground/60 leading-relaxed font-light">
                To maintain the premium ambience and quality of service, we kindly request our guests to review the following reservation guidelines:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-accent-gold font-serif text-lg">01</span>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold">Grace Period</h4>
                  <p className="text-xs text-foreground/40 mt-1 font-light">Reservations are held for a maximum of 15 minutes. Please call us if you are running late.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-accent-gold font-serif text-lg">02</span>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold">Dress Code</h4>
                  <p className="text-xs text-foreground/40 mt-1 font-light">Smart casual attire is appreciated. We reserve the right to enforce entry guidelines.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-accent-gold font-serif text-lg">03</span>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold">Special Requests</h4>
                  <p className="text-xs text-foreground/40 mt-1 font-light">All dietary restrictions and allergies should be specified. Chef’s custom menu requires 48 hours notice.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2A2A2A] space-y-2 text-xs">
              <p className="text-foreground/50 font-light font-sans">Direct Reservation Concierge:</p>
              <p className="text-accent-gold font-medium tracking-wider font-sans">+1 (555) 019-2831</p>
              <p className="text-foreground/40 font-light font-sans">concierge@goyocafe.com</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#2A2A2A] p-8 md:p-10 font-sans">
            {state.success ? (
              <div className="text-center py-12 space-y-6 font-sans">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-accent-gold animate-bounce" />
                </div>
                <h3 className="font-serif text-3xl text-accent-gold font-light tracking-wide">Reservation Confirmed</h3>
                <p className="text-sm text-foreground/70 max-w-md mx-auto leading-relaxed font-light">
                  {state.message}
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-transparent border border-accent-gold text-accent-gold text-xs tracking-widest uppercase hover:bg-accent-gold hover:text-background transition-all duration-300 font-semibold"
                  >
                    Make Another Booking
                  </button>
                </div>
              </div>
            ) : (
              <form action={formAction} className="space-y-6">
                {state.message && !state.success && (
                  <div className="p-4 bg-red-950/30 border border-red-500/20 text-red-400 text-xs tracking-wide">
                    {state.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jean Laurent"
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                      />
                    </div>
                    {state.errors?.name && (
                      <p className="text-[10px] text-red-400 font-light">{state.errors.name[0]}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jean.laurent@luxury.com"
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                      />
                    </div>
                    {state.errors?.email && (
                      <p className="text-[10px] text-red-400 font-light">{state.errors.email[0]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                      />
                    </div>
                    {state.errors?.phone && (
                      <p className="text-[10px] text-red-400 font-light">{state.errors.phone[0]}</p>
                    )}
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label htmlFor="guests" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <select
                        id="guests"
                        name="guests"
                        required
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20].map((num) => (
                          <option key={num} value={num} className="bg-background text-foreground">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                    {state.errors?.guests && (
                      <p className="text-[10px] text-red-400 font-light">{state.errors.guests[0]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all"
                      />
                    </div>
                    {state.errors?.date && (
                      <p className="text-[10px] text-red-400 font-light">{state.errors.date[0]}</p>
                    )}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label htmlFor="time" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                      Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <select
                        id="time"
                        name="time"
                        required
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Time</option>
                        <optgroup label="Breakfast & Brunch" className="bg-background text-accent-gold">
                          <option value="08:00 AM">08:00 AM</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                        </optgroup>
                        <optgroup label="Lunch & Afternoon Tea" className="bg-background text-accent-gold">
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:30 PM">02:30 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                        </optgroup>
                        <optgroup label="Dinner" className="bg-background text-accent-gold">
                          <option value="06:00 PM">06:00 PM</option>
                          <option value="07:00 PM">07:00 PM</option>
                          <option value="08:00 PM">08:00 PM</option>
                          <option value="09:00 PM">09:00 PM</option>
                        </optgroup>
                      </select>
                    </div>
                    {state.errors?.time && (
                      <p className="text-[10px] text-red-400 font-light">{state.errors.time[0]}</p>
                    )}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <label htmlFor="special_requests" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                    Special Requests / Dietary Restrictions
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-foreground/30" />
                    <textarea
                      id="special_requests"
                      name="special_requests"
                      rows={4}
                      placeholder="Specify allergies, celebratory events (e.g. anniversary), or preferred seating (bar vs lounge)..."
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-accent-gold text-background text-xs tracking-[0.25em] uppercase hover:bg-accent-gold-hover hover:scale-[1.01] active:scale-100 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-gold-glow hover:shadow-gold-glow-hover"
                  >
                    {isPending ? 'Confirming Reservation...' : 'Submit Reservation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
