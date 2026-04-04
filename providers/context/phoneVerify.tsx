import { createContext } from "react";


export const PhoneVerifyContext = createContext<{phoneVerify: string, setPhoneVerify: (phoneVerify: string) => void} | null>(null)