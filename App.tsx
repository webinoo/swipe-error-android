import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

const App = () => {
  const [swipe, setSwipe] = useState("");

  useEffect(() => {
    if (swipe !== "") {
      console.log(`Swipe ${swipe}`);
      // HERE do some additional logic what you need to do (for example dispatch redux action)
      setSwipe("");
    }
  }, [swipe]);

  const onGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onEnd: (event) => {
        // I'm not sure why is that but somtimes it's not working and runOnJS has to be used
        setSwipe(event.velocityX > 0 ? "right" : "left");
        // runOnJS(setSwipe)(event.velocityX > 0 ? "right" : "left");
      },
    });

  return (
    <PanGestureHandler onGestureEvent={onGestureHandler}>
      <Animated.View style={styles.container}>
        <Text style={styles.paragraph}>
          Swipe left or right and watch console
        </Text>
      </Animated.View>
    </PanGestureHandler>
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
