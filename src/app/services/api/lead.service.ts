import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";



const LeadService = {

    list: async function(params: any) {
        const request: any = await axiosInterceptorInstance.get(`/lead/list/`, {params})
        return handleResponse(request);
    },

    upload: async function(data: any) {
        const request: any = await axiosInterceptorInstance.post(`/lead/upload/`, data)
        return handleResponse(request);
    },
}

export default LeadService;