import React from "react";
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Snowflake } from 'lucide-react';

interface AuthPageProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  error: string | null;
  loading: boolean;
}

export const AuthPage = ({ onSignIn, onSignUp, error, loading }: AuthPageProps) => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', name: '' });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignIn(signInData.email, signInData.password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignUp(signUpData.email, signUpData.password, signUpData.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f1c34] via-[#1a2849] to-[#0f1c34] p-4 relative overflow-hidden">
      {/* Winter background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            className="absolute text-blue-300/30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
            size={16 + Math.random() * 16}
          />
        ))}
      </div>

      <Card className="w-full max-w-md shadow-2xl relative z-10 bg-[#1e3a5f]/80 border-[#2d5080] backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Snowflake className="text-blue-300" size={48} />
          </div>
          <CardTitle className="text-white">Winter Arc Tracker</CardTitle>
          <CardDescription className="text-blue-200">Build your winter arc before the year ends</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 bg-[#1a2d4a] border border-[#2d5080]">
              <TabsTrigger value="signin" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-white">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    required
                    className="bg-[#0f1c34] border-[#2d5080] text-white placeholder:text-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-white">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    required
                    className="bg-[#0f1c34] border-[#2d5080] text-white"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-white">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your name"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    required
                    className="bg-[#0f1c34] border-[#2d5080] text-white placeholder:text-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    required
                    className="bg-[#0f1c34] border-[#2d5080] text-white placeholder:text-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                    className="bg-[#0f1c34] border-[#2d5080] text-white"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
