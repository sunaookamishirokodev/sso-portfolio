"use client";
import axios from "axios";
import { Dispatch, ForwardedRef, forwardRef, SetStateAction, useEffect, useState } from "react";
import OtpInput from "react-otp-input";

interface EnterCodeProps {
	setOtp: Dispatch<SetStateAction<string>>;
	setCode: Dispatch<SetStateAction<number | null>>;
	setError: Dispatch<SetStateAction<string>>;
	code: number | null;
	otp: string;
	error: string;
	method: null | "email" | "backup_code" | "authenticator";
	isPending: boolean;
}

export default forwardRef(function EnterCode(
	{ setOtp, otp, error, method, setCode, setError, code, isPending }: EnterCodeProps,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	const [countdown, setCountdown] = useState<number>(0);

	useEffect(() => {
		const timeoutID = setTimeout(() => {
			if (countdown > 0) setCountdown(countdown - 1);
		}, 1000);

		return () => {
			clearTimeout(timeoutID);
		};
	}, [countdown]);

	return (
		<form className="flex flex-col">
			<span className="mb-5 text-2xl font-semibold">
				Enter {method === "backup_code" ? "backup code" : "one time password"}
			</span>
			<OtpInput
				value={otp}
				onChange={setOtp}
				numInputs={6}
				inputStyle={""}
				inputType="tel"
				containerStyle={{ display: "flex", justifyContent: "space-between", gap: "4px" }}
				renderInput={({ className, style, ...props }, index) => (
					<input
						className="aspect-square size-full rounded-xl border text-center text-xl"
						key={index}
						{...props}
					/>
				)}
			/>
			<span className={`${error ? "animate-horizontal-shaking block" : "hidden"} my-1 text-red-500`}>
				{error}
			</span>
			<div className="ml-auto mt-5 flex gap-2">
				{method === "email" ? (
					<button
						onClick={async () => {
							setError("");

							try {
								const res = await axios.get(
									`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/common/login/2fa/email?grant_type=authorization_code`,
									{ withCredentials: true },
								);

								setCountdown(60);
								setCode(res.status);
							} catch (error: any) {
								setError(error.response.data.msg);
							}
						}}
						type="button"
						disabled={!!countdown}
						className={`px-5 py-2 transition-colors ${
							!countdown ? "bg-gray-400 text-white hover:bg-gray-500" : "bg-gray-400/50 text-white/50"
						}`}
					>
						Resend {countdown ? `after ${countdown}s` : ""}
					</button>
				) : (
					<></>
				)}
				<button
					ref={ref}
					type="submit"
					disabled={isPending}
					className={`px-5 py-2 transition-colors ${
						isPending ? "bg-cyan-400/50 text-black/50" : "bg-cyan-400 hover:bg-cyan-500"
					}`}
				>
					Continue
				</button>
			</div>
		</form>
	);
});
