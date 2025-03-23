import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface ForecastData {
  day: string;
  temp: number;
  condition: string;
}

const mockForecast: ForecastData[] = [
  { day: "Monday", temp: 30, condition: "Sunny" },
  { day: "Tuesday", temp: 28, condition: "Cloudy" },
  { day: "Wednesday", temp: 27, condition: "Rainy" },
  { day: "Thursday", temp: 29, condition: "Partly Cloudy" },
  { day: "Friday", temp: 31, condition: "Sunny" },
  { day: "Saturday", temp: 32, condition: "Hot" },
  { day: "Sunday", temp: 33, condition: "Sunny" },
];

const ForecastScreen: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  useEffect(() => {
    setForecast(mockForecast);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Weather Forecast</Text>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text>{item.day}</Text>
            <Text>{item.temp}°C</Text>
            <Text>{item.condition}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  forecastItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
});

export default ForecastScreen;
