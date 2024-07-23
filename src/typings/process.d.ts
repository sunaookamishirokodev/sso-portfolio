declare namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_API_BASE_URL: string;
		readonly NEXT_PUBLIC_BASE_URL: string;
		readonly NEXT_PUBLIC_EMAIL_ADDRESS: string;
		readonly NEXT_PUBLIC_ROOT_BASE_URL: string
	}
}
