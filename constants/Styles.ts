//Slash Screen

import {Keyboard, StyleSheet} from "react-native";
import {borderColorDark, Colors} from "@/constants/Colors";

export const splashStyle = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }, logo: {
        fontSize: 30, fontWeight: 'bold',
    }, background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: 'linear-gradient(180deg, rgba(31, 71, 188, 0.20) 50%, rgba(31, 71, 188, 0.50) 100%), linear-gradient(180deg, rgba(31, 71, 188, 0.20) 50%, rgba(31, 71, 188, 0.50) 100%)',

    }

});

export const LoginStyle = StyleSheet.create({
    container: {
        width: '100%',
        height:'100%',
        justifyContent: "center",
        alignItems: 'center',
        gap:20,
        fontFamily:"PoppinsRegular",
    },
    header:{
        width: '100%',
        height: 60,
        gap:4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingInline:12,
        paddingBlock:4,
        alignSelf:"stretch",
        fontFamily:"Poppins",

    },
    form:{
        width: '100%',
        height: 'auto',
        gap:8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf:"stretch"
    },
    inputGroup:{
        width: '100%',
        height: 'auto',
        gap:16,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    input:{
        width: '100%',
        minHeight: 44,
        padding:12,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#919191',
        borderStyle: 'solid',
        fontSize:14,
        lineHeight:25.6
    },
    options:{
        width: '100%',
        height: 'auto',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingInline:1

    },
    link:{
        fontSize:12,
        fontWeight:500,
        width:"auto",
        textDecorationStyle:"solid",
        textDecorationLine:"underline",
        fontFamily:"PoppinsMedium",

    },
    button:{
        width: '100%',
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        paddingInline:4,
        paddingBlock:8,
        borderRadius:20,
        backgroundColor:borderColorDark,
        fontFamily:"PoppinsRegular",

    }
})

