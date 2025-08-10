import {LinearGradient} from "expo-linear-gradient";
import {View} from "react-native";
import {Image} from "expo-image";
import {UserDataType} from "@/constants/Types";
import {BASE_URL} from "@/services/api/api";

export default function userProfile({userData,size}: { userData: UserDataType ,size:number }) {
    const borderRadius = size/2

    const userPfUrl = userData?.pfUrl?.replace("https://d3tl7h6gfpqk4t.cloudfront.net",BASE_URL)

    return (
        <View style={{
            width: size,
            height: size,
            borderRadius,
            justifyContent:"center",
            alignItems:"center"
        }}>
            <LinearGradient style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: size,
                width: size,
                borderRadius,


            }} colors={['#A7F3D0', '#414AA4']}/>
            <View style={{
                width: size-2,
                height: size-2,
                borderRadius,
                backgroundColor: '#FFFFFF',
                justifyContent:"center",
                alignItems:"center"


            }}>
                <Image
                    style={{
                        width: size-4,
                        height: size-4,
                        borderRadius:borderRadius-1,
                        backgroundColor: '#FFFFFF',

                    }}
                    contentFit={'cover'}
                    transition={300}
                    source={{uri:userPfUrl}}

                />
            </View>

        </View>
    )
}