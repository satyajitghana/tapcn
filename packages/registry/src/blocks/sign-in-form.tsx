import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';

interface SignInFormProps {
  onSignIn?: (email: string, password: string) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

function SignInForm({ onSignIn, onForgotPassword, onSignUp }: SignInFormProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    onSignIn?.(email, password);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <View className="gap-2">
            <Label nativeID="email">Email</Label>
            <Input
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              aria-labelledby="email"
            />
          </View>
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Label nativeID="password">Password</Label>
              <Button variant="link" size="sm" onPress={onForgotPassword}>
                <Text className="text-xs">Forgot password?</Text>
              </Button>
            </View>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
              aria-labelledby="password"
            />
          </View>
          <Button onPress={handleSubmit}>
            <Text>Sign In</Text>
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Separator />
          <View className="flex-row items-center gap-1">
            <Text variant="muted">Don't have an account?</Text>
            <Button variant="link" size="sm" onPress={onSignUp}>
              <Text>Sign up</Text>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </KeyboardAvoidingView>
  );
}

export { SignInForm };
export type { SignInFormProps };
