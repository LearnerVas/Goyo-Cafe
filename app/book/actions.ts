'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type ReservationFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    date?: string[]
    time?: string[]
    guests?: string[]
  }
}

export async function createReservation(
  prevState: any,
  formData: FormData
): Promise<ReservationFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const guestsStr = formData.get('guests') as string
  const specialRequests = formData.get('special_requests') as string

  // Simple validation
  const errors: Record<string, string[]> = {}
  if (!name || name.trim().length < 2) {
    errors.name = ['Name must be at least 2 characters.']
  }
  if (!email || !email.includes('@')) {
    errors.email = ['Please enter a valid email address.']
  }
  if (!phone || phone.trim().length < 6) {
    errors.phone = ['Please enter a valid phone number.']
  }
  if (!date) {
    errors.date = ['Please select a date for your reservation.']
  }
  if (!time) {
    errors.time = ['Please select a reservation time.']
  }
  const guests = parseInt(guestsStr, 10)
  if (isNaN(guests) || guests < 1 || guests > 20) {
    errors.guests = ['Number of guests must be between 1 and 20.']
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the validation errors.',
      errors,
    }
  }

  try {
    const supabase = await createClient()

    // Optionally get user_id if authenticated
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user ? user.id : null

    const { error } = await supabase.from('reservations').insert([
      {
        name,
        email,
        phone,
        date,
        time,
        guests,
        special_requests: specialRequests || null,
        user_id: userId,
      },
    ])

    if (error) {
      console.error('Database Error:', error)
      return {
        success: false,
        message: `Reservation failed: ${error.message}`,
      }
    }

    revalidatePath('/book')
    return {
      success: true,
      message: 'Your reservation has been confirmed. We look forward to welcoming you.',
    }
  } catch (err) {
    console.error('Server Action Error:', err)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}
