'use client';

import { useState } from 'react';
import { View } from 'react-native';

function Switch({ checked, onCheckedChange }: any) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-input'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function Separator() {
  return <div className="border-t border-border" />;
}

export function SettingsBlock() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const settingsGroups = [
    {
      title: 'Notifications',
      items: [
        {
          label: 'Push Notifications',
          description: 'Receive push notifications',
          checked: notifications,
          onCheckedChange: setNotifications,
        },
        {
          label: 'Email Alerts',
          description: 'Receive email notifications',
          checked: emailAlerts,
          onCheckedChange: setEmailAlerts,
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          label: 'Dark Mode',
          description: 'Enable dark mode theme',
          checked: darkMode,
          onCheckedChange: setDarkMode,
        },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            <h2 className="text-lg font-semibold">{group.title}</h2>
            <div className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                    <Switch
                      checked={item.checked}
                      onCheckedChange={item.onCheckedChange}
                    />
                  </div>
                  {itemIndex < group.items.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Separator />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Account</h2>
          <div className="space-y-1">
            <button className="w-full text-left px-4 py-3 rounded-md hover:bg-accent transition-colors">
              <div className="font-medium">Edit Profile</div>
              <div className="text-sm text-muted-foreground">
                Update your profile information
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-md hover:bg-accent transition-colors">
              <div className="font-medium">Privacy & Security</div>
              <div className="text-sm text-muted-foreground">
                Manage your privacy settings
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-md hover:bg-destructive/10 text-destructive transition-colors">
              <div className="font-medium">Sign Out</div>
            </button>
          </div>
        </div>
      </div>
    </View>
  );
}
