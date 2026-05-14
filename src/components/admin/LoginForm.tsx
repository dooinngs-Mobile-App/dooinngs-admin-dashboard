"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthProvider"

type LoginValues = {
  email: string
  password: string
}

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>()

  async function onSubmit(data: LoginValues) {
    setServerError(null)
    const error = await login(data.email, data.password)
    if (error) {
      setServerError(error)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-foreground mb-1">You&apos;re welcome</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Enter your email address and password to continue
      </p>

      {serverError && (
        <p className="text-xs text-destructive mb-4">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@email.com"
            autoComplete="email"
            className="h-12 w-full rounded-lg bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
            })}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••••••••"
            autoComplete="current-password"
            className="h-12 w-full rounded-lg bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
          <a href="#" className="text-xs text-primary font-medium w-fit hover:underline mt-0.5">
            Forgot Password
          </a>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full bg-primary text-white font-semibold text-base mt-2 hover:bg-primary/90 transition"
        >
          {isSubmitting ? "Signing in…" : "Continue"}
        </Button>
      </form>
    </div>
  )
}
