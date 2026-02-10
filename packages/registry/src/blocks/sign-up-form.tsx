import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';

interface SignUpFormProps {
  onSignUp?: (data: { name: string; email: string; password: string }) => void;
  onSignIn?: () => void;
}

function SignUpForm({ onSignUp, onSignIn }: SignUpFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    setError('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    onSignUp?.({ name: name.trim(), email: email.trim(), password });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <View className="gap-2">
            <Label nativeID="name">Name</Label>
            <Input
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              textContentType="name"
              aria-labelledby="name"
            />
          </View>
          <View className="gap-2">
            <Label nativeID="signup-email">Email</Label>
            <Input
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              aria-labelledby="signup-email"
            />
          </View>
          <View className="gap-2">
            <Label nativeID="signup-password">Password</Label>
            <Input
              placeholder="At least 8 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="newPassword"
              aria-labelledby="signup-password"
            />
          </View>
          <View className="gap-2">
            <Label nativeID="confirm-password">Confirm Password</Label>
            <Input
              placeholder="Repeat your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              textContentType="newPassword"
              aria-labelledby="confirm-password"
            />
          </View>
          {error ? (
            <Text className="text-destructive text-sm">{error}</Text>
          ) : null}
          <Button onPress={handleSubmit}>
            <Text>Sign Up</Text>
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Separator />
          <View className="flex-row items-center gap-1">
            <Text variant="muted">Already have an account?</Text>
            <Button variant="link" size="sm" onPress={onSignIn}>
              <Text>Sign in</Text>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </KeyboardAvoidingView>
  );
}

export { SignUpForm };
export type { SignUpFormProps };
