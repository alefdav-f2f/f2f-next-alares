import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { handleResponse } from "../handleResponse.service";

const ProfileService = {

    list: async function() {
        const request: any = await axiosInterceptorInstance.get(`/profile/list`)
        return handleResponse(request);
    },

    getPermission: async function() {
        const request: any = await axiosInterceptorInstance.get(`/profile/list-permission`)
        return handleResponse(request);
    },

    byUser: async function() {
        const request: any = await axiosInterceptorInstance.get(`/profile/permission-by-user`)
        return handleResponse(request);
    },

    create: async function(data: any) {
        const request: any = await axiosInterceptorInstance.post(`/profile/create`, data)
        return handleResponse(request);
    },

    update: async function(data: any) {
        const request: any = await axiosInterceptorInstance.post(`/profile/update`, data)
        return handleResponse(request);
    },

    detail: async function(id: string) {
        const request: any = await axiosInterceptorInstance.get(`/profile/detail/${id}`)
        return handleResponse(request);
    },

}

export default ProfileService;