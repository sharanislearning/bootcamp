import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, Alert } from "react-native";

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>(["Delhi", "Mumbai", "Chennai"]);
  const [newCity, setNewCity] = useState<string>("");

  const addFavorite = () => {
    if (!newCity.trim()) {
      Alert.alert("Error", "City name cannot be empty.");
      return;
    }
    if (favorites.includes(newCity.trim())) {
      Alert.alert("Error", "City is already in your favorites.");
      return;
    }
    setFavorites((prevFavorites) => [...prevFavorites, newCity.trim()]);
    setNewCity("");
  };

  const removeFavorite = (city: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== city));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Locations</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Text>{item}</Text>
            <TouchableOpacity
              onPress={() => removeFavorite(item)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new city"
        value={newCity}
        onChangeText={setNewCity}
      />
      <Button title="Add to Favorites" onPress={addFavorite} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "80%",
  },
  removeButton: { backgroundColor: "red", padding: 5, borderRadius: 5 },
  removeButtonText: { color: "white", fontWeight: "bold" },
  input: { borderWidth: 1, padding: 8, marginTop: 10, width: "80%" },
});

export default FavoritesScreen;
