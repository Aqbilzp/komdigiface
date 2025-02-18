import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Employee() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    
    <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#0093dd",
    }}
    >
<Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>
  Pilih Absen:
</Text>
      <TouchableOpacity
        style={styles.button}
        onPressOut={() => {
          dispatch({ type: "updateStatus", data: "masuk" });
          navigation.navigate("Map");
        }}
      >
        <Icon icon={"login"} text={"Masuk"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPressOut={() => {
          dispatch({ type: "updateStatus", data: "pulang" });
          navigation.navigate("Map");
        }}
      >
        <Icon icon={"logout"} text={"Pulang"} />
      </TouchableOpacity>
    </View>
  );
}

const Icon = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialIcons name={props.icon} size={35} color={"black"} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "800",
    paddingLeft: 25,
  },

  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 20,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "white",
    minHeight: 70,
    borderRadius: 5,
  },
});
