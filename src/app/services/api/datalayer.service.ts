import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface buttonClickProps {
    event: string
    city: string
    state: string
    selected_plan: string
    value: string
    oferta_id: string
    local_page: string
}

interface props {
    event: string
    city: string
    state: string
    selected_plan: string
    value: string
    oferta_id: string
}

type WindowWithDataLayer = Window & {
    dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;


const DataLayerService = {

    postButtonClick: async function (data: buttonClickProps) {

        window.dataLayer = window.dataLayer || [];
        
        const request = await window.dataLayer.push({
            event: data.event,
            city: data.city, // Retornar cidade selecionada para navegar no site
            state: data.state, // Retornar estado selecionado para navegar no site
            selected_plan: data.selected_plan, // Retornar o plano selecionado
            value: data.value, // Retornar valor do plano selecionado
            oferta_id: data.oferta_id, // Retornar o ID da oferta selecionado.
            local_page: data.local_page // Retornar a URL que ocorreu o clique no card
        })

        console.log(request)
    },

    senDataLayer: async function (data: any) {

        window.dataLayer = window.dataLayer || [];


        const resp = await window.dataLayer.push({
            event: data.event,
            city: data.city, // Retornar cidade selecionada para navegar no site
            state: data.state, // Retornar estado selecionado para navegar no site
            selected_plan: data.selected_plan, // Retornar o plano selecionado
            value: data.value, // Retornar valor do plano selecionado
            oferta_id: data.oferta_id, // Retornar o ID da oferta selecionado.
        })

        console.log(resp)
    },

    sender: async function (data: any) {

        window.dataLayer = window.dataLayer || [];

        const resp = await window.dataLayer.push(data)

        console.log(resp)
    }

}

export default DataLayerService;