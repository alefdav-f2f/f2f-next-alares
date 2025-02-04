'use client';
import LoadingAlares from "@/app/components/loadings/LoadingAlares";
import TitlePage from "@/app/components/TitlePage"
import RelatoryCupom from "@/app/services/api/relatory-cupom";
import { useEffect, useState } from "react";
import { AiOutlineBarChart } from "react-icons/ai"

interface Cupom {
    coupon_id: string;
    coupon: string;
    date_ini: string;  
    date_end: string;  
    quantity: number;
    used: number;
    status: boolean;
}


export default function Cupom() {
    const [statusCupom, setStatusCupom] = useState(true);
    const [cupom, setCupom] = useState<Cupom[]>([]);
    const [loading, setLoading] = useState(true);

    
    async function ListCupom() {
        setLoading(true); 
        const response = await RelatoryCupom.getCupom({ status: statusCupom });
        setCupom(response.data);
        setLoading(false);  
    }
    
    useEffect(() => {
        ListCupom(); 
    }, [statusCupom]);
    return (
        <div className="p-4">
            <div className='mb-6 flex items-center'>
                <TitlePage icon={<AiOutlineBarChart />} title='Relatório de cupons' />
                <div className='sm:w-52 flex flex-col items-center'>
                    <select
                        id="status"
                        onChange={(e) => { setStatusCupom(e.target.value === "true"); }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    >
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>
                </div>
            </div>
            {loading ? ( 
                <LoadingAlares />
            ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Cupom
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Disponível
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Usado
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Vigência
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Restante
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cupom.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                    Nenhum cupom encontrado para o status selecionado.
                                </td>
                            </tr>
                        ) : (
                            cupom.map((item) => {
                                const remaining = item.quantity - item.used; 
                                const percentage = (remaining / item.quantity) * 100; 

                                const getColor = () => {
                                    if (percentage >= 50) return "bg-green-500";
                                    if (percentage >= 30) return "bg-yellow-500";
                                    return "bg-red-500";
                                };

                                return (
                                    <tr key={item.coupon_id} className="border-b border-gray-200 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {item.coupon}
                                        </th>
                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            {item.used}
                                        </td>
                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            <div className="flex flex-col">
                                                <p><strong>Início: </strong> {new Date(item.date_ini).toLocaleDateString()}</p>
                                                <p><strong>Fim: </strong> {new Date(item.date_end).toLocaleDateString()}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 relative">
                                            <div className="flex w-full text-center relative">
                                                <div className="flex items-center w-full rounded-lg shadow-md h-8 relative overflow-hidden">
                                                    <div className={`h-full ${getColor()} ml-auto`} style={{ width: `${percentage}%` }}></div>
                                                    <p className="absolute inset-0 flex justify-center items-center text-gray-600 z-10">
                                                        {remaining}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            )}

        </div>
    )
}