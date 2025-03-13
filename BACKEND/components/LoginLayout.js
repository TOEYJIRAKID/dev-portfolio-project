import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

export default function LoginLayout({children}) {

    const { data: session, status } = useSession();

    if (status === "loading") {
        // loading state, loader or any other indicator
        return <div className="full-h flex flex-center">
            <div className="loading-bar">Loading</div>
        </div>
    }

    const router = useRouter();

    if (!session) {
        router.push('/auth/signin');
        return null;
    }

    if (session) {
        return <>
            {children}
        </>
    }

}