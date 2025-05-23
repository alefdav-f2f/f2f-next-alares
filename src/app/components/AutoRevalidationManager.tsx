'use client'

import { useAutoRevalidation } from '../hooks/useAutoRevalidation'

export default function AutoRevalidationManager() {
  useAutoRevalidation({
    criticalDataInterval: 30,
    dynamicDataInterval: 10,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })
  
  return null
} 