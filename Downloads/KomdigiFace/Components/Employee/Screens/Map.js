import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Marker, Circle } from "react-native-maps";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Map() {
  const [status, setStatus] = useState(
    "Izinkan Aplikasi untuk mengakses lokasi anda"
  );
  const [userLocation, setUserLocation] = useState(null);
  const navigation = useNavigation();
  const officeLocation = {
    latitude: 0.05560754850607381,
    longitude: 99.81514726020772,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  };

  const getDistanceFromLatLonInKm = useCallback((lat1, lon1, lat2, lon2) => {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    var R = 6371000;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (location) => {
            let userLoc = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034,
            };
            setUserLocation(userLoc);

            const distance = getDistanceFromLatLonInKm(
              userLoc.latitude,
              userLoc.longitude,
              officeLocation.latitude,
              officeLocation.longitude
            );

            if (distance < 400) {
              setStatus("Anda sedang berada disekitar kantor");
              setTimeout(() => {
                navigation.navigate("Scan");
              }, 3000);
            } else {
              setStatus("Anda sedang tidak berada disekitar kantor");
            }
          }
        );
        return () => locationSubscription.remove();
      } else {
        setStatus("Permintaan untuk mengakses lokasi ditolak");
      }
    })();
  }, [getDistanceFromLatLonInKm]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={userLocation || officeLocation}
        loadingEnabled={true}
        cacheEnabled={true}
      >
        <Marker coordinate={officeLocation} />
        {userLocation && (
          <Marker coordinate={userLocation}>
            <MaterialIcons
              name="person-pin-circle"
              size={40}
              style={{ color: "blue", fontWeight: "bold", alignSelf: "center" }}
            />
          </Marker>
        )}
        <Circle
          center={officeLocation}
          radius={350}
          strokeColor={"lightblue"}
          fillColor={"rgba(22, 255, 255, 0.10)"}
        />
      </MapView>

      <View style={styles.status}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.text}>{status}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
  locText: {
    fontSize: 20,
    padding: 10,
    fontWeight: "500",
    color: "white",
    width: "100%",
    marginTop: "1%",
    paddingLeft: "10%",
  },
  status: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: "1%",
    width: "90%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    paddingLeft: 20,
  },
});
