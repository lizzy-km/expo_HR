import {LinearGradient} from "expo-linear-gradient";
import {Pressable, View} from "react-native";
import {Image} from "expo-image";
import {UserDataType} from "@/constants/Types";
import {BASE_URL} from "@/services/api/api";
import {Logout} from "@/services/mutation/auth/AuthMutation";
import {LogoutConfirmationModal} from "expo-dev-launcher/bundle/components/LogoutConfirmationModal";

export default function userProfile({userData,size,setModalVisible}: { userData: UserDataType ,size:number }) {
    const borderRadius = size/2

    const userPfUrl = userData?.pfUrl?.replace("https://d3tl7h6gfpqk4t.cloudfront.net",BASE_URL)

    const {mutate,isSuccess} = Logout()


    function onLogOut (){
        setModalVisible(true)
        // LogoutConfirmationModal({
        //     onClosePress,
        //     onLogoutPress:mutate
        // })
    }

    return (
        <Pressable
            onPress={onLogOut}

            style={{
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
                backgroundColor: "#FFFFFF",
                justifyContent:"center",
                alignItems:"center"


            }}>
                <LinearGradient style={{
                    position: 'absolute',
                    top: 1,
                    left: 1,
                    height: size-4,
                    width: size-4,
                    borderRadius:borderRadius-1,


                }} colors={['#A7F3D0', '#414AA4']}/>
                <Image
                    style={{
                        width: size-4,
                        height: size-4,
                        borderRadius:borderRadius-1,
                        backgroundColor: '#FFFFFF20',

                    }}
                    contentFit={'cover'}
                    transition={300}
                    source={{uri:userPfUrl}}

                />
            </View>

        </Pressable>
    )
}