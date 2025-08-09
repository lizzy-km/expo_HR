import {Platform, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View,} from 'react-native';
import {Colors, profileBackgroundColor} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useGetUserQuery} from "@/services/query/getUserQuery";
import {Image} from "expo-image";
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";
import UserProfile from "@/components/ui/UserProfile/UserProfile";
import { UserDataType} from "@/constants/Types";



export default function HomeScreen() {


    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingTop: StatusBar.currentHeight,

        },
        scrollView: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            width: '100%',

            paddingTop:Platform.select({
                web:25
            })
        },
        text: {
            color: Colors[colorScheme ?? 'light'].text,
        },
        navigationContainer: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            paddingInline:20,
            justifyContent: 'space-between',
            display: 'flex',
        },
        paragraph: {
            padding: 16,
            fontSize: 15,
            textAlign: 'center',
        },
    });


    const {data:userData,isLoading,refetch} =  useGetUserQuery();





    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={["top"]}>
                <View style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 50,
                    zIndex:10,
                    ...styles.navigationContainer
                }}>

                <View style={{
                    height: 32,
                    width: "auto",
                    gap:8
                }} >
                  <UserProfile userData={userData} />
                </View>

                    <View>

                    </View>

                </View>
                <ScrollView style={styles.scrollView}
                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                            }
                >


                    <View style={{
                        width: "100%",
                        height: "auto",
                        backgroundColor: '#d5d5d5',
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: 10,
                        gap: 20
                    }}>
                        <View style={{
                            width: "80%",
                            height: 200,
                            backgroundColor: Colors[colorScheme ?? 'light'].background
                        }}>

                            <Text style={styles.text}>Home screen</Text>

                        </View>
                        <View style={{
                            width: "80%",
                            height: 200,
                            backgroundColor: Colors[colorScheme ?? 'light'].background
                        }}>

                            <Text style={styles.text}>Home screen</Text>

                        </View>
                        <View style={{
                            width: "80%",
                            height: 200,
                            backgroundColor: Colors[colorScheme ?? 'light'].background
                        }}>

                            <Text style={styles.text}>Home screen</Text>

                        </View>
                        <View style={{
                            width: "80%",
                            height: 200,
                            backgroundColor: Colors[colorScheme ?? 'light'].background
                        }}>

                            <Text style={styles.text}>Home screen</Text>

                        </View>
                        <View style={{
                            width: "80%",
                            height: 200,
                            backgroundColor: Colors[colorScheme ?? 'light'].background
                        }}>

                            <Text style={styles.text}>Home screen</Text>

                        </View>

                    </View>

                </ScrollView>

            </SafeAreaView>
        </SafeAreaProvider>


    );
}







