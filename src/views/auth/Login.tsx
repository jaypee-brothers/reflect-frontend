import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, Label, TextInput, Button, Alert } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../../stores/authStore';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await login(formData);
      // Navigate to dashboard or return URL on successful login
      const returnUrl = location.state?.from?.pathname || '/';
      navigate(returnUrl);
    } catch (err) {
      // Error is handled by the store
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <div className="p-6 space-y-6">
            {/* Logo and Title */}
            <div className="text-center">
              <div className="px-24 py-4 flex items-center sidebarlogo">
                <FullLogo />
              </div>
              <Icon icon="solar" className="text-white" width={32} />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your DigiNerve dashboard</p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert color="failure" className="mb-4">
                <div className="flex items-center">
                  <Icon icon="solar:danger-circle-bold" className="mr-2" width={20} />
                  <span>{error}</span>
                </div>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  value="Email Address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                />
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="solar:letter-bold" className="text-gray-400" width={20} />
                  </div>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  value="Password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                />
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon icon="solar:lock-password-bold" className="text-gray-400" width={20} />
                  </div>
                  <TextInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Icon
                      icon={showPassword ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
                      className="text-gray-400 hover:text-gray-600"
                      width={20}
                    />
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={loading || !formData.email || !formData.password}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Icon icon="solar:login-3-bold" className="mr-2" width={20} />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              <p>Institution Dashboard System</p>
              <p className="mt-1">
                © 2025 Jaypee Brothers Medical Publishers Pvt. Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
