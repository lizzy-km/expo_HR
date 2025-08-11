import {View,Text} from "react-native";
import {LoginStyle} from "@/constants/Styles";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

export default function ForgotPassword(){
    const colorScheme = useColorScheme();

    return (
        <View  style={{
            ...LoginStyle.container,
            color: Colors[colorScheme ?? "light"].text,
            fontFamily:"PoppinsMedium"

        }} >

            <Text
                style={{

                    color: Colors[colorScheme ?? "light"].text,
                    fontFamily:"PoppinsMedium",




                }}
            >Forgot Password Screen</Text>

        </View>
    )
}