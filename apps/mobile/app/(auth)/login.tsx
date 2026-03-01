import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuthStore } from '@pb/state';
import { signInWithEmail } from '@pb/data';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const setSession = useAuthStore((state) => state.setSession);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        const { session, error: signInError } = await signInWithEmail(email, password);

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
            return;
        }

        setSession(session);
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
                        Welcome back
                    </Text>
                    <Text className="mt-2 text-gray-600 dark:text-gray-400">
                        Sign in to continue
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
                            autoComplete="password"
                        />
                    </View>

                    <TouchableOpacity
                        className="mt-6 rounded-lg bg-primary-600 py-4"
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text className="text-center font-semibold text-white">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>

                    <View className="mt-6 flex-row justify-center">
                        <Text className="text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                        </Text>
                        <Link href="/(auth)/register" asChild>
                            <TouchableOpacity>
                                <Text className="font-semibold text-primary-600">Sign up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
