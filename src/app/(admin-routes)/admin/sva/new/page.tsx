'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { BsCardChecklist } from 'react-icons/bs';
import Divider from '@/app/components/Divider';
import { SVATypes } from '@/app/types/SVA';


interface StepProps {
    title: string
    image: string
    description: string
    order: number
}

export default function SvaForm({ svaId }: any) {

    const [isEditing, setEditing] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const { register, handleSubmit, setValue, control } = useForm();
    const router = useRouter();
    const [isReceiving, setReceive] = React.useState(true);
    const [imageLogo, setImageLogo] = React.useState('');
    const [imageBanner, setImageBanner] = React.useState('');
    const [imageBannerMobile, setImageBannerMobile] = React.useState('');
    const [imageBannerText, setImageBannerText] = React.useState('');
    const [imagePresentation, setImagePresentation] = React.useState('');
    const [stepList, setStep] = React.useState<any[]>([]);
    const [questionList, setQuestionList] = React.useState<any[]>([]);
    const [contentId, setContent] = React.useState(null);

    async function storeSVA(svaData: any) {

        if (svaData.type === "") {
            toast.error('Selecione o tipo SVA')
            return
        }

        setLoading(true);

        let response: any;

        try {

            const data: any = {
                id: svaId,
                name: svaData?.name,
                image: svaData?.logo,
                type: Number(svaData?.type),
                description: svaData?.description,
                isActive: svaData?.isActive === "true" ? true : false,
                external_id: svaData.external_id,
                price: Number(svaData?.price),
                included: svaData?.included === "true" ? true : false,
                svaContent: {
                    banner: svaData.banner,
                    bannerMobile: svaData?.bannerMobile,
                    bannerText: svaData?.bannerText,
                    image: svaData?.mainImage,
                    description: svaData?.mainDescription
                },
                svaSteps: stepList,
                svaQuestions: questionList
            }


            if (isEditing) {
                data.svaContent.id = contentId
                response = await axiosInterceptorInstance.patch('/sva/update', data)
            } else {
                response = await axiosInterceptorInstance.post('/sva/create', data)
            }

            router.push('/admin/sva')
            toast.success('SVA ' + (isEditing ? 'atualizado' : 'criado') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getSVA(id: string) {

        setReceive(true);

        const request: any = await axiosInterceptorInstance.get(`/sva/detail/${id}`)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            setValue('description', response?.description)
            setValue('logo', response?.image)
            setImageLogo(response?.image)
            setValue('isActive', response?.isActive === true ? "true" : "false")
            setValue('name', response?.name)
            setValue('type', response?.type)
            setValue('external_id', response?.external_id)
            setValue('price', response?.price)
            setValue('included', response?.included)

            setContent(response?.content?.id)
            setValue('banner', response?.content?.banner)
            setImageBanner(response?.content?.banner)
            setValue('bannerMobile', response?.content?.bannerMobile)
            setImageBannerMobile(response?.content?.bannerMobile)
            setValue('bannerText', response?.content?.bannerText)
            setImageBannerText(response?.content?.bannerText)
            setValue('mainImage', response?.content?.image)
            setImagePresentation(response?.content?.image)
            setValue('mainDescription', response?.content?.description)

            const steps = response?.steps;
            const questions = response?.questions;

            setStep(steps)
            setQuestionList(questions)
            setReceive(false);
        }

    }

    async function setValueLogo(event: any) {
        const value = event?.target?.value
        setImageLogo(value)
    }

    async function setValueBanner(event: any) {
        const value = event?.target?.value
        setImageBanner(value)
    }

    async function setValueBannerMobile(event: any) {
        const value = event?.target?.value
        setImageBannerMobile(value)
    }


    async function addStep() {

        const data: StepProps = {
            title: '',
            image: '',
            description: '',
            order: stepList.length + 1
        }

        setStep([...stepList, data])
    }

    function addQuestion() {

        const data: any = {
            question: '',
            answer: '',
            order: questionList?.length + 1
        }

        setQuestionList([...questionList, data])
    }

    async function removeStep() {
        setStep([])
    }

    async function findImage() {
        const array = [...stepList];
        setStep(array)
    }

    React.useEffect(() => {

        if (svaId) {
            setEditing(true)
            getSVA(svaId)
        } else {
            setReceive(false);
        }
    }, [])

    if (isReceiving) {
        return (
            <div className='h-[500px] flex items-center justify-center'>
                <LoadingAlares />
            </div>
        )
    } else {
        return (
            <>
                <div className='p-4'>
                    <div className='mb-6 flex justify-between items-center'>
                        <TitlePage icon={<BsCardChecklist />} title={isEditing ? 'Atualizar SVA' : 'Novo SVA'} />
                        <button onClick={() => router.push('/admin/sva')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(storeSVA)} className='pl-4'>

                        <div className='grid gap-4 grid-cols-4 mb-4'>
                            <div className="col-span-2">
                                <div>
                                    <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Nome do SVA</label>
                                    <input type="text" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <div>
                                    <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                    <select id="states"  {...register('isActive')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <div>
                                    <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        External ID</label>
                                    <input type="text" disabled={isLoading} {...register('external_id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center mb-4'>
                            <div className='mr-2'>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Incluso</label>
                                    <select  {...register('included')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex">
                                <div>
                                    <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Preço do SVA</label>
                                    <div className='flex'>
                                        <div className='pt-2 mr-1'>
                                        <span>R$</span>
                                        </div>

                                        <input type="number" step="0.01" disabled={isLoading} {...register('price')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className="lg:w-[400px] w-full">
                                <div>
                                    <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Tipo</label>
                                    <select id="states"  {...register('type')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="">-- Selecione o tipo --</option>
                                        {SVATypes.map((sva: any) => {
                                            return (
                                                <option value={sva.value}>{sva.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-2 mb-2'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    URL Logomarca SVA</label>
                                <input id="images" type="text" disabled={isLoading} {...register('logo')} onChange={() => setValueLogo(event)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>

                            <div className='col-span-2'>
                                <img src={imageLogo} alt="" className=' max-h-[100px] rounded-sm' />
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-3'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Descrição do SVA</label>
                                <textarea disabled={isLoading} {...register('description')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-[100px]" placeholder="" required />
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-2 mb-2'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    URL Imagem de apresentação</label>
                                <input id="images" type="text" disabled={isLoading} {...register('mainImage')} onChange={(e) => { setImagePresentation(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>

                            <div className='col-span-2'>
                                <img src={imagePresentation} alt="" className=' max-h-[100px] rounded-sm' />
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-3'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Descrição da apresentação</label>
                                <textarea disabled={isLoading} {...register('mainDescription')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-[100px]" placeholder="" required />
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-2 mb-2'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    URL Banner SVA</label>
                                <input id="images" type="text" disabled={isLoading} {...register('banner')} onChange={() => setValueBanner(event)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>

                            <div className='col-span-2'>
                                <img src={imageBanner} alt="" className=' max-h-[100px] rounded-sm' />
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-2 mb-2'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    URL Banner Mobile SVA</label>
                                <input id="images" type="text" disabled={isLoading} {...register('bannerMobile')} onChange={() => setValueBannerMobile(event)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>

                            <div className='col-span-2'>
                                <img src={imageBannerMobile} alt="" className=' max-h-[100px] rounded-sm' />
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-2 mb-2'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    URL Banner com Texto</label>
                                <input id="images" type="text" disabled={isLoading} {...register('bannerText')} onChange={(e) => { setImageBannerText(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>

                            <div className='col-span-2 flex items-center'>
                                <img src={imageBannerText} alt="" className=' max-h-[100px] rounded-sm' />
                            </div>
                        </div>

                        <div className='mb-6'>
                            <Divider text="Passo a passo" color="text-gray-500" background="bg-gray-400" />
                        </div>

                        <div className='pl-4'>
                            {stepList?.map((step: any, index) => (
                                <>
                                    <div key={index}>
                                        <div className='mb-2 flex'>
                                            <div className='mr-6'>
                                                <span className='text-sm font-bold '>Passo {step.order}</span>
                                            </div>
                                            {/* <div onClick={() => { }}>
                                                <span className='text-xs text-gray-500 hover:underline hover:cursor-pointer'>Remover</span>
                                            </div> */}
                                        </div>
                                        <div className='grid grid-cols-2'>
                                            <div className="mb-4 col-span-1">
                                                <div>
                                                    <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                        Nome da etapa</label>
                                                    <input type="text" defaultValue={step.title} onChange={(e) => { stepList[index].title = e.target.value }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid gap-4 grid-cols-4">
                                            <div className='col-span-2 mb-2'>
                                                <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                    URL imagem</label>
                                                <input defaultValue={step.image} onChange={(e) => { stepList[index].image = e.target.value; findImage() }} disabled={isLoading} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                                            </div>

                                            <div className='col-span-2'>
                                                <img src={step.image} alt="" className=' max-h-[100px] rounded-sm' />
                                            </div>

                                            <div className="mb-4 col-span-2">
                                                <div>
                                                    <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                        Descrição</label>
                                                    <textarea defaultValue={step.description} onChange={(e) => { stepList[index].description = e.target.value }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-[100px]" placeholder="" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>


                        <div className='mb-6'>
                            <div className='flex items-center justify-center'>
                                <button type="button" onClick={() => addStep()} disabled={isLoading} className="mr-4 text-gray-700 border-slate-500 border hover:bg-gray-200 focus:ring-4 hover:text-black focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Adicionar passo
                                </button>
                                {stepList.length > 0 ? (
                                    <button type="button" onClick={() => removeStep()} disabled={isLoading} className="text-gray-700 hover:bg-gray-200 focus:ring-4 hover:text-black focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                        Reiniciar
                                    </button>
                                ) : null}
                            </div>
                        </div>

                        <div className='mb-8'>
                            <div className='mb-6'>
                                <Divider text="Tire aqui suas dúvidas" color="text-gray-500" background="bg-gray-400" />
                            </div>

                            {questionList?.map((question: any, index: number) => {
                                return (
                                    <div key={index} className=''>
                                        <div className="mb-4 flex items-center">
                                            <div>
                                                <label className="font-bold flex items-center mb-2 text-sm text-gray-900">
                                                    Pergunta Nº </label>
                                                <input type="number" defaultValue={question.order} onChange={(e) => { questionList[index].order = e.target.value }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div>
                                                <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                    Pergunta </label>
                                                <textarea defaultValue={question.question} onChange={(e) => { questionList[index].question = e.target.value }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div>
                                                <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                    Resposta </label>
                                                <textarea rows={5} defaultValue={question.answer} onChange={(e) => { questionList[index].answer = e.target.value }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-[100px]" placeholder="" required />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className='flex justify-center'>
                                <button type="button" onClick={() => addQuestion()} disabled={isLoading} className="mr-4 text-gray-700 border-slate-500 border hover:bg-gray-200 focus:ring-4 hover:text-black focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Adicionar pergunta
                                </button>
                            </div>
                        </div>

                        <div className='flex'>
                            <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                {isLoading ? <Loading /> : (isEditing ? 'Atualizar' : 'Criar')}
                            </button>
                        </div>

                    </form>
                </div>
            </>
        )
    }
}
