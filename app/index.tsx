import React from "react";
import Login from "@/app/login";
import {useFocusEffect, useRouter} from "expo-router";

export default function Index() {
    const router = useRouter();

    useFocusEffect(() => {
        router.replace('/login')
    })

    return (<Login/>)
}


