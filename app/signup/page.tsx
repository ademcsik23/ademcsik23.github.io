import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, User, ChevronLeft } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-cream-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center text-dark-green hover:text-gold transition-colors mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to home
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-dark-green">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-gold hover:text-gold-dark">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-cream-dark sm:rounded-2xl sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-green uppercase tracking-wider">
                Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="name" name="name" type="text" required className="pl-10" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-green uppercase tracking-wider">
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="email" name="email" type="email" required className="pl-10" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-green uppercase tracking-wider">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="password" name="password" type="password" required className="pl-10" placeholder="••••••••" />
              </div>
            </div>

            <div className="text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <Link href="#" className="underline hover:text-dark-green">Terms of Service</Link> and{' '}
              <Link href="#" className="underline hover:text-dark-green">Privacy Policy</Link>.
            </div>

            <div>
              <Button className="w-full h-12 text-lg font-bold">Create account</Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cream-dark" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 uppercase tracking-widest text-xs">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">Google</Button>
              <Button variant="outline" className="w-full">Apple</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
