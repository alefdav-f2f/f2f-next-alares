import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor'
import { CityProps, StateProps } from '@/app/types/interface/state.interface'

// Queries Keys - Centralizadas para facilitar invalidação
export const queryKeys = {
  states: ['states'] as const,
  cities: ['cities'] as const,
  citiesByState: (stateId: string) => ['cities', 'by-state', stateId] as const,
  cityBySlug: (slug: string) => ['city', 'by-slug', slug] as const,
  plans: ['plans'] as const,
  plansByCity: (cityId: string, sessionId?: string) => ['plans', 'by-city', cityId, sessionId] as const,
  banners: ['banners'] as const,
  faqs: ['faqs'] as const,
  cms: ['cms'] as const,
  channelTv: ['channel-tv'] as const,
  stores: ['stores'] as const,
  regulations: ['regulations'] as const,
}

// Hook para buscar estados (dados que mudam pouco - cache longo)
export const useStates = () => {
  return useQuery({
    queryKey: queryKeys.states,
    queryFn: async (): Promise<StateProps[]> => {
      const response = await axiosInterceptorInstance.get('/uf/paginate-without-auth', {
        params: {
          isActive: true,
          page: 1,
          perPage: 99999,
        },
      })
      return response.data?.data || []
    },
    staleTime: 30 * 60 * 1000, // 30 minutos - estados raramente mudam
    gcTime: 60 * 60 * 1000, // 1 hora
    refetchOnWindowFocus: false, // Não precisa revalidar quando foca na janela
  })
}

// Hook para buscar cidades por estado
export const useCitiesByState = (stateId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.citiesByState(stateId),
    queryFn: async (): Promise<CityProps[]> => {
      const response = await axiosInterceptorInstance.get('/city/get-by-uf-without-auth', {
        params: {
          id: stateId,
          isActive: true,
        },
      })
      return response.data || []
    },
    enabled: enabled && !!stateId,
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  })
}

// Hook para buscar todas as cidades (cache longo pois é usado no seletor)
export const useAllCities = () => {
  return useQuery({
    queryKey: queryKeys.cities,
    queryFn: async (): Promise<CityProps[]> => {
      // Primeiro busca todos os estados
      const statesResponse = await axiosInterceptorInstance.get('/uf/paginate-without-auth', {
        params: {
          isActive: true,
          page: 1,
          perPage: 99999,
        },
      })

      if (statesResponse.status !== 200) return []

      const states = statesResponse.data?.data || []
      let allCities: CityProps[] = []

      // Para cada estado, busca suas cidades
      for (const state of states) {
        try {
          const citiesResponse = await axiosInterceptorInstance.get('/city/get-by-uf-without-auth', {
            params: {
              id: state.id,
              isActive: true,
            },
          })

          if (citiesResponse.status === 200) {
            const cities = citiesResponse.data as CityProps[]
            // Adiciona campo value para busca
            cities.forEach((city) => {
              city.value = city.name.toLowerCase()
            })
            allCities = [...allCities, ...cities]
          }
        } catch (error) {
          console.error(`Erro ao buscar cidades do estado ${state.id}:`, error)
        }
      }

      return allCities
    },
    staleTime: 20 * 60 * 1000, // 20 minutos
    gcTime: 40 * 60 * 1000, // 40 minutos
    refetchOnWindowFocus: false,
  })
}

// Hook para buscar cidade por slug
export const useCityBySlug = (slug: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.cityBySlug(slug),
    queryFn: async () => {
      const response = await axiosInterceptorInstance.get(`/city/get-city-by-slug/${slug}`)
      return response.data
    },
    enabled: enabled && !!slug,
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  })
}

// Hook para buscar planos por cidade
export const usePlansByCity = (cityId: string, sessionId?: string, type?: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.plansByCity(cityId, sessionId),
    queryFn: async () => {
      const params: any = {
        session_id: sessionId,
      }
      if (type) params.type = type

      const response = await axiosInterceptorInstance.get(`/plan/get-plans/${cityId}`, { params })
      return response.data
    },
    enabled: enabled && !!cityId,
    staleTime: 10 * 60 * 1000, // 10 minutos - planos podem mudar mais frequentemente
    gcTime: 20 * 60 * 1000, // 20 minutos
  })
}

// Hook para buscar banners (cache médio)
export const useBanners = () => {
  return useQuery({
    queryKey: queryKeys.banners,
    queryFn: async () => {
      const response = await axiosInterceptorInstance.get('/banner/paginate-without-auth', {
        params: {
          isActive: true,
          page: 1,
          perPage: 99999,
        },
      })
      return response.data?.data || []
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 20 * 60 * 1000, // 20 minutos
  })
}

// Hook para buscar FAQs (cache longo)
export const useFaqs = () => {
  return useQuery({
    queryKey: queryKeys.faqs,
    queryFn: async () => {
      const response = await axiosInterceptorInstance.get('/faq/paginate-without-auth', {
        params: {
          isActive: true,
          page: 1,
          perPage: 99999,
        },
      })
      return response.data?.data || []
    },
    staleTime: 30 * 60 * 1000, // 30 minutos - FAQs raramente mudam
    gcTime: 60 * 60 * 1000, // 1 hora
    refetchOnWindowFocus: false,
  })
}

// Hook para buscar conteúdo CMS (cache médio)
export const useCMS = () => {
  return useQuery({
    queryKey: queryKeys.cms,
    queryFn: async () => {
      const response = await axiosInterceptorInstance.get('/cms/get-cms-without-auth')
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  })
}

// Hook personalizado para invalidar caches relacionados
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  return {
    invalidateStates: () => queryClient.invalidateQueries({ queryKey: queryKeys.states }),
    invalidateCities: () => queryClient.invalidateQueries({ queryKey: queryKeys.cities }),
    invalidateCitiesByState: (stateId: string) => 
      queryClient.invalidateQueries({ queryKey: queryKeys.citiesByState(stateId) }),
    invalidatePlans: () => queryClient.invalidateQueries({ queryKey: queryKeys.plans }),
    invalidateAll: () => queryClient.invalidateQueries(),
  }
}

// Hook para pré-carregar dados críticos
export const usePrefetchCriticalData = () => {
  const queryClient = useQueryClient()

  return {
    prefetchStates: () => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.states,
        queryFn: async () => {
          const response = await axiosInterceptorInstance.get('/uf/paginate-without-auth', {
            params: { isActive: true, page: 1, perPage: 99999 },
          })
          return response.data?.data || []
        },
        staleTime: 30 * 60 * 1000,
      })
    },
    prefetchCities: () => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.cities,
        queryFn: async () => {
          // Implementação igual ao useAllCities
          const statesResponse = await axiosInterceptorInstance.get('/uf/paginate-without-auth', {
            params: { isActive: true, page: 1, perPage: 99999 },
          })
          
          if (statesResponse.status !== 200) return []
          
          const states = statesResponse.data?.data || []
          let allCities: CityProps[] = []
          
          for (const state of states) {
            try {
              const citiesResponse = await axiosInterceptorInstance.get('/city/get-by-uf-without-auth', {
                params: { id: state.id, isActive: true },
              })
              
              if (citiesResponse.status === 200) {
                const cities = citiesResponse.data as CityProps[]
                cities.forEach((city) => { city.value = city.name.toLowerCase() })
                allCities = [...allCities, ...cities]
              }
            } catch (error) {
              console.error(`Erro ao buscar cidades do estado ${state.id}:`, error)
            }
          }
          
          return allCities
        },
        staleTime: 20 * 60 * 1000,
      })
    },
  }
} 