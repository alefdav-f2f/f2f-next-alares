import toast from "react-hot-toast"

export function handleResponse(response: any) {

    if(response.status >= 500) {
        toast.error(response?.data?.message);
        return false;
    }

    if(response.status >= 400) {
        toast.error(response?.data?.message);
        return false;
    }

    if(response.status >= 200) {
        return response
    }
}