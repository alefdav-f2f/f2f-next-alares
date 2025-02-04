'use client'
import PageTitle from '@/app/components/PageTitle';
import React from 'react';
import icon from '@/img/icon/work.png';
import banner from '@/img/banners/Banners_TrabalheConosco_V8.png';
import bannerMobile from '@/img/banners/Banners_Mobile_TrabalheConosco_V5.png';
import medium from '@/img/banners/medium-banner.jpg';
import mediumMobile from '@/img/banners/medium-banner-mobile.jpg';
import alem from '@/img/banners/ir-alem.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { externalURL } from '@/app/api/externalURL';
import Banner from '@/app/components/Banner';

export default function WorkWithUsPage() {

    const router = useRouter();

    React.useEffect(() => {
        
    }, [])

    return (
        <div className='pb-8'>
            <PageTitle icon={icon} title='Trabalhe Conosco' />

            <div className="mb-6">
                <Banner type={6} />
            </div>

            <div className='flex justify-center'>
                <div className='py-16 px-2 max-w-[800px]'>
                    <div className='text-center mb-4'>
                        <h2 className='text-sub text-4xl'> Já pensou em fazer parte da Alares? </h2>
                    </div>

                    <div className='text-center mb-2'>
                        <span className='text-main font-light'> Somos uma empresa que oferece conexão de qualidade, impulsionada pela nossa rede de Fibra Óptica, a milhares de cidadãos brasileiros. Dessa forma, famílias e empresas regionais podem dar asas aos seus projetos. </span>
                    </div>
                    <div className='text-center'>
                        <span className='text-main font-light'> Estamos presentes em 7 estados do nordeste e do sudeste do Brasil, somando 228  cidades. Para atender nossa rede, contamos com mais de 2.700 colaboradores.</span>
                    </div>
                </div>
            </div>

            <div onClick={() => router.push(externalURL.gupy)} className='hover:cursor-pointer'>
                <Image src={medium} alt={''} className='hidden sm:flex w-full' />
                <Image src={mediumMobile} alt={''} className='sm:hidden flex' />
            </div>

            <div className='py-14'>
                <PageTitle icon={''} title='Asas às Pessoas' />
            </div>

            <div className='flex justify-center mb-10 p-2'>
                <div className='w-[800px] bg-main rounded-2xl p-6'>
                    <div className='text-center mb-4'>
                        <span className='text-white font-light'>Temos paixão por pessoas. Por isso, investimos em nossos colaboradores, para que possam ir além em suas carreiras profissionais. Acreditamos também na riqueza de vozes, culturas e saberes de cada canto do país. Valorizamos a diversidade em todas as formas e abrimos espaços para que as pessoas se empoderem e ganhem coragem para mostrar suas ideias.</span>
                    </div>
                    <div className='text-center'>
                        <span className='text-white font-light'>Para embarcar nessa jornada com a gente, é preciso ter fibra! Você está pronto para impulsionar sua vida profissional? Então junte-se à Alares!</span>
                    </div>

                    <div className='flex justify-center py-8'>
                        <Image src={alem} alt={''} className='w-80' />
                    </div>

                    <div className='flex justify-center'>
                        <button onClick={() => router.push(externalURL.gupy)} className='py-2 px-8 text-white bg-main rounded-3xl border border-secondary hover:bg-hover'>
                            Confira nossas vagas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
