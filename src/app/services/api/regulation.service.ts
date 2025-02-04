import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";



const RegulationService = {

    getDocument: async function(id: string) {
        const request: any = await axiosInterceptorInstance.get(`/regulation/get-preview-regulation/${id}`)
        return handleResponse(request);
    },

    paginate: async function(params: any) {
        const request: any = await axiosInterceptorInstance.get(`/regulation/get-all`, {params})
        return handleResponse(request);
    },

    termsAndConditions: async function() {
        const request: any = await axiosInterceptorInstance.get(`/terms-and-conditions/document`);
        return handleResponse(request);
    },

}

export default RegulationService;