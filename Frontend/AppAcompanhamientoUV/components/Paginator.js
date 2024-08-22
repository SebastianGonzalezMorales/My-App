import { Animated, View, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row' }}>
     {/* Mapea a través de la matriz de datos */}
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]; // Punto anterior, punto actual, punto siguiente.

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10], //Ancho
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000C7B',
    marginHorizontal: 8,
  },
});
