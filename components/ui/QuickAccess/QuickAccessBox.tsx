import {Text, View} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

export default function QuickAccessBox({title,bgImage}:{title:string,bgImage:string}     ) {
    const colorScheme = useColorScheme();

    return(
        <View style={
            {
                width: 72,
                height: "auto",
                gap: 6,
                justifyContent: "flex-start",
                alignItems: "center"
            }
        }>

            <View style={{
                backgroundColor: "#E8F0FE",
                width: 72,
                height: 60,
                borderRadius: 5,
            }}>



            </View>

            <Text style={{
                fontSize: 12,
                textAlign: "center",
                fontWeight: 500,
                color:Colors[colorScheme ?? "light"].text

            }}>
                {title}
            </Text>


        </View>
    )
}