"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // For now, simulate successful login and redirect to upload panel
    // TODO: integrate with Supabase Auth
    router.push('/dashboard/upload')
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <h2 className="mb-6 text-2xl font-semibold">Zaloguj się</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hasło</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">Zaloguj się</Button>
        </div>
      </form>
    </div>
  )
}
