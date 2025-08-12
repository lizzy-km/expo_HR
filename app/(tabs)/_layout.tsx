import {Tabs, useFocusEffect, useRouter} from 'expo-router';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {HapticTab} from '@/components/HapticTab';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {AttendanceIcon, HomeIcon, LeaveIcon, NewsIcon, PaySlipIcon} from "@/components/ui/svgs/ExportedSvg";
import {useGetAccessTokenFromStore} from "@/services/query/getStoreQuery";
import {useAuthStore} from "@/store/useAuthStore";


export default function TabLayout() {
    const colorScheme = useColorScheme();
    const {isLogin} = useAuthStore()


    const {data,refetch} = useGetAccessTokenFromStore()

    const router = useRouter();
    useFocusEffect(() => {
        if (!data) {
            router.replace('/login')
        }
    })

    useEffect(() => {
        refetch()
    },[isLogin])
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
