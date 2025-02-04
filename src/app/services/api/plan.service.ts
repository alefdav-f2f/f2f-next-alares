import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

interface getParams {
    page: number
    perPage: number
    isActive: boolean | null
}


const PlanService = {

    getPlan: async function(id: string, session_id: any, type?: string) {

        const params = {
            session_id: session_id,
            type: type
        }

        const request: any = await axiosInterceptorInstance.get(`/plan/get-plans/${id}`, { params })
        return handleResponse(request);
    }

}

export default PlanService;