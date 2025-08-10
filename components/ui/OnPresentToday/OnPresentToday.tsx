import OnLeaveToday from "@/components/ui/OnLeaveToday/OnLeaveToday";
import {Colors} from "@/constants/Colors";
import React from "react";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Text, View} from "react-native";

export default function  OnPresentToday(){
    const colorScheme = useColorScheme();
    interface style{
        headerText:{},
        text:{}
    }
    const styles:style = {
        headerText: {
            fontSize: 20,
            fontWeight: 500
        },
        text: {
            color: Colors[colorScheme ?? 'light'].text,
            fontSize: 16,
            lineHeight: 25.6,
            fontWeight: 400
        },
    }
    return (
        <View style={{
            width: "100%",
            height: "auto",
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            paddingBlock: 12,
            gap: 8,
            flexDirection: "column",
            alignItems: "flex-start",
            borderStyle: "solid",
            borderBottomColor: "rgba(145, 145, 145, 0.20)",
            borderBottomWidth: 1
        }}>

            <Text style={styles.headerText}>Present Today</Text>
            <Text style={styles.text}>No one's checked in yet!</Text>


        </View>
    )
}