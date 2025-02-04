import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    page: number
    perPage: number
    isActive: boolean | null
}


const SystemService = {

    reportError: async function(data: any) {
        const request: any = await axiosInterceptorInstance.post('/health/report', data)
        return handleResponse(request);
    },

    getReport: async function() {
        const request: any = await axiosInterceptorInstance.get('/health/report')
        return handleResponse(request);
    },

    getSocialMedia: async function() {
        const request: any = await axiosInterceptorInstance.get('/company/get-all-social-media')
        return handleResponse(request);
    }
}

export default SystemService;