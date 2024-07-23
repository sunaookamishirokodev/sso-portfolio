"use client";
import { useEffect } from "react";
import { _redirect } from "./actions";

export default function RootPage() {
    useEffect(() => {
        _redirect("/login");
    }, []);

    return <main></main>;
}
