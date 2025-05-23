'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './useQueries'

interface AutoRevalidationConfig {
  criticalDataInterval?: number
  dynamicDataInterval?: number
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
}

export const useAutoRevalidation = (config: AutoRevalidationConfig = {}) => {
  const queryClient = useQueryClient()
  
  const {
    criticalDataInterval = 30,
    dynamicDataInterval = 10,
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
  } = config

  useEffect(() => {
    const criticalInterval = setInterval(() => {
      console.log('🔄 Revalidando dados críticos...')
      queryClient.invalidateQueries({ queryKey: queryKeys.states })
      queryClient.invalidateQueries({ queryKey: queryKeys.cities })
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs })
      queryClient.invalidateQueries({ queryKey: queryKeys.cms })
    }, criticalDataInterval * 60 * 1000)

    const dynamicInterval = setInterval(() => {
      console.log('🔄 Revalidando dados dinâmicos...')
      queryClient.invalidateQueries({ queryKey: queryKeys.banners })
      queryClient.invalidateQueries({ queryKey: queryKeys.plans })
    }, dynamicDataInterval * 60 * 1000)

    return () => {
      clearInterval(criticalInterval)
      clearInterval(dynamicInterval)
    }
  }, [queryClient, criticalDataInterval, dynamicDataInterval])

  useEffect(() => {
    if (!revalidateOnFocus) return

    const handleFocus = () => {
      console.log('👁️ Aba ganhou foco - revalidando dados dinâmicos...')
      queryClient.invalidateQueries({ queryKey: queryKeys.banners })
      queryClient.invalidateQueries({ queryKey: queryKeys.plans })
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [queryClient, revalidateOnFocus])

  useEffect(() => {
    if (!revalidateOnReconnect) return

    const handleOnline = () => {
      console.log('🌐 Reconectado à internet - revalidando todos os dados...')
      queryClient.invalidateQueries()
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [queryClient, revalidateOnReconnect])

  return {
    revalidateAll: () => {
      console.log('🔄 Revalidação manual de todos os dados...')
      queryClient.invalidateQueries()
    },
    revalidateCritical: () => {
      console.log('🔄 Revalidação manual de dados críticos...')
      queryClient.invalidateQueries({ queryKey: queryKeys.states })
      queryClient.invalidateQueries({ queryKey: queryKeys.cities })
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs })
      queryClient.invalidateQueries({ queryKey: queryKeys.cms })
    },
    revalidateDynamic: () => {
      console.log('🔄 Revalidação manual de dados dinâmicos...')
      queryClient.invalidateQueries({ queryKey: queryKeys.banners })
      queryClient.invalidateQueries({ queryKey: queryKeys.plans })
    },
  }
} 