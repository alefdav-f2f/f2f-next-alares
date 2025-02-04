"use client";
import TitlePage from "@/app/components/TitlePage";
import { RiImageEditFill } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import DatePTBR from "@/app/resource/date.service";
import { IoOpenOutline } from "react-icons/io5";
import { BsFillTrash2Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import LoadingAlares from "@/app/components/loadings/LoadingAlares";
import ModalConfirmation from "@/app/components/ModalConfirmation";
const baseURL = process.env.NEXT_PUBLIC_WEB_URL;


export default function Flyer() {
    const [selectedOption, setSelectedOption] = useState("vendedores");
    const [flyers, setFlyers] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [target, setTarget] = useState<any>({});
    const handlerCreateFlyer = () => {
        if (selectedOption === 'vendedores') {
            router.push("/admin/flyer/new-flyer-seller");
        } else if (selectedOption === 'trade-marketing') {
            router.push("/admin/flyer/new-flyer-trade-marketing");
        }
    }
    const getFlyers = async () => {
        setLoading(true);
        try {
            const response = await axiosInterceptorInstance.get('/flyer/get-flyers')
            setFlyers(response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false); 
        }
    }
    const getFlyersTradeMarketing = async () => {
        setLoading(true); 
        try {
            const response = await axiosInterceptorInstance.get('/flyer/get-flyer-trade-marketing')
            setFlyers(response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false); 
        }
    }
    const deleteFlyer = async (id: string) => {
        try {
            await axiosInterceptorInstance.delete(`/flyer/delete/${id}`);
            toast.success('Flyer deletado com sucesso');

            if (selectedOption === 'vendedores') {
                getFlyers();
            } else if (selectedOption === 'trade-marketing') {
                getFlyersTradeMarketing();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Erro ao deletar flyer');
        }
    };

    const openModal = (flyer: { id: string, name: string }) => {
        setModal(true);
        setTarget(flyer);
    };

    const copyLink = (id: string) => { 
        const link = `${baseURL}flyer/${id}`;  
        navigator.clipboard.writeText(link);  
        toast.success('Link copiado para a área de transferência!');  
    };
    const openLink = (id: string) => {
         const link = `${baseURL}flyer/${id}`
        window.open(link, '_blank');
    }
    useEffect(() => {
        if (selectedOption === 'vendedores') {
            getFlyers();
        } else if (selectedOption === 'trade-marketing') {
            getFlyersTradeMarketing();
        }
    }, [selectedOption]);


    return (
        <div className="p-4">
          {showModal && (
            <ModalConfirmation
                text={`Deseja excluir ${target?.name}?`}
                buttons={
                    <>
                        <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                deleteFlyer(target.id);
                                setModal(false);
                            }}
                            className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md"
                        >
                            Confirmar
                        </button>
                    </>
                }
                fields={undefined}
            />
        )}
        
            <div className="flex">
                <TitlePage icon={<RiImageEditFill />} title="Flyer" />
                <button type="button" onClick={handlerCreateFlyer} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                    <IoMdAdd className="mr-1" />
                    Criar flyer
                </button>
            </div>
            {/* <div className="flex mt-5">
                <select className="border-2 rounded-md p-2 border-gray-300" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                    <option value="vendedores" id="vendedores">Divulgação - vendedores</option>
                    <option value="trade-marketing" id="trade-marketing">Ação trade marketing</option>
                </select>
            </div> */}
            {loading ? (
            <LoadingAlares />
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4 mt-5">
           
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Título
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Criado em
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Categoria
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">

                    </th>

                </tr>
            </thead>
            <tbody>
                {flyers.length > 0 ? (
                    flyers.map((item: any) => (
                        <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                            >
                                {item.name}
                            </th>

                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                <DatePTBR date={item.createdAt} />
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {item.isTradeMarketing ? (
                                  <p>Ação Trade Marketing</p> 
                                ): (
                                    <p>Normal</p>
                                )}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {item.isActive ? (
                                    <span className='text-green-400 font-bold'>Ativo</span>
                                ) : (
                                    <span className='text-red-400 font-bold'>Inativo</span>
                                )}
                            </td>

                            <td className="px-6 py-4">
                                <button onClick={() => openLink(item.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                    
                                    <IoOpenOutline />
                                </button>
                                <button onClick={() => copyLink(item.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                        <FaRegCopy />
                                </button>
                                <button onClick={() => router.push(`/admin/flyer/editFlyer/${item.id}`)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                    <MdEdit />
                                </button>
                                <button onClick={() => openModal({ id: item.id, name: item.name })}  className="hover:text-white hover:bg-red-600 p-2 rounded-full">
                                    <BsFillTrash2Fill />
                                </button>
                            </td>


                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3} className="text-center py-4">
                            Nenhum flyer encontrado.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        
               
            </div>
              )}
        </div>
    );
}
