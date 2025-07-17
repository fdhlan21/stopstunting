import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'

export default function Tindakan({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
        <MyHeader title="Tindakan"/>

        <ScrollView>
            <View style={{
                padding:10
            }}>

            </View>
        </ScrollView>
    </View>
  )
}