import {
    Keyboard, Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import {EyeClose, EyeOpen, LoginHero} from "@/components/ui/svgs/ExportedSvg";
import {borderColorDark, Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {LoginStyle} from "@/constants/Styles";
import React, {useEffect, useState} from "react";
import {Link, useFocusEffect, useRouter} from "expo-router";
import Animated, {useAnimatedStyle, withSpring} from "react-native-reanimated";
import {AuthMutation} from "@/services/mutation/auth/AuthMutation";
import {saveLoginData} from "@/services/tokenService";
import {BlurView} from "expo-blur";
import {useGetAccessTokenFromStore} from "@/services/query/getStoreQuery";
import BlurTabBarBackground from "@/components/ui/TabBarBackground.ios";

export default function Login() {

    const {data:tokenData} = useGetAccessTokenFromStore()




    const colorScheme = useColorScheme();

    const [password, setPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);

    const [email, setEmail] = useState("");
    const [onKeyBoard, setOnKeyBoard] = useState(false);

    // This function will be called when the icon is pressed
    const toggleSecureEntry = () => {
        setIsSecure(!isSecure);
    };


    const BoxStyle = useAnimatedStyle(() => {
        return {
            height: withSpring(onKeyBoard ? 250 : 0, {
                duration: 400
            }), width: "100%"
        }
    })

    const {mutate, data, isSuccess,isPending} = AuthMutation()


    function LoginSubmit() {
        return mutate({
            email, password, role: "ROLE_USER"
        })
    }



    const router = useRouter();

    useEffect(()=>{
        console.log(tokenData);
        tokenData?.length > 16 &&  router.navigate('/')
    },[tokenData])


    return (<TouchableNativeFeedback style={LoginStyle.container} onPressIn={() => setOnKeyBoard(false)}
                                     onPress={Keyboard.dismiss} accessible={false}>
            <View style={{
                ...LoginStyle.container,
                backgroundColor: Colors[colorScheme ?? "light"].background,
                paddingInline: 20,
                transitionDuration: 0.4,
                transitionProperty: "all",
                transitionDelay: 0.5,
                position:"relative"

            }}>
                {
                    isPending && <BlurView
                    tint={'dark'}
                        style={{
                            position:"absolute",
                            right:-10,
                            top:0,
                            width:"120%",
                            height:"100%",
                            zIndex:10,
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

                <LoginHero/>

                {/*    Header*/}

                <View
                    style={LoginStyle.header}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 500,
                        textAlign: "center",
                        width: "100%",
                        color: Colors[colorScheme ?? "light"].text,
                        fontFamily: "PoppinsMedium",


                    }}>
                        Sign in to your account
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 500,
                        textAlign: "center",
                        width: "100%",
                        color: Colors[colorScheme ?? "light"].text,
                        lineHeight: 25.6,
                        fontFamily: "PoppinsMedium",


                    }}>
                        Stay connected. Stay productive.
                    </Text>
                </View>

                {/*    Header*/}

                {/*    Form*/}

                <View style={LoginStyle.form}>
                    {/*Input Group*/}
                    <View style={LoginStyle.inputGroup}>
                        <TextInput
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            onFocus={() => setOnKeyBoard(true)}

                            style={{
                                ...LoginStyle.input,
                                color: Colors[colorScheme ?? "light"].text,
                                fontFamily: "PoppinsRegular",


                            }}
                            placeholder="Enter your email address"
                            keyboardType={"email-address"}
                            placeholderTextColor={Colors[colorScheme ?? "light"].text + '50'}
                            onLayout={() => {
                            }}

                        />

                        <View style={{
                            width: "100%", flexDirection: "row", position: "relative"
                        }}>
                            <TextInput
                                onFocus={() => setOnKeyBoard(true)}

                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                style={{
                                    ...LoginStyle.input,

                                    color: Colors[colorScheme ?? "light"].text, fontFamily: "PoppinsRegular",

                                }}
                                placeholder="Enter your Password"
                                secureTextEntry={isSecure}
                                placeholderTextColor={Colors[colorScheme ?? "light"].text + '50'}
                                clearButtonMode={"always"}
                            />
                            <TouchableOpacity onPress={toggleSecureEntry} style={styles.iconContainer}>
                                {isSecure ? <EyeClose/> : <EyeOpen/>}
                            </TouchableOpacity>
                        </View>


                    </View>

                    {/*Options*/}
                    <View
                        style={LoginStyle.options}
                    >
                        <Link style={{
                            ...LoginStyle.link, color: borderColorDark, fontFamily: "PoppinsRegular",

                        }} href={'forgot-pass'}>
                            Forgot password?
                        </Link>
                    </View>
                </View>

                {/*    Form*/}


                {/*    Submit Button*/}
                <Pressable onPress={LoginSubmit} style={{
                    ...LoginStyle.button, color: Colors[colorScheme ?? "light"].text
                }}>
                    <Text style={{
                        color: "#ffffff", fontSize: 16, fontWeight: 500, fontFamily: "PoppinsMedium",

                    }}>
                        Login
                    </Text>

                </Pressable>

                <Animated.View style={[BoxStyle]}/>


            </View>


        </TouchableNativeFeedback>


    )
}


const styles = StyleSheet.create({
    appContainer: {
        flex: 1, justifyContent: 'center', padding: 20
    }, title: {
        fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
    }, // Styles for the PasswordInput component
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
    }, input: {
        flex: 1, // Takes up all available space
        height: 45, fontSize: 16,
    }, iconContainer: {
        padding: 12, // Makes the icon easier to tap
        position: 'absolute', right: 0, top: 0, height: "100%", justifyContent: "center"

    },
});
