import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

type EventCallbackType = (event: PanGestureHandlerEventPayload) => void;

type AnimationReturnType = (
  children: ReactNode,
  viewStyle: ViewStyle
) => ReactNode;

const Animation = (onEnd: EventCallbackType): AnimationReturnType => {
  const onGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onEnd,
    });

  return (children, viewStyle) => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View style={viewStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export { Animation, runOnJS };
