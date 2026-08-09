import { LoginLeftPanel } from "./LoginLeftPanel"
import { LoginForm } from "./LoginForm"

export function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      <LoginLeftPanel />

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.08)] px-10 py-12">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
