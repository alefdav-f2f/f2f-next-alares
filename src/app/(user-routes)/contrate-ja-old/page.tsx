'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineMenu } from 'react-icons/ai'
import errorIcon from '@/img/icon/err-end.svg';
import Image from 'next/image';
import { externalURL } from '@/app/api/externalURL';
import { InputMask } from '@react-input/mask';
import { FaCalendarAlt } from 'react-icons/fa';
import { TbClockHour5 } from "react-icons/tb";
import congrats from "@/img/icon/undraw_Powerful_re_frhr.png";
import fail from '@/img/cep-fail.png';
import RegexService from '@/app/services/validations/regex.service';
import EcommerceService from '@/app/services/api/ecommerce.service';
import house from "@/img/house-biometry.png";
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import DataLayerService from '@/app/services/api/datalayer.service';
import { getClientIP, openWhatsapp } from '@/app/services/navigation-service';
import PlanService from '@/app/services/api/plan.service';
import Spinner from '@/app/components/Spinner';
import Modal from '@/app/components/Modal';
import { GoAlertFill } from "react-icons/go";


export default function EcommercePage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setLoading] = useState(false);
    const [isAccepted, setAccept] = useState(true);
    const [term, setTerm] = useState('');
    const [termText, setTermText] = useState('');
    const [schedule, setSchedule] = useState<any[]>([]);
    const [order_id, setOrderId] = useState('');
    const [errorAddress, setErrorAddress] = useState(false);
    const [errorCPF, setErrorCPF] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorCEP, setErrorCEP] = useState(false);
    const [step, setStep] = useState(10);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [periodList, setPeriodList] = useState<any[]>([]);
    const [contentPlan, setContentPlan] = useState<any[]>([]);
    const [servicePlan, setServicePlan] = useState<any[]>([]);
    const { register, handleSubmit, setValue, getValues } = useForm();
    const [planList, setPlan] = useState<any[]>([]);
    const [addressList, setAddress] = useState<any[]>([]);
    const [addressListFiltered, setAddressFiltered] = useState<any[]>([]);
    const [addressID, setAddressID] = useState('');
    const city_id = getCookie('city_id');
    const [isOpenAddress, setIsOpenAddress] = useState(false);
    const [client_ip, setClient_IP] = useState('');
    const [nameLength, setNameLength] = useState(0);
    const [motherNameLength, setMotherNameLength] = useState(0);
    const [complementLength, setComplementLength] = useState(0);
    const [numberLength, setNumberLength] = useState(0);

    function navigate(path: string, external: boolean) {

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (external) {
            window.open(path, '_blank')
        } else {
            router.push(`${path}/?${current}`)
        }
    }

    function setCheck(event: any) {
        const checked = event?.target?.checked;

        setAccept(checked)
    }

    //Lista todos os planos
    async function getPlan() {

        const plan = searchParams.get('plano');

        if (plan) {
            setSelectedPlan(String(plan))
        }

        const session_id = getCookie('session_id')

        const request = await PlanService.getPlan(String(city_id), session_id);

        if (request.status === 200) {
            const data = request.data?.plans;
            const exclusive_offers = request.data?.exclusive_offers;

            exclusive_offers?.map((offer: any) => {
                if (String(offer?.id) === String(plan)) {
                    data.push(offer)
                }
            })

            setPlan(data)

            setTimeout(() => {

                if (plan) {
                    setValue('plan', Number(plan));
                }

                const selected = data?.find((d: any) => String(d.id) === String(plan))
                sendDataLayer(selected, 'start_contrate_ja');
            }, 500)
        }
    }

    //Primeiro step do fluxo e-commerce
    async function checkAddress(form: any) {

        const city_id = getCookie('city_id')

        if (form.name.length > 40) {
            toast.error('Nome completo excede o limite de caracteres')
            return
        }

        if (RegexService.singleWord(form.name)) {
            toast.error('Insira um nome válido')
            return
        }

        if ([null, undefined, '', false, 0].includes(form.plan)) {
            toast.error('Selecione um plano')
            return
        }

        setSelectedPlan(form.plan);

        if (await RegexService.singleWord(form.name)) {
            toast.error('Insira um nome válido')
            return
        }

        if (await RegexService.countNumbers(form.phone) < 10) {
            toast.error('Insira um número de telefone válido');
            return
        }

        const match = form.phone.match(/\(\d{2}\)\s?(\d)/);
        console.log(match[1])
        if (match[1] !== '9') {
            toast.error('Número de celular inválido');
            return
        }

        const validationEmail = RegexService.validationEmail(form.email);
        if (validationEmail === false) {
            setErrorEmail(true)
            return
        } else {
            setErrorEmail(false)
        }

        const validationCEP = RegexService.validationCEP(form.postal_code);
        if (validationCEP === false) {
            setErrorCEP(true)
            return
        } else {
            setErrorCEP(false)
        }

        setLoading(true);

        const plan = planList.find(p => String(p.id) === String(form.plan));
        setTimeout(() => {
            setSelectedPlan(form.plan);
            setContentPlan(plan.contents);
            setServicePlan(plan.services)
        }, 500)

        const data = {
            city_id: city_id,
            session_id: getCookie('session_id') ?? 0,
            postcode: form.postal_code,
            plan_id: form.plan,
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: 'alares',
            client_ip: client_ip
        }

        const response = await EcommerceService.addressValidation(data);

        if (response) {

            const data = response.data

            if (data.status === true) {
                setStep(20);
                setAddress(data?.data);
                setAddressFiltered(data?.data)
                setValue('postal_code2', form.postal_code)
                setLoading(false);

                const selected = planList.find((d: any) => String(d.id) === String(form.plan))
                sendDataLayer(selected, 'infos_contrate_ja')
                scrollToInitial()

            } else if (data.status === false) {
                const selected = planList.find((d: any) => String(d.id) === String(selectedPlan))
                setStep(11);
                setLoading(false);
                sendDataLayerERROR(selected);
                scrollToInitial()

            } else {
                setStep(0);
                setLoading(false);
                scrollToInitial()
            }
        }

    }

    //Segundo step do fluxo e-commerce
    async function validateOrder(form: any) {


        const array = [...addressList];
        const addressFiltered = array.find(a => String(a.address).toLowerCase() === String(form.address).toLowerCase());

        if (form.motherName.length > 40) {
            toast.error('Nome da mãe excede o limite de caracteres')
            return
        }

        if (RegexService.singleWord(form.motherName)) {
            toast.error('Insira um nome da mãe válido')
            return
        }

        if (form.number.length > 10) {
            toast.error('Número do endereço excede o limite de caracteres')
            return
        }

        if ([undefined, null, 0, false].includes(addressFiltered)) {
            setIsOpenAddress(false)
            setErrorAddress(true);
            return
        }

        const validation = RegexService.validationCPF(String(form.cpf));

        if (validation === false) {
            setErrorCPF(true)
            return
        } else {
            setErrorCPF(false)
        }

        scrollToInitial();
        setLoading(true);

        const date = form.birthday; 
        var birthday = RegexService.convertDate(String(date))

        try {
            const request = await axiosInterceptorInstance.get('/order/validate', {
                params: {
                    session_id: getCookie('session_id') ?? 0,
                    cpf: form.cpf,
                    email: getValues('email'),
                    city: form.city,
                    address: form.address,
                    neighborhood: form.neighborhood,
                    number: form.number,
                    complement: form.complement,
                    postal_code: form.postal_code2,
                    uf: form.state,
                    company: 'alares',
                    client_ip: client_ip,
                    birthdate: birthday,
                    mother_name: form.motherName,
                    address_id: addressID ?? ''
                }
            })

            const data = request.data

            if (data.status === true) {
                setTerm(data?.term?.id);
                setTermText(data?.term?.text);
                setStep(30);
                setLoading(false);
                scrollToInitial()

                const selected = planList.find((d: any) => String(d.id) === String(selectedPlan))
                sendDataLayer(selected, 'review_contrate_ja')
            }

            if (data.status === false) {
                setStep(21);
                setLoading(false);
                scrollToInitial()
            }

        }
        catch (error: any) {
            setStep(0);
            setLoading(false);
            scrollToInitial()
        }
    }

    //Preenche os campos de endereço do formulário
    async function setValueAddress(value: any) {
        const array = [...addressList];
        const address = array.find(a => String(a.address).toLowerCase() === String(value).toLowerCase());

        if (address) {
            setAddressID(address?.id);
            setValue('state', address?.state);
            setValue('neighborhood', address?.neighborhood);
            setValue('city', address?.city);
            setValue('address', address?.address);
            setErrorAddress(false);
        } else {
            setValue('state', '');
            setValue('neighborhood', '');
        }

        setIsOpenAddress(false)
    }

    function openAutoComplete(value: any) {
        const array = [...addressList];
        const filtered = array.filter(a => (String(a.address).toLowerCase().includes(String(value).toLowerCase())));
        console.log(filtered)
        if (value.length > 0) {
            setAddressFiltered(filtered)
        } else {
            setAddressFiltered(array)
        }
    }

    function getPlanDetail(prop: string) {
        const plan = planList.find(p => String(p.id) === String(selectedPlan));

        switch (prop) {
            case 'id': {
                return plan?.id ?? plan?.id
            }
            case 'name': {
                return plan?.name ?? plan?.name
            }
            case 'title': {
                return plan?.title ?? plan?.title
            }
            case 'subtitle': {
                return plan?.subtitle ?? plan?.subtitle
            }
            case 'price': {
                return plan?.price ?? plan?.price
            }

        }
    }

    //Cria o pedido
    async function createOrder() {
        const selected = planList.find((d: any) => String(d.id) === String(selectedPlan))
        sendDataLayer(selected, 'termos_contrate_ja');
        scrollToInitial();
        setLoading(true);
        setAccept(true);

        const date = getValues('birthday');
        var birthday = RegexService.convertDate(String(date))

        const tel = getValues('phone');
        const thenum = tel.match(/\d+/g).join("");

        try {
            const request = await axiosInterceptorInstance.post('/order/create', {
                session_id: getCookie('session_id') ?? 0,
                plan_id: Number(selectedPlan),
                term_id: term,
                address_id: Number(addressID),
                cpf: getValues('cpf'),
                name: getValues('name'),
                birthdate: birthday,
                mother_name: getValues('motherName'),
                email: getValues('email'),
                phone: thenum,
                number: getValues('number'),
                postal_code: getValues('postal_code'),
                complement: getValues('complement'),
                company: 'alares',
                client_ip: client_ip
            })

            const data = request.data
            const schedule = request.data?.data?.schedule;
            const orderId = request.data?.data?.order_id;

            if (data.status === true) {
                setSchedule(schedule);
                setOrderId(orderId)
                setStep(50);
                setLoading(false);

                const selected = planList.find((d: any) => String(d.id) === String(selectedPlan))
                sendDataLayer(selected, 'agendamento_contrate_ja');
                scrollToInitial()
            }


            if (data.status === false) {
                setStep(51);
                setLoading(false);
                scrollToInitial()
            }
        }
        catch (error: any) {
            toast.error(error.message)
            setLoading(true);
            setStep(0);
            scrollToInitial()
        }
    }

    // Última etapa do fluxo
    async function createContract() {

        if ([null, '', undefined].includes(selectedDate)) {
            toast.error('Selecione a data do agendamento')
            return
        }

        if ([null, '', undefined].includes(selectedPeriod)) {
            toast.error('Selecione o período do agendamento')
            return
        }

        setStep(100);

        try {
            const request = await axiosInterceptorInstance.post('/order/contract-ecommerce', {
                session_id: getCookie('session_id') ?? 0,
                order_id: order_id,
                schedule_date: selectedDate,
                schedule_period: selectedPeriod,
                company: 'alares',
                client_ip: client_ip
            })

            const data = request.data
            if (data.status === true) {
                setStep(200);
                setLoading(false);

                const selected = planList.find((d: any) => String(d.id) === String(selectedPlan))
                sendDataLayer(selected, 'success_contrate_ja', data?.contract);
                scrollToInitial();
            }

            if (data.status === false) {
                setStep(51);
                setLoading(false);
                scrollToInitial();
            }
        }
        catch (error: any) {
            toast.error(error.message)
            setStep(0)
            setLoading(true);
            scrollToInitial();
        }
    }

    //Envia dados ao datalayer
    function sendDataLayer(plan: any, event: string, sale_id?: any) {

        setTimeout(() => {
            const data = {
                event: event,
                city: String(getCookie('city_name')),
                state: String(getCookie('uf_name')),
                selected_plan: plan?.name,
                value: plan?.title,
                oferta_id: plan?.id,
                pedido_id: sale_id
            }
            console.log(data)
            DataLayerService.senDataLayer(data)
        }, 1000)
    }

    function sendDataLayerERROR(plan: any) {

        if (plan) {
            const data = {
                event: 'error_contrate_ja',
                error_type: 'Endereço não encontrado',
                city: String(getCookie('city_name')),
                state: String(getCookie('uf_name')),
                selected_plan: plan.name,
                value: plan.title,
                oferta_id: String(plan.id),
            }
            console.log(data)
            DataLayerService.senDataLayer(data)
        }
    }

    function scrollToInitial() {

        const el = document.getElementById('initial_scroll');
        el?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    function filterAddress(value: any) {
        console.log(value)

        const array = [...addressList];
        const filtered = array.filter((a: any) => ((a.address).toLowerCase()).includes((value).toLowerCase()));

        setAddressFiltered(filtered);
    }

    async function getIP() {
        const ip = await getClientIP();
        setClient_IP(ip);
    }

    React.useEffect(() => {
        getPlan();
        getIP();
    }, [])

    return (
        <div id="initial_scroll" className='pb-10 sm:pt-10'>

            <nav className="hidden sm:block h-[90px] sm:h-[160px] max-w-screen absolute top-0 right-0">
                <div className="flex justify-end items-center sm:relative h-[90px] w-[100%]">

                    <div className="flex items-center justify-end xl:justify-center sm:w-[1200px] w-full px-5">

                        <div className='hidden lg:flex pt-10 mb-10'>
                            <div>
                                <div className='flex mb-2'>
                                    <div>
                                        <div className={step >= 10 ? 'text-center text-sub text-xs' : 'text-center text-white text-xs'}>
                                            <span>Dados do contrato</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className={step >= 10 ? 'w-3 h-3 rounded-full bg-sub' : 'w-3 h-3 rounded-full bg-white'}></div>
                                            <div className={step >= 10 ? 'w-44 h-0.5 bg-sub ml-[-5px]' : 'w-44 h-0.5 bg-white ml-[-5px]'}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={step >= 20 ? 'text-center text-sub text-xs' : 'text-center text-white text-xs'}>
                                            <span>Dados complementares</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className={step >= 20 ? 'w-3 h-3 rounded-full bg-sub' : 'w-3 h-3 rounded-full bg-white'}></div>
                                            <div className={step >= 20 ? 'w-44 h-0.5 bg-sub ml-[-5px]' : 'w-44 h-0.5 bg-white ml-[-5px]'}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={step >= 30 ? 'text-center text-sub text-xs' : 'text-center text-white text-xs'}>
                                            <span>Resumo do Pedido</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className={step >= 30 ? 'w-3 h-3 rounded-full bg-sub' : 'w-3 h-3 rounded-full bg-white'}></div>
                                            <div className={step >= 30 ? 'w-44 h-0.5 bg-sub ml-[-5px]' : 'w-44 h-0.5 bg-white ml-[-5px]'}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={step >= 50 ? 'text-center text-sub text-xs' : 'text-center text-white text-xs'}>
                                            <span>Agendamento</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className={step >= 50 ? 'w-3 h-3 rounded-full bg-sub' : 'w-3 h-3 rounded-full bg-white'}></div>
                                            <div className={step >= 50 ? 'w-44 h-0.5 bg-sub ml-[-5px]' : 'w-44 h-0.5 bg-white ml-[-5px]'}></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='lg:hidden flex justify-center pt-10 mb-10'>
                <div>
                    <div className='flex mb-2'>
                        <div className='flex items-center'>
                            <div className={`w-4 h-4 rounded-full ${step >= 10 ? 'bg-sub border-[2px] border-main' : 'bg-main'}`}></div>
                            <div className={`w-16 h-1 ml-[-5px] ${step >= 10 ? 'bg-sub' : 'bg-main'}`}></div>
                        </div>
                        <div className='flex items-center'>
                            <div className={`w-4 h-4 rounded-full ${step >= 20 ? 'bg-sub border-[2px] border-main' : 'bg-main'}`}></div>
                            <div className={`w-16 h-1 ml-[-5px] ${step >= 20 ? 'bg-sub' : 'bg-main'}`}></div>
                        </div>
                        <div className='flex items-center'>
                            <div className={`w-4 h-4 rounded-full ${step >= 30 ? 'bg-sub border-[2px] border-main' : 'bg-main'}`}></div>
                            <div className={`w-16 h-1 ml-[-5px] ${step >= 30 ? 'bg-sub' : 'bg-main'}`}></div>
                        </div>
                        <div className='flex items-center'>
                            <div className={`w-4 h-4 rounded-full ${step >= 40 ? 'bg-sub border-[2px] border-main' : 'bg-main'}`}></div>
                            <div className={`w-16 h-1 ml-[-5px] ${step >= 40 ? 'bg-sub' : 'bg-main'}`}></div>
                        </div>
                    </div>

                    <div className='text-center text-sub'>
                        {step === 10 ? <span>Dados do contrato</span> : null}
                        {step === 20 ? <span>Dados complementares</span> : null}
                        {step === 30 ? <span>Resumo do Pedido</span> : null}
                        {step === 50 ? <span>Agendamento</span> : null}
                    </div>
                </div>
            </div>

            {[10, 20].includes(step) ? (
                <div className='text-center mb-4 p-2'>
                    <span className='sm:text-5xl text-2xl font-bold text-main'>Contrate já</span><br /><br />
                    {step === 1 ? <>
                        <span className='text-main sm:text-base text-sm'>Obrigado pelo seu interesse.</span><br />
                        <span className='text-main sm:text-base text-sm'>Para iniciar seu pedido, é só preencher suas informações. É rapidinho!</span>
                    </> : null}
                </div>
            ) : (null)}

            {isLoading ? (
                <div className='min-h-screen'>
                    <div className='flex items-center justify-center'>
                        {/* <Image src={loadingGIF} alt={''} /> */}
                        <LoadingAlares color="purple" />
                    </div>
                </div>
            ) : (
                <Suspense fallback={<div className='h-[500px] flex justify-center items-center'>
                    {/* <Image src={loadingGIF} alt={''} /> */}
                    <LoadingAlares color="purple" />
                </div>
                }>
                    <div className='min-h-[700px]'>
                        {step === 10 ? step1() : null}
                        {step === 11 ? error1() : null}
                        {step === 20 ? step2() : null}
                        {step === 21 ? errorMajor() : null}
                        {step === 30 ? step3() : null}
                        {step === 50 ? step4() : null}
                        {step === 100 ? houseLoader() : null}
                        {step === 200 ? stepSuccess() : null}

                        {step === 51 ? errorBack() : null}
                        {step === 0 ? errorMajor() : null}
                    </div>
                </Suspense>
            )}

        </div>
    )



    function houseLoader() {

        return (
            <div className='h-[300px] flex justify-center items-center select-none'>
                <div className='flex flex-col justify-center'>
                    <Image src={house} alt={''} className='select-none pointer-events-none' draggable="false" />
                    <div className='flex justify-center pt-4 font-bold mb-4'>
                        <div className='count'></div>
                        <span>%</span>
                    </div>
                    <div className='flex justify-center'>
                        <div className='w-[300px] border border-gray-100 rounded-xl'>
                            <div className='progress_bar bg-main h-10 rounded-xl'></div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <span>Enviando pedido ....</span>
                    </div>
                </div>
            </div>
        )
    }

    function stepSuccess() {
        return (
            <div>
                <div className='text-center mb-4'>
                    <span className='text-main text-4xl'>Confirmado!</span>
                </div>
                <div className='flex justify-center'>
                    <div className='text-center max-w-[400px]'>
                        <span>Em breve, você estará navegando na internet com nossa conexão de alta velocidade. Aguarde o contato dos nossos especialistas.</span>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Image src={congrats} alt={''} className='w-[500px]'></Image>
                </div>

                <div className='flex justify-center'>
                    <button onClick={() => { navigate('/home', false) }} className="bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52">
                        VOLTAR AO INÍCIO
                    </button>
                </div>
            </div>
        )
    }

    function step1() {

        return (
            <form onSubmit={handleSubmit(checkAddress)}>
                <div className='flex justify-center mb-8 fade25'>
                    <div className='flex justify-start px-4 mb-4 flex-wrap max-w-[1050px]'>

                        <div className='sm:w-80 w-full sm:mr-4 mb-4'>
                            <label htmlFor="status" className="flex items-center mb-1 text-main text-base pl-3">Plano Selecionado</label>
                            <div className='flex'>
                                <select id="status"   {...register('plan')} disabled={isLoading} className="bg-main text-white border border-gray-500 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                                    <option value={''}> -- Selecione um plano -- </option>
                                    {planList?.map((plan) => {
                                        return (
                                            <option value={plan.id}>{plan.name}</option>
                                        )
                                    })}
                                </select>
                                {planList?.length === 0 ? (
                                    <div className='relative ml-1 pt-1'>
                                        <Spinner />
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className='sm:w-80  w-full sm:mr-4 mb-4'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Seu nome completo*</label>
                            <input type="text" disabled={isLoading} {...register('name')} maxLength={40} onChange={(e) => setNameLength(e.target.value.length)} className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="Digite o seu nome completo" required />
                            <div className='text-end'>
                                <span className='text-xs text-gra-900'>{nameLength}/40</span>
                            </div>
                        </div>

                        <div className='sm:w-80  w-full sm:mr-4 mb-4'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Seu e-mail*</label>
                            <input type="email" id="user" disabled={isLoading} {...register('email')} className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="seunome@provedor.com.br" required />
                            {errorEmail ? (
                                <div className='pl-2'>
                                    <span className='text-red-600 text-xs'>Insira um e-mail válido</span>
                                </div>
                            ) : null}
                        </div>

                        <div className='sm:w-80  w-full sm:mr-4 mb-4'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Seu celular (com DDD)*</label>
                            <InputMask id="phone" type="tel" mask='(__) _____-____)' replacement={{ _: /\d/ }} min={11} disabled={isLoading} {...register('phone')} className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="" required />
                        </div>

                        <div className='sm:w-80  w-full sm:mr-4 mb-4'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                CEP*</label>
                            <InputMask mask='_____-___' replacement={{ _: /\d/ }} disabled={isLoading} {...register('postal_code')} className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="00000-000" required />
                            {errorCEP ? (
                                <div className='pl-2'>
                                    <span className='text-red-600 text-xs'>CEP deve conter no mínimo 8 dígitos</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className='p-4'>
                    <div className='text-center mb-4'>
                        <span className='text-main text-xs'>*Nos comprometemos em não utilizar seus dados para SPAM. Você receberá o contato de um consultor Alares, assim como comunicações e novidades exclusivas da marca.</span>
                    </div>

                    <div className='flex justify-center text-center mb-8'>
                        <div className='max-w-[1050px]'>
                            <input type="checkbox" onChange={(e) => setCheck(e.target)} checked={isAccepted} className='mr-2 text-blue-600 bg-gray-100 border-gray-300' />
                            <label className='text-xs text-main'>Concordo em receber informações e ofertas da Alares via Whatsapp e/ou telefone. Para obter mais informações sobre como utilizamos seus dados e seus direitos de privacidade, consulte nossa Política de Privacidade.</label>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button type='submit' className="bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52">
                        Continuar
                    </button>
                </div>
            </form>
        )
    }


    function step2() {

        return (
            <form onSubmit={handleSubmit(validateOrder)} autoComplete="off">
                <div className='flex justify-center mb-14 fade25'>
                    <div className='sm:grid sm:grid-cols-3 gap-4 px-4 mb-4 flex-wrap w-[1100px]'>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                CEP*</label>
                            <input type="text" id="user" disabled={true} {...register('postal_code2')} className="bg-disable border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="00000-000" required />
                        </div>

                        <div className='sm:col-span-2  w-full sm:mr-4 mb-2 relative'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Endereço*</label>
                            <input
                                id="address_ecommerce"
                                type='text'
                                autoComplete="one-time-code"
                                disabled={isLoading}
                                {...register('address')}
                                onChange={(e: any) => openAutoComplete(e.target.value)}
                                onFocus={() => { setIsOpenAddress(true) }}
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                required />


                            <div className={`${isOpenAddress ? 'visible' : 'hidden'} w-full absolute bg-white border border-gray-200 mt-1`}>
                                <div className='max-h-[300px] overflow-auto'>
                                    {addressListFiltered?.map((address) => {
                                        return (
                                            <div onClick={() => setValueAddress(address.address)} className='hover:bg-sub hover:cursor-pointer px-2 py-[1px] border-b border-gray-200'>
                                                <span className='text-sm'>{address.address}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {errorAddress ? (
                                <div className='pl-2'>
                                    <span className='text-red-600 text-xs'>Selecione o endereço correto</span>
                                </div>
                            ) : null}
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Número*</label>
                            <InputMask type="text" mask='__________' replacement={{ _: /\d/ }} min={1} max={10} disabled={isLoading} {...register('number')} onChange={(e) => setNumberLength(e.target.value.length)} className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="" required />
                            <div className='text-end'>
                                <span className='text-xs text-gra-900'>{numberLength}/10</span>
                            </div>
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Complemento</label>
                            <input type="text" {...register('complement')} maxLength={10} onChange={(e) => setComplementLength(e.target.value.length)} className="bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder='Casa, apto xxx, etc' />
                            <div className='text-end'>
                                <span className='text-xs text-gra-900'>{complementLength}/10</span>
                            </div>
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Bairro</label>
                            <input type="text" disabled={true} {...register('neighborhood')} className="bg-disable border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" required />
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Cidade</label>
                            <input type="text" disabled={true} {...register('city')} className="bg-disable border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" required />
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                Estado</label>
                            <input type="text" disabled={true} {...register('state')} className="bg-main text-white border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" required />
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label className="flex items-center mb-1 text-main text-base pl-3">
                                CPF</label>
                            <InputMask mask="___.___.___-__" replacement={{ _: /\d/ }} type="text" {...register('cpf')} className="bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder='000.000.000-00' required />

                            {errorCPF ? (
                                <div className='pl-2'>
                                    <span className='text-red-600 text-xs font-semibold'>CPF inválido</span>
                                </div>
                            ) : null}
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label htmlFor="birthday" className="flex items-center mb-1 text-main text-base pl-3">
                                Data de Nascimento</label>
                            <InputMask mask="__/__/____" replacement={{ _: /\d/ }} type="text" {...register('birthday')} className="bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder='dd/mm/aaaa' required />
                        </div>

                        <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
                            <label htmlFor="mother" className="flex items-center mb-1 text-main text-base pl-3">
                                Nome da mãe</label>
                            <input type="text" id="mother" autoComplete='mother' {...register('motherName')} maxLength={40} onChange={(e) => setMotherNameLength(e.target.value.length)} className="bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2" required />
                            <div className='text-end'>
                                <span className='text-xs text-gra-900'>{motherNameLength}/40</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='flex justify-center'>
                    <button type='submit' className="bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52">
                        Continuar
                    </button>
                </div>
            </form>
        )
    }

    function step3() {
        return (
            <div className='fade25'>
                <div id='avisoAceite' className='bg-slate-500 w-screen fixed top-0 hidden justify-center items-center px-2 transition-opacity ease-in-out delay-150 duration-300 opacity-0'>
                    <GoAlertFill size={25} color='white' />
                    <b className='text-white py-3 px-2 sm:text-base text-xs'>Para continuar é necessário aceitar os termos e condições</b>
                </div>
                <div className='text-center'>
                    <span className='sm:text-5xl text-2xl font-medium text-main'>Resumo do pedido</span><br /><br />
                </div>

                <div className='lg:flex justify-center mb-6'>
                    <div className='sm: mr-4'>
                        <div className='text-center mb-4'>
                            <span className='text-main font-medium'>Plano Selecionado</span>
                        </div>

                        <div className='flex justify-center mb-8'>
                            <div className='rounded-xl p-4 bg-main w-[270px] border border-secondary'>
                                <div className='text-center'>
                                    <span className='text-white text-4xl'>{getPlanDetail('title')}</span>
                                </div>
                                <div className='text-center mb-4'>
                                    <span className='text-sub text-xl'>{getPlanDetail('subtitle')}</span>
                                </div>

                                <div className='mb-4'>
                                    {contentPlan?.map((content) => {
                                        return (
                                            <div className='text-center text-white mb-2 text-sm'>
                                                <span>{content.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className='mb-6'>
                                    <div className='text-center text-white mb-2 text-sm'>
                                        <span>Apps de conteúdo:</span>
                                    </div>
                                    <div className='mb-2 flex flex-wrap justify-center'>
                                        {servicePlan?.map((service) => {
                                            return (
                                                <div className='bg-white mr-2 w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                                                    <img src={service.icon} alt={service.name} title={service.name} className='object-contain rounded-full' />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className='mb-2'>
                                    <div className='flex justify-center text-white text-sm'>
                                        <div className='flex'>
                                            <div>
                                                <span className='text-sub text-2xl'>R$</span>
                                            </div>
                                            <div>
                                                <span className='text-sub text-4xl font-medium'>{getPlanDetail('price')}</span>
                                                <span className='text-sub text-sm'>/mês</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <span className='text-sub text-xs'>na conta digital</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='sm:mr-4'>
                        <div className='text-center mb-4'>
                            <span className='text-main font-medium'>Dados do contratante</span>
                        </div>

                        <div className='flex justify-center p-1 mb-8'>
                            <div className=' border border-gray-500 rounded-xl p-6 min-w-[300px]'>
                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Seu nome</span><br />
                                    <span className='text-sm'>{getValues('name')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Seu email</span><br />
                                    <span className='text-sm'>{getValues('email')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Seu celular (com DDD)</span><br />
                                    <span className='text-sm'>{getValues('phone')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>CPF</span><br />
                                    <span className='text-sm'>{getValues('cpf')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Data de Nascimento</span><br />
                                    <span className='text-sm'>{getValues('birthday')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Nome da mãe</span><br />
                                    <span className='text-sm'>{getValues('motherName')}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='text-center mb-4'>
                            <span className='text-main font-medium'>Informações sobre endereço</span>
                        </div>

                        <div className='flex justify-center p-1'>
                            <div className=' border border-gray-500 rounded-xl p-6 w-[300px]'>
                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Endereço</span><br />
                                    <span className='text-sm'>{getValues('address')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Número</span><br />
                                    <span className='text-sm'>{getValues('number')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Complemento</span><br />
                                    <span className='text-sm'>{getValues('complement')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>CPF</span><br />
                                    <span className='text-sm'>{getValues('cpf')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>CEP</span><br />
                                    <span className='text-sm'>{getValues('postal_code')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Bairro</span><br />
                                    <span className='text-sm'>{getValues('neighborhood')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Cidade</span><br />
                                    <span className='text-sm'>{getValues('city')}</span>
                                </div>

                                <div className='mb-2'>
                                    <span className='text-sm text-main'>Estado</span><br />
                                    <span className='text-sm'>{getValues('state')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center mb-4 justify-center md:max-w-max max-w-96 mx-auto" onClick={() => clickCheckBox()}>
                    <input id="terms-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked />
                    <div className='text-sm font-medium text-gray-900 dark:text-gray-300'>
                        <label htmlFor="terms-checkbox" className="ms-2">Eu aceito os </label><Modal buttonText={'termos e condições'} title={'Termos e condições'} text={termText} /> <span> para seguir com a contratação do serviço resumido acima</span>
                    </div>
                </div>



                <div className='flex justify-center'>
                    <button id='button-confirm-resume' onClick={() => createOrder()} className="bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52" disabled={false} >
                        Continuar
                    </button>
                </div>
            </div>
        )
    }

    function step4() {
        return (
            <div className='p-4 fade25'>
                <div className='mb-6'>
                    <div className='text-center'>
                        <span className='sm:text-4xl text-2xl font-medium text-main'>Agendamento</span><br /><br />
                    </div>
                    <div className='text-center'>
                        <span className='text-sm text-gray-500'>Recebemos seu pedido! <br /> Agora precisamos que confirme a data e horário para instalação. </span>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='bg-[#F1F1FA] p-8 rounded-br-xl w-[400px]'>
                        <div className='text-center mb-4'>
                            <span className='font-medium'>Informações de Agendamento</span>
                        </div>

                        <div className='flex items-center justify-center mb-4'>
                            <FaCalendarAlt className='mr-4 scale-150 text-main' />
                            <select name="" id="" className='rounded-r-full w-[270px]' onChange={(e) => selectDate(e.target.value)}>
                                <option value="">-- Selecione uma data --</option>
                                {schedule?.map((s) => {
                                    return (
                                        <option value={s.date}>{dateConvert(s.date)}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className='flex items-center justify-center mb-5'>
                            <TbClockHour5 className='mr-4 scale-150 text-main' />
                            <select name="" id="" className='rounded-r-full w-[270px]' disabled={periodList.length === 0} onChange={(e) => selectPeriod(e.target.value)}>
                                <option value="">-- Selecione uma periodo --</option>
                                {periodList?.map((p) => {
                                    return (
                                        <option value={p}>{p}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className='flex justify-center'>
                            <button onClick={() => createContract()} className="bg-blue-700 hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full">
                                Confirmar Agendamento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function errorMajor() {
        return (
            <div className='fade25'>
                <div className='flex justify-center mb-6'>
                    <Image src={errorIcon} alt={''} />
                </div>
                <div className='flex justify-center mb-8'>
                    <div className='text-center max-w-[700px]'>
                        <span className='text-3xl text-main font-medium'>Houve um erro inesperado</span><br /><br />
                        <span>Desculpe-nos, entre em contato com um de nossos vendedores para prosseguir com a compra</span>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() => openWhatsapp('')} className='rounded-full bg-main text-white px-4 py-2 hover:bg-hover'>
                        Falar com um vendedor
                    </button>
                </div>
            </div>
        )
    }

    function errorBack() {
        return (
            <div className='flex justify-center items-center fade25'>
                <div className='max-w-[300px]'>
                    <div className='text-center mb-4'>
                        <span className='text-main text-2xl font-medium'>Oh, não!</span>
                    </div>
                    <div className='text-center mb-4'>
                        <span>Não foi dessa vez. Ainda não temos cobertura na região informada. Estamos sempre expandindo nossa rede de Fibra Óptica e esperamos poder te atender no futuro.</span>
                    </div>
                    <div className='flex justify-center'>
                        <Image src={fail} alt={''} />
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={() => { window.location.reload() }} className='w-[200px] bg-blue-700 py-2 px-8 text-white rounded-full'>
                            Voltar ao início
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    function error1() {
        return (
            <div className='fade25'>
                <div className='flex justify-center mb-6'>
                    <Image src={errorIcon} alt={''} />
                </div>
                <div className='flex justify-center mb-8'>
                    <div className='text-center max-w-[700px]'>
                        <span className='text-3xl text-main font-medium'>Endereço não encontrado.</span><br /><br />
                        <span>Desculpe-nos, não conseguimos localizar o seu CEP, mas não se preocupe: utilize o link abaixo e entre em contato com um de nossos vendedores</span>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() => openWhatsapp('')} className='rounded-full bg-main text-white px-4 py-2 hover:bg-hover'>
                        Falar com um vendedor
                    </button>
                </div>
            </div>
        )
    }

    function dateConvert(date: string) {

        // Dividindo a data em ano, mês e dia
        var partesData = date.split("-");
        var ano = partesData[0];
        var mes = partesData[1];
        var dia = partesData[2];

        // Formatando a data no formato "DD/MM/YYYY"
        var final = dia + "/" + mes + "/" + ano;

        return final;
    }

    function selectDate(value: any) {
        setSelectedDate(value);
        const period = schedule.find(s => s.date === value).period;
        setPeriodList(period);
    }

    function selectPeriod(value: any) {
        setSelectedPeriod(value);
    }

    function clickCheckBox() {
        const button = document.querySelector('#button-confirm-resume') as HTMLInputElement;
        const checkbox = document.querySelector('#terms-checkbox') as HTMLInputElement;
        const aviso = document.querySelector('#avisoAceite') as HTMLElement;
        let newButton = button.cloneNode(true) as HTMLInputElement;

        if (checkbox.checked) {
            if (!button) return
            button.parentNode?.replaceChild(newButton, button)
            newButton.classList.value = 'bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52'
            newButton.disabled = false
            aviso.classList.value = 'bg-slate-500 w-screen fixed top-0 hidden justify-center items-center px-2 transition-opacity ease-in-out delay-150 duration-300 opacity-0'
            newButton.addEventListener('click', () => createOrder());

            return
        }

        if (!checkbox.checked) {
            if (!button) return
            button.parentNode?.replaceChild(newButton, button)
            newButton.classList.value = 'bg-slate-300 disabled:opacity-75 text-white py-2 px-4 rounded-full w-52'
            newButton.disabled = true
            aviso.classList.value = 'bg-slate-500 w-screen fixed top-0 flex justify-center items-center px-2 transition-opacity ease-in-out delay-150 duration-300 opacity-100'
            return
        }
    }

    function discheck() {
        const checkbox = document.querySelector('#terms-checkbox') as HTMLInputElement;
        checkbox.checked = false;
    }
}
