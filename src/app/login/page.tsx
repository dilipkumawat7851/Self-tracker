"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, User, BarChart2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        if (res.error.includes("Database temporarily unavailable")) {
          setError("Database is temporarily offline. Please sign in with Google or try again.");
        } else {
          setError("Invalid email or password credentials.");
        }
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } else {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.offline) {
            setError("Account created in offline mode. Database is temporarily unavailable. Please sign in with Google.");
            setLoading(false);
            return;
          }
          const signInRes = await signIn("credentials", { redirect: false, email, password });
          if (signInRes?.ok) {
            router.push("/dashboard");
          } else {
            setError("Account created! Please authenticate.");
            setIsLogin(true);
            setLoading(false);
          }
        } else {
          const data = await res.json();
          setError(data.message || "Registration failed");
          setLoading(false);
        }
      } catch (err) {
        setError("Network or server connection failed");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background font-sans selection:bg-brand-500/30 transition-colors duration-300">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] scale-[1.02] opacity-50 dark:opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop")' }}
        />
        {/* Gradients that adapt to theme */}
        <div className="absolute inset-0 bg-background/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
      </div>

      {/* ── Top Header Navbar ── */}
      <header className="absolute top-0 left-0 w-full z-30 px-6 md:px-12 py-6 flex items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-brand-500">
            <BarChart2 size={24} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">
            SelfTracker
          </span>
        </Link>
      </header>

      {/* Main Layout Container */}
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 relative z-10 py-24">
        
        {/* Left Side: Editorial & Decor */}
        <div className="hidden md:flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isLogin ? (
              <>
                {/* Decorative Handwritten Text for Login */}
                <div className="absolute top-1/4 right-[10%] -rotate-6 opacity-70 pointer-events-none">
                  <span className="font-caveat text-4xl lg:text-5xl text-text-primary leading-tight">
                    Discipline<br />
                    today,<br />
                    a better<br />
                    tomorrow.
                  </span>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight mb-6 max-w-md">
                  A Smarter<br />
                  You Starts<br />
                  Here.
                </h1>
                <p className="text-lg text-text-secondary max-w-sm leading-relaxed mb-16">
                  Create an account and take the first step towards a better, more organized you.
                </p>
                {/* Sticky Note for Register */}
                <div className="w-64 h-64 bg-[#efe9d3] rounded-sm shadow-xl p-8 -rotate-6 transform origin-bottom-left flex items-center justify-center">
                  <span className="font-caveat text-4xl text-[#333] text-center leading-tight">
                    Progress<br />
                    over<br />
                    Perfection
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md p-8 md:p-10 rounded-[20px] bg-surface/80 backdrop-blur-xl border border-border shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </h2>
              <p className="text-[13px] text-text-muted">
                {isLogin ? "Log in to continue your journey." : "Join SelfTracker and start building a better you."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-[13px] text-center font-medium">
                  {error}
                </div>
              )}

              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="relative">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full pl-11 pr-4 py-3.5 text-[13px] rounded-xl bg-surface-elevated/50 border border-border focus:border-brand-500 focus:bg-surface-elevated outline-none text-text-primary placeholder:text-text-muted transition-all"
                        required
                      />
                      <User size={16} className="absolute left-4 top-3.5 text-text-muted" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3.5 text-[13px] rounded-xl bg-surface-elevated/50 border border-border focus:border-brand-500 focus:bg-surface-elevated outline-none text-text-primary placeholder:text-text-muted transition-all"
                  required
                />
                <Mail size={16} className="absolute left-4 top-3.5 text-text-muted" />
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? "Enter your password" : "Password"}
                  className="w-full pl-11 pr-4 py-3.5 text-[13px] rounded-xl bg-surface-elevated/50 border border-border focus:border-brand-500 focus:bg-surface-elevated outline-none text-text-primary placeholder:text-text-muted transition-all"
                  required
                  minLength={6}
                />
                <Lock size={16} className="absolute left-4 top-3.5 text-text-muted" />
              </div>
              
              {!isLogin && (
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full pl-11 pr-4 py-3.5 text-[13px] rounded-xl bg-surface-elevated/50 border border-border focus:border-brand-500 focus:bg-surface-elevated outline-none text-text-primary placeholder:text-text-muted transition-all"
                    required
                    minLength={6}
                  />
                  <Lock size={16} className="absolute left-4 top-3.5 text-text-muted" />
                </div>
              )}

              {/* Utility Row (Remember Me / Terms) */}
              <div className="flex items-center justify-between text-[12px] pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-text-muted">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-border bg-transparent text-brand-500 focus:ring-brand-500" defaultChecked={isLogin} />
                  {isLogin ? "Remember me" : <span>I agree to the <a href="#" className="text-brand-500">Terms of Service</a> and <a href="#" className="text-brand-500">Privacy Policy</a></span>}
                </label>
                {isLogin && <a href="#" className="text-brand-500 hover:text-brand-400">Forgot password?</a>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-xl bg-brand-500 text-white text-[13px] font-semibold hover:bg-brand-600 transition-all active:scale-95 shadow-[0_4px_14px_rgba(99,102,241,0.25)]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </span>
                ) : isLogin ? (
                  "Log In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-text-muted uppercase font-bold">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                disabled={loading}
                className="w-full py-3 rounded-xl border border-border bg-transparent hover:bg-surface-hover text-[13px] font-medium text-text-secondary flex items-center justify-center gap-2.5 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <button
                type="button"
                onClick={() => {}}
                disabled={loading}
                className="w-full py-3 rounded-xl border border-border bg-transparent hover:bg-surface-hover text-[13px] font-medium text-text-secondary flex items-center justify-center gap-2.5 transition-all"
              >
                <svg className="w-4 h-4 fill-text-primary" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <p className="text-center text-[12px] text-text-muted mt-8">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-brand-500 hover:text-brand-400 font-medium transition-colors"
              >
                {isLogin ? "Create one" : "Log in"}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
