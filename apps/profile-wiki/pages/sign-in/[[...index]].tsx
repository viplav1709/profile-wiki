import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <SignIn afterSignInUrl={'http://localhost:4200/'} />;
}