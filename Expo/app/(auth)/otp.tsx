// import React, { useEffect, useRef, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     ActivityIndicator,
//     Alert,
// } from "react-native";
// import { router, useLocalSearchParams } from "expo-router";

// const API_URL = "http://192.168.1.36:3000";

// export default function OtpScreen() {
//     const { phone } = useLocalSearchParams<{ phone: string }>();

//     const [otp, setOtp] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [resending, setResending] = useState(false);
//     const [timer, setTimer] = useState(30);

//     const inputRef = useRef<TextInput>(null);

//     useEffect(() => {
//         if (timer <= 0) return;

//         const interval = setInterval(() => {
//             setTimer((prev) => prev - 1);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [timer]);

//     const verifyOTP = async () => {
//         if (otp.length !== 6) {
//             Alert.alert("Invalid OTP", "Please enter the 6-digit OTP.");
//             return;
//         }

//         try {
//             setLoading(true);

//             const response = await fetch(
//                 `${API_URL}/api/auth/verify-otp`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         phone,
//                         otp,
//                     }),
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok || !data.success) {
//                 throw new Error(
//                     data.message || "OTP verification failed"
//                 );
//             }

//             console.log("OTP Verified:", data);

//             /*
//              * Backend ke response mein token aa raha hai
//              * to next step mein yahan SecureStore mein save karenge.
//              */

//             router.replace({
//                 pathname: "/(auth)/profile",
//                 params: {
//                     phone: phone ?? "",
//                 },
//             });
//         } catch (error) {
//             console.error("Verify OTP Error:", error);

//             Alert.alert(
//                 "Verification Failed",
//                 error instanceof Error
//                     ? error.message
//                     : "Invalid or expired OTP"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resendOTP = async () => {
//         if (timer > 0 || !phone) return;

//         try {
//             setResending(true);

//             const response = await fetch(
//                 `${API_URL}/api/auth/send-otp`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         phone,
//                     }),
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok || !data.success) {
//                 throw new Error(
//                     data.message || "Failed to resend OTP"
//                 );
//             }

//             setOtp("");
//             setTimer(30);

//             Alert.alert("OTP Sent", "A new OTP has been sent.");
//         } catch (error) {
//             console.error("Resend OTP Error:", error);

//             Alert.alert(
//                 "Error",
//                 error instanceof Error
//                     ? error.message
//                     : "Unable to resend OTP"
//             );
//         } finally {
//             setResending(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Back */}
//             <TouchableOpacity
//                 style={styles.backButton}
//                 onPress={() => router.back()}
//             >
//                 <Text style={styles.backText}>‹</Text>
//             </TouchableOpacity>

//             <View style={styles.content}>
//                 {/* Logo */}
//                 <View style={styles.logo}>
//                     <Text style={styles.logoText}>V</Text>
//                 </View>

//                 {/* Heading */}
//                 <Text style={styles.title}>Verify your number</Text>

//                 <Text style={styles.subtitle}>
//                     We sent a 6-digit verification code to
//                 </Text>

//                 <Text style={styles.phone}>{phone}</Text>

//                 {/* OTP Boxes */}
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     onPress={() => inputRef.current?.focus()}
//                     style={styles.otpContainer}
//                 >
//                     {Array.from({ length: 6 }).map((_, index) => (
//                         <View
//                             key={index}
//                             style={[
//                                 styles.otpBox,
//                                 otp[index] && styles.otpBoxActive,
//                             ]}
//                         >
//                             <Text style={styles.otpText}>
//                                 {otp[index] || ""}
//                             </Text>
//                         </View>
//                     ))}
//                 </TouchableOpacity>

//                 {/* Hidden Input */}
//                 <TextInput
//                     ref={inputRef}
//                     value={otp}
//                     onChangeText={(value) =>
//                         setOtp(
//                             value.replace(/[^0-9]/g, "").slice(0, 6)
//                         )
//                     }
//                     keyboardType="number-pad"
//                     maxLength={6}
//                     style={styles.hiddenInput}
//                     autoFocus
//                 />

//                 {/* Verify */}
//                 <TouchableOpacity
//                     style={[
//                         styles.verifyButton,
//                         otp.length !== 6 && styles.disabledButton,
//                     ]}
//                     disabled={otp.length !== 6 || loading}
//                     onPress={verifyOTP}
//                     activeOpacity={0.8}
//                 >
//                     {loading ? (
//                         <ActivityIndicator color="#FFFFFF" />
//                     ) : (
//                         <Text style={styles.verifyText}>
//                             Verify
//                         </Text>
//                     )}
//                 </TouchableOpacity>

//                 {/* Resend */}
//                 <View style={styles.resendContainer}>
//                     <Text style={styles.resendText}>
//                         Didn't receive the code?
//                     </Text>

//                     <TouchableOpacity
//                         disabled={timer > 0 || resending}
//                         onPress={resendOTP}
//                     >
//                         {resending ? (
//                             <ActivityIndicator
//                                 size="small"
//                                 color="#FF3B30"
//                             />
//                         ) : (
//                             <Text
//                                 style={[
//                                     styles.resendButton,
//                                     timer > 0 && styles.resendDisabled,
//                                 ]}
//                             >
//                                 {timer > 0
//                                     ? `Resend in ${timer}s`
//                                     : "Resend OTP"}
//                             </Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#0A0A0A",
//     },

//     content: {
//         flex: 1,
//         paddingHorizontal: 24,
//         paddingTop: 100,
//     },

//     backButton: {
//         position: "absolute",
//         top: 55,
//         left: 20,
//         zIndex: 10,
//         width: 42,
//         height: 42,
//         borderRadius: 21,
//         backgroundColor: "#171717",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     backText: {
//         color: "#FFFFFF",
//         fontSize: 34,
//         lineHeight: 38,
//         fontWeight: "300",
//     },

//     logo: {
//         width: 58,
//         height: 58,
//         borderRadius: 18,
//         backgroundColor: "#FF3B30",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 28,
//     },

//     logoText: {
//         color: "#FFFFFF",
//         fontSize: 30,
//         fontWeight: "800",
//     },

//     title: {
//         color: "#FFFFFF",
//         fontSize: 29,
//         fontWeight: "700",
//         marginBottom: 10,
//     },

//     subtitle: {
//         color: "#8E8E93",
//         fontSize: 15,
//         lineHeight: 22,
//     },

//     phone: {
//         color: "#FFFFFF",
//         fontSize: 16,
//         fontWeight: "600",
//         marginTop: 5,
//     },

//     otpContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 36,
//         marginBottom: 28,
//     },

//     otpBox: {
//         width: 48,
//         height: 58,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "#292929",
//         backgroundColor: "#151515",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     otpBoxActive: {
//         borderColor: "#FF3B30",
//     },

//     otpText: {
//         color: "#FFFFFF",
//         fontSize: 22,
//         fontWeight: "700",
//     },

//     hiddenInput: {
//         position: "absolute",
//         width: 1,
//         height: 1,
//         opacity: 0,
//     },

//     verifyButton: {
//         height: 56,
//         borderRadius: 14,
//         backgroundColor: "#FF3B30",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     disabledButton: {
//         opacity: 0.45,
//     },

//     verifyText: {
//         color: "#FFFFFF",
//         fontSize: 17,
//         fontWeight: "700",
//     },

//     resendContainer: {
//         alignItems: "center",
//         marginTop: 24,
//     },

//     resendText: {
//         color: "#777777",
//         fontSize: 14,
//         marginBottom: 8,
//     },

//     resendButton: {
//         color: "#FF3B30",
//         fontSize: 14,
//         fontWeight: "700",
//     },

//     resendDisabled: {
//         color: "#555555",
//     },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://172.16.50.215:3000";

export default function OTPVerificationScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit OTP.");
      return;
    }

    if (!phone) {
      Alert.alert(
        "Phone Number Missing",
        "Please enter your phone number again."
      );
      router.replace("/(auth)/phone");
      return;
    }

    try {
      setLoading(true);

      console.log("Verifying OTP for:", phone);

      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          otp,
        }),
      });

      const data = await response.json();

      console.log("Verify OTP Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      // Backend should return:
      // {
      //   success: true,
      //   token: "JWT_TOKEN",
      //   user: {...}
      // }

      const token = data.token;

      if (!token) {
        console.log("Token missing from response:", data);

        throw new Error(
          "OTP verified, but authentication token was not received."
        );
      }

      // IMPORTANT:
      // Save JWT token for ProfileScreen
      await SecureStore.setItemAsync("authToken", token);

      // Verify that token was actually saved
      const savedToken = await SecureStore.getItemAsync("authToken");

      console.log("Auth token saved:", !!savedToken);

      if (!savedToken) {
        throw new Error("Unable to save authentication session.");
      }

      Alert.alert(
        "Verified 🎉",
        "Your phone number has been verified.",
        [
          {
            text: "Continue",
            onPress: () => {
              router.replace("/(auth)/profile");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Verify OTP Error:", error);

      Alert.alert(
        "Verification Failed",
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!phone) {
      Alert.alert("Phone Number Missing");
      return;
    }

    try {
      setResending(true);

      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
        }),
      });

      const data = await response.json();

      console.log("Resend OTP Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      Alert.alert(
        "OTP Sent",
        "A new OTP has been sent to your phone."
      );
    } catch (error) {
      console.error("Resend OTP Error:", error);

      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to resend OTP."
      );
    } finally {
      setResending(false);
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
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Verify your number
        </Text>

        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to
        </Text>

        <Text style={styles.phone}>
          {phone}
        </Text>

        {/* OTP Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.otpInput}
            value={otp}
            onChangeText={(text) => {
              const cleaned = text
                .replace(/[^0-9]/g, "")
                .slice(0, 6);

              setOtp(cleaned);
            }}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="000000"
            placeholderTextColor="#555"
            editable={!loading}
            autoFocus
            textAlign="center"
          />
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.button,
            otp.length !== 6 && styles.buttonDisabled,
          ]}
          onPress={verifyOTP}
          disabled={loading || otp.length !== 6}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              Verify & Continue
            </Text>
          )}
        </TouchableOpacity>

        {/* Resend */}
        <TouchableOpacity
          style={styles.resendButton}
          onPress={resendOTP}
          disabled={resending || loading}
        >
          {resending ? (
            <ActivityIndicator color="#FF3B30" />
          ) : (
            <Text style={styles.resendText}>
              Didn't receive the code?{" "}
              <Text style={styles.resendHighlight}>
                Resend OTP
              </Text>
            </Text>
          )}
        </TouchableOpacity>

        {/* Change Number */}
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/phone")}
          disabled={loading}
        >
          <Text style={styles.changeNumber}>
            Change phone number
          </Text>
        </TouchableOpacity>

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
    marginBottom: 35,
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "#8E8E93",
    fontSize: 15,
    textAlign: "center",
  },

  phone: {
    color: "#FFB6B0",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 35,
  },

  inputContainer: {
    marginBottom: 20,
  },

  otpInput: {
    height: 64,
    borderRadius: 14,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#333333",
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "700",
    letterSpacing: 10,
    paddingHorizontal: 15,
  },

  button: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  resendButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    minHeight: 30,
  },

  resendText: {
    color: "#8E8E93",
    fontSize: 14,
  },

  resendHighlight: {
    color: "#FF3B30",
    fontWeight: "700",
  },

  changeNumber: {
    color: "#FFB6B0",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 25,
  },
});