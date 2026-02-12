'use client';

import { useState } from 'react';
import { View } from 'react-native';

function Button({ children, className, ...props }: any) {
  return (
    <button className={`px-4 py-2 rounded-md font-medium ${className}`} {...props}>
      {children}
    </button>
  );
}

function Input({ className, ...props }: any) {
  return <input className={`w-full px-3 py-2 border rounded-md ${className}`} {...props} />;
}

function Label({ children, className }: any) {
  return <label className={`text-sm font-medium ${className}`}>{children}</label>;
}

function Checkbox({ className, ...props }: any) {
  return <input type="checkbox" className={`${className}`} {...props} />;
}

export function SignUpBlock() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 p-6 justify-center bg-background">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to get started
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>

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
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                terms and conditions
              </a>
            </label>
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Create Account
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </View>
  );
}
