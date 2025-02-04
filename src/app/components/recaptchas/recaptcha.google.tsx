import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
  onVerify: (token: string | null) => void
  refcaptcha: React.LegacyRef<ReCAPTCHA>
  className: string
}

const Recaptcha: React.FC<RecaptchaProps> = ({
  onVerify,
  refcaptcha,
  className,
}: RecaptchaProps) => {

  const APIKEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''

  const handleVerify = async (token: string) => {
    if (token) {
      onVerify(token)
    }
  }

  return (
    <ReCAPTCHA
      sitekey={APIKEY}
      onChange={() => handleVerify}
      size='normal'
      ref={refcaptcha}
      className={className}
    />
  )
}

export default Recaptcha
