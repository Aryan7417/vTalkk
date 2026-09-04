import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import { router } from "expo-router";

const API_URL = "http://172.16.50.215:3000";
// ip address with defaut

export default function PhoneScreen() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const sendOTP = async () => {
        if (phone.length !== 10) {
            Alert.alert(
                "Invalid Number",
                "Please enter a valid 10-digit phone number."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api/auth/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: `+91${phone}`,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to send OTP");
            }

            // OTP screen par phone number bhejna
            router.push({
                pathname: "/(auth)/otp",
                params: {
                    phone: `+91${phone}`,
                },
            });
        } catch (error) {
            console.error("Send OTP Error:", error);

            Alert.alert(
                "Error",
                error instanceof Error
                    ? error.message
                    : "Unable to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Text style={styles.logoText}>V</Text>
                    </View>

                    <Text style={styles.brand}>VTalk</Text>
                </View>

                {/* Heading */}
                <View style={styles.headingContainer}>
                    <Text style={styles.title}>Welcome to VTalk</Text>

                    <Text style={styles.subtitle}>
                        Enter your phone number to get started
                    </Text>
                </View>

                {/* Phone Input */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>Phone number</Text>

                    <View style={styles.phoneInputContainer}>
                        <View style={styles.countryCode}>
                            <Text style={styles.flag}>🇮🇳</Text>
                            <Text style={styles.code}>+91</Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={(text) =>
                                setPhone(text.replace(/[^0-9]/g, "").slice(0, 10))
                            }
                            placeholder="Enter phone number"
                            placeholderTextColor="#666666"
                            keyboardType="phone-pad"
                            maxLength={10}
                            editable={!loading}
                        />
                    </View>
                </View>

                {/* Continue */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        phone.length !== 10 && styles.buttonDisabled,
                    ]}
                    onPress={sendOTP}
                    disabled={phone.length !== 10 || loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Continue</Text>
                    )}
                </TouchableOpacity>

                {/* Privacy */}
                <Text style={styles.privacy}>
                    By continuing, you agree to our{" "}
                    <Text style={styles.link}>Terms of Service</Text>
                    {" "}and{" "}
                    <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0A",
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 55,
    },

    logo: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: "#FF3B30",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    logoText: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "800",
    },

    brand: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
    },

    headingContainer: {
        marginBottom: 36,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 10,
    },

    subtitle: {
        color: "#8E8E93",
        fontSize: 16,
        lineHeight: 23,
    },

    inputSection: {
        marginBottom: 24,
    },

    label: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 10,
    },

    phoneInputContainer: {
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 14,
    },

    countryCode: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        borderRightWidth: 1,
        borderRightColor: "#292929",
    },

    flag: {
        fontSize: 20,
        marginRight: 7,
    },

    code: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    input: {
        flex: 1,
        height: "100%",
        color: "#FFFFFF",
        fontSize: 17,
        paddingHorizontal: 15,
    },

    button: {
        height: 56,
        borderRadius: 14,
        backgroundColor: "#FF3B30",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonDisabled: {
        opacity: 0.45,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    privacy: {
        color: "#666666",
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
        marginTop: 22,
        paddingHorizontal: 10,
    },

    link: {
        color: "#AAAAAA",
    },
});