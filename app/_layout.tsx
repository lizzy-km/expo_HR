import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {StatusBar} from 'expo-status-bar';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {useColorScheme} from '@/hooks/useColorScheme';
import React from "react";
import {Main} from "@/app/main";


export default function RootLayout() {

    const queryClient = new QueryClient();


    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        PoppinsBlack: require('../assets/fonts/Poppins/Poppins-Black.ttf'),
        PoppinsRegular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        PoppinsMedium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),

    });


    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }


    return (<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

            <QueryClientProvider client={queryClient}>

                <Main/>

            </QueryClientProvider>


            <StatusBar style="auto"/>
        </ThemeProvider>

    );


}


