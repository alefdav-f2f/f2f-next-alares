'use client'
import Banner from "@/app/components/Banner";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import Map from "@/app/components/Map";
import Plan from "@/app/components/Plan";
import Plan2 from "@/app/components/Plan2";
import SVA from "@/app/components/SVA";
import WhyUs from "@/app/components/WhyUs";
import React from "react";
import { NextSeo } from 'next-seo';
import { getCookie } from "cookies-next";


export default function Home() {

    return (
        <>
            <NextSeo
                title={`Alares | Internet que te leva mais longe em ${getCookie('city_name_uf')}`}
                description="Planos de internet com Wi-Fi e instalação gratuita, residencial e comercial. Conheça a internet da Alares e descubra as ofertas para sua região."
            />
            <div>
                <div className="h-[100vh]">
                    <>
                        <div className="mb-6">
                            <Banner type={1} />
                        </div>
                        <div>
                            <Plan plan_type={'home'}/>
                        </div>
                        <div className="flex justify-center mb-10">
                            <SVA />
                        </div>
                        <div>
                            <WhyUs />
                        </div>
                        <div>
                            <Contact />
                        </div>
                        <div>
                            <Map />
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}
