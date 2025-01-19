import { LoginComponent } from "@/components/login";
import { SignUpComponent } from "@/components/signup";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Welcome to WebeWizard's FlashCard App<br />
      <Link href="/login">Login</Link> or <Link href="/signup">Signup</Link>
    </div>
  );
}
