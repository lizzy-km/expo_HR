import {LinearGradient} from "expo-linear-gradient";
import {View} from "react-native";
import {Image} from "expo-image";
import {UserDataType} from "@/constants/Types";

export default function userProfile({userData}:{userData:UserDataType}) {
    return (
    <View style={{
    width: 32,
    height: "100%",
    borderRadius: '999px',
    padding: 1
}}>
    <LinearGradient style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        borderRadius: '999px',

    }} colors={['#A7F3D0', '#414AA4']}/>
    <View style={{
        width: '100%',
        height: '100%',
        borderRadius: '999px',
        backgroundColor: '#FFFFFF',
        padding: 1

    }}>
        <Image
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '999px',
                backgroundColor: '#FFFFFF',

            }}
            source={userData?.pfUrl}
        />
    </View>

</View>
)
}