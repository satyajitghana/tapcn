'use client';

import { useState } from 'react';
import { View } from 'react-native';

export function SignUpBlock() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <View className="flex-1 justify-center bg-background">
      <div className="px-6 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <svg className="size-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to get started
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Full Name</label>
            <input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-border bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-border bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-border bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                agreed ? 'bg-primary border-primary' : 'border-border'
              }`}
            >
              {agreed && (
                <svg className="size-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </button>
            <span className="text-sm leading-snug">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">terms</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">privacy policy</a>
            </span>
          </label>

          <button className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Create Account
          </button>
        </div>

        {/* Footer */}
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
