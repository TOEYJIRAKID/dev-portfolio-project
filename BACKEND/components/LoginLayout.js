import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

export default function LoginLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== "loading" && !session) {
            router.push('/auth/signin');
        }
    }, [session, status, router]);

    if (status === "loading" || !session) {
        // loading state, loader or any other indicator
        return <div className="full-h flex flex-center">
            <div className="loading-bar">Loading</div>
        </div>
    }

    return <>{children}</>;
}