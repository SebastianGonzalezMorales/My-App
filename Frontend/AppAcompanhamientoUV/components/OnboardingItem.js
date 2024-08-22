import {
  Image,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const OnboardingItem = ({ item }) => {
  // get width of the screen
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: 'contain' }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.5,
    justifyContent: 'center',
    marginBottom: 50,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  description: {
    fontWeight: '400',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
    //fontSize: 16,
  },
});
