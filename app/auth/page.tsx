'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, KeyRound, Loader2, ArrowRight } from 'lucide-react'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
        setLoading(false)
        return
      }

      setMessage({ type: 'success', text: 'Login successful. Redirecting...' })
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 1500)
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
        setLoading(false)
        return
      }

      setMessage({
        type: 'success',
        text: 'Account created! Please check your email for a confirmation link.',
      })
      setLoading(false)
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] bg-background flex items-center justify-center py-16 px-6 relative font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-glow -z-10 pointer-events-none" />

      <div className="w-full max-w-md bg-[#121212] border border-[#2A2A2A] p-8 md:p-10 space-y-8 relative">
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl tracking-[0.2em] text-gold-gradient block font-light">
            GOYO
          </span>
          <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/45 font-medium">
            Atelier Portal
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#2A2A2A]">
          <button
            onClick={() => {
              setActiveTab('login')
              setMessage(null)
            }}
            className={`flex-1 pb-3 text-xs tracking-widest uppercase font-medium transition-all ${
              activeTab === 'login'
                ? 'text-accent-gold border-b-2 border-accent-gold'
                : 'text-foreground/40 hover:text-foreground/80'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab('signup')
              setMessage(null)
            }}
            className={`flex-1 pb-3 text-xs tracking-widest uppercase font-medium transition-all ${
              activeTab === 'signup'
                ? 'text-accent-gold border-b-2 border-accent-gold'
                : 'text-foreground/40 hover:text-foreground/80'
            }`}
          >
            Register
          </button>
        </div>

        {/* Feedback Messages */}
        {message && (
          <div
            className={`p-4 text-xs tracking-wide border font-light ${
              message.type === 'success'
                ? 'bg-green-950/20 border-green-500/20 text-green-400'
                : 'bg-red-950/20 border-red-500/20 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form Container */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="login-email" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.laurent@luxury.com"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label htmlFor="login-password" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                  Password
                </label>
                <a href="#" className="text-[9px] uppercase tracking-wider text-accent-gold/70 hover:text-accent-gold transition-colors font-medium">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all font-sans"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-accent-gold text-background text-xs tracking-[0.25em] uppercase hover:bg-accent-gold-hover hover:scale-[1.01] active:scale-100 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-gold-glow flex items-center justify-center gap-2 font-sans"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Verifying Identity...
                  </>
                ) : (
                  <>
                    Access Account
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="signup-name" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Laurent"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all font-sans"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="signup-email" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.laurent@luxury.com"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="signup-password" className="block text-[10px] uppercase tracking-widest text-foreground/60 font-medium">
                Create Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] pl-10 pr-4 py-3 text-xs placeholder:text-foreground/20 text-foreground focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 transition-all font-sans"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-accent-gold text-background text-xs tracking-[0.25em] uppercase hover:bg-accent-gold-hover hover:scale-[1.01] active:scale-100 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-gold-glow flex items-center justify-center gap-2 font-sans"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    Register Atelier Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
