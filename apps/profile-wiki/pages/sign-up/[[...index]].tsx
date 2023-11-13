import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <SignUp afterSignUpUrl={'http://localhost:4200/'} />;
}