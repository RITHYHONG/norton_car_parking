import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authenticate } from "@/utils/auth"
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  async function loginUser(prevState: any, formData: FormData) {
    'use server'

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (authenticate(username, password)) {
      cookies().set('user', username, { httpOnly: true, secure: true })
      redirect('/dashboard')
    }

    return { error: 'Invalid username or password' }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative hidden bg-muted md:block">
              <img
                src="/placeholder.svg"
                alt="Login background"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            <div className="p-6 md:p-8">
              <LoginForm loginAction={loginUser} />
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

