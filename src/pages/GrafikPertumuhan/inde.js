import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated, Alert, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors } from '../../utils'
import { MyHeader, MyInput, MyCalendar } from '../../components'
import { LineChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width;

export default function GrafikPertumbuhan({navigation}) {
  const [berat, setBerat] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // State untuk tanggal yang dipilih dalam format YYYY-MM-DD
  const [showChart, setShowChart] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [historyData, setHistoryData] = useState([]); // Array untuk menyimpan histori data
  const [showHistory, setShowHistory] = useState(false); // Toggle untuk menampilkan histori
  
  // State baru untuk filter tanggal
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Load data from AsyncStorage when component mounts
  useEffect(() => {
    loadHistoryData();
  }, []);

  // Save data to AsyncStorage whenever historyData changes
  useEffect(() => {
    if (historyData.length > 0) {
      saveHistoryData();
    }
  }, [historyData]);

  // Load history data from AsyncStorage
  const loadHistoryData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('growthHistoryData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setHistoryData(parsedData);
        
        // Set current data to latest entry if available
        if (parsedData.length > 0) {
          const latestData = parsedData[parsedData.length - 1];
          setCurrentData(latestData);
          setShowChart(true);
        }
      }
    } catch (error) {
      console.error('Error loading history data:', error);
    }
  };

  // Save history data to AsyncStorage
  const saveHistoryData = async () => {
    try {
      await AsyncStorage.setItem('growthHistoryData', JSON.stringify(historyData));
    } catch (error) {
      console.error('Error saving history data:', error);
    }
  };

  // Clear all history data
  const clearAllHistory = async () => {
    Alert.alert(
      'Hapus Semua Data (Clear All Data)',
      'Apakah Anda yakin ingin menghapus semua data histori? Tindakan ini tidak dapat dibatalkan.\n(Are you sure you want to delete all history data? This action cannot be undone.)',
      [
        {
          text: 'Batal (Cancel)',
          style: 'cancel',
        },
        {
          text: 'Hapus Semua (Delete All)',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('growthHistoryData');
              setHistoryData([]);
              setCurrentData(null);
              setShowChart(false);
              setShowHistory(false);
            
              Alert.alert(
                'Berhasil (Success)',
                'Semua data histori telah dihapus.\n(All history data has been deleted.)'
              );
            } catch (error) {
              console.error('Error clearing history:', error);
              Alert.alert(
                'Error',
                'Gagal menghapus data histori.\n(Failed to delete history data.)'
              );
            }
          },
        },
      ]
    );
  };

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

  // Membuat data overlay untuk semua titik dalam histori
  const createHistoryDataOverlay = () => {
    if (!historyData || historyData.length === 0) return null;
    
    // Membuat overlay untuk semua data histori
    const overlayData = Array(heightValues.length).fill(null);
    const allPoints = [];
    
    historyData.forEach((dataPoint, index) => {
      const childWeight = parseFloat(dataPoint.berat);
      const childHeight = parseFloat(dataPoint.tinggi);
      const xPosition = getXPosition(childHeight);
      const nearestIndex = Math.round(xPosition);
      
      if (nearestIndex >= 0 && nearestIndex < overlayData.length) {
        allPoints.push({
          index: nearestIndex,
          weight: childWeight,
          isLatest: index === historyData.length - 1
        });
      }
    });
    
    // Set data untuk grafik overlay
    allPoints.forEach(point => {
      overlayData[point.index] = point.weight;
    });
    
    return {
      labels: heightLabels,
      datasets: [{
        data: overlayData,
        color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
        strokeWidth: 2,
        withDots: true,
      }]
    };
  };

  // Membuat data overlay untuk titik terbaru saja (highlight)
  const createCurrentDataOverlay = () => {
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
        color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`, // Pink untuk highlight
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
    
    if (index < 0 || index >= heightValues.length) return "Data tidak valid (Invalid data)";
    
    const sd3neg = weightForHeightData.datasets[0].data[index];
    const sd2neg = weightForHeightData.datasets[1].data[index];
    const median = weightForHeightData.datasets[2].data[index];
    const sd2pos = weightForHeightData.datasets[3].data[index];
    const sd3pos = weightForHeightData.datasets[4].data[index];
    
    if (beratNum < sd3neg) return "Sangat Kurus (Severely Wasted)";
    if (beratNum < sd2neg) return "Kurus (Wasted)";
    if (beratNum <= sd2pos) return "Normal";
    if (beratNum <= sd3pos) return "Gemuk (Overweight)";
    return "Obesitas (Obesity)";
  };

  // Fungsi untuk menghitung umur berdasarkan tanggal
  const calculateAge = (birthDate, currentDate) => {
    const birth = new Date(birthDate);
    const current = new Date(currentDate);
    const diffTime = Math.abs(current - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    return `${months} bulan ${days} hari`;
  };

  // Fungsi untuk format tanggal
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  // Fungsi untuk format bulan-tahun
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Fungsi untuk filter data berdasarkan tanggal
  const getFilteredHistoryData = () => {
    if (!filterStartDate && !filterEndDate) return historyData;
    
    return historyData.filter(item => {
      const itemDate = new Date(item.dateTime);
      const startDate = filterStartDate ? new Date(filterStartDate) : null;
      const endDate = filterEndDate ? new Date(filterEndDate) : null;
      
      // Set endDate ke akhir hari jika ada
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }
      
      if (startDate && endDate) {
        return itemDate >= startDate && itemDate <= endDate;
      } else if (startDate) {
        return itemDate >= startDate;
      } else if (endDate) {
        return itemDate <= endDate;
      }
      
      return true;
    });
  };

  // Fungsi untuk mengelompokkan data yang sudah difilter berdasarkan bulan
  const getFilteredDataByMonth = () => {
    const filteredData = getFilteredHistoryData();
    const groupedData = {};
    filteredData.forEach(item => {
      const monthYear = formatMonthYear(new Date(item.dateTime));
      if (!groupedData[monthYear]) {
        groupedData[monthYear] = [];
      }
      groupedData[monthYear].push(item);
    });
    return groupedData;
  };

  // Fungsi untuk mengelompokkan data berdasarkan bulan (tanpa filter)
  const getDataByMonth = () => {
    const groupedData = {};
    historyData.forEach(item => {
      const monthYear = formatMonthYear(new Date(item.dateTime));
      if (!groupedData[monthYear]) {
        groupedData[monthYear] = [];
      }
      groupedData[monthYear].push(item);
    });
    return groupedData;
  };

  // Fungsi untuk reset filter
  const resetDateFilter = () => {
    setFilterStartDate('');
    setFilterEndDate('');
  };

  const handleLihatHasil = () => {
    if (berat && tinggi) {
      const tinggiNum = parseFloat(tinggi);
      if (tinggiNum < 45 || tinggiNum > 110) {
        Alert.alert(
          'Data Tidak Valid (Invalid Data)', 
          'Tinggi badan harus antara 45-110 cm sesuai standar WHO\n(Height must be between 45-110 cm according to WHO standards)'
        );
        return;
      }
      
      const newData = { 
        id: Date.now(), // Unique ID
        berat, 
        tinggi, 
        date: new Date(selectedDate).toLocaleDateString('id-ID'),
        dateTime: new Date(selectedDate), // Untuk sorting
        status: getStatusGizi(berat, tinggi),
        month: formatMonthYear(new Date(selectedDate))
      };
      
      // Tambahkan ke histori
      const updatedHistory = [...historyData, newData];
      setHistoryData(updatedHistory);
      
      setCurrentData(newData);
      setShowChart(true);
      setBerat('');
      setTinggi('');
      
      // Reset tanggal ke hari ini setelah input
      setSelectedDate(new Date().toISOString().split('T')[0]);
    } else {
      Alert.alert(
        'Data Tidak Lengkap (Incomplete Data)', 
        'Mohon isi berat dan tinggi badan terlebih dahulu\n(Please fill in weight and height first)'
      );
    }
  };

  // Fungsi untuk menghapus data histori
  const deleteHistoryItem = async (id) => {
    Alert.alert(
      'Hapus Data (Delete Data)',
      'Apakah Anda yakin ingin menghapus data ini?\n(Are you sure you want to delete this data?)',
      [
        {
          text: 'Batal (Cancel)',
          style: 'cancel',
        },
        {
          text: 'Hapus (Delete)',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedHistory = historyData.filter(item => item.id !== id);
              setHistoryData(updatedHistory);
              
              // Update AsyncStorage
              if (updatedHistory.length > 0) {
                await AsyncStorage.setItem('growthHistoryData', JSON.stringify(updatedHistory));
              } else {
                await AsyncStorage.removeItem('growthHistoryData');
              }
              
              // Jika data yang dihapus adalah data current, update current data
              if (currentData && currentData.id === id) {
                const latestData = updatedHistory[updatedHistory.length - 1];
                setCurrentData(latestData || null);
                if (!latestData) {
                  setShowChart(false);
                }
              }
            } catch (error) {
              console.error('Error deleting history item:', error);
              Alert.alert(
                'Error',
                'Gagal menghapus data.\n(Failed to delete data.)'
              );
            }
          },
        },
      ]
    );
  };

  // Safe handler untuk date change di filter
  const handleFilterStartDateChange = (date) => {
    try {
      setFilterStartDate(date || '');
    } catch (error) {
      console.error('Error setting start date:', error);
    }
  };

  const handleFilterEndDateChange = (date) => {
    try {
      setFilterEndDate(date || '');
    } catch (error) {
      console.error('Error setting end date:', error);
    }
  };

  // Render item histori dengan layout yang lebih rapi
  const renderHistoryItem = (item, index) => (
    <View style={{
      backgroundColor: colors.white,
      marginBottom: 12,
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderRadius: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderLeftWidth: 5,
      borderLeftColor: item.status === 'Normal' ? '#28a745' : 
                      item.status.includes('Kurus') || item.status.includes('Wasted') ? '#dc3545' :
                      item.status.includes('Gemuk') || item.status.includes('Overweight') || item.status.includes('Obesitas') || item.status.includes('Obesity') ? '#fd7e14' : '#6c757d',
    }}>
      {/* Header Row */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 12,
            color: '#888',
            fontStyle: 'italic',
          }}>
            {item.month}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteHistoryItem(item.id)}
          style={{
            backgroundColor: '#dc3545',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            elevation: 1,
          }}
        >
          <Text style={{ 
            color: '#fff', 
            fontSize: 12, 
            fontWeight: 'bold' 
          }}>
            🗑️ Hapus
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Data Grid */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {/* Left Column */}
        <View style={{ flex: 1, minWidth: '45%' }}>
          <View style={{ 
            backgroundColor: '#f8f9fa', 
            padding: 10, 
            borderRadius: 8,
            marginBottom: 8,
          }}>
            <Text style={{ 
              color: '#666', 
              fontSize: 12, 
              fontWeight: '600',
              marginBottom: 4,
            }}>📅 TANGGAL</Text>
            <Text style={{ 
              fontWeight: 'bold', 
              fontSize: 14,
              color: '#333',
            }}>
              {item.date}
            </Text>
          </View>
          
          <View style={{ 
            backgroundColor: '#e3f2fd', 
            padding: 10, 
            borderRadius: 8,
          }}>
            <Text style={{ 
              color: '#666', 
              fontSize: 12, 
              fontWeight: '600',
              marginBottom: 4,
            }}>📏 TINGGI</Text>
            <Text style={{ 
              fontWeight: 'bold', 
              fontSize: 16,
              color: '#1976d2',
            }}>
              {item.tinggi} cm
            </Text>
          </View>
        </View>
        
        {/* Right Column */}
        <View style={{ flex: 1, minWidth: '45%' }}>
          <View style={{ 
            backgroundColor: '#fff3e0', 
            padding: 10, 
            borderRadius: 8,
            marginBottom: 8,
          }}>
            <Text style={{ 
              color: '#666', 
              fontSize: 12, 
              fontWeight: '600',
              marginBottom: 4,
            }}>⚖️ BERAT</Text>
            <Text style={{ 
              fontWeight: 'bold', 
              fontSize: 16,
              color: '#f57c00',
            }}>
              {item.berat} kg
            </Text>
          </View>
          
          <View style={{ 
            backgroundColor: item.status === 'Normal' ? '#e8f5e8' : 
                            item.status.includes('Kurus') || item.status.includes('Wasted') ? '#ffebee' :
                            item.status.includes('Gemuk') || item.status.includes('Overweight') || item.status.includes('Obesitas') || item.status.includes('Obesity') ? '#fff3e0' : '#f5f5f5',
            padding: 10, 
            borderRadius: 8,
          }}>
            <Text style={{ 
              color: '#666', 
              fontSize: 12, 
              fontWeight: '600',
              marginBottom: 4,
            }}>📊 STATUS</Text>
            <Text style={{ 
              fontWeight: 'bold', 
              fontSize: 13,
              color: item.status === 'Normal' ? '#28a745' : 
                    item.status.includes('Kurus') || item.status.includes('Wasted') ? '#dc3545' :
                    item.status.includes('Gemuk') || item.status.includes('Overweight') || item.status.includes('Obesitas') || item.status.includes('Obesity') ? '#fd7e14' : '#6c757d',
              textAlign: 'center',
            }}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Render filtered history berdasarkan bulan
  const renderFilteredHistoryByMonth = () => {
    const dataByMonth = getFilteredDataByMonth();
    const months = Object.keys(dataByMonth).sort((a, b) => new Date(b) - new Date(a));
    
    if (months.length === 0) {
      return (
        <View style={{
          backgroundColor: colors.white,
          padding: 30,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <Text style={{
            fontSize: 48,
            marginBottom: 10,
            opacity: 0.3,
          }}>📅</Text>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#999',
            textAlign: 'center',
            marginBottom: 5
          }}>
            Tidak Ada Data Ditemukan{'\n'}(No Data Found)
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#bbb',
            textAlign: 'center',
          }}>
            Tidak ada data pada rentang tanggal yang dipilih{'\n'}(No data in the selected date range)
          </Text>
        </View>
      );
    }
    
    return months.map((monthYear) => (
      <View key={monthYear} style={{ marginBottom: 20 }}>
        {/* Month Header */}
        <View style={{
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 15,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            color: colors.white,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
            {monthYear}
          </Text>
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
            <Text style={{
              color: colors.white,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
              {dataByMonth[monthYear].length} data
            </Text>
          </View>
        </View>
        
        {/* Month Data */}
        {dataByMonth[monthYear]
          .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
          .map((item, index) => (
            <View key={item.id} style={{ marginBottom: 8 }}>
              {renderHistoryItem(item, historyData.findIndex(h => h.id === item.id))}
            </View>
          ))}
      </View>
    ));
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

  const historyDataOverlay = createHistoryDataOverlay();
  const currentDataOverlay = createCurrentDataOverlay();

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Grafik Pertumbuhan (Growth Chart)" onPress={() => navigation.goBack()}/>
      
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
            📊 Input Data Anak{'\n'}(Child Data Input)
          </Text>

          {/* Date Picker Section */}
          <View style={{ marginBottom: 15 }}>
            <MyCalendar
              label="📅 Tanggal Pengukuran (Measurement Date)"
              placeholder="Pilih tanggal pengukuran"
              value={selectedDate}
              onDateChange={(date) => {
                setSelectedDate(date); // date sudah dalam format YYYY-MM-DD dari DatePicker
              }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <MyInput label="⚖️ Berat Badan (Weight) - kg"
              placeholder="Contoh: 12.5 (Example: 12.5)"
              value={berat}
              onChangeText={setBerat}
              keyboardType="numeric"
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <MyInput
            label="📏 Tinggi Badan (Height) - cm"
              placeholder="Contoh: 85 (Example: 85)"
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
              📈 Lihat Hasil Grafik{'\n'}(View Chart Results)
            </Text>
          </TouchableOpacity>
        </View>

        {/* History Toggle Button */}
        {historyData.length > 0 && (
          <View style={{
            marginHorizontal: 15,
            marginTop: 15,
          }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: showHistory ? '#6c757d' : colors.primary,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flex: 1,
                  elevation: 2,
                }}
                onPress={() => setShowHistory(!showHistory)}
              >
                <Text style={{
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginRight: 8,
                }}>
                  {showHistory ? '📊 Tampilkan Grafik' : '📋 Lihat Histori Data'}
                </Text>
                <View style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 12,
                }}>
                  <Text style={{ 
                    color: colors.white, 
                    fontSize: 12,
                    fontWeight: 'bold' 
                  }}>
                    {historyData.length}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* History Section */}
        {showHistory && historyData.length > 0 && (
          <View style={{ marginTop: 20 }}>
            {/* History Header dengan Filter Button */}
            <View style={{
              backgroundColor: colors.primary,
              paddingVertical: 18,
              paddingHorizontal: 20,
              marginHorizontal: 15,
              borderRadius: 12,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    color: colors.white,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                    📋 Histori Pertumbuhan
                  </Text>
                  <Text style={{
                    color: colors.white,
                    fontSize: 14,
                    marginTop: 2,
                    opacity: 0.9,
                  }}>
                    Growth History by Month
                  </Text>
                </View>
                <View style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: colors.white,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                    {getFilteredHistoryData().length}
                  </Text>
                  <Text style={{
                    color: colors.white,
                    fontSize: 10,
                    opacity: 0.9,
                  }}>
                    Data
                  </Text>
                </View>
              </View>
              
              {/* Filter Toggle Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                  marginTop: 15,
                  alignItems: 'center',
                }}
                onPress={() => setShowDateFilter(!showDateFilter)}
              >
                <Text style={{
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                  📅 {showDateFilter ? 'Tutup Filter' : 'Filter Tanggal'} ({showDateFilter ? 'Close' : 'Date'} Filter)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Filter Section */}
            {showDateFilter && (
              <View style={{
                backgroundColor: colors.white,
                marginHorizontal: 15,
                marginTop: 10,
                padding: 20,
                borderRadius: 12,
                elevation: 2,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 15,
                  textAlign: 'center',
                }}>
                  🗓️ Filter Berdasarkan Tanggal{'\n'}(Filter by Date)
                </Text>
                
                <View style={{ marginBottom: 15 }}>
                  <MyCalendar
                    label="📅 Tanggal Mulai (Start Date)"
                    placeholder="Pilih tanggal mulai"
                    value={filterStartDate}
                    onDateChange={handleFilterStartDateChange}
                  />
                </View>

                <View style={{ marginBottom: 15 }}>
                  <MyCalendar
                    label="📅 Tanggal Akhir (End Date)"
                    placeholder="Pilih tanggal akhir"
                    value={filterEndDate}
                    onDateChange={handleFilterEndDateChange}
                  />
                </View>

                <View style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#6c757d',
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      flex: 1,
                      alignItems: 'center',
                    }}
                    onPress={resetDateFilter}
                  >
                    <Text style={{
                      color: colors.white,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                      🔄 Reset Filter
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      flex: 1,
                      alignItems: 'center',
                    }}
                    onPress={() => setShowDateFilter(false)}
                  >
                    <Text style={{
                      color: colors.white,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                      ✅ Terapkan Filter
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Filter Info */}
                {(filterStartDate || filterEndDate) && (
                  <View style={{
                    backgroundColor: '#f8f9fa',
                    padding: 12,
                    borderRadius: 8,
                    marginTop: 15,
                    borderLeftWidth: 4,
                    borderLeftColor: colors.primary,
                  }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: 5,
                    }}>
                      📊 Filter Aktif (Active Filter):
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: '#666',
                    }}>
                      {filterStartDate ? `Dari: ${new Date(filterStartDate).toLocaleDateString('id-ID')}` : 'Dari: Awal data'}{'\n'}
                      {filterEndDate ? `Sampai: ${new Date(filterEndDate).toLocaleDateString('id-ID')}` : 'Sampai: Akhir data'}{'\n'}
                      Menampilkan: {getFilteredHistoryData().length} dari {historyData.length} data
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* History List Container - Filtered and Grouped by Month */}
            <View style={{
              backgroundColor: '#f8f9fa',
              paddingTop: 20,
              paddingBottom: 10,
              paddingHorizontal: 15,
              marginHorizontal: 15,
              marginTop: 10,
              borderRadius: 12,
              elevation: 2,
            }}>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{ maxHeight: 600 }}
              >
                {renderFilteredHistoryByMonth()}
              </ScrollView>
              
              {/* Summary Stats - Updated untuk filtered data */}
              <View style={{
                backgroundColor: colors.white,
                marginTop: 10,
                padding: 15,
                borderRadius: 10,
                elevation: 1,
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 10,
                  textAlign: 'center',
                }}>
                  📈 Ringkasan Statistik{(filterStartDate || filterEndDate) ? ' (Terfilter)' : ''}{'\n'}(Summary Statistics{(filterStartDate || filterEndDate) ? ' - Filtered' : ''})
                </Text>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                  <View style={{ alignItems: 'center', marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
                      Data Ditampilkan
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>
                      {getFilteredHistoryData().length}
                    </Text>
                  </View>
                  
                  <View style={{ alignItems: 'center', marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
                      Total Data
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6c757d' }}>
                      {historyData.length}
                    </Text>
                  </View>
                  
                  <View style={{ alignItems: 'center', marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
                      Jumlah Bulan
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#28a745' }}>
                      {Object.keys(getFilteredDataByMonth()).length}
                    </Text>
                  </View>
                  
                  {getFilteredHistoryData().length > 0 && (
                    <>
                      <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
                          Berat Terakhir
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f57c00' }}>
                          {getFilteredHistoryData().sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))[0]?.berat} kg
                        </Text>
                      </View>
                      
                      <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>
                          Tinggi Terakhir
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1976d2' }}>
                          {getFilteredHistoryData().sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))[0]?.tinggi} cm
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>

            {/* Clear All History Button */}
            <View style={{
              marginHorizontal: 15,
              marginTop: 15,
            }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#dc3545',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  elevation: 2,
                }}
                onPress={clearAllHistory}
              >
                <Text style={{
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                  🗑️ Hapus Semua Data (Clear All Data)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!showHistory && (
          <>
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
                Grafik Berat-untuk-Tinggi{'\n'}(Weight-for-Height Chart)
              </Text>
              <Text style={{
                color: colors.white,
                fontSize: 14,
                textAlign: 'center',
                marginTop: 5,
              }}>
                Lahir sampai 2 tahun (z-scores){'\n'}(Birth to 2 years - z-scores)
              </Text>
              {historyData.length > 0 && (
                <Text style={{
                  color: colors.white,
                  fontSize: 12,
                  textAlign: 'center',
                  marginTop: 5,
                  fontStyle: 'italic',
                }}>
                  Menampilkan {historyData.length} data pengukuran
                </Text>
              )}
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
                      Berat (Weight) - kg
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

                    {/* History Data Overlay - All Points */}
                    {historyDataOverlay && historyData.length > 1 && (
                      <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}>
                        <LineChart
                          data={historyDataOverlay}
                          width={screenWidth - 90}
                          height={300}
                          chartConfig={{
                            ...chartConfig,
                            backgroundColor: 'transparent',
                            backgroundGradientFrom: 'transparent',
                            backgroundGradientTo: 'transparent',
                            propsForDots: {
                              r: '6',
                              strokeWidth: '2',
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

                    {/* Current Data Overlay - Latest Point Highlighted */}
                    {currentDataOverlay && (
                      <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}>
                        <LineChart
                          data={currentDataOverlay}
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
                              fill: '#FF69B4',
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
                    Tinggi (Height) - cm
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
                      Standar Pertumbuhan Anak WHO{'\n'}(WHO Child Growth Standards)
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
                    Hasil Pengukuran Terkini{'\n'}(Current Measurement Results)
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
                      <Text style={{ color: '#555', fontSize: 14 }}>📅 Tanggal (Date):</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{currentData.date}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}>
                      <Text style={{ color: '#555', fontSize: 14 }}>📏 Tinggi (Height):</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{currentData.tinggi} cm</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}>
                      <Text style={{ color: '#555', fontSize: 14 }}>⚖️ Berat (Weight):</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{currentData.berat} kg</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}>
                      <Text style={{ color: '#555', fontSize: 14 }}>📊 Status:</Text>
                      <Text style={{ 
                        fontWeight: 'bold', 
                        fontSize: 14,
                        color: currentData.status === 'Normal' ? '#28a745' : 
                              currentData.status.includes('Kurus') || currentData.status.includes('Wasted') ? '#dc3545' :
                              currentData.status.includes('Gemuk') || currentData.status.includes('Overweight') || currentData.status.includes('Obesitas') || currentData.status.includes('Obesity') ? '#fd7e14' : '#6c757d'
                      }}>
                        {currentData.status}
                      </Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text style={{ color: '#555', fontSize: 14 }}>🗓️ Bulan:</Text>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{currentData.month}</Text>
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
                    Keterangan Grafik{'\n'}(Chart Legend)
                  </Text>
                  
                  <View style={{ gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: 20, height: 2, backgroundColor: '#000000', marginRight: 10 }} />
                      <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>+3/-3 SD</Text> - Garis batas ekstrem{'\n'}(Extreme boundary lines)
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: 20, height: 2, backgroundColor: '#FF0000', marginRight: 10 }} />
                      <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>+2/-2 SD</Text> - Garis batas gemuk/kurus{'\n'}(Overweight/Underweight boundaries)
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: 20, height: 3, backgroundColor: '#008000', marginRight: 10 }} />
                      <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>0 (Median)</Text> - Garis normal/ideal{'\n'}(Normal/Ideal line)
                      </Text>
                    </View>
                    {historyData.length > 1 && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 12, height: 12, backgroundColor: '#8A2BE2', borderRadius: 6, marginRight: 10, marginLeft: 4 }} />
                        <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                          <Text style={{ fontWeight: 'bold' }}>• Data Histori (History Data)</Text> - Data pengukuran sebelumnya{'\n'}(Previous measurement data)
                        </Text>
                      </View>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: 12, height: 12, backgroundColor: '#FF69B4', borderRadius: 6, marginRight: 10, marginLeft: 4 }} />
                      <Text style={{ fontSize: 12, color: '#555', flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>• Data Terkini (Latest Data)</Text> - Pengukuran terbaru{'\n'}(Most recent measurement)
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
                    💡 Interpretasi Grafik (Chart Interpretation):
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#555',
                    lineHeight: 18,
                  }}>
                    {historyData.length > 1 ? (
                      `• Titik ungu menunjukkan histori pengukuran sebelumnya (${historyData.length - 1} data)\n  (Purple dots show previous measurement history)\n• Titik pink menunjukkan pengukuran terkini\n  (Pink dot shows current measurement)\n`
                    ) : (
                      '• Titik pink menunjukkan posisi berat badan anak sesuai tinggi badannya\n  (Pink dot shows child\'s weight position according to height)\n'
                    )}
                    • Status: <Text style={{fontWeight: 'bold'}}>{currentData.status}</Text>{'\n'}
                    • Data dikelompokkan berdasarkan bulan untuk memudahkan tracking{'\n'}
                      (Data grouped by month for easy tracking){'\n'}
                    • Grafik menggunakan standar WHO weight-for-height{'\n'}
                      (Chart uses WHO weight-for-height standards){'\n'}
                    • Klik "Lihat Histori Data" untuk melihat semua pengukuran per bulan{'\n'}
                      (Click "View Data History" to see all measurements by month){'\n'}
                    • Konsultasikan dengan dokter anak jika ada kekhawatiran{'\n'}
                      (Consult with pediatrician if there are concerns)
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
                  Grafik Akan Muncul Di Sini{'\n'}(Chart Will Appear Here)
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#bbb',
                  textAlign: 'center',
                }}>
                  Pilih tanggal dan isi data berat serta tinggi badan{'\n'}(Select date and fill in weight and height data)
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  )
}