import { useState } from "react";
import { PhoneVerifyContext } from "./context/phoneVerify";

export default function PhoneVerifyProvider({children}: {children: React.ReactNode}) {

    const [phoneVerify, setPhoneVerify] = useState<string>('');

    return (
        <PhoneVerifyContext.Provider value={{phoneVerify, setPhoneVerify}}>
            {children}
        </PhoneVerifyContext.Provider>
    )
}