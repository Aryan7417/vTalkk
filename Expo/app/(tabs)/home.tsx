import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.1.36:3000";

interface User {
    _id: string;
    phone: string;
    name?: string;
    email?: string;
    isVerified: boolean;
    profileCompleted: boolean;
}

export default function HomeScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUsers = async () => {
        try {
            const token = await SecureStore.getItemAsync("authToken");

            if (!token) {
                router.replace("/(auth)/phone");
                return;
            }

            const response = await fetch(`${API_URL}/api/user/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            console.log("👥 Users response:", data);

            if (response.status === 401) {
                await SecureStore.deleteItemAsync("authToken");
                router.replace("/(auth)/phone");
                return;
            }

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to load users"
                );
            }

            setUsers(data.users || []);
        } catch (error) {
            console.error("Fetch Users Error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchUsers();
    };

    const getInitial = (name?: string) => {
        if (!name) return "?";
        return name.charAt(0).toUpperCase();
    };

    const renderUser = ({ item }: { item: User }) => {
        return (
            <View style={styles.userCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {getInitial(item.name)}
                    </Text>

                    <View style={styles.onlineDot} />
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                        {item.name || "VTalk User"}
                    </Text>

                    <Text style={styles.userPhone}>
                        {item.phone}
                    </Text>

                    <Text style={styles.onlineText}>
                        ● Available
                    </Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.callButton}
                        onPress={() => {
                            console.log(
                                "📞 Call user:",
                                item._id
                            );
                        }}
                    >
                        <Text style={styles.callIcon}>☎</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() => {
                            console.log(
                                "💬 Chat user:",
                                item._id
                            );
                        }}
                    >
                        <Text style={styles.chatIcon}>💬</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color="#FF3B30"
                />

                <Text style={styles.loadingText}>
                    Loading users...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.smallTitle}>
                        Welcome back 👋
                    </Text>

                    <Text style={styles.title}>
                        VTalk
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => router.push("/(tabs)/settings")}
                >
                    <Text style={styles.profileText}>
                        👤
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Section */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    People
                </Text>

                <Text style={styles.userCount}>
                    {users.length} users
                </Text>
            </View>

            {/* Users */}
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={renderUser}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    users.length === 0
                        ? styles.emptyContainer
                        : styles.list
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#FF3B30"
                    />
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>
                            👥
                        </Text>

                        <Text style={styles.emptyTitle}>
                            No users found
                        </Text>

                        <Text style={styles.emptyText}>
                            Verified users will appear here.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

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