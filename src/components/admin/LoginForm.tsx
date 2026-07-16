"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Eye, EyeOff } from "lucide-react"; // Import the eye icons from lucide-react
import { useMutation } from "@tanstack/react-query";
import { adminLogin, getErrorMessage } from "@/api/client";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { setSessionUser } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>();

  const {
    mutate: adminLoginCode,
    isPending: isAdminLoggingIn,
    isError: isLoginError,
    error: loginErrorValue,
  } = useMutation({
    mutationKey: adminLogin.key,
    mutationFn: adminLogin.fn,
    onSuccess: (result) => {
      setSessionUser(result);
      router.push("/dashboard");
    },
    onError: (error) => {
      setServerError(getErrorMessage(error, "Login failed"));
    },
  });

  async function onSubmit(data: LoginValues) {
    setServerError(null);
    adminLoginCode(data);
  }

  const displayError =
    serverError ?? getErrorMessage(loginErrorValue, "Login failed");

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-foreground mb-1">
        You&apos;re welcome
      </h1>
      <p className="text-muted-foreground text-sm mb-4">
        Enter your email address and password to continue
      </p>

      {displayError && (
        <p className="text-xs text-destructive mb-4">{displayError}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-foreground"
          >
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
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 relative">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-foreground"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            placeholder="••••••••••••••"
            autoComplete="current-password"
            className="h-12 w-full rounded-lg bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
          <a
            href="#"
            className="text-xs text-primary font-medium w-fit hover:underline mt-0.5"
          >
            Forgot Password
          </a>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isAdminLoggingIn}
          className="w-full h-12 rounded-full bg-primary text-white font-semibold text-base mt-2 hover:bg-primary/90 transition"
        >
          {isSubmitting
            ? "Signing in…"
            : isAdminLoggingIn
              ? "Admin Logging in…"
              : "Continue"}
        </Button>
      </form>
    </div>
  );
}
