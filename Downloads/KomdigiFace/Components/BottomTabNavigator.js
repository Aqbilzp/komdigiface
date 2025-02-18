import * as React from "react";
import { Alert, Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EmployeeStackNavigator from "./Employee/EmployeeStackNavigator";
import AdminStackNavigator from "./Admin/AdminStackNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [adminAccess, setAdminAccess] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const verifyPassword = () => {
    if (password === "1234") {
      setAdminAccess(true);
      setModalVisible(false);
      Alert.alert("Berhasil", "Anda dapat mengakses Admin.");
    } else {
      Alert.alert("Salah", "Sandi yang Anda masukkan salah.");
    }
    setPassword("");
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "black",
          headerShown: false,
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
        }}
      >
        <Tab.Screen
          name="EmployeeStackNavigator"
          options={{
            title: "Karyawan",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" color={color} size={30} />
            ),
          }}
          component={EmployeeStackNavigator}
        />

        <Tab.Screen
          name="AdminStackNavigator"
          options={{
            title: "Admin",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="admin-panel-settings" color={color} size={30} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (!adminAccess) {
                e.preventDefault();
                setModalVisible(true);
              }
            },
          })}
          component={AdminStackNavigator}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Masukkan Sandi Admin:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="   OK   " onPress={verifyPassword} />
            <Button title="Batal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
});
