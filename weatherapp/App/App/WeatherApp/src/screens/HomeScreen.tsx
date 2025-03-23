import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const API_KEY = "9587105471cb4cad88b140312251903";
const BASE_URL = "https://api.weatherapi.com/v1";

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState<string>("London");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      Alert.alert("Error", "Failed to fetch weather data. Please check the city name or your internet connection.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {loading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : weather ? (
        <View style={styles.weatherContainer}>
          <Text>City: {weather.location.name}</Text>
          <Text>Region: {weather.location.region}</Text>
          <Text>Temperature: {weather.current.temp_c}°C</Text>
          <Text>Condition: {weather.current.condition.text}</Text>
        </View>
      ) : (
        <Text>No weather data available for "{city}".</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, margin: 10, width: "80%" },
  weatherContainer: { marginTop: 20, alignItems: "center" },
});

export default HomeScreen;
