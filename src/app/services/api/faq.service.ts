import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    page: number
    perPage: number
    isActive: boolean | null
}


const FaqService = {

    duplicateCategory: async function (category_id: string) {

        const request: any = await axiosInterceptorInstance.post(`/faq/category/duplicate/${category_id}`)
        return handleResponse(request);
    },

    deleteCategory: async function (category_id: string) {

        const request: any = await axiosInterceptorInstance.delete(`/faq/delete/category/${category_id}`)
        return handleResponse(request);
    },

    reorderFAQ: async function (data: any) {

        const request: any = await axiosInterceptorInstance.post(`/faq/reorder/`, data)
        return handleResponse(request);
    },

    massiveUpdate: async function(data: any) {
        const request: any = await axiosInterceptorInstance.post('/faq/massive', data)
        return handleResponse(request);
    },
}

export default FaqService;