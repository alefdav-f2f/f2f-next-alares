'use client';
import React, { Suspense, useState } from 'react';
import LoadingAlares from '../components/loadings/LoadingAlares';
import Image from 'next/image';
import house from '@/img/house-biometry.png';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import RegexService from '@/app/services/validations/regex.service';
import EcommerceService from '@/app/services/api/ecommerce.service';
import DataLayerService from '@/app/services/api/datalayer.service';
import Spinner from '@/app/components/Spinner';
import { InputMask } from '@react-input/mask';
import congrats from '@/img/icon/undraw_Powerful_re_frhr.png';
import { getClientIP, openWhatsapp } from '@/app/services/navigation-service';
import errorIcon from '@/img/icon/err-end.svg';
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import { GoAlertFill } from 'react-icons/go';
import { IoInformationCircleOutline } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import fail from '@/img/cep-fail.png';
import Modal from '@/app/components/Modal';
import PlanService from '@/app/services/api/plan.service';
import {
  FaCalendarAlt,
  FaRegTrashAlt,
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';
import { TbClockHour5 } from 'react-icons/tb';
import { FaLocationDot } from 'react-icons/fa6';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import { IoMdClose } from 'react-icons/io';
import { CiSquareRemove } from "react-icons/ci";
import CardContrate from '../components/cards/CardContrate';
import {
  RiCoupon3Fill,
  RiInformationFill,
} from 'react-icons/ri';
import Loading from '../components/loadings/Loading';
import ModalPlans from '../components/ModalPlans';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface props {
  template: number;
}

export default function EcommerceMainPage({ template }: props) {
  // Variáveis globais do ecommerce
  const router = useRouter(); //Controle de roteamento
  const pathname = usePathname(); //Controle de roteamento
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(false); //Para controlar o loading da tela
  const [step, setStep] = useState(10); //Para controlar o step do ecommerce
  const { register, handleSubmit, setValue, getValues } = useForm(); //Biblioteca de controlde de formulário
  const city_id = getCookie('city_id'); //ID da cidade via cookie
  const [client_ip, setClient_IP] = useState(''); //IP do cliente

  const [servicePlan, setServicePlan] = useState<any[]>([]); //Serviços do plano selecionado
  const [selectedPlan, setSelectedPlan] = useState(''); //Plano selecionado
  const [contentPlan, setContentPlan] = useState<any[]>([]); //Conteúdo do plano selecionado
  const [planList, setPlan] = useState<any[]>([]); //Lista de planos

  const [coupon_active, setCouponActive] = useState<boolean>(false); //Status de exibição do input de cupom
  const [birthDateCheck, setBirthDateCheck] = useState<boolean>(false); //Status de verificação da data de nascimento
  const [coupon_id, setCouponID] = useState<string | boolean>(false); //Plano selecionado
  const [couponType, setCouponType] = useState(''); //Tipos: SVA e Value
  const [coupon, setCoupon] = useState(''); //Cupom Inserido
  const [couponData, setCouponData] = useState<any>({}); //Dados do cupom
  const [isLoadingCoupon, setLoadingCoupon] = useState(false); //Para controlar o loading do input de cupom

  /////////////////////////////

  // Variáveis step 1
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorCEP, setErrorCEP] = useState(false);
  const [nameLength, setNameLength] = useState(0);
  const [addressList, setAddress] = useState<any[]>([]); //Lista de endereços
  const [addressListFiltered, setAddressFiltered] = useState<any[]>([]); //Endereços filtrador
  const [isAccepted, setAccept] = useState(true);

  // Variáveis step 2
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorCPF, setErrorCPF] = useState(false);
  const [errorBirthdate, setErrorBirthdate] = useState(false);
  const [motherNameLength, setMotherNameLength] = useState(0);
  const [complementLength, setComplementLength] = useState(0);
  const [numberLength, setNumberLength] = useState(0);
  const [addressID, setAddressID] = useState('');
  const [term, setTerm] = useState('');
  const [termText, setTermText] = useState('');

  // Variáveis step 3
  const [schedule, setSchedule] = useState<any[]>([]);
  const [order_id, setOrderId] = useState('');

  // Variáveis step 3 - SVA avulso
  const [showPlan, setShowPlan] = useState(false);
  const [showSVA, setShowSVA] = useState(false);
  const [svaList, setSVAList] = useState<any[]>([]);
  const [svaType, setSvaType] = useState('');
  const [svaTypeList, setSvaTypeList] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Vairáveis step 4
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [periodList, setPeriodList] = useState<any[]>([]);

  React.useEffect(() => {
    getTotalPrice();
  }, [servicePlan, coupon_id]);

  React.useEffect(() => {
    getPlan();
    getIP();
    checkActivationFeature();
  }, []);

  return (
    <div id='initial_scroll' className='pb-10 sm:pt-10'>
      <nav className='hidden sm:block h-[90px] sm:h-[160px] max-w-screen absolute top-0 right-0'>
        <div className='flex justify-end items-center sm:relative h-[90px] w-[100%]'>
          <div className='flex items-center justify-end xl:justify-center sm:w-[1200px] w-full px-5'>
            <div className='hidden lg:flex pt-10 mb-10'>
              <div>
                <div className='flex mb-2'>
                  <div>
                    <div
                      className={
                        step >= 10
                          ? 'text-center text-sub text-xs'
                          : 'text-center text-white text-xs'
                      }
                    >
                      <span>Dados do contrato</span>
                    </div>
                    <div className='flex items-center'>
                      <div
                        className={
                          step >= 10
                            ? 'w-3 h-3 rounded-full bg-sub'
                            : 'w-3 h-3 rounded-full bg-white'
                        }
                      ></div>
                      <div
                        className={
                          step >= 10
                            ? 'w-44 h-0.5 bg-sub ml-[-5px]'
                            : 'w-44 h-0.5 bg-white ml-[-5px]'
                        }
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div
                      className={
                        step >= 20
                          ? 'text-center text-sub text-xs'
                          : 'text-center text-white text-xs'
                      }
                    >
                      <span>Dados complementares</span>
                    </div>
                    <div className='flex items-center'>
                      <div
                        className={
                          step >= 20
                            ? 'w-3 h-3 rounded-full bg-sub'
                            : 'w-3 h-3 rounded-full bg-white'
                        }
                      ></div>
                      <div
                        className={
                          step >= 20
                            ? 'w-44 h-0.5 bg-sub ml-[-5px]'
                            : 'w-44 h-0.5 bg-white ml-[-5px]'
                        }
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div
                      className={
                        step >= 30
                          ? 'text-center text-sub text-xs'
                          : 'text-center text-white text-xs'
                      }
                    >
                      <span>Resumo do Pedido</span>
                    </div>
                    <div className='flex items-center'>
                      <div
                        className={
                          step >= 30
                            ? 'w-3 h-3 rounded-full bg-sub'
                            : 'w-3 h-3 rounded-full bg-white'
                        }
                      ></div>
                      <div
                        className={
                          step >= 30
                            ? 'w-44 h-0.5 bg-sub ml-[-5px]'
                            : 'w-44 h-0.5 bg-white ml-[-5px]'
                        }
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div
                      className={
                        step >= 50
                          ? 'text-center text-sub text-xs'
                          : 'text-center text-white text-xs'
                      }
                    >
                      <span>Agendamento</span>
                    </div>
                    <div className='flex items-center'>
                      <div
                        className={
                          step >= 50
                            ? 'w-3 h-3 rounded-full bg-sub'
                            : 'w-3 h-3 rounded-full bg-white'
                        }
                      ></div>
                      <div
                        className={
                          step >= 50
                            ? 'w-44 h-0.5 bg-sub ml-[-5px]'
                            : 'w-44 h-0.5 bg-white ml-[-5px]'
                        }
                      ></div>
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
              <div
                className={`w-4 h-4 rounded-full ${
                  step >= 10 ? 'bg-sub border-[2px] border-main' : 'bg-main'
                }`}
              ></div>
              <div
                className={`w-16 h-1 ml-[-5px] ${
                  step >= 10 ? 'bg-sub' : 'bg-main'
                }`}
              ></div>
            </div>
            <div className='flex items-center'>
              <div
                className={`w-4 h-4 rounded-full ${
                  step >= 20 ? 'bg-sub border-[2px] border-main' : 'bg-main'
                }`}
              ></div>
              <div
                className={`w-16 h-1 ml-[-5px] ${
                  step >= 20 ? 'bg-sub' : 'bg-main'
                }`}
              ></div>
            </div>
            <div className='flex items-center'>
              <div
                className={`w-4 h-4 rounded-full ${
                  step >= 30 ? 'bg-sub border-[2px] border-main' : 'bg-main'
                }`}
              ></div>
              <div
                className={`w-16 h-1 ml-[-5px] ${
                  step >= 30 ? 'bg-sub' : 'bg-main'
                }`}
              ></div>
            </div>
            <div className='flex items-center'>
              <div
                className={`w-4 h-4 rounded-full ${
                  step >= 40 ? 'bg-sub border-[2px] border-main' : 'bg-main'
                }`}
              ></div>
              <div
                className={`w-16 h-1 ml-[-5px] ${
                  step >= 40 ? 'bg-sub' : 'bg-main'
                }`}
              ></div>
            </div>
          </div>

          {/* Controlador de steps - Container principal */}
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
          <span className='sm:text-5xl text-2xl font-bold text-main'>
            Contrate já
          </span>
          <br />
          <br />
          {step === 1 ? (
            <>
              <span className='text-main sm:text-base text-sm'>
                Obrigado pelo seu interesse.
              </span>
              <br />
              <span className='text-main sm:text-base text-sm'>
                Para iniciar seu pedido, é só preencher suas informações. É
                rapidinho!
              </span>
            </>
          ) : null}
        </div>
      ) : null}

      {isLoading ? (
        <div className='min-h-screen'>
          <div className='flex items-center justify-center'>
            <LoadingAlares color='purple' />
          </div>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className='h-[500px] flex justify-center items-center'>
              <LoadingAlares color='purple' />
            </div>
          }
        >
          <div className='min-h-[700px]'>
            {step === 10 && template === 1 ? step01() : null}
            {step === 10 && template === 2 ? step01Card() : null}
            {step === 10 && template === 3 ? step01() : null}
            {step === 11 ? error1() : null}
            {step === 20 ? step02() : null}
            {step === 21 ? errorMajor() : null}
            {step === 30 && template === 1 ? step03() : null}
            {step === 30 && template === 2 ? step03() : null}
            {step === 30 && template === 3 ? step03SVA() : null}
            {step === 50 ? step04() : null}
            {step === 100 ? houseLoader() : null}
            {step === 200 ? stepSuccess() : null}

            {step === 51 ? errorBack() : null}
            {step === 0 ? errorMajor() : null}
          </div>
        </Suspense>
      )}
    </div>
  );

  //////////////////////////////////////////

  // Step 01
  function step01() {
    return (
      <form onSubmit={handleSubmit(checkAddress)}>
        <div className='flex justify-center mb-8 fade25'>
          <div className='flex justify-start px-4 mb-4 flex-wrap max-w-[1050px]'>
            <div className='sm:w-80 w-full sm:mr-4 mb-4'>
              <label
                htmlFor='status'
                className='flex items-center mb-1 text-main text-base pl-3'
              >
                Plano Selecionado
              </label>
              <div className='flex'>
                <select
                  id='status'
                  {...register('plan')}
                  disabled={isLoading}
                  className='bg-main text-white border border-gray-500 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                >
                  <option value={''}> -- Selecione um plano -- </option>
                  {planList?.map((plan) => {
                    return <option value={plan.id}>{plan.name}</option>;
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
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Seu nome completo*
              </label>
              <input
                type='text'
                disabled={isLoading}
                {...register('name')}
                maxLength={40}
                onChange={(e) => setNameLength(e.target.value.length)}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder='Digite o seu nome completo'
                required
              />
              <div className='text-end'>
                <span className='text-xs text-gra-900'>{nameLength}/40</span>
              </div>
            </div>

            <div className='sm:w-80  w-full sm:mr-4 mb-4'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Seu e-mail*
              </label>
              <input
                type='email'
                id='user'
                disabled={isLoading}
                {...register('email')}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder='seunome@provedor.com.br'
                required
              />
              {errorEmail ? (
                <div className='pl-2'>
                  <span className='text-red-600 text-xs'>
                    Insira um e-mail válido
                  </span>
                </div>
              ) : null}
            </div>

            <div className='sm:w-80  w-full sm:mr-4 mb-4'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Seu celular (com DDD)*
              </label>
              <InputMask
                id='phone'
                type='tel'
                mask='(__) _____-____)'
                replacement={{ _: /\d/ }}
                min={11}
                disabled={isLoading}
                {...register('phone')}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder=''
                required
              />
            </div>

            <div className='sm:w-80  w-full sm:mr-4 mb-4'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                CEP*
              </label>
              <InputMask
                mask='_____-___'
                replacement={{ _: /\d/ }}
                disabled={isLoading}
                {...register('postal_code')}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder='00000-000'
                required
              />
              {errorCEP ? (
                <div className='pl-2'>
                  <span className='text-red-600 text-xs'>
                    CEP deve conter no mínimo 8 dígitos
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='p-4'>
          <div className='text-center mb-4'>
            <span className='text-main text-xs'>
              *Nos comprometemos em não utilizar seus dados para SPAM. Você
              receberá o contato de um consultor Alares, assim como comunicações
              e novidades exclusivas da marca.
            </span>
          </div>

          <div className='flex justify-center text-center mb-8'>
            <div className='max-w-[1050px]'>
              <input
                type='checkbox'
                onChange={(e) => setCheck(e.target)}
                checked={isAccepted}
                className='mr-2 text-blue-600 bg-gray-100 border-gray-300'
              />
              <label className='text-xs text-main'>
                Concordo em receber informações e ofertas da Alares via Whatsapp
                e/ou telefone. Para obter mais informações sobre como utilizamos
                seus dados e seus direitos de privacidade, consulte nossa
                Política de Privacidade.
              </label>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52'
          >
            Continuar
          </button>
        </div>
      </form>
    );
  }

  // Step 01 com Card
  function step01Card() {
    return (
      <div className='flex flex-col sm:flex-row items-center justify-center max-w-[1050px] mx-auto'>
        {selectedPlan &&
        planList?.some((plan) => String(plan.id) === String(selectedPlan)) ? (
          planList?.map((plan) => {
            if (String(plan.id) === String(selectedPlan)) {
              return <CardContrate offer={plan} location='page' />;
            }
          })
        ) : (
          <ModalPlans isOpen={true} buttonText={''} local={'contrate-card'} />
        )}

        <form onSubmit={handleSubmit(checkAddress)} className='sm:w-2/3 w-full'>
          <div className='flex items-center justify-center mb-8 fade25'>
            <div className='flex'>
              <div className='sm:w-80 w-full sm:mr-4 mb-4 hidden'>
                <label
                  htmlFor='status'
                  className='flex items-center mb-1 text-main text-base pl-3'
                >
                  Plano Selecionado
                </label>
                <select
                  id='status'
                  {...register('plan')}
                  disabled={isLoading}
                  className='bg-main text-white border border-gray-500 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                >
                  <option value={''}>-- Selecione um plano --</option>
                  {planList?.map((plan) => {
                    return <option value={plan.id}>{plan.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className='flex justify-center mb-4 flex-wrap px-4'>
              <div className='sm:w-5/12  w-full sm:mr-4 mb-4'>
                <label
                  htmlFor='user'
                  className='flex items-center mb-1 text-main text-base pl-3'
                >
                  Seu nome completo*
                </label>
                <input
                  type='text'
                  id='user'
                  disabled={isLoading}
                  {...register('name')}
                  className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                  placeholder='Digite o seu nome completo'
                  required
                />
              </div>

              <div className='sm:w-5/12  w-full sm:mr-4 mb-4'>
                <label
                  htmlFor='user'
                  className='flex items-center mb-1 text-main text-base pl-3'
                >
                  Seu e-mail*
                </label>
                <input
                  type='email'
                  id='user'
                  disabled={isLoading}
                  {...register('email')}
                  className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                  placeholder='seunome@provedor.com.br'
                  required
                />
              </div>

              <div className='sm:w-5/12  w-full sm:mr-4 mb-4'>
                <label
                  htmlFor='user'
                  className='flex items-center mb-1 text-main text-base pl-3'
                >
                  Seu celular (com DDD)*
                </label>
                <InputMask
                  type='tel'
                  mask='(__) _____-____)'
                  replacement={{ _: /\d/ }}
                  min={11}
                  disabled={isLoading}
                  {...register('phone')}
                  className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                  placeholder=''
                  required
                />
              </div>

              <div className='sm:w-5/12  w-full sm:mr-4 mb-4'>
                <label
                  htmlFor='user'
                  className='flex items-center mb-1 text-main text-base pl-3'
                >
                  CEP*
                </label>
                <InputMask
                  mask='_____-___'
                  replacement={{ _: /\d/ }}
                  disabled={isLoading}
                  {...register('postal_code')}
                  className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                  placeholder='00000-000'
                  required
                />
              </div>
            </div>
          </div>

          <div className='p-4 mx-11'>
            <div className='text-left mb-4'>
              <span className='text-main text-xs'>
                *Nos comprometemos em não utilizar seus dados para SPAM. Você
                receberá o contato de um consultor Alares, assim como
                comunicações e novidades exclusivas da marca.
              </span>
            </div>

            <div className='flex justify-center text-left mb-8'>
              <div className='max-w-[1050px]'>
                <input
                  type='checkbox'
                  onChange={(e) => setCheck(e.target)}
                  checked={isAccepted}
                  className='mr-2'
                />
                <label className='text-xs text-main'>
                  Concordo em receber informações e ofertas da Alares via
                  Whatsapp e/ou telefone. Para obter mais informações sobre como
                  utilizamos seus dados e seus direitos de privacidade, consulte
                  nossa Política de Privacidade.
                </label>
              </div>
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52'
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 01 - Verificação de endereço
  async function checkAddress(form: any) {
    const city_id = getCookie('city_id');

    if (form.name.length > 40) {
      toast.error('Nome completo excede o limite de caracteres');
      return;
    }

    if (RegexService.singleWord(form.name)) {
      toast.error('Insira um nome válido');
      return;
    }

    if ([null, undefined, '', false, 0].includes(form.plan)) {
      toast.error('Selecione um plano');
      return;
    }

    setSelectedPlan(form.plan);

    if (await RegexService.singleWord(form.name)) {
      toast.error('Insira um nome válido');
      return;
    }

    if ((await RegexService.countNumbers(form.phone)) < 11) {
      toast.error('Insira um número de telefone válido');
      return;
    }

    const match = form.phone.match(/\(\d{2}\)\s?(\d)/);
    console.log(match[1]);
    if (match[1] !== '9') {
      toast.error('Insira um número de telefone válido');
      return;
    }

    const validationEmail = RegexService.validationEmail(form.email);
    if (validationEmail === false) {
      setErrorEmail(true);
      return;
    } else {
      setErrorEmail(false);
    }

    const validationCEP = RegexService.validationCEP(form.postal_code);
    if (validationCEP === false) {
      setErrorCEP(true);
      return;
    } else {
      setErrorCEP(false);
    }

    setLoading(true);

    const plan = planList.find((p) => String(p.id) === String(form.plan));
    setTimeout(() => {
      setSelectedPlan(form.plan);
      setContentPlan(plan.contents);
      setServicePlan(plan.services);

      const services = plan.services;

      services?.map((serv: any) => {
        serv.included = true;
      });
    }, 500);

    const data = {
      city_id: city_id,
      session_id: getCookie('session_id') ?? 0,
      postcode: form.postal_code,
      plan_id: form.plan,
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: 'alares',
      client_ip: client_ip,
      pathname: String(pathname),
    };

    const response = await EcommerceService.addressValidation(data);

    if (response) {
      const data = response.data;

      if (data.status === true) {
        setStep(20);
        setAddress(data?.data);
        setAddressFiltered(data?.data);
        setValue('postal_code2', form.postal_code);
        setLoading(false);

        const selected = planList.find(
          (d: any) => String(d.id) === String(form.plan)
        );
        sendDataLayer(selected, 'infos_contrate_ja');
        scrollToInitial();
      } else if (data.status === false) {
        const selected = planList.find(
          (d: any) => String(d.id) === String(selectedPlan)
        );
        setStep(11);
        setLoading(false);
        sendDataLayerERROR(selected);
        scrollToInitial();
      } else {
        setStep(0);
        setLoading(false);
        scrollToInitial();
      }
    }
  }

  // Step 02
  function step02() {
    return (
      <form onSubmit={handleSubmit(validateOrder)} autoComplete='off'>
        <div className='flex justify-center mb-14 fade25'>
          <div className='sm:grid sm:grid-cols-3 gap-4 px-4 mb-4 flex-wrap w-[1100px]'>
            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                CEP*
              </label>
              <input
                type='text'
                id='user'
                disabled={true}
                {...register('postal_code2')}
                className='bg-disable border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder='00000-000'
                required
              />
            </div>

            <div className='sm:col-span-2  w-full sm:mr-4 mb-2 relative'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Endereço*
              </label>
              <input
                id='address_ecommerce'
                type='text'
                autoComplete='one-time-code'
                disabled={isLoading}
                {...register('address')}
                onChange={(e: any) => openAutoComplete(e.target.value)}
                onFocus={() => {
                  setIsOpenAddress(true);
                }}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                required
              />

              <div
                className={`${
                  isOpenAddress ? 'visible' : 'hidden'
                } w-full absolute bg-white border border-gray-200 mt-1`}
              >
                <div className='max-h-[300px] overflow-auto'>
                  {addressListFiltered?.map((address) => {
                    return (
                      <div
                        onClick={() => setValueAddress(address.id)}
                        className='hover:bg-sub hover:cursor-pointer px-2 py-[1px] border-b border-gray-200'
                      >
                        <span className='text-sm'>{address.address}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {errorAddress ? (
                <div className='pl-2'>
                  <span className='text-red-600 text-xs'>
                    Selecione o endereço correto
                  </span>
                </div>
              ) : null}
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Número*
              </label>
              <InputMask
                type='text'
                mask='__________'
                replacement={{ _: /\d/ }}
                min={1}
                max={10}
                disabled={isLoading}
                {...register('number')}
                onChange={(e) => setNumberLength(e.target.value.length)}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder=''
                required
              />
              <div className='text-end'>
                <span className='text-xs text-gra-900'>{numberLength}/10</span>
              </div>
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Complemento
              </label>
              <input
                type='text'
                {...register('complement')}
                maxLength={10}
                onChange={(e) => setComplementLength(e.target.value.length)}
                className='bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder='Casa, apto xxx, etc'
              />
              <div className='text-end'>
                <span className='text-xs text-gra-900'>
                  {complementLength}/10
                </span>
              </div>
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Bairro
              </label>
              <input
                type='text'
                disabled={true}
                {...register('neighborhood')}
                className='bg-disable border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                required
              />
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Cidade
              </label>
              <input
                type='text'
                disabled={true}
                {...register('city')}
                className='bg-disable border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                required
              />
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                Estado
              </label>
              <input
                type='text'
                disabled={true}
                {...register('state')}
                className='bg-main text-white border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                required
              />
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label className='flex items-center mb-1 text-main text-base pl-3'>
                CPF
              </label>
              <InputMask
                mask='___.___.___-__'
                replacement={{ _: /\d/ }}
                type='text'
                {...register('cpf')}
                className='bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder='000.000.000-00'
                required
              />

              {errorCPF ? (
                <div className='pl-2'>
                  <span className='text-red-600 text-xs font-semibold'>
                    CPF inválido
                  </span>
                </div>
              ) : null}
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label
                htmlFor='birthday'
                className='flex items-center mb-1 text-main text-base pl-3'
              >
                Data de Nascimento
              </label>
              <InputMask
                mask='__/__/____'
                replacement={{ _: /\d/ }}
                type='text'
                {...register('birthday')}
                className='bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                placeholder='dd/mm/aaaa'
                required
              />

              {errorBirthdate ? (
                <div className='pl-2'>
                  <span className='text-red-600 text-xs font-semibold'>
                    Data de nascimento inválida
                  </span>
                </div>
              ) : null}
            </div>

            <div className='sm:col-span-1  w-full sm:mr-4 mb-2'>
              <label
                htmlFor='mother'
                className='flex items-center mb-1 text-main text-base pl-3'
              >
                Nome da mãe
              </label>
              <input
                type='text'
                id='mother'
                autoComplete='mother'
                {...register('motherName')}
                maxLength={40}
                onChange={(e) => setMotherNameLength(e.target.value.length)}
                className='bg-gray-50 border border-gray-500 text-main text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2'
                required
              />
              <div className='text-end'>
                <span className='text-xs text-gra-900'>
                  {motherNameLength}/40
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52'
          >
            Continuar
          </button>
        </div>
      </form>
    );
  }

  // Step 02 - Verificação de pedido
  async function validateOrder(form: any) {
    const array = [...addressList];
    const addressFiltered = array.find(
      (a) =>
        String(a.address).toLowerCase() === String(form.address).toLowerCase()
    );

    if (form.motherName.length > 40) {
      toast.error('Nome da mãe excede o limite de caracteres');
      return;
    }

    if (RegexService.singleWord(form.motherName)) {
      toast.error('Insira um nome da mãe válido');
      return;
    }

    if (form.number.length > 10) {
      toast.error('Número do endereço excede o limite de caracteres');
      return;
    }

    if ([undefined, null, 0, false].includes(addressFiltered)) {
      setIsOpenAddress(false);
      setErrorAddress(true);
      return;
    }

    const validation = RegexService.validationCPF(String(form.cpf));

    if (validation === false) {
      setErrorCPF(true);
      return;
    } else {
      setErrorCPF(false);
    }

    const validationBirthdate = RegexService.birthdateValidade(
      String(form.birthday)
    );
    if (validationBirthdate === false) {
      setErrorBirthdate(true);
      return;
    } else {
      setErrorBirthdate(false);
    }

    scrollToInitial();
    setLoading(true);

    const date = form.birthday;
    var birthday = RegexService.convertDate(String(date));

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
          address_id: addressID ?? '',
          pathname: String(pathname),
          name: getValues('name'),
        },
      });
      console.log(request);
      const data = request.data;
      console.log(data);
      if (data.status === true) {
        console.log('PASSS 1');
        setTerm(data?.term?.id);
        setTermText(data?.term?.text);
        getSVA('');
        setStep(30);
        setLoading(false);
        scrollToInitial();

        const selected = planList.find(
          (d: any) => String(d.id) === String(selectedPlan)
        );
        sendDataLayer(selected, 'review_contrate_ja');
      } else if (data.status === false && data.validator == true) {
        console.log('PASSS 2');
        setStep(21);
        setLoading(false);
        scrollToInitial();
      } else {
        setErrorBirthdate(true);
        setLoading(false);
      }
    } catch (error: any) {
      console.log('PASSS 3');
      setStep(0);
      setLoading(false);
      scrollToInitial();
    }
  }

  // Step 03
  function step03() {
    return (
      <div className='fade25'>
        <div
          id='avisoAceite'
          className='bg-slate-500 w-screen fixed top-0 hidden justify-center items-center px-2 transition-opacity ease-in-out delay-150 duration-300 opacity-0'
        >
          <GoAlertFill size={25} color='white' />
          <b className='text-white py-3 px-2 sm:text-base text-xs'>
            Para continuar é necessário aceitar os termos e condições
          </b>
        </div>
        <div className='text-center'>
          <span className='sm:text-5xl text-2xl font-medium text-main'>
            Resumo do pedido
          </span>
          <br />
          <br />
        </div>

        <div className='lg:flex justify-center mb-4'>
          <div className='sm: mr-4'>
            <div className='text-center mb-4'>
              <span className='text-main font-medium'>Plano Selecionado</span>
            </div>

            <div>
              <div className='mb-[-15px]'>
                {!coupon_id ? planCard() : null}
                {couponType === 'SVA' ? planCardWithCoupon() : null}
                {couponType === 'Value' ? planCardWithCoupon() : null}
                {couponType === 'Percent' ? planCardWithCoupon() : null}
              </div>

              <div className='flex sm:hidden justify-center mb-8'>
                  {couponCardMobile()}
              </div>
            </div>
          </div>

          <div className='sm:mr-4'>
            <div className='text-center mb-4'>
              <span className='text-main font-medium'>
                Dados do contratante
              </span>
            </div>

            <div className='flex justify-center p-1 mb-8'>
              <div className=' border border-gray-500 rounded-xl p-6 min-w-[300px]'>
                <div className='mb-2'>
                  <span className='text-sm text-main'>Seu nome</span>
                  <br />
                  <span className='text-sm'>{getValues('name')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Seu email</span>
                  <br />
                  <span className='text-sm'>{getValues('email')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>
                    Seu celular (com DDD)
                  </span>
                  <br />
                  <span className='text-sm'>{getValues('phone')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>CPF</span>
                  <br />
                  <span className='text-sm'>{getValues('cpf')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Data de Nascimento</span>
                  <br />
                  <span className='text-sm'>{getValues('birthday')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Nome da mãe</span>
                  <br />
                  <span className='text-sm'>{getValues('motherName')}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='text-center mb-4'>
              <span className='text-main font-medium'>
                Informações sobre endereço
              </span>
            </div>

            <div className='flex justify-center p-1'>
              <div className=' border border-gray-500 rounded-xl p-6 w-[300px]'>
                <div className='mb-2'>
                  <span className='text-sm text-main'>Endereço</span>
                  <br />
                  <span className='text-sm'>{getValues('address')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Número</span>
                  <br />
                  <span className='text-sm'>{getValues('number')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Complemento</span>
                  <br />
                  <span className='text-sm'>{getValues('complement')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>CPF</span>
                  <br />
                  <span className='text-sm'>{getValues('cpf')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>CEP</span>
                  <br />
                  <span className='text-sm'>{getValues('postal_code')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Bairro</span>
                  <br />
                  <span className='text-sm'>{getValues('neighborhood')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Cidade</span>
                  <br />
                  <span className='text-sm'>{getValues('city')}</span>
                </div>

                <div className='mb-2'>
                  <span className='text-sm text-main'>Estado</span>
                  <br />
                  <span className='text-sm'>{getValues('state')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center p-4 mb-5 w-full'>
          <div className='max-w-[900px] w-full flex sm:justify-end justify-center'>
            <div className='w-[300px]'>
              <div className='sm:flex hidden'>
                {couponCardDesktop()}
              </div>
              <div className='pt-4'>
                <button
                  id='button-confirm-resume'
                  onClick={() => createOrder()}
                  className='bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-full'
                  disabled={false}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className='p-2 flex items-center mb-4 justify-center md:max-w-max max-w-96 mx-auto'
          onClick={() => clickCheckBox()}
        >
          <input
            id='terms-checkbox'
            type='checkbox'
            value=''
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            defaultChecked
          />
          <div className='text-sm font-medium text-gray-900 dark:text-gray-300'>
            <label htmlFor='terms-checkbox' className='ms-2'>
              Eu aceito os{' '}
            </label>
            <Modal
              buttonText={'termos e condições'}
              title={'Termos e condições'}
              text={termText}
            />{' '}
            <span>
              {' '}
              para seguir com a contratação do serviço resumido acima
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Step 03 - SVA avulso
  function step03SVA() {
    return (
      <div className='fade25'>
        {showPlan ? (
          <ModalConfirmation
            text={``}
            buttons={<></>}
            fields={
              <>
                <div className='flex justify-end mb-2'>
                  <button
                    onClick={() => setShowPlan(false)}
                    className='border border-gray-600 rounded-full p-2 hover:bg-gray-300'
                  >
                    <IoMdClose />
                  </button>
                </div>
                <div className='f-full h-full flex justify-center'>
                  {!coupon_id ? planCard() : null}
                  {couponType === 'SVA' ? planCardWithCoupon() : null}
                  {couponType === 'Value' ? planCardWithCoupon() : null}
                  {couponType === 'Percent' ? planCardWithCoupon() : null}
                </div>
              </>
            }
          />
        ) : null}
        <div
          id='avisoAceite'
          className='bg-slate-500 w-screen fixed top-0 hidden justify-center items-center px-1 transition-opacity ease-in-out delay-150 duration-300 opacity-0'
        >
          <GoAlertFill size={25} color='white' />
          <b className='text-white py-3 px-2 sm:text-base text-xs'>
            Para continuar é necessário aceitar os termos e condições
          </b>
        </div>
        <div className='text-center mb-8'>
          <span className='sm:text-4xl text-xl font-bold text-main'>
            Resumo do pedido
          </span>
          <br />
          <br />
        </div>

        <div className='lg:flex flex-row-reverse justify-center block mb-1 w-full'>
          <div className='sm: mr-4 flex justify-center'>
            <div>
              <div className='mb-2 flex items-center'>
                <FaShoppingCart className='mr-2 text-main' />
                <span className='text-black font-extrabold mt-1'>
                  Plano selecionado
                </span>
              </div>
              <div className='mb-8'>
                <div className='rounded-xl p-4 bg-[#F1F1FA] w-[270px] border-2 border-[#D3D3F4] mb-4'>
                  <div className='flex justify-center'>
                    <div className='text-center mr-1'>
                      <span className='text-black text-2xl font-bold'>
                        {getPlanDetail('title')}
                      </span>
                    </div>
                    <div className='text-center mb-4'>
                      <span className='text-black text-2xl font-bold'>
                        {getPlanDetail('subtitle')}
                      </span>
                    </div>
                  </div>

                  <div className='flex justify-center'>
                    <button
                      onClick={() => {
                        setShowPlan(true);
                      }}
                      className='mb-4 text-xs bg-[#F1F1FA] border-main border hover:bg-sub hover:text-main text-black py-1 px-6 rounded-full font-bold'
                    >
                      VER DETALHES
                    </button>
                  </div>

                  <div className='mb-2 block'>
                    {servicePlan?.map((service) => {
                      return (
                        <>
                          <div className='flex justify-between items-center border-t border-[#D3D3F4] '>
                            <div className='mr-2 p-2'>
                              <span className='text-xs font-bold'>
                                {service.name}
                              </span>
                            </div>
                            {service.included ? (
                              <></>
                            ) : (
                              <div className='flex border-l border-[#D3D3F4] pl-2'>
                                <div className='flex items-center font-bold text-sm'>
                                  <div>
                                    <span className='text-black mr-1'>R$</span>
                                  </div>
                                  <div className='mr-2'>
                                    <span className='text-black'>
                                      {service.price}
                                    </span>
                                  </div>

                                  <div className='pt-1'>
                                    <button onClick={() => removeSVA(service)}>
                                      <FaRegTrashAlt className='text-red-500' />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>

                <div className='h-[2px] w-full bg-[#D3D3F4] mb-4'></div>

                {['Value', 'Percent'].includes(couponType) ? (
                  <>
                    <div className='text-center font-medium'>
                      <span className='text-xs'>
                        De R${couponData?.value_plan} por
                      </span>
                    </div>
                  </>
                ) : null}

                <div className='flex items-center font-extrabold justify-between p-4'>
                  <div>
                    <span>Total:</span>
                  </div>
                  <div className='flex'>
                    <div>
                      <span className='text-black mr-1'>R$</span>
                    </div>
                    <div>
                      <span className='text-black'>{totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className='border border-gray-200 rounded-lg p-2 mb-4'>
                  {couponCardDesktop()}
                </div>

                <div className='flex justify-center'>
                  <button
                    id='button-confirm-resume'
                    onClick={() => createOrder()}
                    className='mb-4 text-xs bg-sub hover:bg-sub hover:text-main text-black py-1 px-4 rounded-full w-full font-bold'
                    disabled={false}
                  >
                    CONTINUAR
                  </button>
                </div>

                {/* <div className='flex justify-center'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowSVA(true), scrollToSVA();
                    }}
                    className='text-xs bg-white hover:bg-sub hover:text-main text-black py-1 px-4 rounded-full w-full font-bold border-sub border-2'
                  >
                    ADICIONAR APPS
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {showSVA ? (
            <div className='sm:hidden block'>
              <div
                id='sva_scroll'
                className='sm:flex justify-center items-center'
              >
                <div className='sm:max-w-[1000px] p-4'>
                  <span className='text-main font-bold text-3xl'>
                    Apps adicionais
                  </span>
                </div>
                <div className='flex items-center  pl-2'>
                  <div className='flex flex-wrap'>
                    {svaTypeList?.map((type: any) => {
                      return (
                        <div className='mr-1 mb-1'>
                          <button
                            onClick={() => getSVA(type)}
                            className={`${
                              svaType === type ? ' bg-main text-white' : ''
                            } px-4 rounded-full border-[1px] border-main hover:bg-main hover:text-white`}
                          >
                            <span className='text-nowrap'>{type}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='min-h-[250px]'>
                <div className='flex justify-center pt-8'>
                  <Carousel className='hover:cursor-pointer sm:max-w-[1000px] w-full px-4 mb-4'>
                    <CarouselContent>
                      {svaList?.map((sva, index) => {
                        return (
                          <div key={index} className='mx-3'>
                            <CarouselItem className={`basis-1/3`}>
                              {svaCard(sva, index)}
                            </CarouselItem>
                          </div>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious className='text-main sm:flex hidden' />
                    <CarouselNext className='text-main sm:flex hidden' />
                  </Carousel>
                </div>
              </div>
            </div>
          ) : null}

          <div className='sm:mr-4 flex justify-center mb-4'>
            <div>
              <div className='mb-1 flex items-center'>
                <FaLocationDot className='mr-2 text-main' />
                <span className='text-black font-extrabold mt-1'>
                  Endereço de instalação
                </span>
              </div>

              <div className='flex justify-center p-1'>
                <div className='border-2 border-[#D3D3F4] rounded-b-xl rounded-tr-xl p-6 w-[300px]'>
                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Endereço
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('address')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Número
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('number')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Complemento
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('complement')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>CPF</span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('cpf')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>CEP</span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('postal_code')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Bairro
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('neighborhood')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Cidade e Estado
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('city')} - {getValues('state')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='sm:mr-4 flex justify-center'>
            <div>
              <div className='mb-1 flex items-center'>
                <FaUser className='mr-2 text-main' />
                <span className='text-black font-extrabold mt-1'>
                  Seus dados
                </span>
              </div>

              <div className='flex justify-center p-1 mb-8'>
                <div className='border-2 border-[#D3D3F4] rounded-b-xl rounded-tr-xl p-6 w-[300px]'>
                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Seu nome
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('name')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Seu email
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('email')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Seu celular (com DDD)
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('phone')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>CPF</span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('cpf')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Data de Nascimento
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('birthday')}
                    </span>
                  </div>

                  <div className='mb-2'>
                    <span className='text-sm text-main font-semibold'>
                      Nome da mãe
                    </span>
                    <br />
                    <span className='text-xs text-gray-500 font-semibold'>
                      {getValues('motherName')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showSVA ? (
          <div className='sm:block hidden'>
            <div
              id='sva_scroll2'
              className='sm:flex justify-center items-center'
            >
              <div className='sm:max-w-[1000px] p-4'>
                <span className='text-main font-bold text-3xl'>
                  Apps adicionais
                </span>
              </div>
              <div className='flex items-center  pl-2'>
                <div className='flex flex-wrap'>
                  {svaTypeList?.map((type: any) => {
                    return (
                      <div className='mr-1 mb-1'>
                        <button
                          onClick={() => getSVA(type)}
                          className={`${
                            svaType === type ? ' bg-main text-white' : ''
                          } px-4 rounded-full border-[1px] border-main hover:bg-main hover:text-white`}
                        >
                          <span className='text-nowrap'>{type}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className='min-h-[250px]'>
              <div className='flex justify-center pt-8'>
                <Carousel className='hover:cursor-pointer sm:max-w-[1000px] w-full mb-4'>
                  <CarouselContent>
                    {svaList?.map((sva, index) => {
                      return (
                        <div key={index} className=''>
                          <CarouselItem className={`basis-1/3`}>
                            {svaCard(sva, index)}
                          </CarouselItem>
                        </div>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className='text-main sm:flex hidden' />
                  <CarouselNext className='text-main sm:flex hidden' />
                </Carousel>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className='p-4 flex mb-4 justify-center md:max-w-max max-w-96 mx-auto'
          onClick={() => clickCheckBox()}
        >
          <input
            id='terms-checkbox'
            type='checkbox'
            value=''
            className='w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            defaultChecked
          />
          <div className='text-sm font-medium text-gray-900 dark:text-gray-300'>
            <label htmlFor='terms-checkbox' className='ms-2'>
              Eu aceito os{' '}
            </label>
            <Modal
              buttonText={'termos e condições'}
              title={'Termos e condições'}
              text={termText}
            />{' '}
            <span>
              {' '}
              para seguir com a contratação do serviço resumido acima
            </span>
          </div>
        </div>

        <div className='sm:hidden flex justify-center'>
          <button
            id='button-confirm-resume'
            onClick={() => createOrder()}
            className='mb-4 text-xs bg-sub hover:bg-sub hover:text-main text-black py-1 px-4 rounded-full w-full max-w-[300px] font-bold'
            disabled={false}
          >
            CONTINUAR
          </button>
        </div>
      </div>
    );
  }

  // Step 03 - Cria o pedido
  async function createOrder() {
    const selected = planList.find(
      (d: any) => String(d.id) === String(selectedPlan)
    );
    sendDataLayer(selected, 'termos_contrate_ja');
    scrollToInitial();
    setLoading(true);
    setAccept(true);

    const date = getValues('birthday');
    var birthday = RegexService.convertDate(String(date));

    const tel = getValues('phone');
    const thenum = tel.match(/\d+/g).join('');

    let svas: any[] = [];
    servicePlan?.map((s: any) => {
      if (s.included === false) {
        svas.push(s.plan_id);
      }
    });

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
        client_ip: client_ip,
        sva: svas,
        coupon_id: coupon_id ? String(couponData?.id_coupon) : null,
        pathname: String(pathname),
      });

      const data = request.data;
      const schedule = request.data?.data?.schedule;
      const orderId = request.data?.data?.order_id;

      if (data.status === true) {
        setSchedule(schedule);
        setOrderId(orderId);
        setStep(50);
        setLoading(false);

        const selected = planList.find(
          (d: any) => String(d.id) === String(selectedPlan)
        );
        sendDataLayer(selected, 'agendamento_contrate_ja');
        scrollToInitial();
      }

      if (data.status === false) {
        setStep(51);
        setLoading(false);
        scrollToInitial();
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(true);
      setStep(0);
      scrollToInitial();
    }
  }

  // Step 04
  function step04() {
    return (
      <div className='p-4 fade25'>
        <div className='mb-6'>
          <div className='text-center'>
            <span className='sm:text-4xl text-2xl font-medium text-main'>
              Agendamento
            </span>
            <br />
            <br />
          </div>
          <div className='text-center'>
            <span className='text-sm text-gray-500'>
              Recebemos seu pedido! <br /> Agora precisamos que confirme a data
              e horário para instalação.{' '}
            </span>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='bg-[#F1F1FA] p-8 rounded-br-xl w-[400px]'>
            <div className='text-center mb-4'>
              <span className='font-medium'>Informações de Agendamento</span>
            </div>

            <div className='flex items-center justify-center mb-4'>
              <FaCalendarAlt className='mr-4 scale-150 text-main' />
              <select
                name=''
                id=''
                className='rounded-r-full w-[270px]'
                onChange={(e) => selectDate(e.target.value)}
              >
                <option value=''>-- Selecione uma data --</option>
                {schedule?.map((s) => {
                  return <option value={s.date}>{dateConvert(s.date)}</option>;
                })}
              </select>
            </div>

            <div className='flex items-center justify-center mb-5'>
              <TbClockHour5 className='mr-4 scale-150 text-main' />
              <select
                name=''
                id=''
                className='rounded-r-full w-[270px]'
                disabled={periodList.length === 0}
                onChange={(e) => selectPeriod(e.target.value)}
              >
                <option value=''>-- Selecione uma periodo --</option>
                {periodList?.map((p) => {
                  return <option value={p}>{p}</option>;
                })}
              </select>
            </div>

            <div className='flex justify-center'>
              <button
                onClick={() => createContract()}
                className='bg-blue-700 hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full'
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 04 - Criação do contrato
  async function createContract() {
    if ([null, '', undefined].includes(selectedDate)) {
      toast.error('Selecione a data do agendamento');
      return;
    }

    if ([null, '', undefined].includes(selectedPeriod)) {
      toast.error('Selecione o período do agendamento');
      return;
    }

    setStep(100);

    try {
      const request = await axiosInterceptorInstance.post(
        '/order/contract-ecommerce',
        {
          session_id: getCookie('session_id') ?? 0,
          order_id: order_id,
          schedule_date: selectedDate,
          schedule_period: selectedPeriod,
          company: 'alares',
          client_ip: client_ip,
          pathname: String(pathname),
        }
      );

      const data = request.data;
      if (data.status === true) {
        setStep(200);
        setLoading(false);

        const selected = planList.find(
          (d: any) => String(d.id) === String(selectedPlan)
        );
        sendDataLayer(selected, 'success_contrate_ja', data?.contract);
        scrollToInitial();
      }

      if (data.status === false) {
        setStep(51);
        setLoading(false);
        scrollToInitial();
      }
    } catch (error: any) {
      toast.error(error.message);
      setStep(0);
      setLoading(true);
      scrollToInitial();
    }
  }

  //Busca o IP do cliente
  async function getIP() {
    const ip = await getClientIP();
    setClient_IP(ip);
  }

  //Lista todos os planos
  async function getPlan() {
    const plan = searchParams.get('plano');

    if (plan) {
      setSelectedPlan(String(plan));
    }

    const session_id = getCookie('session_id');

    const request = await PlanService.getPlan(String(city_id), session_id);

    if (request.status === 200) {
      const data = request.data?.plans;
      const exclusive_offers = request.data?.exclusive_offers;

      exclusive_offers?.map((offer: any) => {
        if (String(offer?.id) === String(plan)) {
          data.push(offer);
        }
      });

      setPlan(data);

      setTimeout(() => {
        if (plan) {
          setValue('plan', Number(plan));
        }

        const selected = data?.find((d: any) => String(d.id) === String(plan));
        sendDataLayer(selected, 'start_contrate_ja');
      }, 500);
    }
  }

  // Card do plano selecionado
  function planCard() {
    return (
      <>
        <div className='flex justify-center mb-2 z-10'>
          <div className='rounded-xl p-4 bg-main w-[270px] border border-secondary'>
            <div className='text-center'>
              <span className='text-white text-4xl'>
                {getPlanDetail('title')}
              </span>
            </div>
            <div className='text-center mb-4'>
              <span className='text-sub text-xl'>
                {getPlanDetail('subtitle')}
              </span>
            </div>

            <div className='mb-4'>
              {contentPlan?.map((content) => {
                return (
                  <div className='text-center text-white mb-2 text-sm'>
                    <span>{content.name}</span>
                  </div>
                );
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
                      <img
                        src={service.icon}
                        alt={service.name}
                        title={service.name}
                        className='object-contain rounded-full'
                      />
                    </div>
                  );
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
                    <span className='text-sub text-4xl font-medium'>
                      {getPlanDetail('promo')
                        ? getPlanDetail('promo_price')
                        : getPlanDetail('price')}
                    </span>
                    <span className='text-sub text-sm'>/mês</span>
                  </div>
                </div>
              </div>
              {getPlanDetail('promo_price') ? (
                <>
                  <div className='text-center'>
                    <span className='text-white text-xs'>
                      Por {getPlanDetail('promo_period')} meses
                    </span>
                  </div>
                  <div className='text-center text-white'>
                    <span className='text-xs'>{`A partir do ${
                      Number(getPlanDetail('promo_period')) + 1
                    }º mês R$ ${getPlanDetail('price')}`}</span>
                  </div>
                </>
              ) : null}
              <div className='text-center'>
                <span className='text-sub text-xs'>na conta digital</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Tela de loading no último step do fluxo
  function houseLoader() {
    return (
      <div className='h-[300px] flex justify-center items-center select-none'>
        <div className='flex flex-col justify-center'>
          <Image
            src={house}
            alt={''}
            className='select-none pointer-events-none'
            draggable='false'
          />
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
    );
  }

  // Tela de sucesso ao concluir o fluxo
  function stepSuccess() {
    return (
      <div>
        <div className='text-center mb-4'>
          <span className='text-main text-4xl'>Confirmado!</span>
        </div>
        <div className='flex justify-center'>
          <div className='text-center max-w-[400px]'>
            <span>
              Em breve, você estará navegando na internet com nossa conexão de
              alta velocidade. Aguarde o contato dos nossos especialistas.
            </span>
          </div>
        </div>
        <div className='flex justify-center'>
          <Image src={congrats} alt={''} className='w-[500px]'></Image>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={() => {
              navigate('/home', false);
            }}
            className='bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52'
          >
            VOLTAR AO INÍCIO
          </button>
        </div>
      </div>
    );
  }

  //Scroll para o topo da página
  function scrollToInitial() {
    const el = document.getElementById('initial_scroll');

    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }

  //////////////////////////////////////

  //Função de navegação com parâmetros
  function navigate(path: string, external: boolean) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (external) {
      window.open(path, '_blank');
    } else {
      router.push(`${path}/?${current}`);
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
        pedido_id: sale_id,
      };
      console.log(data);
      DataLayerService.senDataLayer(data);
    }, 1000);
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
      };
      console.log(data);
      DataLayerService.senDataLayer(data);
    }
  }

  function setCheck(event: any) {
    const checked = event?.target?.checked;

    setAccept(checked);
  }

  function error1() {
    return (
      <div className='fade25'>
        <div className='flex justify-center mb-6'>
          <Image src={errorIcon} alt={''} />
        </div>
        <div className='flex justify-center mb-8'>
          <div className='text-center max-w-[700px]'>
            <span className='text-3xl text-main font-medium'>
              Endereço não encontrado.
            </span>
            <br />
            <br />
            <span>
              Desculpe-nos, não conseguimos localizar o seu CEP, mas não se
              preocupe: utilize o link abaixo e entre em contato com um de
              nossos vendedores
            </span>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            onClick={() => openWhatsapp('')}
            className='rounded-full bg-main text-white px-4 py-2 hover:bg-hover'
          >
            Falar com um vendedor
          </button>
        </div>
      </div>
    );
  }

  function errorMajor() {
    return (
      <div className='fade25'>
        <div className='flex justify-center mb-6'>
          <Image src={errorIcon} alt={''} />
        </div>
        <div className='flex justify-center mb-8'>
          <div className='text-center max-w-[700px]'>
            <span className='text-3xl text-main font-medium'>
              Houve um erro inesperado
            </span>
            <br />
            <br />
            <span>
              Desculpe-nos, entre em contato com um de nossos vendedores para
              prosseguir com a compra
            </span>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            onClick={() => openWhatsapp('')}
            className='rounded-full bg-main text-white px-4 py-2 hover:bg-hover'
          >
            Falar com um vendedor
          </button>
        </div>
      </div>
    );
  }

  function errorBack() {
    return (
      <div className='flex justify-center items-center fade25'>
        <div className='max-w-[300px]'>
          <div className='text-center mb-4'>
            <span className='text-main text-2xl font-medium'>Oh, não!</span>
          </div>
          <div className='text-center mb-4'>
            <span>
              Não foi dessa vez. Ainda não temos cobertura na região informada.
              Estamos sempre expandindo nossa rede de Fibra Óptica e esperamos
              poder te atender no futuro.
            </span>
          </div>
          <div className='flex justify-center'>
            <Image src={fail} alt={''} />
          </div>
          <div className='flex justify-center'>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className='w-[200px] bg-blue-700 py-2 px-8 text-white rounded-full'
            >
              Voltar ao início
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Busca informações do plano
  function getPlanDetail(prop: string) {
    const plan = planList.find((p) => String(p.id) === String(selectedPlan));

    switch (prop) {
      case 'id': {
        return plan?.id ?? plan?.id;
      }
      case 'name': {
        return plan?.name ?? plan?.name;
      }
      case 'title': {
        return plan?.title ?? plan?.title;
      }
      case 'subtitle': {
        return plan?.subtitle ?? plan?.subtitle;
      }
      case 'price': {
        return plan?.price ?? plan?.price;
      }
      case 'promo': {
        return plan?.promo ?? plan?.promo;
      }
      case 'promo_price': {
        return plan?.promo_price ?? plan?.promo_price;
      }
      case 'promo_period': {
        return plan?.promo_period ?? plan?.promo_period;
      }
    }
  }

  // Abre o autocomplete de endereço
  function openAutoComplete(value: any) {
    const array = [...addressList];
    const filtered = array.filter((a) =>
      String(a.address).toLowerCase().includes(String(value).toLowerCase())
    );
    console.log(filtered);
    if (value.length > 0) {
      setAddressFiltered(filtered);
    } else {
      setAddressFiltered(array);
    }
  }

  //Preenche os campos de endereço do formulário
  async function setValueAddress(id: number) {
    const array = [...addressList];
    const address = array.find((a) => Number(a.id) === Number(id));

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

    setIsOpenAddress(false);
  }

  function clickCheckBox() {
    const button = document.querySelector(
      '#button-confirm-resume'
    ) as HTMLInputElement;
    const checkbox = document.querySelector(
      '#terms-checkbox'
    ) as HTMLInputElement;
    const aviso = document.querySelector('#avisoAceite') as HTMLElement;
    let newButton = button.cloneNode(true) as HTMLInputElement;

    if (checkbox.checked) {
      if (!button) return;
      button.parentNode?.replaceChild(newButton, button);
      newButton.classList.value =
        'bg-main hover:bg-sub hover:text-main text-white py-2 px-4 rounded-full w-52';
      newButton.disabled = false;
      aviso.classList.value =
        'bg-slate-500 w-screen fixed top-0 hidden justify-center items-center px-2 transition-opacity ease-in-out delay-150 duration-300 opacity-0';
      newButton.addEventListener('click', () => createOrder());

      return;
    }

    if (!checkbox.checked) {
      if (!button) return;
      button.parentNode?.replaceChild(newButton, button);
      newButton.classList.value =
        'bg-slate-300 disabled:opacity-75 text-white py-2 px-4 rounded-full w-52';
      newButton.disabled = true;
      aviso.classList.value =
        'bg-slate-500 w-screen fixed top-0 flex justify-center items-center px-2 transition-opacity ease-in-out delay-150 duration-300 opacity-100';
      return;
    }
  }

  function discheck() {
    const checkbox = document.querySelector(
      '#terms-checkbox'
    ) as HTMLInputElement;
    checkbox.checked = false;
  }

  function dateConvert(date: string) {
    // Dividindo a data em ano, mês e dia
    var partesData = date.split('-');
    var ano = partesData[0];
    var mes = partesData[1];
    var dia = partesData[2];

    // Formatando a data no formato 'DD/MM/YYYY'
    var final = dia + '/' + mes + '/' + ano;

    return final;
  }

  function selectDate(value: any) {
    setSelectedDate(value);
    const period = schedule.find((s) => s.date === value).period;
    setPeriodList(period);
  }

  function selectPeriod(value: any) {
    setSelectedPeriod(value);
  }

  function addSVA(sva: any) {
    const array = [...servicePlan];
    sva.included = false;
    console.log(array);
    console.log(sva);
    array.push(sva);
    setServicePlan(array);
  }

  function removeSVA(sva: any) {
    let array = [...servicePlan];
    array = array.filter((a) => a.icon !== sva.icon);
    setServicePlan(array);
  }

  function showDescription(index: number) {
    let array = [...svaList];
    array[index].showDescription = true;
    setSVAList(array);
  }

  function getTotalPrice() {
    let plan = 0;
    console.log(coupon_id);
    console.log(couponData);
    if (coupon_id) {
      switch (couponType) {
        case 'SVA': {
          plan = Number(couponData?.plan?.price);
          break;
        }
        case 'Percent': {
          plan = Number(couponData?.value);
          break;
        }
        case 'Value': {
          plan = Number(couponData?.value);
          break;
        }
      }
    } else {
      plan = Number(getPlanDetail('price'));
    }

    let svaPrices = 0;
    console.log(servicePlan);
    servicePlan?.map((s: any) => {
      if (s.included === false) {
        svaPrices = Number(svaPrices) + Number(s.price);
        console.log(s.price);
      }
    });

    console.log(plan);
    const total = plan + svaPrices;
    setTotalPrice(Math.round(total * 100) / 100);
  }

  function scrollToSVA() {
    setTimeout(() => {
      const el = document.getElementById('sva_scroll');
      el?.scrollIntoView({
        behavior: 'smooth',
      });

      const el2 = document.getElementById('sva_scroll2');
      el2?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);
  }

  async function getSVA(type: string) {
    if (type === svaType) {
      type = '';
    }

    setSvaType(type);

    const params = {
      session_id: getCookie('session_id') ?? 0,
      code_city: getCookie('city_id'),
      plan_id: Number(selectedPlan),
      type: type,
    };

    const request = await EcommerceService.getSVA(params);

    if (request.status >= 200) {
      const data = request?.data?.data;
      const types = request?.data?.types;
      console.log(data);
      data.map((d: any) => (d.showDescription = false));
      setSVAList(data);
      setSvaTypeList(types);

      setTimeout(() => {
        getTotalPrice();
      }, 200);
    }
  }

  function svaCard(sva: any, index: number) {
    return (
      <>
        <div className='sm:block hidden w-[257px] pb-10 scale-90'>
          <div className='flex justify-between absolute w-[255px] mt-[-45px]'>
            <div className='pl-2'>
              <img
                src={sva.image}
                alt=''
                className='w-[80px] h-[80px] object-cover rounded-full border-[5px] border-gray-200'
              />
            </div>
            <div className='text-end pt-4 pr-2'>
              <span className='text-xs font-semibold'>
                {sva.name.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className='border border-gray-200 mt-10 rounded-3xl bg-white'>
              <div className='w-[255px]  mb-4'>
                <div>
                  <img
                    src={sva?.content?.image}
                    alt=''
                    className='w-[255px] h-[166px] object-cover rounded-br-3xl'
                  />
                </div>
              </div>

              <div className='flex justify-center mb-2 items-center'>
                {sva?.included ? (
                  <p className='text-black text-xl font-semibold'>Incluso</p>
                ) : (
                  <>
                    {sva?.price !== '0.00' ? (
                      <>
                        <span className='text-gray-500 text-sm mr-1'>R$</span>{' '}
                        <p className='text-black text-xl font-semibold'>
                          {RegexService.changeDot(String(sva?.price))}
                        </p>{' '}
                        <span className='text-gray-500 ml-1 text-sm'>
                          /mês*
                        </span>
                      </>
                    ) : null}
                  </>
                )}
              </div>

              <div className='flex justify-center'>
                <button
                  onClick={() => addSVA(sva)}
                  className={`${
                    checkIncluded(sva)
                      ? 'bg-gray-400'
                      : 'bg-sub hover:bg-sub hover:text-main'
                  } mb-4 text-[10px] text-black py-1 px-4 rounded-full font-bold mr-2`}
                  disabled={checkIncluded(sva)}
                >
                  {checkIncluded(sva) ? 'ADICIONADO' : 'ADICIONAR'}
                </button>

                <button
                  onClick={() => showDescription(index)}
                  className='mb-4 text-[10px] bg-sub hover:bg-sub hover:text-main text-black py-1 px-4 rounded-full font-bold'
                  disabled={false}
                >
                  DETALHES
                </button>
              </div>

              {sva.showDescription ? (
                <>
                  <div className='p-6 bg-[#F1F1FA] rounded-br-3xl'>
                    <div
                      className='text-sm'
                      dangerouslySetInnerHTML={{ __html: sva.description }}
                    ></div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className='sm:hidden block w-screen pb-10 scale-[80%]'>
          <div className='flex absolute w-[325px] mt-[-45px]'>
            <div className='mr-2'>
              <img
                src={sva.image}
                alt=''
                className='w-[80px] h-[80px] object-cover rounded-full border-[5px] border-gray-200'
              />
            </div>
            <div className='text-start pt-4 pr-2'>
              <span className='text-xs font-semibold'>
                {sva.name.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className='flex border border-gray-200 mt-10 rounded-b-3xl bg-white shadow-xl'>
              <div className='w-[320px]'>
                <div>
                  <img
                    src={sva?.content?.image}
                    alt=''
                    className='w-[320px] h-[120px] object-cover rounded-br-3xl'
                  />
                </div>
              </div>

              <div className='flex justify-center items-center p-2'>
                <div>
                  <div className='flex justify-center mb-2 items-center'>
                    {sva?.included ? (
                      <p className='text-black text-xl font-semibold'>
                        Incluso
                      </p>
                    ) : (
                      <>
                        {sva?.price !== '0.00' ? (
                          <>
                            <span className='text-gray-500 text-sm mr-1'>
                              R$
                            </span>{' '}
                            <p className='text-black text-xl font-semibold'>
                              {RegexService.changeDot(String(sva?.price))}
                            </p>{' '}
                            <span className='text-gray-500 ml-1 text-sm'>
                              /mês*
                            </span>
                          </>
                        ) : null}
                      </>
                    )}
                  </div>

                  <div className='flex justify-center'>
                    <button
                      onClick={() => addSVA(sva)}
                      className={`${
                        checkIncluded(sva)
                          ? 'bg-gray-400'
                          : 'bg-sub hover:bg-sub hover:text-main'
                      } mb-4 text-[10px] text-black py-1 px-4 rounded-full font-bold mr-2`}
                      disabled={checkIncluded(sva)}
                    >
                      {checkIncluded(sva) ? 'ADICIONADO' : 'ADICIONAR'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function checkIncluded(sva: any) {
    let included: boolean = false;
    const services = [...servicePlan];

    services.map((serv: any) => {
      if (serv.icon === sva.icon) {
        included = true;
      }
    });

    return included;
  }

  // Card de input para cupom de desconto
  function couponCardDesktop() {
    return (
      <>
        {coupon_active ? (
          <>

              <Accordion type='single' collapsible className='w-full mb-2'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='text-main'>
                    <div>
                      <span className=''>Tem um cupom de desconto?</span>
                    </div>
                  </AccordionTrigger>
                    <AccordionContent>
                      <div className='p-1'>
                        <div className='flex items-center mb-1'>
                          <div className='mr-1'>
                            <RiCoupon3Fill className='text-main' />
                          </div>
                          <div>
                            <span className='text-main text-xs'>Adicionar cupom</span>
                          </div>
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                        <div className="relative">
                          <input 
                          type="text"
                          disabled={isLoadingCoupon}
                          {...register('coupon_desktop')}
                          className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-300 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-sm focus:shadow" 
                          placeholder="Digite seu cupom" 
                          />
                          <button
                            onClick={() => getCoupon('desktop')}
                            className="absolute max-w-18 right-1 top-1 rounded bg-sub py-1 px-2.5 border border-transparent text-main text-center text-sm hover:text-white transition-all shadow-sm hover:shadow focus:shadow-none hover:bg-main active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                          >
                            {isLoadingCoupon ? 
                            <div className='flex justify-center items-center min-w-14 min-h-5'>
                              <svg className="w-4 h-4 text-secondary animate-spin" viewBox="0 0 64 64" fill="none"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                <path
                                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path
                                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-main">
                                </path>
                              </svg>
                            </div> 
                            : "Adicionar"}
                          </button>
                        </div>
                      </div>
                      </div>
                      {coupon !== '' && !coupon_id && (
                      <div className="bg-red-100 border border-red-300 text-red-700 rounded-md mt-4 p-3 w-[270px]">
                        <div className="flex items-center justify-between">
                          <div>
                            <FiAlertTriangle className="inline mr-2 text-xl" />
                            <span className="font-medium text-sm">
                            O cupom &quot;<strong>{coupon}</strong>&quot; não é válido. Verifique o código ou tente outro cupom.
                            </span>
                          </div>
                          <button
                            onClick={() => clearCoupon()}
                            className="text-red-700 text-sm hover:underline"
                          >
                            <FaRegTrashAlt className="text-red-700 mr-1" />
                          </button>
                        </div>
                      </div>
                      )}

                      {coupon_id ? (
                        <>
                          <div className='text-green-700 pl-2 w-[270px]'>
                            <div className='text-xs mb-2'>
                              <span>Cupom </span>
                              <strong>{coupon_id}</strong>
                              <span> aplicado com sucesso.</span>
                            </div>
                            {['Value', 'Percent'].includes(couponType) ? (
                              <>
                                {discount(couponData?.value_plan, couponData?.value) ? (
                                  <>
                                    <div className='text-xs'>
                                      <span>
                                        Desconto: -R$
                                        {discount(
                                          couponData?.value_plan,
                                          couponData?.value
                                        )}
                                      </span>
                                    </div>
                                  </>
                                ) : null}
                              </>
                            ) : null}

                            {couponType === 'SVA' ? (
                              <div className='mb-1 text-xs '>
                                <div className='text-green-700 mb-2'>
                                  <span>Benefícios adicionados: </span>
                                </div>
                                <div className='mb-2 flex flex-wrap justify-start'>
                                  {couponData?.sva?.map((service: any, index2: any) => {
                                    return (
                                      <div
                                        key={index2}
                                        className='bg-white mr-2 w-[50px] h-[50px] rounded-full flex justify-center items-center border border-main'
                                      >
                                        <img
                                          src={service.icon}
                                          alt={service.name}
                                          title={service.name}
                                          className='object-contain rounded-full'
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div className='flex justify-end'>
                            <div
                              onClick={() => clearCoupon()}
                              className='flex pl-2 hover:bg-gray-200 rounded-md p-1 hover:cursor-pointer'
                            >
                              <FaRegTrashAlt className='text-red-700 mr-1' />
                              <span className='text-red-700 text-xs'>
                                Remover cupom
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
          </>
        ) : null}
      </>
    );
  }

  // Card de input para cupom de desconto
  function couponCardMobile() {
    return (
      <>
        {coupon_active ? (
          <div className="w-[270px] bg-gray-200 p-2 rounded-b-md">
            <Accordion type="single" collapsible className="w-full mb-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-main">
                  <div>
                    <span>Tem um cupom de desconto?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-1">
                    <div className="flex items-center mb-1">
                      <div className="mr-1">
                        <RiCoupon3Fill className="text-main" />
                      </div>
                      <div>
                        <span className="text-main text-xs">
                          Adicionar cupom
                        </span>
                      </div>
                    </div>
                    <div className="text-xs sm:flex block items-center">
                      <div className="sm:mb-0 mb-2">
                        <input
                          type="text"
                          disabled={isLoadingCoupon}
                          {...register("coupon_mobile")}
                          placeholder="Digite seu cupom"
                          className="w-full placeholder:text-slate-500 text-slate-700 text-sm border border-slate-300 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                      </div>
                      <button
                        onClick={() => getCoupon("mobile")}
                        className="w-full rounded bg-sub py-1 px-2.5 border border-transparent text-main text-center text-sm hover:text-white transition-all shadow-sm hover:shadow focus:shadow-none hover:bg-main active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        {isLoadingCoupon ? 
                            <div className='flex justify-center items-center min-w-28 min-h-5'>
                              <svg className="w-4 h-4 text-secondary animate-spin" viewBox="0 0 64 64" fill="none"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                <path
                                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path
                                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-main">
                                </path>
                              </svg>
                            </div> 
                            : "Adicionar cupom"}
                      </button>
                    </div>
                  </div>
                  {coupon !== '' && !coupon_id && (
                  <div className="bg-red-100 border border-red-300 text-red-700 rounded-md mt-4 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <FiAlertTriangle className="inline mr-2 text-xl" />
                        <span className="font-medium text-sm">
                        O cupom &quot;<strong>{coupon}</strong>&quot; não é válido. Verifique o código ou tente outro cupom.
                        </span>
                      </div>
                      <button
                        onClick={() => clearCoupon()}
                        className="text-red-700 text-sm hover:underline"
                      >
                        <FaRegTrashAlt className="text-red-700 mr-1" />
                      </button>
                    </div>
                  </div>
                  )}
                  {coupon_id && (
                    <>
                      <div className="text-green-700 pl-2">
                        <div className="text-xs mb-2">
                          <span>Cupom </span>
                          <strong>{coupon_id}</strong>
                          <span> aplicado com sucesso.</span>
                        </div>
                        {["Value", "Percent"].includes(couponType) && (
                          <>
                            {discount(
                              couponData?.value_plan,
                              couponData?.value
                            ) && (
                              <div className="text-xs">
                                <span>
                                  Desconto: -R$
                                  {discount(
                                    couponData?.value_plan,
                                    couponData?.value
                                  )}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        {couponType === "SVA" && (
                          <div className="mb-1 text-xs">
                            <div className="text-green-700 mb-2">
                              <span>Benefícios adicionados: </span>
                            </div>
                            <div className="mb-2 flex flex-wrap justify-start">
                              {couponData?.sva?.map(
                                (service: any, index2: any) => (
                                  <div
                                    key={index2}
                                    className="bg-white mr-2 w-[50px] h-[50px] rounded-full flex justify-center items-center border border-main"
                                  >
                                    <img
                                      src={service.icon}
                                      alt={service.name}
                                      title={service.name}
                                      className="object-contain rounded-full"
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <div
                          onClick={() => clearCoupon()}
                          className="flex pl-2 hover:bg-gray-200 rounded-md p-1 hover:cursor-pointer"
                        >
                          <FaRegTrashAlt className="text-red-700 mr-1" />
                          <span className="text-red-700 text-xs">
                            Remover cupom
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ) : null}
      </>
    );
  }

  async function getCoupon(from: string) {
    let coupon_code = '';
    
  
    if (from === 'mobile') {
      coupon_code = getValues('coupon_mobile');
    } else {
      coupon_code = getValues('coupon_desktop');
    }
  
    console.log(coupon_code);
    setCoupon(coupon_code);
    if ([null, undefined, ''].includes(coupon_code)) {
      toast.error('Insira um cupom válido');
      return;
    }
  
    setLoadingCoupon(true);
  
    const params = {
      session_id: getCookie('session_id') ?? 0,
      coupon: String(coupon_code),
      city_code: getCookie('city_external'),
      plan_id: Number(selectedPlan),
      pathname: String(pathname),
    };
  
    const request = await EcommerceService.validateCoupon(params);
    const status = request.status;
    const data = request.data;
  
    console.log("Response: ", data);
  
    if (status >= 200) {
      const valid_coupon = data?.status;
  
      if (valid_coupon) {
        aplicateCoupon(coupon_code, data?.data);
        toast.success(`Cupom '${coupon_code}' adicionado`);
      }
  
      setLoadingCoupon(false);
    }
  
    if (status >= 400) {
      setCoupon(coupon_code);
      setLoadingCoupon(false);
    }
  }
  

  function aplicateCoupon(coupon: string, data: any) {
    setCouponID(coupon);
    setCouponData(data);
    setCouponType(data?.discount_type);
    console.log(data?.discount_type);
  }

  function clearCoupon() {
    setCouponID(false);
    setCouponData({});
    setCouponType('');
    setCoupon('');
    setValue('coupon_desktop', '');
    setValue('coupon_mobile', '');
  }

  function discount(value_plan: any, value: any) {
    try {
      const init = Number(value_plan);
      const second = Number(value);
      return `${(init - second).toFixed(2)}`;
    } catch (err) {
      return false;
    }
  }

  // Card do plano selecionado
  function planCardWithCoupon() {
    return (
      <>
        <div className='flex justify-center mb-2 z-10'>
          <div className='rounded-xl p-4 bg-main w-[270px] border border-secondary'>
            <div className='text-center'>
              <span className='text-white text-4xl'>
                {couponData?.plan?.title}
              </span>
            </div>
            <div className='text-center mb-4'>
              <span className='text-sub text-xl'>
                {couponData?.plan?.subtitle}
              </span>
            </div>

            <div className='mb-4'>
              {couponData?.plan?.contents?.map((content: any, index: any) => {
                return (
                  <div
                    key={index}
                    className='text-center text-white mb-2 text-sm'
                  >
                    <span>{content.name}</span>
                  </div>
                );
              })}
            </div>

            <div className='mb-6'>
              <div className='text-center text-white mb-2 text-sm'>
                <span>Apps de conteúdo:</span>
              </div>
              <div className='mb-2 flex flex-wrap justify-center'>
                {couponData?.plan?.services?.map(
                  (service: any, index2: any) => {
                    return (
                      <div
                        key={index2}
                        className='bg-white mr-2 w-[50px] h-[50px] rounded-full flex justify-center items-center'
                      >
                        <img
                          src={service.icon}
                          alt={service.name}
                          title={service.name}
                          className='object-contain rounded-full'
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className='mb-2'>
              {couponType === 'SVA' ? (
                <>
                  {couponData?.plan?.promo === true ? (
                    <div>
                      <div
                        className={`flex justify-center items-center mt-8 ${
                          couponData?.plan?.highlight
                            ? 'text-white'
                            : 'text-black'
                        }`}
                      >
                        <div className='flex items-center'>
                          <span className='text-sub text-2xl'>R$</span>
                        </div>
                        <div className='mr-1'>
                          <span className='text-sub text-4xl font-medium'>
                            {' '}
                            {couponData?.plan?.promo_price}
                          </span>
                        </div>
                        <div>
                          <div className='text-sub'>
                            <span className='text-xs mt-[-10px]'>/mês</span>
                          </div>
                        </div>
                      </div>

                      <div className='text-center mb-1 text-white'>
                        <span className='text-xs'>{`Por ${couponData?.plan?.promo_period} meses`}</span>
                      </div>
                      <div className='text-center mb-4 text-white'>
                        <span className='text-xs'>{`A partir do ${
                          Number(couponData?.plan?.promo_period) + 1
                        }º mês R$ ${couponData?.plan?.price}`}</span>
                      </div>
                    </div>
                  ) : (
                    <div className='flex justify-center text-white text-sm'>
                      <div className='flex'>
                        <div>
                          <span className='text-sub text-2xl'>R$</span>
                        </div>
                        <div>
                          <span className='text-sub text-4xl font-medium'>
                            {couponData?.plan?.price}
                          </span>
                          <span className='text-sub text-sm'>/mês</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}

              {['Value', 'Percent'].includes(couponType) ? (
                <>
                  <div className='text-center'>
                    <span className='text-white text-xs'>
                      de R$ {couponData.value_plan} por
                    </span>
                  </div>
                  <div className='flex justify-center text-white text-sm'>
                    <div className='flex'>
                      <div>
                        <span className='text-sub text-2xl'>R$</span>
                      </div>
                      <div>
                        <span className='text-sub text-4xl font-medium'>
                          {couponData?.value}
                        </span>
                        <span className='text-sub text-sm'>/mês</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <div className='text-center'>
                <span className='text-sub text-xs'>na conta digital</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  async function checkActivationFeature() {
    const request = await EcommerceService.checkFeatureActivation();

    if (request.status >= 200) {
      const data = request.data;
      const cupomFeature = data.find(
        (feature: { identification: string }) =>
          feature.identification === 'coupon_input_on_ecommerce'
      );
      console.log('Cupom feature: ', cupomFeature.isActive);
      const birthdateFeature = data.find(
        (feature: { identification: string }) =>
          feature.identification === 'birthdateCheck'
      );
      //   console.log('Birthdate feature: ', birthdateFeature.isActive);

      if (cupomFeature) {
        setCouponActive(cupomFeature.isActive);
      }
      if (birthdateFeature) {
        setBirthDateCheck(birthdateFeature.isActive);
      }
    }
  }
}
