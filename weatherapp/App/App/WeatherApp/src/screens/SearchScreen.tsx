import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const API_KEY = "9587105471cb4cad88b140312251903"; 
const BASE_URL = "https://api.weatherapi.com/v1"; 

const citySuggestions: string[] = [
  "Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Pune",
  "Jaipur", "Ahmedabad", "Kochi", "Lucknow", "Varanasi", "Amritsar", "Goa",
  "Bhopal", "Surat", "Ranchi", "Patna", "Nagpur", "Mysuru"
];

interface WeatherData {
  location: { name: string; region: string };
  current: {
    temp_c: number;
    condition: { text: string };
  };
}

const SearchScreen: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      Alert.alert("Error", "Please select or enter a city name.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city.trim()}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      Alert.alert("Error", "Failed to fetch weather data. Please check the city name and try again.");
    }
    setLoading(false);
  };

  const handleCityInput = (text: string) => {
    setCity(text);

    if (text.trim()) {
      const filtered = citySuggestions.filter((cityName) =>
        cityName.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const selectCity = (cityName: string) => {
    setCity(cityName);
    setFilteredCities([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Weather</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={handleCityInput}
      />
      {filteredCities.length > 0 && (
        <FlatList
          data={filteredCities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectCity(item)} style={styles.suggestion}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Button title="Search Weather" onPress={fetchWeather} />
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
  suggestion: { padding: 10, backgroundColor: "#f0f0f0", borderBottomWidth: 1, borderColor: "#ddd" },
  weatherContainer: { marginTop: 20, alignItems: "center" },
});

export default SearchScreen;
