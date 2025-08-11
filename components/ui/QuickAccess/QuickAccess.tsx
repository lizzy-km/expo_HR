import QuickAccessBox from "@/components/ui/QuickAccess/QuickAccessBox";
import {Text, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

export default function QuickAccess() {
    const colorScheme = useColorScheme();
    interface style{
        headerText:{},
        text:{}
    }
    const styles:style = {
        headerText: {
            fontSize: 20,
            fontWeight: 500,
            color:Colors[colorScheme ?? "light"].text

        },
        text: {
            color: Colors[colorScheme ?? 'light'].text,
            fontSize: 16,
            lineHeight: 25.6,
            fontWeight: 400
        },
    }
    return (
        <View style={{
            width: "100%",
            height: "auto",
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            paddingBlock: 12,
            gap: 8,
            flexDirection: "column",
            alignItems: "flex-start",
            borderStyle: "solid",
            borderBottomColor: "rgba(145, 145, 145, 0.20)",
            borderBottomWidth: 1
        }}>

            {/*Header*/}
            <Text style={styles.headerText}>Quick Access</Text>

            <View style={
                {
                    width: "100%",
                    height: "auto",
                    gap: 16,
                    flexDirection: "row",

                }
            }>
                {/*Content*/}

                <QuickAccessBox title={"Meeting room"} bgImage={""}/>
                <QuickAccessBox title={"Leave request"} bgImage={""}/>
                <QuickAccessBox title={"Claim"} bgImage={""}/>
                <QuickAccessBox title={"Request Box"} bgImage={""}/>


            </View>


        </View>
    )
}