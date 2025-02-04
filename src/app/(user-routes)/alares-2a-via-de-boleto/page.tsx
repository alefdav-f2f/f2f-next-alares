'use client'
import React from 'react'
import { externalURL } from '@/app/api/externalURL'
import { useForm } from 'react-hook-form';
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import toast from 'react-hot-toast';
import Loading from '@/app/components/loadings/Loading';
import { getCookie } from 'cookies-next';
import Recaptcha from '@/app/components/recaptchas/recaptcha.google';
import ReCAPTCHA from 'react-google-recaptcha'
import useReCaptcha from '@/app/zustand/recaptcha.store';
import { getClientIP } from '@/app/services/navigation-service';
import { Regex } from 'lucide-react';
import RegexService from '@/app/services/validations/regex.service';
import { InputMask } from '@react-input/mask';


export default function page() {

    const [isLoading, setLoading] = React.useState(false);
    const [isReceived, setReceived] = React.useState(false);
    const [invoiceStatus, setInvoiceStatus] = React.useState(false);
    const [errorStatus, setErrorStatus] = React.useState(false);
    const [invoiceList, setInvoiceList] = React.useState<any[]>([]);
    const { register, handleSubmit, setValue, getValues } = useForm();
    const refCAPTCHA = React.useRef<ReCAPTCHA | null>(null);
    const { setRecaptchaToken } = useReCaptcha();
    const development = String(process.env.NEXT_PUBLIC_DEVELOPMENT);
    const [client_ip, setClient_IP] = React.useState('');
    // const [mask, setMask] = React.useState('___.___.___-____')
    const [inputError, setInputError] = React.useState(false);

    const mask = [
        { mask: '___.___.___-___' },
        { mask: '__.___.___/____-__' }
    ]

    async function getIP() {
        const ip = await getClientIP();
        setClient_IP(ip);
    }

    async function getInvoice(data: any) {

        setInputError(false)

        const doc = String(data.document);

        const document = doc.replace(/[^\d]+/g, '');

        if (document.length === 11) {
            if (!RegexService.validateCPF(document)) {
                return setInputError(true)
            }
        } else if (document.length === 14) {
            if (!RegexService.validateCNPJ(document)) {
                return setInputError(true)
            }
        } else {
            return setInputError(true);
        }

        setLoading(true);

        const token = refCAPTCHA.current
            ? refCAPTCHA.current.getValue()
            : 'development'

        if (!token) {
            toast.error('Erro de reCAPTCHA, tente novamente.')
            setLoading(false);
            return;
        }

        console.log(token)

        const session_id = getCookie('session_id');

        const params = {
            cpf: doc,
            session_id: String(session_id),
            client_ip: client_ip
        }

        const request: any = await axiosInterceptorInstance.get(`/invoice/get`, { params });

        if (request.status >= 400) {
            toast.success('Houve um erro ao consultar faturas');
            setLoading(false);
        }

        if (request.status === 200) {

            setReceived(true);
            const data = request.data;

            if (data.error) {
                setInvoiceStatus(false);
                setLoading(false);
            }

            if (data.status) {
                setInvoiceStatus(true);
                let array = data?.data;
                array?.map((a: any) => { a.loading = false; a.sended = false; })
                setInvoiceList(array)
                setLoading(false);
            }
        }
    }

    async function sendInvoice(invoice: any, index: number) {

        const session_id = getCookie('session_id');

        let array = [...invoiceList];
        array[index].loading = true;
        setInvoiceList(array)

        const request: any = await axiosInterceptorInstance.post(`/invoice/send-to-email`, {
            session_id: String(session_id),
            key_base: invoice.keyBase,
            id_invoice: invoice.idInvoice,
            client_ip: client_ip
        });

        if (request.status >= 400) {
            setErrorStatus(true)
        }

        if (request.status >= 200) {
            let array = [...invoiceList];
            array[index].sended = true;
            setInvoiceList(array);
        }

    }

    const handleRecaptchaVerify = () => {
        if (refCAPTCHA.current) {
            const token = refCAPTCHA.current.getValue()
            setRecaptchaToken(token)
        }
    }

    React.useEffect(() => {
        getIP()
        const title = 'Segunda via do Boleto | Alares em ' + getCookie('city_name_uf');
    }, [])

    function handleInputChange(event: any) {

        const value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        const final = RegexService.replaceCpfCnpj(value);
        setValue('document', final)

    }


    return (
        <section className='p-4 min-h-screen fade50'>
            <div className='text-center mb-8 pt-10'>
                <div className='mb-4'>
                    <span className='text-4xl text-main'>2ª via do boleto</span>
                </div>
                <div>
                    <span className='text-main font-light'>Acesse o resumo de sua fatura de forma simples e rápida.</span>
                </div>
            </div>

            <div>
                <form onSubmit={handleSubmit(getInvoice)}>
                    <div className='flex justify-center mb-4'>
                        <div className='sm:w-96'>
                            <input id="cpf-cnpj" disabled={isLoading} {...register('document')} onChange={handleInputChange} className="bg-gray-50 border text-center border-secondary text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="CPF/CNPJ" required />
                            {inputError ? (
                                <div className='text-center fade50'>
                                    <span className='text-sm text-red-600'>Número de documento inválido</span>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        {development === 'true' ? (
                            ''
                        ) : (
                            <Recaptcha
                                onVerify={() => handleRecaptchaVerify}
                                refcaptcha={refCAPTCHA}
                                className='mb-6'
                            />
                        )}
                    </div>

                    <div className='flex justify-center mb-6'>
                        <button type='submit' disabled={isLoading} className='px-6 py-2 bg-main rounded-full border-secondary text-white flex items-center hover:bg-sub hover:text-main'>
                            {isLoading ? <Loading /> : 'Consultar Faturas'}
                        </button>
                    </div>
                </form>

                {isReceived ? (
                    <div className='flex justify-center mb-6'>
                        <div className='w-[800px] rounded-3xl border border-gray-200 px-8 py-4 font-light'>
                            <div className='mb-4'>
                                <span className='text-xl'>Faturas Encontradas</span>
                            </div>

                            {errorStatus ? (
                                <div className='text-center p-8'>
                                    <span className='text-red-600'>Houve um erro ao enviar a fatura</span>
                                </div>
                            ) : (
                                <div>
                                    <table className='w-full border border-gray-200'>
                                        <tr className='bg-gray-100'>
                                            <th className='font-bold p-2 border border-gray-200'>Número do documento</th>
                                            <th></th>
                                        </tr>
                                        {invoiceList?.map((invoice, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='p-2 border border-gray-200'>{invoice.numDocument}</td>
                                                    <td className='border border-gray-200 p-2 flex justify-center'>
                                                        {invoice.sended ? (
                                                            <div>
                                                                <span className='font-semibold text-main'>Enviado</span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <button onClick={() => { sendInvoice(invoice, index) }} disabled={invoice.loading || invoice.sended} className='px-6 py-2 bg-main rounded-full border-secondary text-white flex items-center hover:bg-sub hover:text-main'>
                                                                    {invoice.loading ? <Loading /> : 'Enviar por e-mail'}
                                                                </button>
                                                            </div>
                                                        )
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </div>
                            )}

                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center mb-6'>
                        <div className='w-[800px] rounded-3xl border border-gray-300 p-8 font-light'>
                            <span>Por favor preencha os dados corretamente ou acesse a <a rel="canonical" href={externalURL.center} target='_blank' className='text-blue-700 hover:underline'>Central do assinante</a></span>
                        </div>
                    </div>
                )
                };

                <div className='text-center'>
                    <span className='text-sm text-main'>Pra mais informações de seu contrato e serviços, acesse a <a rel="canonical" href={externalURL.center} target='_blank'>Central do assinante</a></span>
                </div>
            </div >
        </section >
    )
}
