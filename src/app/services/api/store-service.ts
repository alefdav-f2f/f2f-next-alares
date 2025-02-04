import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    page: number
    perPage: number
    isActive: boolean | null
}


const StoreService = {

    combolist: async function() {
        const request: any = await axiosInterceptorInstance.get('/store/get-all-without-auth')
        return handleResponse(request);
    },

    massiveUpdate: async function(data: any) {
        const request: any = await axiosInterceptorInstance.post('/store/massive', data)
        return handleResponse(request);
    },
}

export default StoreService;