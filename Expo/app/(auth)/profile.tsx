// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     ActivityIndicator,
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
// } from "react-native";
// import { router } from "expo-router";
// import * as SecureStore from "expo-secure-store";

// const API_URL = "http://192.168.1.36:3000";

// export default function ProfileScreen() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);

//     const completeProfile = async () => {
//         if (!name.trim()) {
//             Alert.alert("Name Required", "Please enter your name.");
//             return;
//         }

//         if (!email.trim()) {
//             Alert.alert("Email Required", "Please enter your email.");
//             return;
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!emailRegex.test(email.trim())) {
//             Alert.alert("Invalid Email", "Please enter a valid email address.");
//             return;
//         }

//         try {
//             setLoading(true);

//             // Get JWT token saved after OTP verification
//             const token = await SecureStore.getItemAsync("authToken");

//             if (!token) {
//                 Alert.alert(
//                     "Session Expired",
//                     "Please verify your phone number again."
//                 );
//                 router.replace("/(auth)/phone");
//                 return;
//             }

//             const response = await fetch(
//                 `${API_URL}/api/user/profile`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({
//                         name: name.trim(),
//                         email: email.trim(),
//                     }),
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok || !data.success) {
//                 throw new Error(
//                     data.message || "Failed to update profile"
//                 );
//             }

//             console.log("Profile Updated:", data);

//             Alert.alert(
//                 "Profile Completed 🎉",
//                 "Your VTalk profile is ready.",
//                 [
//                     {
//                         text: "Continue",
//                         onPress: () => {
//                             router.replace("/(tabs)/home");
//                         },
//                     },
//                 ]
//             );
//         } catch (error) {
//             console.error("Profile Error:", error);

//             Alert.alert(
//                 "Error",
//                 error instanceof Error
//                     ? error.message
//                     : "Failed to update profile"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <KeyboardAvoidingView
//             style={styles.container}
//             behavior={
//                 Platform.OS === "ios"
//                     ? "padding"
//                     : undefined
//             }
//         >
//             <View style={styles.content}>

//                 {/* Logo */}
//                 <View style={styles.logoContainer}>
//                     <View style={styles.logo}>
//                         <Text style={styles.logoText}>V</Text>
//                     </View>
//                 </View>

//                 {/* Heading */}
//                 <Text style={styles.title}>
//                     Set up your profile
//                 </Text>

//                 <Text style={styles.subtitle}>
//                     Tell us a little about yourself
//                 </Text>

//                 {/* Avatar */}
//                 <View style={styles.avatarContainer}>
//                     <View style={styles.avatar}>
//                         <Text style={styles.avatarText}>
//                             {name
//                                 ? name.charAt(0).toUpperCase()
//                                 : "A"}
//                         </Text>
//                     </View>

//                     <TouchableOpacity activeOpacity={0.7}>
//                         <Text style={styles.changePhoto}>
//                             Add profile photo
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Name */}
//                 <View style={styles.inputSection}>
//                     <Text style={styles.label}>
//                         Your name
//                     </Text>

//                     <TextInput
//                         style={styles.input}
//                         value={name}
//                         onChangeText={setName}
//                         placeholder="Enter your name"
//                         placeholderTextColor="#666666"
//                         autoCapitalize="words"
//                         editable={!loading}
//                     />
//                 </View>

//                 {/* Email */}
//                 <View style={styles.inputSection}>
//                     <Text style={styles.label}>
//                         Email address
//                     </Text>

//                     <TextInput
//                         style={styles.input}
//                         value={email}
//                         onChangeText={setEmail}
//                         placeholder="Enter your email"
//                         placeholderTextColor="#666666"
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         autoCorrect={false}
//                         editable={!loading}
//                     />
//                 </View>

//                 {/* Continue */}
//                 <TouchableOpacity
//                     style={[
//                         styles.button,
//                         (!name.trim() || !email.trim()) &&
//                         styles.buttonDisabled,
//                     ]}
//                     onPress={completeProfile}
//                     disabled={
//                         loading ||
//                         !name.trim() ||
//                         !email.trim()
//                     }
//                     activeOpacity={0.8}
//                 >
//                     {loading ? (
//                         <ActivityIndicator color="#FFFFFF" />
//                     ) : (
//                         <Text style={styles.buttonText}>
//                             Complete Profile
//                         </Text>
//                     )}
//                 </TouchableOpacity>

//             </View>
//         </KeyboardAvoidingView>
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
//         paddingTop: 70,
//     },

//     logoContainer: {
//         alignItems: "center",
//         marginBottom: 25,
//     },

//     logo: {
//         width: 58,
//         height: 58,
//         borderRadius: 18,
//         backgroundColor: "#FF3B30",
//         alignItems: "center",
//         justifyContent: "center",
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
//         textAlign: "center",
//         marginBottom: 8,
//     },

//     subtitle: {
//         color: "#8E8E93",
//         fontSize: 15,
//         textAlign: "center",
//         marginBottom: 35,
//     },

//     avatarContainer: {
//         alignItems: "center",
//         marginBottom: 32,
//     },

//     avatar: {
//         width: 92,
//         height: 92,
//         borderRadius: 46,
//         backgroundColor: "#242424",
//         borderWidth: 2,
//         borderColor: "#FF3B30",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 12,
//     },

//     avatarText: {
//         color: "#FFFFFF",
//         fontSize: 34,
//         fontWeight: "700",
//     },

//     changePhoto: {
//         color: "#FF3B30",
//         fontSize: 14,
//         fontWeight: "600",
//     },

//     inputSection: {
//         marginBottom: 18,
//     },

//     label: {
//         color: "#FFFFFF",
//         fontSize: 14,
//         fontWeight: "600",
//         marginBottom: 9,
//     },

//     input: {
//         height: 56,
//         borderRadius: 14,
//         backgroundColor: "#151515",
//         borderWidth: 1,
//         borderColor: "#292929",
//         color: "#FFFFFF",
//         fontSize: 16,
//         paddingHorizontal: 16,
//     },

//     button: {
//         height: 56,
//         borderRadius: 14,
//         backgroundColor: "#FF3B30",
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 10,
//     },

//     buttonDisabled: {
//         opacity: 0.45,
//     },

//     buttonText: {
//         color: "#FFFFFF",
//         fontSize: 17,
//         fontWeight: "700",
//     },
// });


import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.1.36:3000";

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // const completeProfile = async () => {
    //     // -----------------------------
    //     // VALIDATION
    //     // -----------------------------

    //     if (!name.trim()) {
    //         Alert.alert(
    //             "Name Required",
    //             "Please enter your name."
    //         );
    //         return;
    //     }

    //     if (!email.trim()) {
    //         Alert.alert(
    //             "Email Required",
    //             "Please enter your email."
    //         );
    //         return;
    //     }

    //     const emailRegex =
    //         /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //     if (!emailRegex.test(email.trim())) {
    //         Alert.alert(
    //             "Invalid Email",
    //             "Please enter a valid email address."
    //         );
    //         return;
    //     }

    //     try {
    //         setLoading(true);

    //         // -----------------------------
    //         // GET JWT TOKEN
    //         // -----------------------------

    //         const token =
    //             await SecureStore.getItemAsync(
    //                 "authToken"
    //             );

    //         console.log(
    //             "Auth token exists:",
    //             !!token
    //         );

    //         // -----------------------------
    //         // TOKEN NOT FOUND
    //         // -----------------------------

    //         if (!token) {
    //             Alert.alert(
    //                 "Session Expired",
    //                 "Please verify your phone number again.",
    //                 [
    //                     {
    //                         text: "OK",
    //                         onPress: () => {
    //                             router.replace(
    //                                 "/(auth)/phone"
    //                             );
    //                         },
    //                     },
    //                 ]
    //             );

    //             return;
    //         }

    //         // -----------------------------
    //         // UPDATE PROFILE
    //         // -----------------------------

    //         console.log(
    //             "Updating profile..."
    //         );

    //         const response = await fetch(
    //             `${API_URL}/api/user/profile`,
    //             {
    //                 method: "PATCH",

    //                 headers: {
    //                     "Content-Type":
    //                         "application/json",

    //                     Authorization:
    //                         `Bearer ${token}`,
    //                 },

    //                 body: JSON.stringify({
    //                     name: name.trim(),
    //                     email: email.trim(),
    //                 }),
    //             }
    //         );

    //         // -----------------------------
    //         // RESPONSE
    //         // -----------------------------

    //         const data =
    //             await response.json();

    //         console.log(
    //             "Profile response:",
    //             data
    //         );

    //         // -----------------------------
    //         // ERROR
    //         // -----------------------------

    //         if (!response.ok) {
    //             throw new Error(
    //                 data.message ||
    //                 "Failed to update profile"
    //             );
    //         }

    //         // -----------------------------
    //         // SUCCESS
    //         // -----------------------------

    //         console.log(
    //             "✅ Profile updated successfully"
    //         );

    //         Alert.alert(
    //             "Profile Completed 🎉",
    //             "Your VTalk profile is ready.",
    //             [
    //                 {
    //                     text: "Continue",
    //                     onPress: () => {
    //                         router.replace(
    //                             "/(tabs)/home"
    //                         );
    //                     },
    //                 },
    //             ]
    //         );

    //     } catch (error) {
    //         console.error(
    //             "❌ Profile Error:",
    //             error
    //         );

    //         let message =
    //             "Failed to update profile.";

    //         if (error instanceof Error) {
    //             message = error.message;
    //         }

    //         Alert.alert(
    //             "Error",
    //             message
    //         );

    //     } finally {
    //         setLoading(false);
    //     }
    // };



    const completeProfile = async () => {
        if (!name.trim()) {
            Alert.alert("Name Required", "Please enter your name.");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Email Required", "Please enter your email.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            Alert.alert(
                "Invalid Email",
                "Please enter a valid email address."
            );
            return;
        }

        try {
            setLoading(true);

            console.log("Updating profile...");

            const token = await SecureStore.getItemAsync("authToken");

            console.log("Auth token exists:", !!token);

            if (!token) {
                Alert.alert(
                    "Session Expired",
                    "Please verify your phone number again."
                );

                router.replace("/(auth)/phone");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/users/profile`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                    }),
                }
            );

            // IMPORTANT:
            // JSON directly parse nahi karna.
            const responseText = await response.text();

            console.log("Profile Status:", response.status);
            console.log("Profile Response:", responseText);

            let data: any;

            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error(
                    "❌ Server returned non-JSON response:",
                    responseText
                );

                throw new Error(
                    `Server returned invalid response. Status: ${response.status}`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to update profile"
                );
            }

            console.log("✅ Profile Updated:", data);

            Alert.alert(
                "Profile Completed 🎉",
                "Your VTalk profile is ready.",
                [
                    {
                        text: "Continue",
                        onPress: () => {
                            router.replace("/(tabs)/home");
                        },
                    },
                ]
            );

        } catch (error) {
            console.error("❌ Profile Error:", error);

            Alert.alert(
                "Error",
                error instanceof Error
                    ? error.message
                    : "Failed to update profile"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <ScrollView
                contentContainerStyle={
                    styles.scrollContent
                }
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={
                    false
                }
            >
                <View style={styles.content}>

                    {/* ========================= */}
                    {/* LOGO */}
                    {/* ========================= */}

                    <View
                        style={
                            styles.logoContainer
                        }
                    >
                        <View style={styles.logo}>
                            <Text
                                style={
                                    styles.logoText
                                }
                            >
                                V
                            </Text>
                        </View>
                    </View>

                    {/* ========================= */}
                    {/* TITLE */}
                    {/* ========================= */}

                    <Text style={styles.title}>
                        Set up your profile
                    </Text>

                    <Text
                        style={
                            styles.subtitle
                        }
                    >
                        Tell us a little about
                        yourself
                    </Text>

                    {/* ========================= */}
                    {/* AVATAR */}
                    {/* ========================= */}

                    <View
                        style={
                            styles.avatarContainer
                        }
                    >
                        <View
                            style={styles.avatar}
                        >
                            <Text
                                style={
                                    styles.avatarText
                                }
                            >
                                {name
                                    ? name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "A"}
                            </Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                        >
                            <Text
                                style={
                                    styles.changePhoto
                                }
                            >
                                Add profile photo
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* ========================= */}
                    {/* NAME */}
                    {/* ========================= */}

                    <View
                        style={
                            styles.inputSection
                        }
                    >
                        <Text
                            style={styles.label}
                        >
                            Your name
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={
                                setName
                            }
                            placeholder="Enter your name"
                            placeholderTextColor="#666666"
                            autoCapitalize="words"
                            autoCorrect={false}
                            editable={!loading}
                        />
                    </View>

                    {/* ========================= */}
                    {/* EMAIL */}
                    {/* ========================= */}

                    <View
                        style={
                            styles.inputSection
                        }
                    >
                        <Text
                            style={styles.label}
                        >
                            Email address
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={
                                setEmail
                            }
                            placeholder="Enter your email"
                            placeholderTextColor="#666666"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!loading}
                        />
                    </View>

                    {/* ========================= */}
                    {/* COMPLETE PROFILE BUTTON */}
                    {/* ========================= */}

                    <TouchableOpacity
                        style={[
                            styles.button,

                            (!name.trim() ||
                                !email.trim()) &&
                            styles.buttonDisabled,
                        ]}
                        onPress={
                            completeProfile
                        }
                        disabled={
                            loading ||
                            !name.trim() ||
                            !email.trim()
                        }
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator
                                color="#FFFFFF"
                                size="small"
                            />
                        ) : (
                            <Text
                                style={
                                    styles.buttonText
                                }
                            >
                                Complete Profile
                            </Text>
                        )}
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

/* ========================================= */
/* STYLES */
/* ========================================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0A",
    },

    scrollContent: {
        flexGrow: 1,
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 40,
    },

    /* LOGO */

    logoContainer: {
        alignItems: "center",
        marginBottom: 25,
    },

    logo: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: "#FF3B30",
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#FF3B30",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },

    logoText: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "800",
    },

    /* TITLE */

    title: {
        color: "#FFFFFF",
        fontSize: 29,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 8,
    },

    subtitle: {
        color: "#B8A3A3",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 35,
    },

    /* AVATAR */

    avatarContainer: {
        alignItems: "center",
        marginBottom: 32,
    },

    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
        backgroundColor: "#242424",
        borderWidth: 2,
        borderColor: "#FF3B30",

        alignItems: "center",
        justifyContent: "center",

        marginBottom: 12,
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: 34,
        fontWeight: "700",
    },

    changePhoto: {
        color: "#FF6B63",
        fontSize: 14,
        fontWeight: "600",
    },

    /* INPUT */

    inputSection: {
        marginBottom: 18,
    },

    label: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 9,
    },

    input: {
        height: 56,
        borderRadius: 14,

        backgroundColor: "#151515",

        borderWidth: 1,
        borderColor: "#292929",

        color: "#FFFFFF",

        fontSize: 16,

        paddingHorizontal: 16,
    },

    /* BUTTON */

    button: {
        height: 56,
        borderRadius: 14,

        backgroundColor: "#FF3B30",

        alignItems: "center",
        justifyContent: "center",

        marginTop: 10,

        shadowColor: "#FF3B30",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,

        elevation: 5,
    },

    buttonDisabled: {
        opacity: 0.45,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
});


