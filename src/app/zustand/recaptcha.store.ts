import { create } from 'zustand'

interface ReCaptchaProps {
  reCAPTCHA: boolean
  recaptchaToken: string | null

  setRECAPTCHA: (reCAPTCHA: boolean) => void
  setRecaptchaToken: (recaptchaToken: string | null) => void
}

const Store = create<ReCaptchaProps>()

export const useReCaptcha = Store((set) => ({
  recaptchaToken: null,
  reCAPTCHA: false,

  setRecaptchaToken: (recaptchaToken: string | null) => set({ recaptchaToken }),
  setRECAPTCHA: (value: boolean) => set({ reCAPTCHA: value }), 
}))


export default useReCaptcha