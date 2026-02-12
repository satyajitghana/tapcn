'use client';

import { useState } from 'react';
import { View } from 'react-native';

function SettingsSwitch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-muted'
      }`}
    >
      <span
        className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export function SettingsBlock() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  return (
    <View className="flex-1 bg-background">
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your preferences
          </p>
        </div>

        {/* Notifications Group */}
        <div className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Notifications
          </h2>
          <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between px-4 py-3.5 bg-card">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="size-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Push Notifications</div>
                  <div className="text-xs text-muted-foreground">Get notified instantly</div>
                </div>
              </div>
              <SettingsSwitch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5 bg-card">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10">
                  <svg className="size-4 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Email Alerts</div>
                  <div className="text-xs text-muted-foreground">Weekly digest emails</div>
                </div>
              </div>
              <SettingsSwitch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
          </div>
        </div>

        {/* Appearance Group */}
        <div className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Appearance
          </h2>
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg className="size-4 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Dark Mode</div>
                  <div className="text-xs text-muted-foreground">Reduce eye strain</div>
                </div>
              </div>
              <SettingsSwitch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </div>

        {/* Security Group */}
        <div className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Security
          </h2>
          <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between px-4 py-3.5 bg-card">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-green-500/10">
                  <svg className="size-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Biometrics</div>
                  <div className="text-xs text-muted-foreground">Face ID or fingerprint</div>
                </div>
              </div>
              <SettingsSwitch checked={biometrics} onCheckedChange={setBiometrics} />
            </div>
            <button className="flex w-full items-center gap-3 px-4 py-3.5 bg-card text-left hover:bg-accent transition-colors">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/10">
                <svg className="size-4 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Change Password</div>
                <div className="text-xs text-muted-foreground">Update your password</div>
              </div>
              <svg className="size-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Account
          </h2>
          <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
            <button className="flex w-full items-center gap-3 px-4 py-3.5 bg-card text-left hover:bg-accent transition-colors">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <svg className="size-4 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Edit Profile</div>
              </div>
              <svg className="size-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-3.5 bg-card text-left hover:bg-accent transition-colors">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <svg className="size-4 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Privacy & Security</div>
              </div>
              <svg className="size-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sign out */}
        <button className="flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium text-destructive border border-destructive/20 hover:bg-destructive/10 transition-colors">
          Sign Out
        </button>
      </div>
    </View>
  );
}
