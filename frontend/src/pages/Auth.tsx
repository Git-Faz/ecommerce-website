import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
type AuthMode = "login" | "register";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
     <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="space-y-6">
        <div className="flex gap-4 justify-center">
          <button onClick={() => setMode("login")} className={`px-4 py-2 rounded ${
            mode === "login" ? "bg-blue-600 text-white" : "bg-neutral-800 text-neutral-400"
          }`}>Login</button>
          <button onClick={() => setMode("register")} className={`px-4 py-2 rounded ${
            mode === "register" ? "bg-blue-600 text-white" : "bg-neutral-800 text-neutral-400"
          }`} >Register</button>
        </div>
        {mode === "login" && <LoginForm />}
        {mode === "register" && <RegisterForm />}
      </div>
    </div>
  );
};

export default Auth;
