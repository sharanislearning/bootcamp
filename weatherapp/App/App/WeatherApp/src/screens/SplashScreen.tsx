import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "Splash">;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("MainApp");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});

export default SplashScreen;
