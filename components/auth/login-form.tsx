"use client";

import { Button, Input, Label } from "@chaibuilder/sdk/ui";
import Link from "next/link";
import { useState } from "react";
import { loginWithEmail } from "@/actions/user-auth-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EyeIcon, EyeClosed } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);
      toast.success("Login successful", { position: "top-right" });
      router.push("/sites");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login", {
        position: "top-right",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-fuchsia-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-300"
              placeholder="Password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 hover:bg-transparent hover:text-gray-500"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? <EyeIcon /> : <EyeClosed />}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-fuchsia-800 hover:bg-fuchsia-700"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </>
  );
}
