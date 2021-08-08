import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import NavOptions from '../components/NavOptions';
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useDispatch} from 'react-redux';
import {setOrigin, setDestination} from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{uri: 'https://links.papareact.com/gzs'}}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where From?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              }),
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={'Search'}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
