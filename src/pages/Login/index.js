import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {colors, fonts, windowWidth} from '../../utils';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {MyButton, MyGap, MyInput, MyPicker} from '../../components';
import {useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
import axios from 'axios';
import {apiURL, storeData} from '../../utils/localStorage';
import MyLoading from '../../components/MyLoading';
import {TouchableOpacity} from 'react-native';
import { Image } from 'react-native';

export default function Login({navigation, route}) {
  const [kirim, setKirim] = useState({
    nama_lengkap: '',
    ttl: '',
    jenis_kelamin:'',
    riwayat_kesehatan:'',
  });

   const toast = useToast();
    const updateKirim = (x, v) => {
      setKirim({
        ...kirim,
        [x]: v,
      });
    };
    const [loading, setLoading] = useState(false);
    const sendData = () => {
      if (kirim.nama_lengkap.length == 0) {
        toast.show('Nama Lengkap masih kosong !');
      } else if (kirim.ttl.length == 0) {
        toast.show('Nama Tempat Tenggal Lahir kosong !');
      }  else if (kirim.jenis_kelamin.length == 0) {
        toast.show('Jenis Kelamin Masih Kosong!');
      } else if (kirim.riwayat_kesehatan.length == 0) {
        toast.show('Riwayat Kesehatan Masih Kosong!');
      } else {
        console.log(kirim);
        setLoading(true);
     
        axios.post(apiURL + 'register', kirim).then(res => {
          setTimeout(() => {
            setLoading(false);
            toast.show(res.data.message, {type: 'success'});
            storeData(res.data, 'user');
            console.log('Data tersimpan : ', res.data);
            navigation.navigate('MainApp');
          }, 700);
        });
      }
    };
  return (
    <View
      style={{flex: 1, backgroundColor: colors.white, flexDirection: 'column'}}>
      <ScrollView>
      
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: colors.white,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            marginBottom: 20,
            fontFamily: fonts.secondary[800],
            fontSize: 20,
          }}>
          Get Started
        </Text>

        <MyInput
          value={kirim.nama_lengkap}
          onChangeText={x => updateKirim('nama_lengkap', x)}
          label="Nama Lengkap (Full Name)"
          placeholder="Masukan Nama Lengkap"
          iconname="person-outline"
        />

          <MyInput
          value={kirim.ttl}
          onChangeText={x => updateKirim('ttl', x)}
          label="Tempat Tanggal Lahir (Place & Date of Birth)"
          placeholder="Masukan Tempat Tanggal Lahir"
          iconname="calendar-outline"
        />

       <MyPicker 
      label="Jenis Kelamin (Gender)"
      iconname='male-female-outline'
      data={[
        {'label' : 'Laki-laki', 'value' : 'laki-laki'},
        {'label' : 'Perempuan', 'value' : 'perempuan'},
      ]}
      onChangeText={x => updateKirim('jenis_kelamin', x)}
      value={kirim.jenis_kelamin}

       />

         <MyInput
          value={kirim.riwayat_kesehatan}
          onChangeText={x => updateKirim('riwayat_kesehatan', x)}
          label="Riwayat Kesehatan (Medical History)"
          placeholder="Masukan Riwayat Kesehatan"
          iconname="heart-outline"
         
        />
        <MyGap jarak={20} />
        {!loading && <MyButton onPress={sendData} title="Selanjutnya" />}
        {loading && <MyLoading />}
       
      </View>
      </ScrollView>
    </View>
  );
}