"use client";
import LoginForm from "@/components/LoginForm";
import TwoFactorAuthSelect from "@/components/TwoFactorAuthSelect";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { _redirect } from "../actions";
import EnterCode from "@/components/EnterCode";

export default function LoginPage() {
	const [identify, setIdentify] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [method, setMethod] = useState<null | "email" | "backup_code" | "authenticator">(null);
	const [error, setError] = useState<string>("");
	const [code, setCode] = useState<number | null>(null);
	const [otp, setOtp] = useState<string>("");
	const [isPending, setIsPending] = useState<boolean>(false);

	const searchParams = useSearchParams();
	const redirect_uri = searchParams.get("redirect_uri");

	const continueRef = useRef<HTMLButtonElement>(null);
	const enterCodeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (method) {
			if (method === "email") {
				setError("");

				axios
					.get(
						`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/common/login/2fa/email?grant_type=authorization_code`,
						{ withCredentials: true },
					)
					.then((res) => setCode(res.status))
					.catch((error) => setError(error.response.data.msg));
			} else {
				setCode(201);
			}
		}
	}, [method]);

	useEffect(() => {
		if (continueRef.current) {
			continueRef.current.onclick = async (e) => {
				e.preventDefault();
				try {
					setIsPending(true);
					setError("");
					setCode(null);

					if (!identify || !password) {
						setIsPending(false);
						return setError("Missing content");
					}

					if (identify.length < 4) {
						setIsPending(false);
						return setError("Username must be at least 4 characters");
					}

					if (password.length < 8) {
						setIsPending(false);
						return setError("Password must be at least 8 characters");
					}

					if (password.length > 32) {
						setIsPending(false);
						return setError("Password have a maximum of 32 characters");
					}

					const res = await axios.post(
						`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/common/login/`,
						{ identify, password },
						{ withCredentials: true },
					);

					if (res.status === 200) {
						setIsPending(false);
						return _redirect(redirect_uri || process.env.NEXT_PUBLIC_ROOT_BASE_URL);
					}

					setIsPending(false);
					setCode(res.status);
				} catch (error: any) {
					setIsPending(false);
					setError(error.response.data.msg);
				}
			};
		}
	}, [identify, password, redirect_uri, code]);

	useEffect(() => {
		if (enterCodeRef.current) {
			enterCodeRef.current.onclick = async (e) => {
				e.preventDefault();
				try {
					setIsPending(true);
					setError("");

					if (otp.length !== 6) {
						return setError("Otp is a 6-digit number sequence");
					}

					const res = await axios.post(
						`${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/common/login/2fa/${method}`,
						{ grant_type: "authorization_code", code: otp },
						{ withCredentials: true },
					);

					if (res.status === 200) {
						setIsPending(false);
						return _redirect(redirect_uri || process.env.NEXT_PUBLIC_ROOT_BASE_URL);
					}
				} catch (error: any) {
					setIsPending(false);
					setError(error.response.data.msg);
				}
			};
		}
	}, [method, otp, redirect_uri]);

	return (
		<main className="box box-transition flex flex-col gap-5">
			<div className="flex items-center gap-4">
				<Image src={"/shiroko_logo.jpg"} height={46} width={46} alt="Shiroko Logo" className="rounded-full" />
				<span className="text-xl font-semibold text-gray-500">Shiroko Network</span>
			</div>
			{code === null ? (
				<LoginForm
					ref={continueRef}
					error={error}
					password={password}
					setIdentify={setIdentify}
					setPassword={setPassword}
					isPending={isPending}
				/>
			) : code === 202 ? (
				<TwoFactorAuthSelect setError={setError} setMethod={setMethod} error={error} isPending={isPending} />
			) : code === 201 ? (
				<EnterCode
					setOtp={setOtp}
					setError={setError}
					otp={otp}
					ref={enterCodeRef}
					error={error}
					code={code}
					method={method}
					setCode={setCode}
					isPending={isPending}
				/>
			) : (
				<span>An errors occur</span>
			)}
		</main>
	);
}
