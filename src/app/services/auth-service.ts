import toast from "react-hot-toast";
import axiosInterceptorInstance from "../api/axiosInterceptor";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface userProps {
    email: string
    password: string
}

interface cookieProps {
    user: userDataProps
    access_token: string
}

interface userDataProps {
    email: string,
    id: string,
    name: string,
    role: number
}

const today = new Date();
const expires_in = 90;

export async function login(user: userProps) {

    try {
        const response = await axiosInterceptorInstance.post('/users/auth', {
            email: user.email,
            password: user.password
        })

        const data = response?.data;
        const status = response?.data?.status;
        const message = response?.data?.message;

        if (status === true) {
            saveCookie(data)
            return true
        }
        else {
            toast.error(message)
            return false
        }
    }

    catch (error) {
        toast.error('Houve um erro inesperado')
        return false
    }

}

export function logout() {
    clearCookie();
    return true;
}

export function saveCookie(data: cookieProps) {
    setCookie('access_token', data.access_token)
    setCookie('user_data', data.user)
    setCookie('expires_in', today)
}

export function getToken() {
    const access_token = getCookie('access_token');
    return access_token ? String(access_token) : false
}

export function getUserData() {
    const user: userDataProps = JSON.parse(String(getCookie('user_data')));
    return user;
}

export function getUserName() {
    const user: any = getCookie('user_data');

    if(user) {
        const json = JSON.parse(String(getCookie('user_data')))
        return json.name
    } else {
        return false
    }
}

export function clearCookie() {
    deleteCookie('access_token')
    deleteCookie('user_data')
    deleteCookie('expires_in')
}