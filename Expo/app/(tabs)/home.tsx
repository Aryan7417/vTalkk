// import React, { useCallback, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     TouchableOpacity,
//     ActivityIndicator,
//     RefreshControl,
// } from "react-native";
// import { router, useFocusEffect } from "expo-router";
// import * as SecureStore from "expo-secure-store";

// const API_URL = "http://192.168.1.36:3000";

// interface User {
//     _id: string;
//     phone: string;
//     name?: string;
//     email?: string;
//     isVerified: boolean;
//     profileCompleted: boolean;
// }

// export default function HomeScreen() {
//     const [users, setUsers] = useState<User[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);

//     const fetchUsers = async () => {
//         try {
//             const token = await SecureStore.getItemAsync("authToken");

//             if (!token) {
//                 router.replace("/(auth)/phone");
//                 return;
//             }

//             const response = await fetch(`${API_URL}/api/user/`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             const data = await response.json();

//             console.log("👥 Users response:", data);

//             if (response.status === 401) {
//                 await SecureStore.deleteItemAsync("authToken");
//                 router.replace("/(auth)/phone");
//                 return;
//             }

//             if (!response.ok || !data.success) {
//                 throw new Error(
//                     data.message || "Failed to load users"
//                 );
//             }

//             setUsers(data.users || []);
//         } catch (error) {
//             console.error("Fetch Users Error:", error);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     };

//     useFocusEffect(
//         useCallback(() => {
//             fetchUsers();
//         }, [])
//     );

//     const onRefresh = () => {
//         setRefreshing(true);
//         fetchUsers();
//     };

//     const getInitial = (name?: string) => {
//         if (!name) return "?";
//         return name.charAt(0).toUpperCase();
//     };

//     const renderUser = ({ item }: { item: User }) => {
//         return (
//             <View style={styles.userCard}>
//                 <View style={styles.avatar}>
//                     <Text style={styles.avatarText}>
//                         {getInitial(item.name)}
//                     </Text>

//                     <View style={styles.onlineDot} />
//                 </View>

//                 <View style={styles.userInfo}>
//                     <Text style={styles.userName}>
//                         {item.name || "VTalk User"}
//                     </Text>

//                     <Text style={styles.userPhone}>
//                         {item.phone}
//                     </Text>

//                     <Text style={styles.onlineText}>
//                         ● Available
//                     </Text>
//                 </View>

//                 <View style={styles.actions}>
//                     <TouchableOpacity
//                         style={styles.callButton}
//                         onPress={() => {
//                             console.log(
//                                 "📞 Call user:",
//                                 item._id
//                             );
//                         }}
//                     >
//                         <Text style={styles.callIcon}>☎</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={styles.chatButton}
//                         onPress={() => {
//                             console.log(
//                                 "💬 Chat user:",
//                                 item._id
//                             );
//                         }}
//                     >
//                         <Text style={styles.chatIcon}>💬</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator
//                     size="large"
//                     color="#FF3B30"
//                 />

//                 <Text style={styles.loadingText}>
//                     Loading users...
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <View>
//                     <Text style={styles.smallTitle}>
//                         Welcome back 👋
//                     </Text>

//                     <Text style={styles.title}>
//                         VTalk
//                     </Text>
//                 </View>

//                 <TouchableOpacity
//                     style={styles.profileButton}
//                     onPress={() => router.push("/(tabs)/settings")}
//                 >
//                     <Text style={styles.profileText}>
//                         👤
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Section */}
//             <View style={styles.sectionHeader}>
//                 <Text style={styles.sectionTitle}>
//                     People
//                 </Text>

//                 <Text style={styles.userCount}>
//                     {users.length} users
//                 </Text>
//             </View>

//             {/* Users */}
//             <FlatList
//                 data={users}
//                 keyExtractor={(item) => item._id}
//                 renderItem={renderUser}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={
//                     users.length === 0
//                         ? styles.emptyContainer
//                         : styles.list
//                 }
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={onRefresh}
//                         tintColor="#FF3B30"
//                     />
//                 }
//                 ListEmptyComponent={
//                     <View style={styles.empty}>
//                         <Text style={styles.emptyIcon}>
//                             👥
//                         </Text>

//                         <Text style={styles.emptyTitle}>
//                             No users found
//                         </Text>

//                         <Text style={styles.emptyText}>
//                             Verified users will appear here.
//                         </Text>
//                     </View>
//                 }
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#0A0A0A",
//         paddingHorizontal: 20,
//     },

//     loadingContainer: {
//         flex: 1,
//         backgroundColor: "#0A0A0A",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     loadingText: {
//         color: "#777777",
//         marginTop: 12,
//         fontSize: 14,
//     },

//     header: {
//         paddingTop: 65,
//         paddingBottom: 30,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },

//     smallTitle: {
//         color: "#777777",
//         fontSize: 14,
//         marginBottom: 5,
//     },

//     title: {
//         color: "#FFFFFF",
//         fontSize: 32,
//         fontWeight: "800",
//     },

//     profileButton: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         backgroundColor: "#181818",
//         alignItems: "center",
//         justifyContent: "center",
//         borderWidth: 1,
//         borderColor: "#292929",
//     },

//     profileText: {
//         fontSize: 21,
//     },

//     sectionHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 15,
//     },

//     sectionTitle: {
//         color: "#FFFFFF",
//         fontSize: 20,
//         fontWeight: "700",
//     },

//     userCount: {
//         color: "#777777",
//         fontSize: 13,
//     },

//     list: {
//         paddingBottom: 30,
//     },

//     userCard: {
//         backgroundColor: "#151515",
//         borderRadius: 18,
//         padding: 15,
//         marginBottom: 12,
//         flexDirection: "row",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#242424",
//     },

//     avatar: {
//         width: 54,
//         height: 54,
//         borderRadius: 27,
//         backgroundColor: "#252525",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//     },

//     avatarText: {
//         color: "#FFFFFF",
//         fontSize: 20,
//         fontWeight: "700",
//     },

//     onlineDot: {
//         position: "absolute",
//         width: 13,
//         height: 13,
//         borderRadius: 7,
//         backgroundColor: "#34C759",
//         right: 0,
//         bottom: 1,
//         borderWidth: 2,
//         borderColor: "#151515",
//     },

//     userInfo: {
//         flex: 1,
//         marginLeft: 14,
//     },

//     userName: {
//         color: "#FFFFFF",
//         fontSize: 16,
//         fontWeight: "700",
//         marginBottom: 3,
//     },

//     userPhone: {
//         color: "#777777",
//         fontSize: 12,
//         marginBottom: 4,
//     },

//     onlineText: {
//         color: "#34C759",
//         fontSize: 11,
//     },

//     actions: {
//         flexDirection: "row",
//         gap: 8,
//     },

//     callButton: {
//         width: 42,
//         height: 42,
//         borderRadius: 21,
//         backgroundColor: "#FF3B30",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     chatButton: {
//         width: 42,
//         height: 42,
//         borderRadius: 21,
//         backgroundColor: "#242424",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     callIcon: {
//         color: "#FFFFFF",
//         fontSize: 20,
//     },

//     chatIcon: {
//         fontSize: 17,
//     },

//     emptyContainer: {
//         flex: 1,
//     },

//     empty: {
//         alignItems: "center",
//         justifyContent: "center",
//         paddingTop: 100,
//     },

//     emptyIcon: {
//         fontSize: 45,
//         marginBottom: 15,
//     },

//     emptyTitle: {
//         color: "#FFFFFF",
//         fontSize: 18,
//         fontWeight: "700",
//         marginBottom: 7,
//     },

//     emptyText: {
//         color: "#666666",
//         fontSize: 13,
//     },
// });






import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Alert,
} from "react-native";

import {
    router,
    useFocusEffect,
} from "expo-router";

import * as SecureStore from "expo-secure-store";

import {
    connectSocket,
    getSocket,
} from "../../src/socket";


// =====================================================
// CONFIG
// =====================================================

const API_URL =  "http://172.16.50.215:3000";


// =====================================================
// USER TYPE
// =====================================================

interface User {
    _id: string;
    phone: string;
    name?: string;
    email?: string;
    isVerified: boolean;
    profileCompleted: boolean;
}


// =====================================================
// HOME SCREEN
// =====================================================

export default function HomeScreen() {

    // ---------------- Users ----------------

    const [users, setUsers] = useState<User[]>([]);

    // ---------------- Loading ----------------

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    // ---------------- Online Users ----------------

    const [onlineUsers, setOnlineUsers] =
        useState<Set<string>>(new Set());

    // ---------------- Calling ----------------

    const [callingUserId, setCallingUserId] =
        useState<string | null>(null);


    // =====================================================
    // FETCH USERS
    // =====================================================

    const fetchUsers = async () => {

        try {

            const token =
                await SecureStore.getItemAsync(
                    "authToken"
                );

            if (!token) {

                console.log(
                    "❌ Auth token missing"
                );

                router.replace(
                    "/(auth)/phone"
                );

                return;
            }


            console.log(
                "👥 Fetching users..."
            );


            const response =
                await fetch(
                    `${API_URL}/api/users/`,
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json",
                        },
                    }
                );


            const data =
                await response.json();


            console.log(
                "👥 Users response:",
                data
            );


            // ---------------- Unauthorized ----------------

            if (response.status === 401) {

                await SecureStore.deleteItemAsync(
                    "authToken"
                );

                router.replace(
                    "/(auth)/phone"
                );

                return;
            }


            // ---------------- Error ----------------

            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Failed to load users"
                );
            }


            // ---------------- Save Users ----------------

            setUsers(
                data.users || []
            );

        } catch (error) {

            console.error(
                "❌ Fetch Users Error:",
                error
            );

        } finally {

            setLoading(false);

            setRefreshing(false);
        }
    };


    // =====================================================
    // SOCKET SETUP
    // =====================================================

    const setupSocket = async () => {

        try {

            console.log(
                "🔌 Connecting socket..."
            );


            const socket =
                await connectSocket();


            if (!socket) {

                console.log(
                    "❌ Socket connection failed"
                );

                return;
            }


            console.log(
                "🔌 Socket ready:",
                socket.id
            );


            // =================================================
            // USER ONLINE
            // =================================================

            socket.on(
                "user-online",
                ({
                    userId,
                }: {
                    userId: string;
                }) => {

                    console.log(
                        "🟢 User online:",
                        userId
                    );


                    setOnlineUsers(
                        (previous) => {

                            const updated =
                                new Set(previous);

                            updated.add(userId);

                            return updated;
                        }
                    );
                }
            );


            // =================================================
            // USER OFFLINE
            // =================================================

            socket.on(
                "user-offline",
                ({
                    userId,
                }: {
                    userId: string;
                }) => {

                    console.log(
                        "🔴 User offline:",
                        userId
                    );


                    setOnlineUsers(
                        (previous) => {

                            const updated =
                                new Set(previous);

                            updated.delete(
                                userId
                            );

                            return updated;
                        }
                    );
                }
            );


            // =================================================
            // USER OFFLINE WHILE CALLING
            // =================================================

            socket.on(
                "user-offline",
                ({
                    userId,
                }: {
                    userId: string;
                }) => {

                    if (
                        callingUserId ===
                        userId
                    ) {

                        setCallingUserId(
                            null
                        );

                        Alert.alert(
                            "User Offline",
                            "This user is currently offline."
                        );
                    }
                }
            );


            // =================================================
            // CALL REJECTED
            // =================================================

            socket.on(
                "call-rejected",
                () => {

                    console.log(
                        "❌ Call rejected"
                    );


                    setCallingUserId(
                        null
                    );


                    Alert.alert(
                        "Call Rejected",
                        "The user rejected your call."
                    );
                }
            );


            // =================================================
            // CALL ACCEPTED
            // =================================================

            socket.on(
                "call-accepted",
                ({
                    receiverSocketId,
                }: {
                    receiverSocketId: string;
                }) => {

                    console.log(
                        "✅ Call accepted:",
                        receiverSocketId
                    );


                    setCallingUserId(
                        null
                    );


                    // =============================================
                    // NEXT STEP:
                    // WebRTC call screen yahan open karenge
                    // =============================================

                    Alert.alert(
                        "Call Accepted",
                        "The user accepted your call."
                    );
                }
            );


            // =================================================
            // CALL ENDED
            // =================================================

            socket.on(
                "call-ended",
                () => {

                    console.log(
                        "📴 Call ended"
                    );


                    setCallingUserId(
                        null
                    );
                }
            );


        } catch (error) {

            console.error(
                "❌ Socket setup error:",
                error
            );
        }
    };


    // =====================================================
    // LOAD HOME
    // =====================================================

    useFocusEffect(
        useCallback(
            () => {

                fetchUsers();

                setupSocket();


                return () => {

                    const socket =
                        getSocket();


                    if (!socket) {
                        return;
                    }


                    socket.off(
                        "user-online"
                    );

                    socket.off(
                        "user-offline"
                    );

                    socket.off(
                        "call-rejected"
                    );

                    socket.off(
                        "call-accepted"
                    );

                    socket.off(
                        "call-ended"
                    );
                };

            },
            []
        )
    );


    // =====================================================
    // REFRESH
    // =====================================================

    const onRefresh = () => {

        setRefreshing(true);

        fetchUsers();
    };


    // =====================================================
    // GET INITIAL
    // =====================================================

    const getInitial = (
        name?: string
    ) => {

        if (!name) {
            return "?";
        }

        return name
            .charAt(0)
            .toUpperCase();
    };


    // =====================================================
    // CALL USER
    // =====================================================

    const callUser = async (
        user: User
    ) => {

        try {

            const socket =
                getSocket();


            if (!socket) {

                Alert.alert(
                    "Connection Error",
                    "Socket is not connected."
                );

                return;
            }


            // ---------------- Check online ----------------

            if (
                !onlineUsers.has(
                    user._id
                )
            ) {

                Alert.alert(
                    "User Offline",
                    `${user.name || "This user"} is currently offline.`
                );

                return;
            }


            // ---------------- Prevent multiple calls ----------------

            if (callingUserId) {

                return;
            }


            // ---------------- Current user ----------------

            const token =
                await SecureStore.getItemAsync(
                    "authToken"
                );


            if (!token) {

                router.replace(
                    "/(auth)/phone"
                );

                return;
            }


            console.log(
                "📞 Calling user:",
                user._id
            );


            setCallingUserId(
                user._id
            );


            // =================================================
            // SEND CALL REQUEST
            // =================================================

            socket.emit(
                "call-user",
                {
                    targetUserId:
                        user._id,

                    caller: {
                        name:
                            "VTalk User",
                    },
                }
            );


            console.log(
                "📞 Call request sent"
            );


        } catch (error) {

            console.error(
                "❌ Call Error:",
                error
            );


            setCallingUserId(
                null
            );


            Alert.alert(
                "Call Error",
                "Unable to start the call."
            );
        }
    };


    // =====================================================
    // RENDER USER
    // =====================================================

    const renderUser = ({
        item,
    }: {
        item: User;
    }) => {

        const isOnline =
            onlineUsers.has(
                item._id
            );


        const isCalling =
            callingUserId ===
            item._id;


        return (

            <View
                style={
                    styles.userCard
                }
            >

                {/* =========================================
                    AVATAR
                ========================================== */}

                <View
                    style={
                        styles.avatar
                    }
                >

                    <Text
                        style={
                            styles.avatarText
                        }
                    >
                        {getInitial(
                            item.name
                        )}
                    </Text>


                    {/* Online Dot */}

                    {isOnline && (

                        <View
                            style={
                                styles.onlineDot
                            }
                        />

                    )}

                </View>


                {/* =========================================
                    USER INFO
                ========================================== */}

                <View
                    style={
                        styles.userInfo
                    }
                >

                    <Text
                        style={
                            styles.userName
                        }
                    >
                        {item.name ||
                            "VTalk User"}
                    </Text>


                    <Text
                        style={
                            styles.userPhone
                        }
                    >
                        {item.phone}
                    </Text>


                    <Text
                        style={[
                            styles.onlineText,

                            !isOnline &&
                            styles.offlineText,
                        ]}
                    >

                        {isOnline
                            ? "● Available"
                            : "● Offline"}

                    </Text>

                </View>


                {/* =========================================
                    ACTIONS
                ========================================== */}

                <View
                    style={
                        styles.actions
                    }
                >

                    {/* CALL */}

                    <TouchableOpacity
                        style={[
                            styles.callButton,

                            !isOnline &&
                            styles.callButtonDisabled,

                            isCalling &&
                            styles.callingButton,
                        ]}
                        onPress={() =>
                            callUser(item)
                        }
                        disabled={
                            !isOnline ||
                            !!callingUserId
                        }
                        activeOpacity={0.8}
                    >

                        {isCalling ? (

                            <ActivityIndicator
                                size="small"
                                color="#FFFFFF"
                            />

                        ) : (

                            <Text
                                style={
                                    styles.callIcon
                                }
                            >
                                ☎
                            </Text>

                        )}

                    </TouchableOpacity>


                    {/* CHAT */}

                    <TouchableOpacity
                        style={
                            styles.chatButton
                        }
                        onPress={() => {

                            console.log(
                                "💬 Chat user:",
                                item._id
                            );

                        }}
                        activeOpacity={0.8}
                    >

                        <Text
                            style={
                                styles.chatIcon
                            }
                        >
                            💬
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>
        );
    };


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {

        return (

            <View
                style={
                    styles.loadingContainer
                }
            >

                <ActivityIndicator
                    size="large"
                    color="#FF3B30"
                />


                <Text
                    style={
                        styles.loadingText
                    }
                >
                    Loading users...
                </Text>

            </View>
        );
    }


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <View
            style={
                styles.container
            }
        >

            {/* =============================================
                HEADER
            ============================================== */}

            <View
                style={
                    styles.header
                }
            >

                <View>

                    <Text
                        style={
                            styles.smallTitle
                        }
                    >
                        Welcome back 👋
                    </Text>


                    <Text
                        style={
                            styles.title
                        }
                    >
                        VTalk
                    </Text>

                </View>


                <TouchableOpacity
                    style={
                        styles.profileButton
                    }
                    onPress={() =>
                        router.push(
                            "/(tabs)/settings"
                        )
                    }
                    activeOpacity={0.8}
                >

                    <Text
                        style={
                            styles.profileText
                        }
                    >
                        👤
                    </Text>

                </TouchableOpacity>

            </View>


            {/* =============================================
                SECTION HEADER
            ============================================== */}

            <View
                style={
                    styles.sectionHeader
                }
            >

                <Text
                    style={
                        styles.sectionTitle
                    }
                >
                    People
                </Text>


                <Text
                    style={
                        styles.userCount
                    }
                >
                    {users.length} users
                </Text>

            </View>


            {/* =============================================
                USERS LIST
            ============================================== */}

            <FlatList
                data={users}

                keyExtractor={(
                    item
                ) => item._id}

                renderItem={
                    renderUser
                }

                showsVerticalScrollIndicator={
                    false
                }

                contentContainerStyle={
                    users.length === 0
                        ? styles.emptyContainer
                        : styles.list
                }

                refreshControl={

                    <RefreshControl
                        refreshing={
                            refreshing
                        }
                        onRefresh={
                            onRefresh
                        }
                        tintColor="#FF3B30"
                    />

                }

                ListEmptyComponent={

                    <View
                        style={
                            styles.empty
                        }
                    >

                        <Text
                            style={
                                styles.emptyIcon
                            }
                        >
                            👥
                        </Text>


                        <Text
                            style={
                                styles.emptyTitle
                            }
                        >
                            No users found
                        </Text>


                        <Text
                            style={
                                styles.emptyText
                            }
                        >
                            Verified users will
                            appear here.
                        </Text>

                    </View>
                }
            />

        </View>
    );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0A0A0A",
        paddingHorizontal: 20,
    },


    loadingContainer: {
        flex: 1,
        backgroundColor: "#0A0A0A",
        alignItems: "center",
        justifyContent: "center",
    },


    loadingText: {
        color: "#777777",
        marginTop: 12,
        fontSize: 14,
    },


    header: {
        paddingTop: 65,
        paddingBottom: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },


    smallTitle: {
        color: "#777777",
        fontSize: 14,
        marginBottom: 5,
    },


    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "800",
    },


    profileButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#181818",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#292929",
    },


    profileText: {
        fontSize: 21,
    },


    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },


    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },


    userCount: {
        color: "#777777",
        fontSize: 13,
    },


    list: {
        paddingBottom: 30,
    },


    userCard: {
        backgroundColor: "#151515",
        borderRadius: 18,
        padding: 15,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#242424",
    },


    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#252525",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },


    avatarText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },


    onlineDot: {
        position: "absolute",
        width: 13,
        height: 13,
        borderRadius: 7,
        backgroundColor: "#34C759",
        right: 0,
        bottom: 1,
        borderWidth: 2,
        borderColor: "#151515",
    },


    userInfo: {
        flex: 1,
        marginLeft: 14,
    },


    userName: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 3,
    },


    userPhone: {
        color: "#777777",
        fontSize: 12,
        marginBottom: 4,
    },


    onlineText: {
        color: "#34C759",
        fontSize: 11,
    },


    offlineText: {
        color: "#666666",
    },


    actions: {
        flexDirection: "row",
        gap: 8,
    },


    callButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FF3B30",
        alignItems: "center",
        justifyContent: "center",
    },


    callButtonDisabled: {
        backgroundColor: "#3A3A3A",
        opacity: 0.6,
    },


    callingButton: {
        backgroundColor: "#FF3B30",
    },


    chatButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#242424",
        alignItems: "center",
        justifyContent: "center",
    },


    callIcon: {
        color: "#FFFFFF",
        fontSize: 20,
    },


    chatIcon: {
        fontSize: 17,
    },


    emptyContainer: {
        flex: 1,
    },


    empty: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100,
    },


    emptyIcon: {
        fontSize: 45,
        marginBottom: 15,
    },


    emptyTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 7,
    },


    emptyText: {
        color: "#666666",
        fontSize: 13,
    },

});




