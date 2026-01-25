import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { isLoggedIn } from "@/lib/utils";
type AuthMode = "login" | "register";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div>
      {!isLoggedIn() &&
      <div className=" mt-10 min-h-fit flex items-center justify-center">
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
    }
    <h1 className="text-xl text-blue-500">You're already logged in</h1>
    
    </div>
  );
  
};

export default Auth;
