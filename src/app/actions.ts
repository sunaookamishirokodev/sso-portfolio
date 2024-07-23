"use server";

import { redirect } from "next/navigation";

export const _redirect = (path: string) => redirect(path);
