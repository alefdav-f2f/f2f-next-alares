"use client"

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputMask } from '@react-input/mask'
import RegexService from '@/app/services/validations/regex.service'
import toast from 'react-hot-toast'
import Loading from './loadings/Loading'
import Image from 'next/image'
import undrawPersonalText from "@/img/modal/undraw_personal_text.svg";

interface ContactFormProps {
    onSubmit: (data: ContactFormData) => void
    onClose?: () => void
    isClosing?: boolean
    modalSource?: 'geolocation' | 'manual' | null
}

interface ContactFormData {
    name: string
    email: string
    phone: string
    cep: string
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onClose, isClosing = false, modalSource = null }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>()
    const [isLoading, setLoading] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (!isClosing) {
            setIsAnimating(true)
        } else {
            setIsAnimating(false)
        }
    }, [isClosing])

    const handleFormSubmit = async (data: ContactFormData) => {
        try {
            if (RegexService.singleWord(data.name)) {
                toast.error('Insira um nome válido')
                return
            }

            if (!RegexService.validationEmail(data.email)) {
                toast.error('Insira um e-mail válido')
                return
            }

            if (RegexService.countNumbers(data.phone) < 10) {
                toast.error('Insira um número de telefone válido')
                return
            }

            if (!RegexService.validationCEP(data.cep)) {
                toast.error('CEP deve conter no mínimo 8 dígitos')
                return
            }

            setLoading(true)
            await onSubmit(data)
            toast.success('Dados enviados com sucesso!')
        } catch (error) {
            toast.error('Erro ao enviar dados. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div 
                className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                onClick={onClose}
            />
            <div 
                className={`bg-[#F1F1FA] rounded-lg shadow-xl max-w-2xl w-full mx-4 transform transition-all duration-300 ease-out ${
                    isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
            >
                <div className="flex justify-end p-2">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="w-full max-w-2xl mx-auto px-4 py-0 sm:px-6 sm:py-6">
                    <div className="hidden sm:flex justify-center ">
                        <Image src={undrawPersonalText} alt="Ilustração" width={180} height={126} />
                    </div>
                    <div className="flex sm:hidden justify-center ">
                        <Image src={undrawPersonalText} alt="Ilustração" width={100} height={80} />
                    </div>
                    <div className="text-center mb-2 sm:mb-8">
                        <h2 className="text-[18px] sm:text-[32px] text-[#3C34F2] font-bold">
                            {modalSource === 'geolocation' 
                                ? "Cidade não localizada" 
                                : "Não encontrou sua cidade?"}
                        </h2>
                        <p className="text-gray-600 text-[12px] sm:text-[16px]">
                            {modalSource === 'geolocation'
                                ? "Ainda não temos cobertura na sua região. Deixe seu contato e avisaremos quando a Alares chegar por aí!"
                                : "Não se preocupe, entraremos em contato quando a Alares chegar por aí!"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block sm:mb-2 text-sm font-medium text-gray-900">
                                    Seu nome
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-[50px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Digite seu nome"
                                />
                                {errors.name && <span className="text-red-500 text-xs mt-1">Nome é obrigatório</span>}
                            </div>

                            <div>
                                <label className="block sm:mb-2 text-sm font-medium text-gray-900">
                                    Seu e-mail
                                </label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-[50px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Digite seu e-mail"
                                />
                                {errors.email && <span className="text-red-500 text-xs mt-1">E-mail é obrigatório</span>}
                            </div>

                            <div>
                                <label className="block sm:mb-2 text-sm font-medium text-gray-900">
                                    Seu Telefone
                                </label>
                                <InputMask
                                    mask="(__)_____-____"
                                    replacement="_"
                                    {...register('phone', { required: true })}
                                    onKeyPress={(e) => {
                                        const charCode = e.which ? e.which : e.keyCode;
                                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-[50px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="(00) 00000-0000"
                                />
                                {errors.phone && errors.phone.type === 'pattern' && 
                                    <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                            </div>

                            <div>
                                <label className="block sm:mb-2 text-sm font-medium text-gray-900">
                                    Seu CEP
                                </label>
                                <InputMask
                                    mask="_____-___"
                                    replacement="_"
                                    {...register('cep', { required: true })}
                                    onKeyPress={(e) => {
                                        const charCode = e.which ? e.which : e.keyCode;
                                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-[50px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="00000-000"
                                />
                                {errors.cep && <span className="text-red-500 text-xs mt-1">CEP é obrigatório</span>}
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="text-white bg-[#3C34F2] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 w-full"
                            >
                                {isLoading ? <Loading /> : 'Enviar'}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Ao enviar seus dados, você aceitará receber novidades sobre planos
                            Alares, disponíveis na sua região.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactForm 