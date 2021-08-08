import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements/dist/image/Image';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectTravelTimeInformation} from '../slices/navSlice';
import 'intl';
import 'intl/locale-data/jsonp/en';
const data = [
  {
    id: '123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: '456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: '789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];
const SUGRE_CHARGE_RATE = 1.5;
const currency = (value, multiplier) => {
  return new Intl.NumberFormat('en-gb', {
    style: 'currency',
    currency: 'GBP',
  }).format((value * SUGRE_CHARGE_RATE * multiplier) / 100);
};

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute top-2 z-50 left-5 p-3 rounded-full`}>
          <Icon type="fontawesome" name="chevron-left" />
        </TouchableOpacity>
        <Text style={tw`text-lg py-4 text-center font-bold`}>
          Pick a Ride -{travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex flex-row items-center justify-between px-10 ${
                item.id === selected?.id && 'bg-gray-200'
              }`}>
              <Image
                style={{height: 100, width: 100, resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <View>
                <Text style={tw`text-xl font-bold `}>{item.title}</Text>
                <Text>{travelTimeInformation?.duration?.text} travel time</Text>
              </View>
              <Text style={tw`text-xl`}>
                {currency(
                  travelTimeInformation?.duration.value,
                  item.multiplier,
                )}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={tw` ${selected ? 'bg-black' : 'bg-gray-500'} p-5 m-5`}
        disabled={!selected}>
        <Text style={tw`text-white text-center`}>Choose {selected?.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
