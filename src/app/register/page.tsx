"use client";
import Image from "next/image";

export default function LoginPage() {
	return (
		<main className="box box-transition flex flex-col gap-5">
			<div className="flex items-center gap-4">
				<Image src={"/shiroko_logo.jpg"} height={46} width={46} alt="Shiroko Logo" className="rounded-full" />
				<span className="text-xl font-semibold text-gray-500">Shiroko Network</span>
			</div>
		</main>
	);
}
