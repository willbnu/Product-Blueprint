import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@pb/state';

export default function HomeScreen() {
    const user = useAuthStore((state) => state.user);

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-dark-bg" edges={['bottom']}>
            <ScrollView className="flex-1 px-6 pt-6">
                <View className="mb-8">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome back! 👋
                    </Text>
                    <Text className="mt-1 text-gray-600 dark:text-gray-400">
                        {user?.email || 'Guest'}
                    </Text>
                </View>

                <View className="rounded-xl bg-primary-50 p-6 dark:bg-primary-900/20">
                    <Text className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                        Product Blueprint
                    </Text>
                    <Text className="mt-2 text-primary-700 dark:text-primary-300">
                        Your app is ready! Start building amazing features.
                    </Text>
                </View>

                <View className="mt-6 space-y-4">
                    <View className="rounded-lg border border-gray-200 p-4 dark:border-dark-border">
                        <Text className="font-medium text-gray-900 dark:text-white">
                            ✅ Authentication Ready
                        </Text>
                        <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Supabase authentication is configured
                        </Text>
                    </View>

                    <View className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-dark-border">
                        <Text className="font-medium text-gray-900 dark:text-white">
                            ✅ Navigation Ready
                        </Text>
                        <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Expo Router with tabs and stacks
                        </Text>
                    </View>

                    <View className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-dark-border">
                        <Text className="font-medium text-gray-900 dark:text-white">
                            ✅ Styling Ready
                        </Text>
                        <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            NativeWind (Tailwind CSS) configured
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
