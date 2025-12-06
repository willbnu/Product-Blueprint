import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
    return (
        <View className="items-center justify-center">
            <Text
                className={`text-xs ${focused ? 'text-primary-600' : 'text-gray-500'}`}
            >
                {name}
            </Text>
        </View>
    );
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopColor: '#e5e7eb',
                },
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#6b7280',
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                headerTitleStyle: {
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <TabIcon name="🏠" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabIcon name="👤" focused={focused} />,
                }}
            />
        </Tabs>
    );
}
