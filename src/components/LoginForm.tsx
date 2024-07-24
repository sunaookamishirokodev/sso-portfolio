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
	ref: ForwardedRef<HTMLButtonElement>,
) {
	const [isHidden, setIsHidden] = useState<boolean>(true);

	return (
		<form className="text-sm" onSubmit={(e) => e.preventDefault()}>
			<span className="text-2xl font-semibold">Login</span>
			<input
				onChange={(e) => setIdentify(e.currentTarget.value)}
				type="text"
				className="mt-5 h-10 w-full border-b border-black/80 font-light focus:outline-none"
				placeholder="Enter email or username"
			/>
			<div className="mt-5 flex h-10 w-full border-b border-black/80">
				<input
					onChange={(e) => setPassword(e.currentTarget.value)}
					type={isHidden ? "password" : "text"}
					className="h-full flex-1 font-light focus:outline-none"
					placeholder="Enter password"
				/>
				<div
					onClick={() => setIsHidden(!isHidden)}
					className={`flex h-full cursor-pointer items-center ${password ? "block" : "hidden"}`}
				>
					{isHidden ? <FaEye /> : <FaEyeSlash />}
				</div>
			</div>
			<span className={`${error ? "animate-horizontal-shaking block" : "hidden"} my-1 text-red-500`}>
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
				className={`float-right mt-5 px-5 py-2 transition-colors ${
					isPending ? "bg-cyan-400/50 text-black/50" : "bg-cyan-400 hover:bg-cyan-500"
				}`}
			>
				Continue
			</button>
		</form>
	);
});
