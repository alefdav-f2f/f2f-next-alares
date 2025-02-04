import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    /* page: number
    perPage: number */
    isActive: boolean | null
}


const BannerService = {

    paginate: async function(params: getParams) {
        const request: any = await axiosInterceptorInstance.get('/banner/get-all', { params })
        return handleResponse(request);
    },

    massiveUpdate: async function(data: any) {
        const request: any = await axiosInterceptorInstance.post('/banner/massive', data)
        return handleResponse(request);
    },

    delete: async function(id: any) {
        const request: any = await axiosInterceptorInstance.post(`/banner/delete/${id}`)
        return handleResponse(request);
    },
}

export default BannerService;