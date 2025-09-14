'use client'

import { useEffect } from 'react'
import { ActionButton } from '../components/ActionButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 to-sky-400 px-4">
      <div className="bg-surface rounded-lg p-6 shadow-card max-w-md w-full text-center">
        <h2 className="display text-danger mb-4">Something went wrong!</h2>
        <p className="body text-gray-600 mb-6">
          We encountered an error while scanning your link. Please try again.
        </p>
        <ActionButton
          variant="primary"
          onClick={reset}
        >
          Try again
        </ActionButton>
      </div>
    </div>
  )
}
