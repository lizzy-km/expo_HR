import {Animated, ViewStyle} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {PropsWithChildren, useEffect, useRef} from "react";
import {splashStyle} from "@/constants/Styles";

type SplashScreenWLogoProps = PropsWithChildren<{ style: ViewStyle }>;

export const SplashScreenWLogo: (props: any) => {
    AnimatedComponent: () => React.JSX.Element;
    val: Animated.Value
} = props => {


    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the animation when the component mounts.
        Animated.timing(fadeAnim, {
            toValue: 1, // Animate to an opacity of 1
            duration: 3000, // Over a duration of 1000 milliseconds (1 second)
            useNativeDriver: true, // Use the native driver for better performance
        }).start();
    }, [fadeAnim]); // The dependency array ensures the effect runs only once.

    function AnimatedComponent() {
        return (<SafeAreaView style={splashStyle.container}>


            <Animated.View // Special animatable View
                style={{
                    ...splashStyle.background,
                    opacity: fadeAnim, // Bind opacity to animated value
                }}>
                {props.element}
            </Animated.View>


        </SafeAreaView>)
    }

    return ({
        AnimatedComponent, val: fadeAnim
    })

}