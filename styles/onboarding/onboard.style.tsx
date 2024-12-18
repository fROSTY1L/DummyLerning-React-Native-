import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
    firstContainer: {
        alignItems: "center",
        marginTop: 50,
        
    },
    logo: {
        width: wp("23%"),
        height: hp("12%")
    },
    titleWrapper: {
        flexDirection: "row",
        
    },
    titleTextShape1: {
        position: "absolute",
        top: -28,
        left: -20
    },
    titleText: {
        fontSize: hp("4%"),
        textAlign: "center"
    },
    titleTextShape2: {
        position: "absolute",
        top: 10,
        right: -20
    },
    titleTextShape3: {
        position: "absolute",
        left: 60
    },
    brandName: {
        fontSize: hp("3%"),
        textAlign: "center"
    },
    describeText: {
        textAlign: "center",
        color: "#575757",
        fontSize: hp("2%")
    },
    describeWrapper: {
        marginTop: 40
    },
    buttonWrapper: {
        backgroundColor: "#2467EC",
        width: wp("92%"),
        paddingVertical: 18,
        borderRadius: 4,
        marginTop: 40
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    welcomeButtonStyle:{
        backgroundColor: "#2467EC",
        width: responsiveWidth(88),
        height: responsiveHeight(5.5),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      }
})