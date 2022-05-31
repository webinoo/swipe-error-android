import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Alert,
  Platform,
  View,
  ViewStyle,
} from "react-native";
import Constants from "expo-constants";
import { ReactNode } from "react";
import { PanGestureHandlerEventPayload } from "react-native-gesture-handler";

const IS_DEBUG_ENABLED = typeof atob !== "undefined";

const withAnimation = (content: ReactNode, style: ViewStyle, callback: any) => {
  const { Animation, runOnJS } = require("./Animation");
  return Animation((event: PanGestureHandlerEventPayload) => {
    "worklet";
    runOnJS(callback)(event.velocityX > 0 ? "right" : "left");
  })(content, style);
};

const App = () => {
  const [swipe, setSwipe] = useState("");

  useEffect(() => {
    if (swipe !== "") {
      console.log(`Swipe ${swipe}`);
      Alert.alert(swipe);
      // HERE do some additional logic what you need to do (for example dispatch redux action)
      setSwipe("");
    }
  }, [swipe]);

  const content = (
    <Text style={styles.paragraph}>Swipe left or right and watch console</Text>
  );

  return !(IS_DEBUG_ENABLED && Platform.OS === "android") ? (
    withAnimation(content, styles.container, setSwipe)
  ) : (
    <View style={styles.container}>{content}</View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "black",
    padding: 8,
  },
  paragraph: {
    color: "white",
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
