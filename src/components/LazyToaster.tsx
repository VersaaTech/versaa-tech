"use client"

import { lazy, Suspense } from 'react'

// Lazy load the Toaster component
const Toaster = lazy(() => 
  import('sonner').then(module => ({ default: module.Toaster }))
)

export default function LazyToaster() {
  return (
    <Suspense fallback={null}>
      <Toaster position="top-center" />
    </Suspense>
  )
} 