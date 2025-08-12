import {Platform, Text, View} from "react-native";
import {Colors} from "@/constants/Colors";
import React from "react";
import moment from "moment/moment";
import {useGetUserQuery} from "@/services/query/getUserQuery";
import {useColorScheme} from "@/hooks/useColorScheme";
import UserProfile from "../UserProfile/UserProfile";


export default function ProfileBar({setModalVisible}) {
    const colorScheme = useColorScheme();

    const {data: userData, isLoading, refetch} = useGetUserQuery();

    interface style{
        navigationContainer:{}
    }

    const styles:style = {
        navigationContainer: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            paddingInline: 20,
            justifyContent: 'space-between',
            display: 'flex',
            marginTop:Platform.select({
                web:10,
                android:4,
                ios:4,
            })
        },
    }



    const greeting = moment().get("hours") < 11 ? "Good Morning" : moment().get("hours") > 11 ? "Good Afternoon" : moment().get("hours") > 5 ? "Good Evening" : moment().get("hours") > 8 ? "Good Night" : "Have a great day"

    return (
        <View style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: 50,
            zIndex: 10,
            ...styles?.navigationContainer
        }}>

            <View style={{
                height: 42,
                width: "80%",
                gap: 8,
                display: "flex",
                flexDirection: "row"
            }}>
                <UserProfile setModalVisible={setModalVisible} userData={userData} size={42}/>
                <View style={{
                    height: 42,
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        color:Colors[colorScheme ?? "light"].text

                    }}>
                        {greeting},
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        color:Colors[colorScheme ?? "light"].text

                    }}>
                        {userData.name}
                    </Text>
                </View>
            </View>

            <View>

            </View>

        </View>
    )
}