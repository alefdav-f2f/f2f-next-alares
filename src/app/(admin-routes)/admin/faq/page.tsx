'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import TitlePage from '@/app/components/TitlePage'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsFillTrash2Fill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import toast from "react-hot-toast";
import { GrCircleInformation } from 'react-icons/gr';
import { HiDuplicate } from "react-icons/hi";
import FaqService from '@/app/services/api/faq.service';
import { IoOpenOutline } from 'react-icons/io5';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';


export default function FAQ() {

    const router = useRouter()
    const [faqList, setFAQ] = React.useState<any[]>([])
    const [categoryList, setCategory] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [targetUser, setTarget] = useState<any>({})
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [showModalDuplication, setModalDuplication] = useState(false);
    const [targeCategory, setTargetCategory] = useState<any>({});

    const [isReordering, setIsReordering] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [massiveSelection, setMassiveSelection] = useState(false);


    async function getCategory() {
        const request: any = await axiosInterceptorInstance.get('/faq/get-all/category', {
            params: {
                isActive: null
            }
        })

        const data = request.data;

        if (request.status === 200) {
            setCategory(data);
            setSelectedCategory(data[0]?.id);
            getFAQ('all');
            setLoading(false)
        }
    }

    async function getFAQ(id: any) {

        setSelectedCategory(id);

        let request: any;
        let response: any

        if (id === 'all') {
            request = await axiosInterceptorInstance.get('/faq/get-all/question', {
                params: {
                    isActive: null,
                    categoryId: '',
                    /* page: 1,
                    perPage: 9999 */
                }
            })

            response = request.data;
        } else {
            request = await axiosInterceptorInstance.get(`/faq/get-questions-by-category/${id}`)

            response = request.data?.questions;
        }


        if (request.status === 200) {
            setFAQ(response);
            setLoading(false)
        }
    }

    async function deleteCategory() {

        setLoading(true)

        const request = await axiosInterceptorInstance.delete(`faq/delete/question/${targetUser.id}`);

        if (request.status > 400) {
            toast.error('Erro ao excluir cidade')
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success('Cidade excluído com sucesso')
            setLoading(false)
            getFAQ(selectedCategory);
            return
        }
    }

    function confirmDuplication(category: any) {
        setTargetCategory(category);
        setModalDuplication(true)
    }

    async function duplicateCategory() {

        setLoading(true);

        const category_id = targeCategory?.id;

        const response = await FaqService.duplicateCategory(category_id);

        if (response) {
            getCategory();
            setLoading(false);
            toast.success(response.data.message)
        } else {
            setLoading(false);
        }
    }

    async function reorder(index: number, direction: string) {

        setIsReordering(true);

        const array = [...faqList];

        const element = array.splice(index, 1)[0];

        let toIndex = 0;

        switch (direction) {
            case 'up': {
                toIndex = index - 1
                break;
            }
            case 'down': {
                toIndex = index + 1
                break;
            }
        }

        array.splice(toIndex, 0, element);

        const data = {
            faqs: array,
            category_id: selectedCategory
        }

        const request = await FaqService.reorderFAQ(data);

        if (request) {
            getFAQ(selectedCategory);
            setIsReordering(false);
        }
    }

    function setChecked(event: any, index: number) {

        const value = event.target.checked;
        const array = [...faqList];
        array[index].checked = value;

        const count = array.filter((a: any) => a.checked === true);

        setFAQ(array)

        checkChecked()
    }

    function selected() {
        return faqList.filter((b: any) => b.checked).length;
    }

    function checkChecked() {
        const array = [...faqList];
        const count = array.filter(a => a.checked === true);
        if (count.length > 0) {
            setMassiveSelection(true);
        } else {
            setMassiveSelection(false);
        }
    }

    function clearSelection() {
        const array = [...faqList];
        array.forEach(b => b.checked = false);
        setFAQ(array);
        checkChecked();
    }

    async function activeMassive() {
        const array = [...faqList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'active',
            faqs: checked
        }
        const request = await FaqService.massiveUpdate(data);

        if (request) {
            toast.success('FAQs ativas com sucesso');
            clearSelection();
            getCategory();
        }
    }

    async function inactiveMassive() {
        const array = [...faqList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'inactive',
            faqs: checked
        }
        const request = await FaqService.massiveUpdate(data);

        if (request) {
            toast.success('FAQs inativadas com sucesso');
            clearSelection();
            getCategory();
        }
    }

    async function deleteMassive() {
        const array = [...faqList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'delete',
            faqs: checked
        }
        const request = await FaqService.massiveUpdate(data);

        if (request) {
            toast.success('FAQs removidas com sucesso');
            clearSelection();
            getCategory();
        }
    }

    React.useEffect(() => {
        getCategory();
    }, [])

    return (
        <>
            {showConfirmation ?
                <ModalConfirmation text={`Esta ação não pode ser revertida`} buttons={<>
                    <button onClick={() => setShowConfirmation(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteMassive(), setShowConfirmation(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            {showModalDuplication ?
                <ModalConfirmation text={`Deseja duplicar a categoria ${targeCategory?.name}?`} buttons={<>
                    <button onClick={() => setModalDuplication(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { duplicateCategory(), setModalDuplication(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            {showModal ?
                <ModalConfirmation text={`Deseja excluir uma pergunta?`} buttons={<>
                    <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteCategory(), setModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            <div className='p-4'>
                <div className='mb-8 flex'>
                    <TitlePage icon={<GrCircleInformation />} title='FAQ' />

                    <div className='flex'>
                        <button type="button" onClick={() => { router.push('/admin/faq/category/new') }} className="mr-2 flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar Categoria
                        </button>
                        <button type="button" onClick={() => { router.push('/admin/faq/question/new') }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar Pergunta
                        </button>
                    </div>
                </div>

                <div className='flex items-center justify-end mb-4'>
                    {massiveSelection ? (
                        <>
                            <div className='mr-2'>
                                <span>{selected()} {selected() > 1 ? 'selecionados' : 'selecionado'}</span>
                            </div>
                            <button type="button" onClick={() => { clearSelection() }} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                                Limpar
                            </button>
                        </>
                    ) : null}
                    <button type="button" onClick={() => activeMassive()} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                        Ativar
                    </button>
                    <button type="button" onClick={() => inactiveMassive()} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                        Inativar
                    </button>
                    <button type="button" onClick={() => setShowConfirmation(true)} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                        <BsFillTrash2Fill className="mr-1" />
                        Excluir
                    </button>
                </div>

                <div className='flex'>
                    <div className='w-[350px] mr-4'>
                        <div className='mb-4'>
                            <span>Categorias({categoryList.length})</span>
                        </div>

                        <div className='w-full'>
                            <div className='text-sm flex justify-center w-full'>
                                <div onClick={() => getFAQ('all')} className={'all' === selectedCategory ? 'hover:cursor-pointer w-[250px] mb-4 rounded-md py-1 px-2 bg-sub text-black flex items-center' : 'hover:cursor-pointer w-[250px] mb-4 rounded-md py-1 px-2 border border-gray-400 flex items-center'}>
                                    <span className='mr-2'>Todas</span>
                                </div>
                            </div>
                            {categoryList.map((category) => {
                                return (
                                    <div className='text-sm flex justify-center w-full'>
                                        <div onClick={() => getFAQ(category.id)} className={'hover:cursor-pointer w-[250px] mb-4 rounded-md py-1 px-2 flex items-center justify-between border-gray-400 border' + (category.id === selectedCategory ? ' bg-sub text-black' : '')}>
                                            <span className='mr-2'>{category.name}</span>
                                            <div className='flex'>
                                                <button onClick={() => window.open('/admin/faq/category/' + category.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <IoOpenOutline />
                                                </button>
                                                <button onClick={() => confirmDuplication(category)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <HiDuplicate />
                                                </button>
                                                <button onClick={() => router.push('/admin/faq/category/' + category.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <MdEdit />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='flex justify-center w-full'>
                        {faqList?.length > 0 ? (
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">

                                            </th>
                                            {selectedCategory !== 'all' ? (
                                                <th scope="col" className="px-6 py-3">
                                                    Ordenação
                                                </th>
                                            ) : null}
                                            <th scope="col" className="px-6 py-3">
                                                Pergunta
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                Resposta
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {faqList?.map((faq, index) => {
                                            return (
                                                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                    <th scope="row" className="px-4 py-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                        <div className="flex items-center">
                                                            <input onChange={(e) => setChecked(e, index)} type="checkbox" checked={faq.checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                                        </div>
                                                    </th>
                                                    {selectedCategory !== 'all' ? (
                                                        <td className="px-6 py-4 flex item-center h-full">
                                                            <button onClick={() => reorder(index, 'up')} disabled={isReordering || index === 0} className={isReordering || index === 0 ? 'text-gray-200 mr-1 p-1 rounded-full' : 'hover:bg-orange-500 hover:text-white mr-1 p-1 rounded-full'}>
                                                                <FaArrowUp />
                                                            </button>
                                                            <div>
                                                                <strong className='mr-1 text-main'>{faq.order}</strong>
                                                            </div>
                                                            <button onClick={() => reorder(index, 'down')} disabled={isReordering || index + 1 === faqList.length} className={isReordering || index + 1 === faqList.length ? 'text-gray-200 mr-1 p-1 rounded-full' : 'hover:bg-orange-500 hover:text-white mr-1 p-1 rounded-full'}>
                                                                <FaArrowDown />
                                                            </button>
                                                        </td>
                                                    ) : null}
                                                    <td className="px-6 py-4 min-w-[200px]">
                                                        {faq.question}
                                                    </td>
                                                    <td className="px-6 py-4 min-w-[200px]">
                                                        {faq.response}
                                                    </td>
                                                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                        {faq.isActive ? (
                                                            <span className='text-green-400 font-bold'>Ativo</span>
                                                        ) : (
                                                            <span className='text-red-400 font-bold'>Inativo</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 flex items-center h-full">
                                                        <button onClick={() => window.open('/admin/faq/question/' + faq.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                            <IoOpenOutline />
                                                        </button>
                                                        <button onClick={() => router.push('/admin/faq/question/' + faq.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                            <MdEdit />
                                                        </button>
                                                        <button onClick={() => { setModal(true), setTarget(faq) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
                                                            <BsFillTrash2Fill />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className='flex justify-center items-center h-[200px]'>
                                {isLoading ? (
                                    <div>
                                        <LoadingAlares />
                                    </div>
                                ) : (
                                    <div>
                                        <span className='text-gray-500'>Nenhuma pergunta cadastrada</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
