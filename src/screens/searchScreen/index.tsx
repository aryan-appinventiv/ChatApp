import {
  StyleSheet,
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
import colors from '../../utils/color'

interface Item {
  id: any;
  name: string;
  profileImg: string;
}

const Search = ({navigation}: {navigation: any}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Item[]>(Data);

  const gotoUser=(item: any)=>{
    navigation.navigate('User',{
      name: item.name,
      profile: item.profileImg
    });
  }

  const renderItem = ({item}: {item: Item}) => (
    <TouchableOpacity style={styles.flatlist} activeOpacity={0.6} onPress={()=>gotoUser(item)}>
      <View style={styles.imageStyle}>
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
            placeholder="Search messages..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <View style={styles.listCont}>
        {filteredData.length>0? (  <FlatList
        bounces={false}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />): (
        <View style={styles.notfoundCont}>
          <Image resizeMode='contain' source={Images.notfound} style={styles.notfound}/>
        </View>
      )}
    
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  flatlist: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderBottomWidth:1,
    paddingVertical:15,
    borderColor: colors.lightgray,
  },
  imageStyle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor:colors.primary,
    justifyContent:'center',
    alignItems:'center',
  },
  inputCont: {
    flex: 1,
    backgroundColor: colors.white,
    marginVertical: 19,
    marginLeft: 16,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text:{
    fontWeight:'500',
    color:colors.gray,
  },
  textimg:{
    fontWeight:'500',
    color:colors.white,
  },
  listCont:{
    flex:1,
    backgroundColor:colors.white,
    borderRadius:8,
    marginHorizontal: 16,
    padding:8,
  },
  notfoundCont:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  notfound:{
    height:200,
    width:200,
  }
});
