import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    status:boolean;
}

const RelatoryCupom =  {
    getCupom: async function(data: getParams) {
        const request: any = await axiosInterceptorInstance.post(`/ecommerce/coupon/relatory`,data)
        return request.data;
    }
}
export default RelatoryCupom;