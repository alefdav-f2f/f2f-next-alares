'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { CityProps, StateProps } from './types/interface/state.interface';
import axiosInterceptorInstance from './api/axiosInterceptor';
import CitySelector from './components/CitySelector';


export default function Main() {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter();
  const [stateList, setState] = React.useState<StateProps[]>([])
  const [cityList, setCity] = React.useState<CityProps[]>([])
  const [isLoading, setLoading] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);
  const [loadingCity, setLoadingCity] = React.useState(false);
  const [goal, setGoal] = React.useState(350)


  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  async function getState() {

    setLoadingState(true);

    const request = await axiosInterceptorInstance.get('/uf/paginate-without-auth', {
      params: {
        isActive: true,
        page: 1,
        perPage: 99999
      }
    })

    if (request.status === 200) {

      const data = request.data?.data;
      setState(data)
      setLoadingState(false);
      return
    }
  }

  async function getCity(event: any) {

    const value = event?.target?.value;

    setLoadingCity(true);

    const request = await axiosInterceptorInstance.get(`/city/get-by-uf-without-auth`, {
      params: {
        id: value
      }
    });

    if (request.status === 200) {
      setCity(request.data)
      setLoadingCity(false);
      return
    }
  }

  async function setCookieFunction(event: any) {

    const value = event?.target?.value;
    const redirect = `home?city=${value}`;

    setLoading(true)

    const request: any = await axiosInterceptorInstance.get(`/city/get-city-by-slug/${value}`);

    if (request.status >= 400) {
      toast.error(request.error.message)
      setLoading(false)
      return
    }

    if (request.status === 200) {
      router.push(redirect)
    }
  }


  React.useEffect(() => {

    const city = searchParams.get('city');

    getState();
  }, [])

  return (
    <>
      <CitySelector reload={false} check_city={true}/>
    </>
  )
}
