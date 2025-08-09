import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {useColorScheme} from '@/hooks/useColorScheme';
import React from "react";


export default function RootLayout() {

    const queryClient = new QueryClient();


    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }


    return (
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

                <QueryClientProvider client={queryClient}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        <Stack.Screen name="+not-found"/>
                    </Stack>
                </QueryClientProvider>






            <StatusBar style="auto"/>
        </ThemeProvider>

   );


}


