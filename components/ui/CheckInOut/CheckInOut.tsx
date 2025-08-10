import {Text, View} from "react-native";
import {borderColorDark, Colors} from "@/constants/Colors";
import React from "react";
import moment from "moment";
import {useColorScheme} from "@/hooks/useColorScheme";

export default function CheckInOut() {
    const colorScheme = useColorScheme();

    return (
        <View style={{
            width: "100%",
            minHeight: 321,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: borderColorDark,
            borderRadius: 10,
            borderStyle: "solid",
            borderWidth: 1,
            padding: 8,
            gap: 24,
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.10)"

        }}>
            {/*Time*/}
            <View
                style={{
                    gap: 4,
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
            >
                <Text style={{
                    fontSize: 28,
                    fontWeight: 500

                }}>
                    {moment().format("hh")}:{moment().get("minutes")} {moment().format("A")}
                </Text>
                <Text style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 22.4

                }}>
                    {moment().format("MMM")} {moment().format("DD")}, {moment().format("YYYY")}
                </Text>
            </View>

            {/*    Working hour*/}

            <View style={{
                width: 152,
                height: "auto",
                gap: 4,
                flexDirection: "column",
                alignItems: "center",
                paddingBlock: 12,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: borderColorDark,
                borderRadius: 10
            }}>

                <Text style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 400
                }}>
                    Total Working Hours
                </Text>

                <Text style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 500,
                    color: borderColorDark
                }}>
                    0 hours
                </Text>

            </View>

            {/*    Check-In_Out_Button*/}

            <View style={{
                height: 48,
                gap: 24,
                flexDirection: "row"
            }}>
                <View>

                </View>
            </View>

        </View>
    )
}