import { Text, View, StyleSheet } from 'react-native';
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";


export default function NewsScreen() {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: Colors[colorScheme ?? 'light'].text,
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.text}>News screen</Text>
        </View>
    );
}



