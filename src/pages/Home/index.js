import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, TouchableNativeFeedback} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../../utils';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native';

const {width} = Dimensions.get('window');

export default function Home({navigation}) {
  const [user] = useState({});
  
  const navigateToDetail = (product) => {
    navigation.navigate('ProdukDetail', { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, '#1A4A7A']}
        style={styles.headerGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Selamat datang,</Text>
            <Text style={styles.greetingText}>{user.nama_lengkap || 'User'}</Text>
          </View>
          <FastImage
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
       <View style={{
        marginTop:30
       }}>
        
        <View style={{
          flexDirection:"row",
          justifyContent:"space-around",
          alignItems:'center',
          padding:10,
        }}>
        
          <TouchableNativeFeedback onPress={() => navigation.navigate('InputBMG')}>
            <View style={{
              padding:10,
              backgroundColor:colors.secondary,
              borderRadius:5,
              width:150,
              height:150,
              alignItems:"center",
              justifyContent:'center'
            }}>
            <Image style={{
              width:80,
              height:80,
              top:-13
            }} source={require('../../assets/bmi-icon.png')}/>
            <Text style={{
              fontFamily:fonts.primary[600],
              textAlign:'center',
              color:colors.white,
              fontSize:14,
              top:3

            }}>Input BMI</Text>
            </View>
          </TouchableNativeFeedback>

           <TouchableNativeFeedback onPress={() => navigation.navigate("GrafikPertumbuhan")}>
            <View style={{
              padding:10,
              backgroundColor:colors.secondary,
              borderRadius:10,
              width:150,
              height:150,
              alignItems:"center",
              justifyContent:"center",

            }}>
             <Image style={{
              width:80,
              height:80
            }} source={require('../../assets/graph-icon.png')}/>
          <Text style={{
              fontFamily:fonts.primary[600],
              textAlign:'center',
              color:colors.white,
              fontSize:14,
              top:5
            }}>Grafik Pertumbuhan</Text>
            </View>
          </TouchableNativeFeedback>

        </View>

         <View style={{
          flexDirection:"row",
          justifyContent:"space-around",
          alignItems:'center',
          padding:10,
        }}>
        
          <TouchableNativeFeedback onPress={() => navigation.navigate("PemantauanBerkala")}>
            <View style={{
              padding:10,
              backgroundColor:colors.secondary,
              borderRadius:5,
              width:150,
              height:150,
              alignItems:'center',
              justifyContent:'center'
            }}> 
              <Image style={{
              width:70,
              height:70,
              top:-3
            }} source={require('../../assets/monitoring.png')}/>
            <Text style={{
               fontFamily:fonts.primary[600],
              textAlign:'center',
              color:colors.white,
            }}>
              Permantauan Berkala
            </Text>
            </View>
          </TouchableNativeFeedback>

           <TouchableNativeFeedback onPress={() => navigation.navigate("Tindakan")}>
            <View style={{
              padding:10,
              backgroundColor:colors.secondary,
              borderRadius:10,
              width:150,
              height:150,
              justifyContent:"center",
              alignItems:'center'
            }}>
             <Image style={{
              width:70,
              height:70,
              top:-13
            }} source={require('../../assets/plan.png')}/>
          <Text style={{
               fontFamily:fonts.primary[600],
              textAlign:'center',
              color:colors.white,
              top:1
            }}>
              Tindakan
            </Text>
            </View>
          </TouchableNativeFeedback>



        </View>

         <View style={{
          flexDirection:"row",
          justifyContent:"center",
          alignItems:'center',
          padding:10,
          alignItems:"center",
          justifyContent:"center"
        }}>
        
          <TouchableNativeFeedback onPress={() => navigation.navigate("EdukasiGizi")}>
            <View style={{
              padding:10,
              backgroundColor:colors.secondary,
              borderRadius:5,
              width:150,
              height:150,
              alignItems:'center',
              justifyContent:'center'
            }}>
             <Image style={{
              width:70,
              height:70,
              top:-5
            }} source={require('../../assets/heltcare.png')}/>
            <Text style={{
               fontFamily:fonts.primary[600],
              textAlign:'center',
              color:colors.white,
            }}>
              Edukasi Gizi dan Kesehatan
            </Text>
            </View>
          </TouchableNativeFeedback>

           


        </View>

       </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerGradient: {
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    top: 10
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  greetingText: {
    fontFamily: fonts.secondary[600],
    fontSize: 20,
    color: 'white',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  productsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 80
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  productInfo: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
  },
  productName: {
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});