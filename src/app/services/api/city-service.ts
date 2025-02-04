import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    page: number
    perPage: number
    isActive: boolean | null
}


const CityService = {

    paginate: async function(params: getParams) {
        const request: any = await axiosInterceptorInstance.get('/city/get-all', { params })
        return handleResponse(request);
    }
}

export default CityService;