import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { colors } from '../../utils'
import { MyHeader, MyInput } from '../../components'
import { LineChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width;

export default function GrafikPertumbuhan({navigation}) {
  const [berat, setBerat] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Data WHO standards - Weight for Height (45-110 cm)
  const heightLabels = ['45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100', '105', '110'];
  const heightValues = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110];
  
  const weightForHeightData = {
    labels: heightLabels,
    datasets: [
      {
        data: [2.0, 2.5, 3.2, 4.0, 4.9, 5.8, 6.8, 7.8, 8.8, 9.9, 11.0, 12.2, 13.4, 14.8], // -3 SD
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [2.2, 2.8, 3.6, 4.5, 5.5, 6.5, 7.5, 8.6, 9.7, 10.9, 12.1, 13.4, 14.8, 16.3], // -2 SD
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [2.8, 3.6, 4.7, 5.8, 6.9, 8.2, 9.5, 10.8, 12.1, 13.6, 15.1, 16.8, 18.6, 20.5], // Median (0)
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: [3.6, 4.8, 6.2, 7.5, 8.9, 10.6, 12.2, 13.9, 15.7, 17.7, 19.6, 21.8, 24.1, 26.7], // +2 SD
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [4.1, 5.5, 7.1, 8.6, 10.2, 12.1, 14.0, 15.9, 18.0, 20.4, 22.7, 25.2, 28.0, 31.0], // +3 SD
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      }
    ]
  };

  // Fungsi untuk mendapatkan posisi x pada grafik berdasarkan tinggi badan
  const getXPosition = (height) => {
    const heightNum = parseFloat(height);
    if (heightNum < heightValues[0]) return 0;
    if (heightNum > heightValues[heightValues.length - 1]) return heightValues.length - 1;
    
    // Interpolasi untuk mendapatkan posisi yang tepat
    for (let i = 0; i < heightValues.length - 1; i++) {
      if (heightNum >= heightValues[i] && heightNum <= heightValues[i + 1]) {
        const ratio = (heightNum - heightValues[i]) / (heightValues[i + 1] - heightValues[i]);
        return i + ratio;
      }
    }
    return heightValues.length - 1;
  };

  // Membuat data overlay untuk titik anak (hanya 1 titik)
  const createChildDataOverlay = () => {
    if (!currentData) return null;
    
    const childWeight = parseFloat(currentData.berat);
    const childHeight = parseFloat(currentData.tinggi);
    const xPosition = getXPosition(childHeight);
    
    // Membuat array dengan hanya satu titik di posisi yang tepat
    const overlayData = Array(heightValues.length).fill(null);
    const nearestIndex = Math.round(xPosition);
    if (nearestIndex >= 0 && nearestIndex < overlayData.length) {
      overlayData[nearestIndex] = childWeight;
    }
    
    return {
      labels: heightLabels,
      datasets: [{
        data: overlayData,
        color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
        strokeWidth: 0,
        withDots: true,
      }]
    };
  };

  // Fungsi untuk menentukan status gizi berdasarkan weight-for-height
  const getStatusGizi = (berat, tinggi) => {
    const beratNum = parseFloat(berat);
    const tinggiNum = parseFloat(tinggi);
    const xPos = getXPosition(tinggiNum);
    const index = Math.round(xPos);
    
    if (index < 0 || index >= heightValues.length) return "Data tidak valid";
    
    const sd3neg = weightForHeightData.datasets[0].data[index];
    const sd2neg = weightForHeightData.datasets[1].data[index];
    const median = weightForHeightData.datasets[2].data[index];
    const sd2pos = weightForHeightData.datasets[3].data[index];
    const sd3pos = weightForHeightData.datasets[4].data[index];
    
    if (beratNum < sd3neg) return "Sangat Kurus (Severely Wasted)";
    if (beratNum < sd2neg) return "Kurus (Wasted)";
    if (beratNum <= sd2pos) return "Normal";
    if (beratNum <= sd3pos) return "Gemuk (Overweight)";
    return "Obesitas";
  };

  const handleLihatHasil = () => {
    if (berat && tinggi) {
      const tinggiNum = parseFloat(tinggi);
      if (tinggiNum < 45 || tinggiNum > 110) {
        alert('Tinggi badan harus antara 45-110 cm sesuai standar WHO');
        return;
      }
      
      const newData = { 
        berat, 
        tinggi, 
        date: new Date().toLocaleDateString(),
        status: getStatusGizi(berat, tinggi)
      };
      
      setCurrentData(newData);
      setShowChart(true);
      setBerat('');
      setTinggi('');
    } else {
      alert('Mohon isi berat dan tinggi badan terlebih dahulu');
    }
  };

  useEffect(() => {
    if (showChart) {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showChart, currentData]);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '3',
      fill: '#8A2BE2',
    },
    propsForLabels: {
      fontSize: 10,
    },
    formatXLabel: (value) => value,
    formatYLabel: (value) => `${Math.round(value * 10) / 10}`,
  };

  const childDataOverlay = createChildDataOverlay();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Grafik Pertumbuhan" onPress={() => navigation.goBack()}/>
      
      <ScrollView style={{ flex: 1 }}>
        {/* Input Form */}
        <View style={{
          backgroundColor: colors.white,
          marginHorizontal: 15,
          marginTop: 15,
          padding: 20,
          borderRadius: 15,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderWidth: 1,
          borderColor: '#f0f0f0'
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 15,
            textAlign: 'center'
          }}>
            📊 Input Data Anak
          </Text>

          <View style={{ marginBottom: 15 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#555',
              marginBottom: 8,
            }}>
              Berat Badan (kg)
            </Text>
            <MyInput
              placeholder="Contoh: 12.5"
              value={berat}
              onChangeText={setBerat}
              keyboardType="numeric"
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#555',
              marginBottom: 8,
            }}>
              Tinggi Badan (cm) - Rentang: 45-110 cm
            </Text>
            <MyInput
              placeholder="Contoh: 85"
              value={tinggi}
              onChangeText={setTinggi}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: 'center',
              elevation: 2,
            }}
            onPress={handleLihatHasil}
          >
            <Text style={{
              color: colors.white,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
              📈 Lihat Hasil Grafik
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chart Title */}
        <View style={{
          backgroundColor: colors.primary,
          paddingVertical: 15,
          marginHorizontal: 15,
          marginTop: 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
          <Text style={{
            color: colors.white,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            Weight-for-Height Chart
          </Text>
          <Text style={{
            color: colors.white,
            fontSize: 14,
            textAlign: 'center',
            marginTop: 5,
          }}>
            Birth to 2 years (z-scores)
          </Text>
        </View>

        {showChart && currentData ? (
          <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}>
            {/* Chart Container */}
            <View style={{
              backgroundColor: colors.white,
              marginHorizontal: 15,
              paddingTop: 20,
              paddingBottom: 15,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              elevation: 2,
            }}>
              
              {/* Y-axis Label */}
              <View style={{
                position: 'absolute',
                left: -5,
                top: '50%',
                zIndex: 10,
              }}>
                <Text style={{
                  fontSize: 12,
                  color: '#666',
                  fontWeight: 'bold',
                  transform: [{ rotate: '-90deg' }],
                  textAlign: 'center',
                }}>
                  Weight (kg)
                </Text>
              </View>

              {/* Main Chart */}
              <View style={{ marginLeft: 15, marginRight: 25 }}>
                <LineChart
                  data={weightForHeightData}
                  width={screenWidth - 90}
                  height={300}
                  chartConfig={chartConfig}
                  bezier={false}
                  withDots={false}
                  withInnerLines={true}
                  withOuterLines={true}
                  withVerticalLines={true}
                  withHorizontalLines={true}
                  style={{
                    paddingRight: 0,
                  }}
                />

                {/* Child Data Overlay - Single Dot */}
                {childDataOverlay && (
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}>
                    <LineChart
                      data={childDataOverlay}
                      width={screenWidth - 90}
                      height={300}
                      chartConfig={{
                        ...chartConfig,
                        backgroundColor: 'transparent',
                        backgroundGradientFrom: 'transparent',
                        backgroundGradientTo: 'transparent',
                        propsForDots: {
                          r: '8',
                          strokeWidth: '3',
                          fill: '#8A2BE2',
                          stroke: '#FFFFFF',
                        },
                      }}
                      bezier={false}
                      withDots={true}
                      withInnerLines={false}
                      withOuterLines={false}
                      withVerticalLines={false}
                      withHorizontalLines={false}
                      transparent={true}
                    />
                  </View>
                )}
              </View>

              {/* X-axis Label - Rapi seperti WHO */}
              <Text style={{
                fontSize: 12,
                color: '#666',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 15,
              }}>
                Height (cm)
              </Text>

              {/* WHO Logo Area */}
              <View style={{ 
                alignItems: 'flex-end', 
                marginTop: 10,
                paddingRight: 10 
              }}>
                <Text style={{
                  fontSize: 10,
                  color: '#666',
                  fontWeight: 'bold'
                }}>
                  WHO Child Growth Standards
                </Text>
              </View>
            </View>

            {/* Result Display */}
            <View style={{
              backgroundColor: colors.white,
              marginHorizontal: 15,
              marginTop: 15,
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
                color: colors.primary,
              }}>
                Hasil Pengukuran Terkini
              </Text>
              
              <View style={{
                backgroundColor: '#f8f9fa',
                padding: 15,
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: colors.primary,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                  <Text style={{ color: '#555', fontSize: 14 }}>📅 Tanggal:</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{currentData.date}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                  <Text style={{ color: '#555', fontSize: 14 }}>📏 Tinggi:</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{currentData.tinggi} cm</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                  <Text style={{ color: '#555', fontSize: 14 }}>⚖️ Berat:</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{currentData.berat} kg</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  <Text style={{ color: '#555', fontSize: 14 }}>📊 Status:</Text>
                  <Text style={{ 
                    fontWeight: 'bold', 
                    fontSize: 14,
                    color: currentData.status === 'Normal' ? '#28a745' : 
                          currentData.status.includes('Kurus') ? '#dc3545' :
                          currentData.status.includes('Gemuk') || currentData.status.includes('Obesitas') ? '#fd7e14' : '#6c757d'
                  }}>
                    {currentData.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* Legend dengan layout yang rapi */}
            <View style={{
              backgroundColor: colors.white,
              marginHorizontal: 15,
              marginTop: 15,
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 12,
                textAlign: 'center',
                color: '#333',
              }}>
                Keterangan Grafik
              </Text>
              
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 20, height: 2, backgroundColor: '#000000', marginRight: 10 }} />
                  <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>+3/-3 SD</Text> - Garis batas ekstrem (obesitas/sangat kurus)
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 20, height: 2, backgroundColor: '#FF0000', marginRight: 10 }} />
                  <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>+2/-2 SD</Text> - Garis batas gemuk/kurus
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 20, height: 3, backgroundColor: '#008000', marginRight: 10 }} />
                  <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>0 (Median)</Text> - Garis normal/ideal
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 12, height: 12, backgroundColor: '#8A2BE2', borderRadius: 6, marginRight: 10, marginLeft: 4 }} />
                  <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>• Data Anak</Text> - Posisi berat terhadap tinggi saat ini
                  </Text>
                </View>
              </View>
            </View>

            {/* Information */}
            <View style={{
              backgroundColor: '#F8F9FA',
              marginHorizontal: 15,
              marginTop: 15,
              marginBottom: 30,
              padding: 15,
              borderRadius: 10,
              borderLeftWidth: 4,
              borderLeftColor: colors.primary,
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 8,
              }}>
                💡 Interpretasi Grafik:
              </Text>
              <Text style={{
                fontSize: 12,
                color: '#555',
                lineHeight: 18,
              }}>
                • Titik ungu menunjukkan posisi berat badan anak sesuai tinggi badannya{'\n'}
                • Status: <Text style={{fontWeight: 'bold'}}>{currentData.status}</Text>{'\n'}
                • Grafik menggunakan standar WHO weight-for-height{'\n'}
                • Input data baru akan mengganti data sebelumnya{'\n'}
                • Konsultasikan dengan dokter anak jika ada kekhawatiran
              </Text>
            </View>
          </Animated.View>
        ) : (
          /* Empty Chart Placeholder */
          <View style={{
            backgroundColor: colors.white,
            marginHorizontal: 15,
            marginTop: 10,
            padding: 30,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 48,
              marginBottom: 10,
              opacity: 0.3,
            }}>📊</Text>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#999',
              textAlign: 'center',
              marginBottom: 5
            }}>
              Grafik Akan Muncul Di Sini
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#bbb',
              textAlign: 'center',
            }}>
              Isi data berat dan tinggi badan terlebih dahulu
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}