import { View, Text } from "react-native";

export default function PhoneScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 24 }}>
        Phone Login
      </Text>
    </View>
  );
}