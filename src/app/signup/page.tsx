import { SignUpComponent } from "@/components/signup";
import Link from "next/link";

export default function SignUpPage() {
    return <div>
        <SignUpComponent /><br />
        <Link href="/login">Already have an account? Log in here</Link>
    </div>
}