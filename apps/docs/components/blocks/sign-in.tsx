'use client';

import { useState } from 'react';
import { View } from 'react-native';

// Note: These components would be imported from the registry in a real implementation
// For now, we'll create simplified versions for demonstration

function Button({ children, className, ...props }: any) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ className, ...props }: any) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md ${className}`}
      {...props}
    />
  );
}

function Label({ children, className }: any) {
  return <label className={`text-sm font-medium ${className}`}>{children}</label>;
}

export function SignInBlock() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 p-6 justify-center bg-background">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Sign In
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button className="border border-input bg-background hover:bg-accent">
              Google
            </Button>
            <Button className="border border-input bg-background hover:bg-accent">
              GitHub
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </View>
  );
}
