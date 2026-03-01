import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuthStore } from '@pb/state';
import { signUpWithEmail } from '@pb/data';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const setUser = useAuthStore((state) => state.setUser);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');

        const { user, error: signUpError } = await signUpWithEmail(email, password);

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        setUser(user);
        router.replace('/(tabs)');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white dark:bg-dark-bg"
        >
            <View className="flex-1 justify-center px-6">
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                        Create account
                    </Text>
                    <Text className="mt-2 text-gray-600 dark:text-gray-400">
                        Sign up to get started
                    </Text>
                </View>

                {error ? (
                    <View className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                        <Text className="text-red-600 dark:text-red-400">{error}</Text>
                    </View>
                ) : null}

                <View className="space-y-4">
                    <View>
                        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </Text>
                        <TextInput
                            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-dark-border dark:bg-dark-surface dark:text-white"
                            placeholder="you@example.com"
                            placeholderTextColor="#9ca3af"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                        />
                    </View>

                    <View className="mt-4">
                        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </Text>
                        <TextInput
                            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-dark-border dark:bg-dark-surface dark:text-white"
                            placeholder="••••••••"
                            placeholderTextColor="#9ca3af"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="new-password"
                        />
                    </View>

                    <View className="mt-4">
                        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </Text>
                        <TextInput
                            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-dark-border dark:bg-dark-surface dark:text-white"
                            placeholder="••••••••"
                            placeholderTextColor="#9ca3af"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoComplete="new-password"
                        />
                    </View>

                    <TouchableOpacity
                        className="mt-6 rounded-lg bg-primary-600 py-4"
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text className="text-center font-semibold text-white">
                            {loading ? 'Creating account...' : 'Create Account'}
                        </Text>
                    </TouchableOpacity>

                    <View className="mt-6 flex-row justify-center">
                        <Text className="text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                        </Text>
                        <Link href="/(auth)/login" asChild>
                            <TouchableOpacity>
                                <Text className="font-semibold text-primary-600">Sign in</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
