import Icon_1 from "@/img/icon/menu-icon-1.png";
import Icon_2 from "@/img/icon/menu-icon-2.png";
import Icon_3 from "@/img/icon/menu-icon-3.png";
import Icon_4 from "@/img/icon/menu-icon-4.png";
import Icon_5 from "@/img/icon/icon-internet.svg";
import Icon_6 from "@/img/icon/icon-internet-tv.svg";
import Icon_7 from "@/img/icon/icon-conteudo.png";
import Icon_8 from "@/img/icon/icon-2-via-boleto.svg";
import Icon_9 from "@/img/icon/icon-autoatendimento.svg";
import Icon_11 from "@/img/icon/icon-user-3.svg";
import Icon_12 from "@/img/alares-icon.png";
import Icon_13 from "@/img/icon/business-icon.png";
import Icon_14 from "@/img/icon/work.png";
import Icon_15 from "@/img/icon/menu-icon-4b.png";
import { externalURL } from "../api/externalURL";
import { internalPATH } from "../api/internalPATH";
import axiosInterceptorInstance from "../api/axiosInterceptor";



interface navigationProps {
    page: number
    title: string
    division: number
    icon: any
    icon2?: any
    path: any
    active: any
    external: boolean
    check?: boolean
}

export const navItem: navigationProps[] = [
    { page: 1, title: 'Conheça a Alares', division: 1, icon: Icon_1, icon2: Icon_12, path: internalPATH.sobre_alares, active: false, external: false },
    { page: 2, title: 'Trabalhe Conosco', division: 1, icon: Icon_2, icon2: Icon_14, path: internalPATH.trabalhe_conosco, active: false, external: false },
    { page: 3, title: 'Para Empresas', division: 1, icon: Icon_3, icon2: Icon_13, path: externalURL.alares_business, active: false, external: true },
    { page: 4, title: 'Indo Além', division: 1, icon: Icon_4, icon2: Icon_15, path: internalPATH.indo_alem, active: false, external: false },
    { page: 5, title: 'Internet', division: 2, icon: Icon_5, path: internalPATH.internet, active: false, external: false, check: false },
    { page: 6, title: 'Planos de Internet + TV', division: 2, icon: Icon_6, path: internalPATH.internet_tv, active: false, external: false, check: true },
    { page: 7, title: 'Serviços Adicionais', division: 2, icon: Icon_7, path: internalPATH.servicos_adicionais, active: false, external: false, check: false },
    { page: 8, title: '2ª via do boleto', division: 2, icon: Icon_8, path: internalPATH.segunda_via_do_boleto, active: false, external: false, check: false },
    { page: 9, title: 'Autoatendimento', division: 2, icon: Icon_9, path: internalPATH.FAQ, active: false, external: false, check: false },
    // { title: 'Buscar', icon: Icon_10, path: '', active: false, external: false, check: false },
    { page: 11, title: 'Central do Assinante', division: 2, icon: Icon_11, path: externalURL.center, active: false, external: true, check: false },
];

export function getNavigationItem(division: number) {
    const array = navItem.filter((n: any) => n.division === division);
    return array;
}

// Função principal para navegação do site
export function navigation(page: number, params: string | false, type: string, value?: string) {

    //Captura parametros da URL
    let currentParams = '';
    params ? currentParams = String(params) : '';

    //Procura página em questão e retorna rota
    const path = navItem.find((n: any) => n.page === page)?.path;

    let final_path = '';

    //Verifica qual tipo de navegação
    switch (type) {
        case 'home': { //Navegação para home
            final_path = `${internalPATH.home}/${currentParams}`;
            break;
        }
        case 'ecommerce': { //Navegação para fluxo do ecommerce adiciona parâmetros plano URL
            final_path = `${internalPATH.contrate_ja}/${currentParams}&plano=${value}`;
            break;
        }
        case 'document': { //Navegação para fluxo do ecommerce adiciona parâmetros plano URL
            final_path = `${internalPATH.contratos_e_regulamentos}/${currentParams}&plano=${value}`;
            break;
        }
        case 'sva': { //Navegação para slug do SVA
            final_path = `${internalPATH.servicos_adicionais}/${value}/${currentParams}`;
            break;
        }
        case 'services': { //Navegação para serviços adicionais
            final_path = `${internalPATH.servicos_adicionais}/${currentParams}`;
            break;
        }
        default: {
            //A navegação padrão consiste em manter o parâmetro de cidade na URL
            final_path = `${path}/?${currentParams}&plano=${value}`;
        }
    }

    return final_path;
}

export async function getClientIP() {

    try {
        // const request = await axiosInterceptorInstance.get('https://api.ipify.org/?format=json');
        const request = await axiosInterceptorInstance.get('https://api.bigdatacloud.net/data/client-ip');
        const ip = request?.data?.ipString;
        if (ip) {
            return String(ip)
        } else {
            return '127.0.0.1'
        }
    }
    catch (err) {
        return '127.0.0.1'
    }
}

export function openWhatsapp(text: string) {

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log('is mobile =' + isMobile)
    const whatsappLink = isMobile
        ? externalURL.whatsappMobile // Para dispositivos móveis
        : externalURL.whatsappDesktop // Para navegadores de desktop

    window.open(whatsappLink + '&text=' + encodeURIComponent(text), '_blank');

}
