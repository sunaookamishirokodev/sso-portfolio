"use client";

import Link from "next/link";
import { Dispatch, ForwardedRef, forwardRef, SetStateAction, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormProps {
    setIdentify: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    error: string;
    password: string;
    isPending: boolean;
}

export default forwardRef(function LoginForm(
    { setIdentify, setPassword, error, password, isPending }: LoginFormProps,
    ref: ForwardedRef<HTMLButtonElement>
) {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    return (
        <form className="text-sm" onSubmit={(e) => e.preventDefault()}>
            <span className="text-2xl font-semibold">Login</span>
            <input
                onChange={(e) => setIdentify(e.currentTarget.value)}
                type="text"
                className="w-full h-10 focus:outline-none border-b mt-5 font-light border-black/80"
                placeholder="Enter email or username"
            />
            <div className="w-full h-10 border-b mt-5 border-black/80 flex">
                <input
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type={isHidden ? "password" : "text"}
                    className="h-full flex-1 focus:outline-none font-light"
                    placeholder="Enter password"
                />
                <div
                    onClick={() => setIsHidden(!isHidden)}
                    className={`flex items-center cursor-pointer h-full ${password ? "block" : "hidden"}`}
                >
                    {isHidden ? <FaEye /> : <FaEyeSlash />}
                </div>
            </div>
            <span className={`${error ? "block animate-horizontal-shaking" : "hidden"} my-1 text-red-500`}>
                {error}
            </span>
            <div className="mt-3">
                <span>Don&apos;t have an account?</span>{" "}
                <Link href={"/register"} className="text-cyan-500">
                    Create now!
                </Link>
            </div>
            <Link href={"/recovery"} className="text-cyan-500">
                You can no longer access your account?
            </Link>
            <button
                disabled={isPending}
                ref={ref}
                type="submit"
                className={`px-5 py-2 float-right mt-5  transition-colors ${
                    isPending ? "bg-cyan-400/50 text-black/50" : "bg-cyan-400 hover:bg-cyan-500"
                }`}
            >
                Continue
            </button>
        </form>
    );
});
