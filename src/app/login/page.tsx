import { LoginComponent } from "@/components/login";
import Link from "next/link";

export default function LoginPage() {
    return <div>
        <LoginComponent /><br />
        <Link href="/signup">Don't have an account? Sign up here</Link>
    </div>
}