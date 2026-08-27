import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/phone");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>V</Text>
        </View>

        <Text style={styles.logoText}>VTalk</Text>
        <Text style={styles.tagline}>
          Connect. Talk. Together.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
  },

  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  logoIcon: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "800",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -1,
  },

  tagline: {
    color: "#8E8E93",
    fontSize: 14,
    marginTop: 8,
  },
});