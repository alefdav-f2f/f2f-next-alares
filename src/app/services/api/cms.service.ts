import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";



const CmsService = {

    getContent: async function(params: any) {
        const request: any = await axiosInterceptorInstance.get(`/cms/content/`, {params})
        return handleResponse(request);
    },
}

export default CmsService;