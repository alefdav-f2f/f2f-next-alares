'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import CardNumber from '@/app/components/CardNumber';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import TitlePage from '@/app/components/TitlePage'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { RiGovernmentFill } from 'react-icons/ri';
import { StateProps } from '@/app/types/interface/state.interface';


export default function State() {

    const router = useRouter()
    const [stateList, setState] = React.useState<StateProps[]>([])
    const [isLoading, setLoading] = useState(true);
    const [checked, setChecked] = useState(true);

    async function getState() {

        const request: any = await axiosInterceptorInstance.get('/uf/paginate', {
            params:{
                isActive: null,
                orderBy: 'asc',
                page: 1,
                perPage: 99999
            }
        })
        
        const data = request.data?.data;
        
        setState(data);
        setLoading(false);

    }

    async function setToggle(state: StateProps, index: number) {

        const request: any = await axiosInterceptorInstance.patch('uf/update', {
            id: state.id,
            uf: state.uf,
            name: state.name,
            isActive: !state.isActive
        })

        if(request.status === 200) {
            let list = stateList;
            list[index].isActive = request.data?.isActive;
            setChecked(!checked)
        }
    }


    React. useEffect(() => {
        getState();
    }, [])

    return (
        <div className='p-4'>
            <div className='mb-6 flex'>
                <TitlePage icon={<RiGovernmentFill />} title='Estados' />
            </div>

            {stateList?.length > 0 ? (

                <div>
                    <div className='mb-4'>
                        <div className='flex'>
                            <CardNumber title='Total de estados' value={stateList?.length} className="bg-gray-700 text-white mr-4"/>
                            <CardNumber title='Total ativo' value={ stateList?.filter( s => s.isActive === true ).length } className="bg-green-600 text-white"/>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sigla
                                    </th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {stateList?.map((state, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {state.name}
                                            </th>
                                            <td className="px-5 py-1">
                                                {state.uf}
                                            </td>
                                            <td className="px-4">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={state.isActive} className="sr-only peer" onChange={() => { setToggle(state, index) }} />
                                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    <span className="ms-3 text-sm font-medium text-gray-900"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            ) : (
                <div className='flex justify-center items-center h-[200px]'>
                    {isLoading ? (
                        <div>
                            <LoadingAlares />
                        </div>
                    ) : (
                        <div>
                            <span className='text-gray-500'>Nenhum estado cadastrado</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
