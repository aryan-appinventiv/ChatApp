import {Text, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Account() {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Account</Text>
    </SafeAreaView>

  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})