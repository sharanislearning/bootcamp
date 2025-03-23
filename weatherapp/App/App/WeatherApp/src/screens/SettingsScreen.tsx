import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

const SettingsScreen: React.FC = () => {
  const [unit, setUnit] = useState<string>("metric");

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    Alert.alert("Settings Updated", `Temperature unit changed to ${newUnit === "metric" ? "Celsius" : "Fahrenheit"}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Current Unit: {unit === "metric" ? "Celsius" : "Fahrenheit"}</Text>
      <Button title="Toggle Temperature Unit" onPress={toggleUnit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});

export default SettingsScreen;
