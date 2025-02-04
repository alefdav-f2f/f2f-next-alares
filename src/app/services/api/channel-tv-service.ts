import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    /* page: number
    perPage: number */
    isActive: boolean | null
}


const ChannelService = {

    get: async function(params: getParams) {
        const request: any = await axiosInterceptorInstance.get('/channel/get-all-channel', { params })
        return handleResponse(request);
    },

    getWithChannel: async function() {
        const request: any = await axiosInterceptorInstance.get('/channel/get-all')
        return handleResponse(request);
    }
}

export default ChannelService;