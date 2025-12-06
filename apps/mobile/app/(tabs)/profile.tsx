import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import { router } from 'expo-router';

export default function ProfileScreen() {
    const { user, signOut } = useAuthStore();

    const handleSignOut = async () => {
        await signOut();
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-dark-bg" edges={['bottom']}>
            <View className="flex-1 px-6 pt-6">
                <View className="items-center">
                    <View className="h-24 w-24 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                        <Text className="text-4xl">👤</Text>
                    </View>
                    <Text className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                        {user?.email || 'Guest'}
                    </Text>
                    <Text className="mt-1 text-gray-600 dark:text-gray-400">
                        Member since {new Date(user?.created_at || '').toLocaleDateString()}
                    </Text>
                </View>

                <View className="mt-8 space-y-4">
                    <View className="rounded-lg border border-gray-200 p-4 dark:border-dark-border">
                        <Text className="text-sm text-gray-500 dark:text-gray-400">User ID</Text>
                        <Text className="mt-1 font-mono text-xs text-gray-900 dark:text-white">
                            {user?.id || 'N/A'}
                        </Text>
                    </View>

                    <View className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-dark-border">
                        <Text className="text-sm text-gray-500 dark:text-gray-400">Email</Text>
                        <Text className="mt-1 text-gray-900 dark:text-white">
                            {user?.email || 'N/A'}
                        </Text>
                    </View>
                </View>

                <View className="mt-auto pb-6">
                    <TouchableOpacity
                        className="rounded-lg border border-red-300 bg-red-50 py-4 dark:border-red-900 dark:bg-red-900/20"
                        onPress={handleSignOut}
                    >
                        <Text className="text-center font-semibold text-red-600 dark:text-red-400">
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
