"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TwoFactorAuthSelectProps {
    setMethod: Dispatch<SetStateAction<"email" | "backup_code" | "authenticator" | null>>;
    error: string;
    isPending: boolean;
}
export default function TwoFactorAuthSelect({ setMethod, error, isPending }: TwoFactorAuthSelectProps) {
    const [value, setValue] = useState<"email" | "backup_code" | "authenticator" | null>(null);

    return (
        <div className="flex flex-col gap-5 items-start">
            <span className="text-2xl font-semibold mb-5">Two factor auth method</span>
            <ul className="w-full flex flex-col gap-1">
                {[
                    { label: "Email authentication", method: "email" },
                    { label: "Backup code", method: "backup_code" },
                    { label: "Authenticator application", method: "authenticator" },
                ].map(({ label, method }, i) => {
                    return (
                        <li
                            key={i}
                            className={`p-2 pl-4 transition-all bg-gray-100 w-full cursor-pointer ${
                                value === method ? "pl-5 !bg-gray-400" : "hover:pl-5 hover:bg-gray-300"
                            }`}
                            onClick={() => setValue(method as "email" | "backup_code" | "authenticator")}
                        >
                            {label}
                        </li>
                    );
                })}
            </ul>
            <span className={`${error ? "block animate-horizontal-shaking" : "hidden"} my-1 text-red-500`}>
                {error}
            </span>
            <button
                disabled={isPending}
                type="button"
                className={`px-5 py-2 ml-auto mt-5  transition-colors ${
                    isPending ? "bg-cyan-400/50 text-black/50" : "bg-cyan-400 hover:bg-cyan-500"
                }`}
                onClick={() => setMethod(value)}
            >
                Continue
            </button>
        </div>
    );
}
