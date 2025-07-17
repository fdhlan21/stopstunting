import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader, MyInput } from '../../components'
import { useToast } from 'react-native-toast-notifications';

export default function InputBMG({navigation}) {
     const [kirim, setKirim] = useState({
       berat_badan: '',
       tinggi_badan:'',
      });
    const [loading, setLoading] = useState(false);
  const toast = useToast();
      const sendData = () => {
         if (kirim.berat_badan.length == 0) {
        toast.show('Nama Berat Badan Masih Kosong !');
      } else if (kirim.tinggi_badan.length == 0) {
        toast.show('Nama Tempat Tinggi Badan Masih Kosong !');
      } else {
        console.log(kirim);
        navigation.replace('GrafikPertumbuhan');
      }
      }
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
    <MyHeader title="Input BMI"/>

    <ScrollView>
        <View style={{
            padding:20
        }}>

        <View style={{
            marginTop: 10,
            
        }}>
              {/* INPUT */}
        <MyInput
        value={kirim.berat_badan}
         onChangeText={x => updateKirim('berat_badan', x)}
         label="Berat Badan"
         label2="te"
         keyboardType='numeric'
         placeholder="Masukan Berat Badan"
       
         />

           <MyInput
           value={kirim.tinggi_badan}
            onChangeText={x => updateKirim('tinggi_badan', x)}
         label="Tinggi Badan"
         keyboardType='numeric'
         placeholder="Masukan Tinggi Badan"
        
         />

         <TouchableWithoutFeedback onPress={sendData}>
            <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:10,
                marginTop:30
            }}>
                    <Text style={{
                        fontFamily:fonts.primary[600],
                        color:colors.white,
                        textAlign:'center'
                    }}>Selanjutnya</Text>
            </View>
         </TouchableWithoutFeedback>
        </View>
        </View>
    </ScrollView>
    </View>
  )
}