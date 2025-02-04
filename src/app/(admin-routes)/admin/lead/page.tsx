'use client'
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import TitlePage from '@/app/components/TitlePage'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoMdAdd, IoMdDownload } from 'react-icons/io';
import { MdEdit, MdFileUpload, MdLocalOffer, MdOutlineLeaderboard } from 'react-icons/md';
import LeadService from '@/app/services/api/lead.service';
import { useForm } from 'react-hook-form';
import { getHours } from 'date-fns';
import toast from 'react-hot-toast';
import Papa from 'papaparse';

export default function Lead() {

    const router = useRouter()
    const [list, setList] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(false);
    const [showModal, setModal] = useState(false);
    const [target, setTarget] = useState<any>({});
    const { register, handleSubmit, setValue, getValues } = useForm();
    const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

    async function get() {

        setLoading(true);
        setList([])

        const date_init = getValues('date_init');
        const date_end = getValues('date_end')

        const params = {
            date_init: date_init,
            date_end: date_end
        }

        const request: any = await LeadService.list(params)

        if (request.status === 200) {
            const data = await request.data?.data;
            setList(data);
            setLoading(false)
        }
    }

    function exportList(json: any) {

        interface Data {
            [key: string]: string | number | boolean;
        }

        const jsonToCsv = (data: Data[]): string => {
            if (!data.length) {
                return '';
            }

            // Extrair as chaves para o cabeçalho
            const headers = Object.keys(data[0]);

            // Criar o conteúdo CSV (cabeçalho + linhas de dados)
            const csvContent = data.map(row => {
                return headers.map(header => row[header]).join(';');
            });

            // Concatenar o cabeçalho e o conteúdo CSV
            return [headers.join(';'), ...csvContent].join('\n');
        };

        // Converter o JSON para CSV
        const csv = jsonToCsv(json);

        // Exibir o CSV no console ou salvar como arquivo
        console.log(csv);

        // Para salvar o CSV, você pode criar um Blob e forçar o download
        const downloadCsv = (csvContent: string, filename: string) => {
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const lote = generateBatchNumber();

        // Usar a função para fazer download do CSV
        downloadCsv(csv, `${lote}.csv`);

    }

    function generateBatchNumber() {
        const date = new Date();

        // Obtendo o ano, mês e dia
        const year = date.getFullYear();  // YYYY
        let month = (date.getMonth() + 1).toString();  // Mês começa de 0, por isso adicionamos 1
        let day = date.getDate().toString();  // Dia do mês

        // Certifica que o mês e o dia tenham 2 dígitos
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        // Gerando o número de lote no formato YYYYMMDD
        const batchNumber = `${year}${month}${day}`;

        return batchNumber;
    }

    function revertDateTime(dateISO: string) {

        const isoDate = new Date(dateISO);
        const hour = getHours(isoDate);
        isoDate.setHours(hour - 3);
        const final = isoDate.toISOString().replace(':00.000Z', '');
        return String(final);
    }

    function setHours() {
        const end = new Date();
        end.setHours(20);
        end.setMinutes(59);
        setValue('date_end', end.toISOString().slice(0, 16));

        const start = new Date();
        start.setHours(20);
        start.setMinutes(59);
        const day = start.getDate()
        start.setDate(day - 7)
        setValue('date_init', start.toISOString().slice(0, 16));

        /* setTimeout(() => {
            get();
        }, 1000) */
    };

    function handleFileUpload(event: any) {

        const csvFile = event.target.files[0];
        const requiredKeys = ['chat_id', 'telefone', 'email_cliente', 'tags', 'tabulacao'];

        Papa.parse(csvFile, {
            skipEmptyLines: true,
            header: true,
            complete: function (results) {
                const jsonObject: Array<any> = results.data;
                const isValid = validateArrayOfObjects(jsonObject, requiredKeys);
                console.log(jsonObject)
                if (isValid) {
                    uploadLead(jsonObject)
                } else {
                    alert(`Planilha com formato inválido. Colunas obrigatórias: ${requiredKeys.join(', ')}`)
                }
            }
        });
    }

    function validateArrayOfObjects(arr: object[], requiredKeys: string[]): boolean {
        return arr.every(obj => requiredKeys.every(key => key in obj));
    }

    async function uploadLead(json: any) {

        setLoading(true)
        setList([])

        const data = {
            leads: json
        }

        const request: any = await LeadService.upload(data);
        const response = request.data;

        if (request.status >= 200) {
            toast.success('Importação processado com sucesso');

            exportList(response?.data)

            setTimeout(() => {
                get();
            }, 500)
        }

        if (response.statusCode === 400) {
            toast.error('Falha ao processar importação')
            setTimeout(() => {
                get();
            }, 500)
        }

    }

    React.useEffect(() => {
        setHours();
    }, [])

    return (
        <>
            <div className='p-4'>
                <div className='mb-6 flex justify-between'>
                    <TitlePage icon={<MdOutlineLeaderboard />} title='Leads' />

                    <div>
                        {isLoading ? (
                            <></>
                        ) : (
                            <div className='flex'>
                                <button type="button" onClick={() => { exportList(list) }} className="flex mr-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                                    <IoMdDownload className="mr-1" />
                                    Exportar lista
                                </button>

                                <div className="flex items-center justify-center">
                                    <label htmlFor="csvInput" className="flex mr-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                                        <MdFileUpload />
                                        Importar CSV
                                    </label>
                                    <input id="csvInput" type="file" accept={acceptableCSVFileTypes} className="hidden" onChange={(event) => handleFileUpload(event)} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='mb-4'>
                    <div className='flex items-center'>
                        <div className='sm:w-52 mr-2'>
                            <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                Data inicial</label>
                            <input type="datetime-local" disabled={isLoading} {...register('date_init')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                        </div>

                        <div className='sm:w-52 mr-4'>
                            <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                Data final</label>
                            <input type="datetime-local" disabled={isLoading} {...register('date_end')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                        </div>

                        <div className='pt-6 pl-4'>
                            <button type="button" onClick={() => { get() }} className="flex items-center text-white bg-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                {list?.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Telefone
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list?.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {item.CAMPO1}
                                            </th>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {item.TELEFONE}
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
                                <span className='text-gray-500'>Nenhum lead encontrado</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
