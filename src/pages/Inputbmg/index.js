import { View, Text, ScrollView, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import React, { useState, useRef } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader, MyInput } from '../../components'
import { useToast } from 'react-native-toast-notifications';

export default function InputBMI({navigation}) {
     const [kirim, setKirim] = useState({
       berat_badan: '',
       tinggi_badan:'',
      });
    const [loading, setLoading] = useState(false);
    const [hasilBMI, setHasilBMI] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const toast = useToast();

    // Animation values
    const loadingAnimation = useRef(new Animated.Value(0)).current;
    const resultAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(0)).current;
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const slideAnimation = useRef(new Animated.Value(50)).current;

    // Fungsi untuk update state
    const updateKirim = (key, value) => {
        setKirim(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Fungsi untuk menghitung BMI
    const hitungBMI = (beratBadan, tinggiBadan) => {
        const berat = parseFloat(beratBadan);
        const tinggi = parseFloat(tinggiBadan) / 100; // konversi cm ke meter
        const bmi = berat / (tinggi * tinggi);
        return Math.round(bmi * 10) / 10; // pembulatan 1 desimal
    };

    // Fungsi untuk menentukan kategori BMI
    const kategoriBMI = (bmi) => {
        if (bmi < 18.5) {
            return {
                kategori: 'Kurus',
                warna: colors.danger || '#e74c3c',
                keterangan: 'Berat badan Anda kurang dari normal'
            };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return {
                kategori: 'Normal',
                warna: colors.success || '#27ae60',
                keterangan: 'Berat badan Anda ideal'
            };
        } else if (bmi >= 25 && bmi <= 29.9) {
            return {
                kategori: 'Gemuk',
                warna: colors.warning || '#f39c12',
                keterangan: 'Berat badan Anda berlebih'
            };
        } else {
            return {
                kategori: 'Obesitas',
                warna: colors.danger || '#e74c3c',
                keterangan: 'Berat badan Anda sangat berlebih'
            };
        }
    };

    // Animasi loading spinner
    const startLoadingAnimation = () => {
        Animated.loop(
            Animated.timing(loadingAnimation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    // Animasi munculnya hasil
    const startResultAnimation = () => {
        // Reset semua animasi
        resultAnimation.setValue(0);
        scaleAnimation.setValue(0);
        fadeAnimation.setValue(0);
        slideAnimation.setValue(50);

        // Animasi berurutan
        Animated.sequence([
            // Fade in container
            Animated.timing(resultAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            // Scale dan fade in nilai BMI
            Animated.parallel([
                Animated.spring(scaleAnimation, {
                    toValue: 1,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                // Slide up kategori dan keterangan
                Animated.timing(slideAnimation, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                })
            ])
        ]).start();
    };

    const sendData = () => {
        if (kirim.berat_badan.length == 0) {
            toast.show('Berat Badan Masih Kosong !');
        } else if (kirim.tinggi_badan.length == 0) {
            toast.show('Tinggi Badan Masih Kosong !');
        } else if (parseFloat(kirim.berat_badan) <= 0) {
            toast.show('Berat badan harus lebih dari 0 !');
        } else if (parseFloat(kirim.tinggi_badan) <= 0) {
            toast.show('Tinggi badan harus lebih dari 0 !');
        } else {
            // Mulai loading
            setLoading(true);
            setShowResult(false);
            startLoadingAnimation();

            // Simulasi proses perhitungan dengan delay
            setTimeout(() => {
                // Hitung BMI
                const bmi = hitungBMI(kirim.berat_badan, kirim.tinggi_badan);
                const kategori = kategoriBMI(bmi);
                
                setHasilBMI({
                    nilai: bmi,
                    ...kategori
                });

                // Stop loading dan mulai animasi hasil
                setLoading(false);
                setShowResult(true);
                startResultAnimation();

                console.log('Data BMI:', {
                    beratBadan: kirim.berat_badan,
                    tinggiBadan: kirim.tinggi_badan,
                    bmi: bmi,
                    kategori: kategori
                });
            }, 1500); // Delay 1.5 detik untuk efek loading
        }
    };

    const resetData = () => {
        setKirim({
            berat_badan: '',
            tinggi_badan: ''
        });
        setHasilBMI(null);
        setShowResult(false);
        setLoading(false);
        // Reset animasi
        loadingAnimation.setValue(0);
        resultAnimation.setValue(0);
        scaleAnimation.setValue(0);
        fadeAnimation.setValue(0);
        slideAnimation.setValue(50);
    };

    // Spinning animation untuk loading
    const spin = loadingAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

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
                            label="Berat Badan (kg)"
                            keyboardType='numeric'
                            placeholder="Masukan Berat Badan"
                        />

                        <MyInput
                            value={kirim.tinggi_badan}
                            onChangeText={x => updateKirim('tinggi_badan', x)}
                            label="Tinggi Badan (cm)"
                            keyboardType='numeric'
                            placeholder="Masukan Tinggi Badan"
                        />

                        <TouchableWithoutFeedback onPress={sendData} disabled={loading}>
                            <View style={{
                                padding:10,
                                backgroundColor: loading ? colors.secondary || '#95a5a6' : colors.primary,
                                borderRadius:10,
                                marginTop:30,
                                opacity: loading ? 0.7 : 1
                            }}>
                                <Text style={{
                                    fontFamily:fonts.primary[600],
                                    color:colors.white,
                                    textAlign:'center'
                                }}>{loading ? 'Menghitung...' : 'Hitung BMI'}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {/* LOADING ANIMATION */}
                        {loading && (
                            <View style={{
                                alignItems: 'center',
                                marginTop: 30
                            }}>
                                <Animated.View style={{
                                    transform: [{ rotate: spin }]
                                }}>
                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        borderWidth: 3,
                                        borderColor: colors.light || '#ecf0f1',
                                        borderTopColor: colors.primary,
                                    }} />
                                </Animated.View>
                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    color: colors.primary,
                                    marginTop: 10,
                                    fontSize: 14
                                }}>Sedang menghitung BMI Anda...</Text>
                            </View>
                        )}

                        {/* HASIL BMI */}
                        {showResult && hasilBMI && (
                            <Animated.View style={{
                                marginTop: 30,
                                padding: 20,
                                backgroundColor: colors.light || '#f8f9fa',
                                borderRadius: 10,
                                borderLeftWidth: 5,
                                borderLeftColor: hasilBMI.warna,
                                opacity: resultAnimation,
                                transform: [{
                                    translateY: resultAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0]
                                    })
                                }]
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 18,
                                    color: colors.black,
                                    textAlign: 'center',
                                    marginBottom: 10
                                }}>Hasil BMI Anda</Text>

                                {/* Animated BMI Value */}
                                <Animated.View style={{
                                    alignItems: 'center',
                                    marginBottom: 15,
                                    transform: [{ scale: scaleAnimation }],
                                    opacity: fadeAnimation
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[700],
                                        fontSize: 36,
                                        color: hasilBMI.warna
                                    }}>{hasilBMI.nilai}</Text>
                                </Animated.View>

                                {/* Animated Category Badge */}
                                <Animated.View style={{
                                    backgroundColor: hasilBMI.warna,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                    marginBottom: 15,
                                    transform: [{ translateY: slideAnimation }],
                                    opacity: fadeAnimation
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[600],
                                        color: colors.white,
                                        fontSize: 16
                                    }}>{hasilBMI.kategori}</Text>
                                </Animated.View>

                                {/* Animated Description */}
                                <Animated.View style={{
                                    transform: [{ translateY: slideAnimation }],
                                    opacity: fadeAnimation
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[400],
                                        color: colors.black,
                                        textAlign: 'center',
                                        fontSize: 14,
                                        lineHeight: 20
                                    }}>{hasilBMI.keterangan}</Text>
                                </Animated.View>

                                {/* Tabel Referensi BMI */}
                                <Animated.View style={{
                                    marginTop: 20,
                                    padding: 15,
                                    backgroundColor: colors.white,
                                    borderRadius: 8,
                                    opacity: fadeAnimation,
                                    transform: [{ translateY: slideAnimation }]
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[600],
                                        fontSize: 14,
                                        color: colors.black,
                                        marginBottom: 10,
                                        textAlign: 'center'
                                    }}>Kategori BMI</Text>
                                    
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>Kurus</Text>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>{'< 18.5'}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>Normal</Text>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>18.5 - 24.9</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>Gemuk</Text>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>25.0 - 29.9</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>Obesitas</Text>
                                        <Text style={{fontFamily: fonts.primary[400], fontSize: 12, color: colors.black}}>≥ 30.0</Text>
                                    </View>
                                </Animated.View>

                                {/* Tombol Reset */}
                                <Animated.View style={{
                                    marginTop: 15,
                                    opacity: fadeAnimation,
                                    transform: [{ translateY: slideAnimation }]
                                }}>
                                    <TouchableWithoutFeedback onPress={resetData}>
                                        <View style={{
                                            padding: 8,
                                            backgroundColor: colors.secondary || colors.primary,
                                            borderRadius: 8,
                                        }}>
                                            <Text style={{
                                                fontFamily: fonts.primary[500],
                                                color: colors.white,
                                                textAlign: 'center',
                                                fontSize: 14
                                            }}>Hitung Lagi</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Animated.View>
                            </Animated.View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}