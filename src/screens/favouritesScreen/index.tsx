import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import Data from '../../../data.json';

interface Item {
  id: any;
  profileImg: string |  undefined;
  name: string;
}

const Favourites: React.FC = () => {
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.flatlist}>
      <Text>{item.profileImg}</Text>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        bounces={false}
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item: Item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  flatlist: {
    flexDirection: 'row',
  },
});
