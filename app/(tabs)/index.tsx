import {Platform, RefreshControl, ScrollView, StyleSheet, View,} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useGetUserQuery} from "@/services/query/getUserQuery";
import CheckInOut from "@/components/ui/CheckInOut/CheckInOut";
import OnLeaveToday from "@/components/ui/OnLeaveToday/OnLeaveToday";
import OnPresentToday from "@/components/ui/OnPresentToday/OnPresentToday";
import QuickAccess from "@/components/ui/QuickAccess/QuickAccess";
import ProfileBar from "@/components/ui/ProfileBar/ProfileBar";


export default function HomeScreen() {


    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            alignItems: 'center',
            justifyContent: 'center', // paddingTop: StatusBar.currentHeight,

        }, scrollView: {
            backgroundColor: Colors[colorScheme ?? 'light'].background, width: '100%',

            paddingTop: Platform.select({
                web: 25
            })
        }
    });


    const {isLoading, refetch} = useGetUserQuery();


    return (<SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={["top"]}>

                {/*Profile Bar*/}
                <ProfileBar/>

                <ScrollView style={styles.scrollView}
                            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}
                >

                    <View style={{
                        width: "100%",
                        height: "auto",
                        backgroundColor: Colors[colorScheme ?? 'light'].background,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: 20,
                        gap: 20
                    }}>
                        <CheckInOut/>

                        {/*Present Today*/}
                        <OnPresentToday/>

                        {/*On Leave Today*/}
                        <OnLeaveToday/>
                        {/*//Quick Access*/}
                        <QuickAccess/>

                    </View>

                </ScrollView>

            </SafeAreaView>
        </SafeAreaProvider>


    );
}