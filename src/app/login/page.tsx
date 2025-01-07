'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"
import LoginImage from "../../../public/bg-login.png"
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // You can add any additional logic here before redirecting
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="bg-muted dark:bg-gray-800 flex justify-center items-center ">
              <Image src={LoginImage} alt="Login background" className="hidden sm:block" />
            </div>
            <div className="p-6 md:p-8">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}

