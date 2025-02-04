import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    page: number
    perPage: number
    isActive: boolean | null
}


const StateService = {

    paginate: async function(params: getParams) {
        const request: any = await axiosInterceptorInstance.get('/uf/paginate', { params })
        return handleResponse(request);
    },

    //By Pass Authentication
    combolistBPA: async function() {
        const request: any = await axiosInterceptorInstance.get('/uf/combolist')
        return handleResponse(request);
    }
}

export default StateService;