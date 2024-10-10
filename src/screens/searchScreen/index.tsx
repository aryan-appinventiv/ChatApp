import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Data from '../../../data.json';
import Images from '../../assets';
import CustomInput from '../../components/CustomInput';
import styles from './styles';
import strings from '../../utils/strings';
interface Item {
  id: any;
  name: string;
  profileImg: string;
  color: string;
}

const Search = ({navigation}: {navigation: any}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Item[]>(Data);

  const gotoUser = (item: any) => {
    navigation.navigate('User', {
      name: item.name,
      profile: item.profileImg,
      color: item.color,
    });
  };

  const renderItem = ({item}: {item: Item}) => (
    <TouchableOpacity
      style={styles.flatlist}
      activeOpacity={0.6}
      onPress={() => gotoUser(item)}>
      <View style={[styles.imageStyle,{backgroundColor:item.color}]}>
        <Text style={styles.textimg}>{item.profileImg}</Text>
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredItems = Data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filteredItems);
    } else {
      setFilteredData(Data);
    }
  };

  const back = () => {
    navigation.navigate('BottomTabNavigator');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cont}>
        <TouchableOpacity onPress={back}>
          <Image source={Images.backArrow} />
        </TouchableOpacity>
        <View style={styles.inputCont}>
          <Image source={Images.search} />
          <CustomInput
            placeholder={strings.Search_messages}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <View style={styles.listCont}>
        {filteredData.length > 0 ? (
          <FlatList
            bounces={false}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.notfoundCont}>
            <Image
              resizeMode="contain"
              source={Images.notfound}
              style={styles.notfound}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
