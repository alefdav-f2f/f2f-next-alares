'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { usePrefetchCriticalData, queryKeys } from './hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import axiosInterceptorInstance from './api/axiosInterceptor';
import CitySelector from './components/CitySelector';

export default function Main() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = React.useState(false);
  const [goal, setGoal] = React.useState(350)
  
  // Usar o hook de prefetch para dados críticos
  const { prefetchStates, prefetchCities } = usePrefetchCriticalData()

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  async function setCookieFunction(event: any) {
    const value = event?.target?.value;
    const redirect = `home?city=${value}`;

    setLoading(true)

    try {
      // Verificar se já está no cache
      const cachedCity = queryClient.getQueryData(queryKeys.cityBySlug(value));
      
      if (cachedCity) {
        router.push(redirect)
        return
      }

      // Se não estiver no cache, fazer a requisição
      const response = await axiosInterceptorInstance.get(`/city/get-city-by-slug/${value}`);
      
      if (response.status === 200) {
        // Adicionar ao cache para próximas consultas
        queryClient.setQueryData(queryKeys.cityBySlug(value), response.data);
        router.push(redirect)
      } else {
        toast.error('Cidade não encontrada')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao buscar cidade')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    // Pré-carregar dados críticos na inicialização
    prefetchStates()
    prefetchCities()
  }, [prefetchStates, prefetchCities])

  return (
    <>
      <CitySelector reload={false} check_city={true}/>
    </>
  )
}
