import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface RDStationLead {
    name: string
    city: string
    email: string
    phone: string
    i_am_client: string
    url: string | null
    source: string | null
    medium: string | null
    campaign: string | null
    value: string | null
    page_title: string | null
}


const EcommerceService = {

    addressValidation: async function (data: any) {
        const request: any = await axiosInterceptorInstance.get('/address/get-address-by-postcode', {
            params: data
        })
        return handleResponse(request);
    },

    postRDStation: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/ecommerce/create/lead', data)
        return handleResponse(request);
    },

    count: async function () {
        const request: any = await axiosInterceptorInstance.get('/ecommerce/get/count')
        return handleResponse(request);
    },

    getExclusiveOffers: async function (data: any) {
        const request: any = await axiosInterceptorInstance.get('/ecommerce/get-all/exclusive-offer', { data })
        return handleResponse(request);
    },

    detailExclusiveOffer: async function (id: any) {
        const request: any = await axiosInterceptorInstance.get(`/ecommerce/detail/exclusive-offer/${id}`)
        return handleResponse(request);
    },

    createExclusiveOffer: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/ecommerce/exclusive-offer/create', data)
        return handleResponse(request);
    },

    updateExclusiveOffer: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/ecommerce/exclusive-offer/update', data)
        return handleResponse(request);
    },

    deleteExclusiveOffer: async function (id: any) {
        const request: any = await axiosInterceptorInstance.delete(`/ecommerce/exclusive-offer/delete/${id}`)
        return handleResponse(request);
    },

    getSVA: async function (params: any) {
        const request: any = await axiosInterceptorInstance.get('/ecommerce/sva', { params })
        return handleResponse(request);
    },

    validateCoupon: async function (params: any) {
        const request: any = await axiosInterceptorInstance.get('/ecommerce/coupon/validate', { params })
        return handleResponse(request);
    },

    checkFeatureActivation: async function () {
        const request: any = await axiosInterceptorInstance.get('/ecommerce/feature/activation')
        return handleResponse(request);
    },

    updateCouponActivation: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/ecommerce/coupon/update', data)
        return handleResponse(request);
    },
    updateFeature: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/ecommerce/feature/update', data)
        return handleResponse(request);
    },
    createCountdown: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/countdown/create', data)
        return handleResponse(request);
    },
    getCountdowns: async function () {
        const request: any = await axiosInterceptorInstance.get('/countdown/get-all')
        return handleResponse(request);
    },
    getAdminCountdowns: async function () {
        const request: any = await axiosInterceptorInstance.get('/countdown/get-all-admin')
        return handleResponse(request);
    },
    updateCountdown: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/countdown/update', data)
        return handleResponse(request);
    },
    delCountdown: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/countdown/delete', data)
        return handleResponse(request);
    },
    validateBirthday: async function (data: any) {
        const request: any = await axiosInterceptorInstance.post('/ecommerce/birthday/validate', data)
        return handleResponse(request);
    },
}

export default EcommerceService;