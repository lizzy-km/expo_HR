import {Modal, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {borderColorDark, Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useGetUserQuery} from "@/services/query/getUserQuery";
import CheckInOut from "@/components/ui/CheckInOut/CheckInOut";
import OnLeaveToday from "@/components/ui/OnLeaveToday/OnLeaveToday";
import OnPresentToday from "@/components/ui/OnPresentToday/OnPresentToday";
import QuickAccess from "@/components/ui/QuickAccess/QuickAccess";
import ProfileBar from "@/components/ui/ProfileBar/ProfileBar";
import {Logout} from "@/services/mutation/auth/AuthMutation";
import Animated, {useAnimatedStyle, withSpring} from "react-native-reanimated";
import {buttonStyle} from "@/constants/Styles";
import {BlurView} from "expo-blur";


export default function HomeScreen() {
    const {mutate: logOut, isSuccess,isPending} = Logout()

    const [modalVisible, setModalVisible] = useState(false);

    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            alignItems: 'center',
            justifyContent: 'center', // paddingTop: StatusBar.currentHeight,
            position:"relative"

        }, scrollView: {
            backgroundColor: Colors[colorScheme ?? 'light'].background, width: '100%',

            paddingTop: Platform.select({
                web: 25
            })
        }, modalView: {
            backgroundColor: 'white', borderRadius: 20, paddingInline: 16, gap: 16,

            paddingBlock: 8, height: 160, alignItems: 'center', shadowColor: '#000', shadowOffset: {
                width: 0, height: 2,
            }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, justifyContent: "center"
        }, buttonOpen: {
            width: 128, backgroundColor: borderColorDark, elevation: 2, ...buttonStyle.container
        }, buttonClose: {
            width: 128,

            backgroundColor: '#fff',
            borderColor: borderColorDark,
            borderWidth: 1,
            elevation: 2, ...buttonStyle.container

        }, closeText: {
            color: borderColorDark, fontFamily: 'PoppinsMedium', textAlign: 'center', fontSize: 16

        }, openText: {
            color: 'white', fontFamily: 'PoppinsMedium', textAlign: 'center', fontSize: 16

        }, modalHeaderText: {
            width: '100%', textAlign: 'left', fontSize: 16, fontFamily: 'PoppinsMedium',
        }, modalText: {
            width: '100%', textAlign: 'left', fontSize: 14, fontFamily: 'PoppinsRegular', lineHeight: 22.2
        },
    });



    const {isLoading, refetch, data, failureReason} = useGetUserQuery();

    useEffect(() => {
        refetch()
    }, [])


    // The 'ref' needs to be attached to the View you want to observe


    const BoxStyle = useAnimatedStyle(() => {
        return {
            top: withSpring(20, {
                duration: 400
            }), position: "absolute",

            width: "70%", height: '100%', justifyContent: "space-between"
        }
    })


    return (<SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={["top"]}>
                {
                    isPending && <BlurView
                        tint={'dark'}
                        style={{
                            position:"absolute",
                            right:-10,
                            top:0,
                            width:"120%",
                            height:"100%",
                            zIndex:100,
                            backgroundColor:borderColorDark+30,
                            justifyContent:"center",
                            alignItems:"center",
                        }}
                    >
                        <Text style={{
                            color:"#fff",
                            fontSize:20,
                            fontFamily:"PoppinsMedium"
                        }} >
                            Loading...
                        </Text>




                    </BlurView>
                }

                <Modal

                    style={{
                        width: "100%", height: "100%", justifyContent: "center", alignItems: "center", display: "flex"
                    }}
                    transparent={true}

                    visible={modalVisible}>

                    <View style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Animated.View style={BoxStyle}>
                            <View style={styles.modalView}>
                                <View style={{
                                    width: "100%"
                                }}>
                                    <Text style={styles.modalHeaderText}>Confirm Logout</Text>
                                    <Text style={styles.modalText}>Are you sure you want to log out from your
                                        account?</Text>
                                </View>

                                <View style={{
                                    width: "100%", height: 40, justifyContent: "space-between", flexDirection: "row"
                                }}>
                                    <Pressable
                                        style={[styles.buttonClose]}
                                        onPress={() => setModalVisible(false)}>
                                        <Text style={styles.closeText}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.buttonOpen]}
                                        onPress={() => {
                                            logOut()
                                            setModalVisible(false)
                                        }}>
                                        <Text style={styles.openText}>Confirm</Text>
                                    </Pressable>

                                </View>

                            </View>
                        </Animated.View>
                    </View>

                </Modal>

                {/*Profile Bar*/}
                <ProfileBar setModalVisible={setModalVisible}/>

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

