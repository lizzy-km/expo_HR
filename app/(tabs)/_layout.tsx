import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, View} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {AttendanceIcon, HomeIcon, LeaveIcon, NewsIcon, PaySlipIcon} from "@/components/ui/svgs/ExportedSvg";





export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs

            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                // tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},

                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerPressColor: Colors[colorScheme ?? 'light'].tint,

                    tabBarIcon: ({color}) => <HomeIcon color={color} />
                }}
            />
            <Tabs.Screen
                name="attendance"
                options={{
                    title: 'Attendance',
                    tabBarIcon: ({color}) => <AttendanceIcon color={color} />,

                }}
            />
            <Tabs.Screen
                name="leave"
                options={{
                    title: 'Leave',
                    tabBarIcon: ({color}) => <LeaveIcon color={color}/>,
                }}
            />
            <Tabs.Screen
                name="payslip"
                options={{
                    title: 'PaySlip',
                    tabBarIcon: ({color}) => <PaySlipIcon color={color}/>,
                }}
            />

            <Tabs.Screen
                name="news"
                options={{
                    title: 'News',
                    tabBarIcon: ({color}) => <NewsIcon color={color}/>,
                }}
            />
        </Tabs>
    );
}
