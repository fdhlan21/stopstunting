import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { Icon } from 'react-native-elements';

export default function EdukasiGizi({navigation}) {
  
  const [language, setLanguage] = useState('id'); // 'id' for Indonesian, 'en' for English

  // Bilingual text content
  const text = {
    id: {
      headerTitle: "Edukasi Gizi dan Kesehatan",
      latestArticles: "Artikel Terbaru",
      subtitle: "Pelajari tips kesehatan dan gizi terkini",
      readMore: "Baca Selengkapnya",
      loadMore: "Lihat Artikel Lainnya",
      readDuration: "menit baca"
    },
    en: {
      headerTitle: "Nutrition & Health Education",
      latestArticles: "Latest Articles",
      subtitle: "Learn the latest health and nutrition tips",
      readMore: "Read More",
      loadMore: "View More Articles",
      readDuration: "min read"
    }
  };

  // Bilingual article data
  const artikelData = [
    {
      id: 1,
      judul: {
        id: "10 Makanan Super untuk Meningkatkan Imunitas Tubuh",
        en: "10 Superfoods to Boost Your Immune System"
      },
      thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
      ringkasan: {
        id: "Pelajari makanan-makanan yang dapat meningkatkan sistem imun tubuh secara alami",
        en: "Learn about foods that can naturally boost your body's immune system"
      },
      kategori: {
        id: "Imunitas",
        en: "Immunity"
      },
      tanggal: "July 24, 2025",
      durasi: 5,
      penulis: "Dr. Sarah Nutritionist",
      konten: {
        id: `Sistem imunitas tubuh adalah pertahanan alami kita terhadap berbagai penyakit dan infeksi. Untuk menjaga sistem imun tetap kuat, kita perlu mengonsumsi makanan yang kaya akan nutrisi penting.

Berikut adalah 10 makanan super yang dapat meningkatkan imunitas tubuh:

1. **Jeruk dan Buah Sitrus**
Kaya akan vitamin C yang berperan penting dalam meningkatkan produksi sel darah putih, komponen utama sistem imun.

2. **Brokoli**
Mengandung vitamin A, C, E, dan banyak antioksidan. Brokoli juga kaya akan serat yang baik untuk kesehatan pencernaan.

3. **Bawang Putih**
Mengandung senyawa allicin yang memiliki sifat antibakteri dan antiviral alami.

4. **Jahe**
Memiliki sifat anti-inflamasi dan dapat membantu mengurangi peradangan dalam tubuh.

5. **Bayam**
Kaya akan vitamin C, antioksidan, dan beta karoten yang dapat meningkatkan kemampuan sistem imun melawan infeksi.

6. **Yogurt**
Mengandung probiotik yang baik untuk kesehatan usus dan dapat merangsang sistem imun.

7. **Kacang Almond**
Sumber vitamin E yang excellent, vitamin yang larut dalam lemak dan penting untuk sistem imun yang sehat.

8. **Ikan Salmon**
Kaya akan omega-3 dan vitamin D yang berperan dalam mengatur respons imun tubuh.

9. **Teh Hijau**
Mengandung antioksidan flavonoid dan EGCG yang dapat meningkatkan fungsi imun.

10. **Ubi Jalar**
Kaya akan beta karoten yang diubah tubuh menjadi vitamin A, nutrisi penting untuk sistem imun.

Konsumsi makanan-makanan ini secara teratur dalam diet seimbang Anda untuk menjaga sistem imunitas tetap optimal.`,
        en: `The immune system is our body's natural defense against various diseases and infections. To keep our immune system strong, we need to consume foods rich in essential nutrients.

Here are 10 superfoods that can boost your immune system:

1. **Oranges and Citrus Fruits**
Rich in vitamin C, which plays a crucial role in increasing white blood cell production, the main component of the immune system.

2. **Broccoli**
Contains vitamins A, C, E, and many antioxidants. Broccoli is also rich in fiber, which is good for digestive health.

3. **Garlic**
Contains allicin compounds that have natural antibacterial and antiviral properties.

4. **Ginger**
Has anti-inflammatory properties and can help reduce inflammation in the body.

5. **Spinach**
Rich in vitamin C, antioxidants, and beta carotene that can enhance the immune system's ability to fight infections.

6. **Yogurt**
Contains probiotics that are good for gut health and can stimulate the immune system.

7. **Almonds**
An excellent source of vitamin E, a fat-soluble vitamin important for a healthy immune system.

8. **Salmon**
Rich in omega-3 and vitamin D, which play a role in regulating the body's immune response.

9. **Green Tea**
Contains flavonoid antioxidants and EGCG that can improve immune function.

10. **Sweet Potatoes**
Rich in beta carotene, which the body converts to vitamin A, an essential nutrient for the immune system.

Consume these foods regularly in your balanced diet to keep your immune system optimal.`
      }
    },
    {
      id: 2,
      judul: {
        id: "Panduan Lengkap Gizi Seimbang untuk Anak-Anak",
        en: "Complete Guide to Balanced Nutrition for Children"
      },
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
      ringkasan: {
        id: "Tips praktis memberikan nutrisi terbaik untuk tumbuh kembang optimal anak",
        en: "Practical tips for providing the best nutrition for optimal child development"
      },
      kategori: {
        id: "Anak",
        en: "Children"
      },
      tanggal: "July 23, 2025",
      durasi: 7,
      penulis: "Dr. Maya Pediatric",
      konten: {
        id: `Gizi seimbang sangat penting untuk mendukung tumbuh kembang anak yang optimal. Masa anak-anak adalah periode pertumbuhan yang pesat, sehingga kebutuhan nutrisi harus dipenuhi dengan baik.

**Prinsip Gizi Seimbang untuk Anak:**

**1. Karbohidrat Kompleks**
- Nasi, roti gandum, oatmeal
- Berikan 50-60% dari total kalori harian
- Pilih yang kaya serat untuk pencernaan yang sehat

**2. Protein Berkualitas**
- Daging, ikan, telur, tahu, tempe
- 15-20% dari total kalori harian
- Penting untuk pertumbuhan otot dan otak

**3. Lemak Sehat**
- Alpukat, kacang-kacangan, minyak zaitun
- 25-30% dari total kalori harian
- Penting untuk perkembangan otak

**4. Vitamin dan Mineral**
- Buah dan sayur beragam warna
- Minimal 5 porsi per hari
- Setiap warna memiliki nutrisi berbeda

**Tips Praktis:**

- **Sarapan Wajib**: Berikan sarapan bergizi setiap hari
- **Porsi Kecil Sering**: 3 kali makan utama + 2 snack sehat
- **Libatkan Anak**: Ajak anak memilih dan menyiapkan makanan
- **Batasi Gula**: Kurangi makanan dan minuman manis
- **Hidrasi Cukup**: 6-8 gelas air per hari

Ingat, pola makan yang dibentuk sejak kecil akan terbawa hingga dewasa.`,
        en: `Balanced nutrition is crucial for supporting optimal child development. Childhood is a period of rapid growth, so nutritional needs must be met properly.

**Principles of Balanced Nutrition for Children:**

**1. Complex Carbohydrates**
- Rice, whole grain bread, oatmeal
- Provide 50-60% of total daily calories
- Choose fiber-rich options for healthy digestion

**2. Quality Protein**
- Meat, fish, eggs, tofu, tempeh
- 15-20% of total daily calories
- Important for muscle and brain growth

**3. Healthy Fats**
- Avocado, nuts, olive oil
- 25-30% of total daily calories
- Important for brain development

**4. Vitamins and Minerals**
- Variety of colorful fruits and vegetables
- Minimum 5 servings per day
- Each color has different nutrients

**Practical Tips:**

- **Mandatory Breakfast**: Provide nutritious breakfast daily
- **Small Frequent Portions**: 3 main meals + 2 healthy snacks
- **Involve Children**: Let children choose and prepare food
- **Limit Sugar**: Reduce sweet foods and drinks
- **Adequate Hydration**: 6-8 glasses of water per day

Remember, eating patterns formed from childhood will carry into adulthood.`
      }
    },
    {
      id: 3,
      judul: {
        id: "Manfaat Luar Biasa Air Putih untuk Kesehatan Tubuh",
        en: "Amazing Benefits of Water for Body Health"
      },
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      ringkasan: {
        id: "Mengapa air putih adalah minuman terbaik dan bagaimana memenuhi kebutuhan hidrasi harian",
        en: "Why water is the best drink and how to meet daily hydration needs"
      },
      kategori: {
        id: "Hidrasi",
        en: "Hydration"
      },
      tanggal: "July 22, 2025",
      durasi: 4,
      penulis: "Dr. Alex Hydration",
      konten: {
        id: `Air adalah komponen terbesar dalam tubuh manusia, mencapai 60-70% dari total berat badan. Tanpa air, tubuh tidak dapat berfungsi dengan optimal.

**Manfaat Air Putih untuk Kesehatan:**

**1. Mengatur Suhu Tubuh**
Air membantu mengatur suhu tubuh melalui keringat dan pernapasan.

**2. Melancarkan Pencernaan**
Air membantu memecah makanan dan menyerap nutrisi.

**3. Membersihkan Racun**
Ginjal membutuhkan air untuk menyaring limbah dari darah.

**Kebutuhan Air Harian:**
- Dewasa: 8-10 gelas (2-2.5 liter) per hari
- Anak-anak: 6-8 gelas (1.5-2 liter) per hari

Jangan tunggu sampai haus untuk minum air.`,
        en: `Water is the largest component in the human body, reaching 60-70% of total body weight. Without water, the body cannot function optimally.

**Benefits of Water for Health:**

**1. Regulates Body Temperature**
Water helps regulate body temperature through sweat and breathing.

**2. Aids Digestion**
Water helps break down food and absorb nutrients.

**3. Cleanses Toxins**
Kidneys need water to filter waste from blood.

**Daily Water Requirements:**
- Adults: 8-10 glasses (2-2.5 liters) per day
- Children: 6-8 glasses (1.5-2 liters) per day

Don't wait until you're thirsty to drink water.`
      }
    },
    {
      id: 4,
      judul: {
        id: "Diet Mediterania: Pola Makan Sehat untuk Jantung",
        en: "Mediterranean Diet: Healthy Eating Pattern for Heart"
      },
      thumbnail: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop",
      ringkasan: {
        id: "Kenali pola makan tradisional yang terbukti menyehatkan jantung dan mencegah penyakit kronis",
        en: "Learn about traditional eating patterns proven to improve heart health and prevent chronic diseases"
      },
      kategori: {
        id: "Jantung",
        en: "Heart"
      },
      tanggal: "July 21, 2025",
      durasi: 6,
      penulis: "Dr. Maria Cardiologist",
      konten: {
        id: `Diet Mediterania adalah pola makan yang terinspirasi dari kebiasaan makan tradisional negara-negara di sekitar Laut Mediterania.

**Prinsip Diet Mediterania:**

**Makanan Utama:**
- **Minyak Zaitun**: Sumber lemak sehat utama
- **Ikan dan Seafood**: 2-3 kali per minggu
- **Buah dan Sayur**: Beragam warna, segar dan musiman

**Manfaat untuk Kesehatan Jantung:**
- Menurunkan kolesterol jahat (LDL)
- Mengurangi peradangan
- Mengatur tekanan darah

Diet Mediterania dapat mengurangi risiko penyakit jantung hingga 30%.`,
        en: `The Mediterranean Diet is an eating pattern inspired by the traditional eating habits of countries around the Mediterranean Sea.

**Mediterranean Diet Principles:**

**Main Foods:**
- **Olive Oil**: Primary healthy fat source
- **Fish and Seafood**: 2-3 times per week
- **Fruits and Vegetables**: Various colors, fresh and seasonal

**Benefits for Heart Health:**
- Lowers bad cholesterol (LDL)
- Reduces inflammation
- Regulates blood pressure

The Mediterranean Diet can reduce heart disease risk by up to 30%.`
      }
    },
    {
      id: 5,
      judul: {
        id: "Superfood Lokal Indonesia yang Kaya Nutrisi",
        en: "Nutrient-Rich Indonesian Local Superfoods"
      },
      thumbnail: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=250&fit=crop",
      ringkasan: {
        id: "Temukan makanan super dari Indonesia yang tidak kalah bergizi dari superfood import",
        en: "Discover Indonesian superfoods that are as nutritious as imported superfoods"
      },
      kategori: {
        id: "Lokal",
        en: "Local"
      },
      tanggal: "July 20, 2025",
      durasi: 5,
      penulis: "Dr. Sari Nutritionist",
      konten: {
        id: `Indonesia kaya akan bahan makanan alami yang memiliki nilai gizi tinggi. Kita tidak perlu bergantung pada superfood import yang mahal.

**Superfood Lokal Indonesia:**

**1. Tempe**
- Protein lengkap dengan 9 asam amino esensial
- Probiotik alami untuk kesehatan pencernaan
- Lebih murah dan mudah didapat

**2. Daun Kelor (Moringa)**
- 7x vitamin C lebih banyak dari jeruk
- 4x kalsium lebih banyak dari susu

**Keunggulan Superfood Lokal:**
- Harga terjangkau
- Mudah didapat
- Mendukung ekonomi lokal

Mari bangga dengan superfood lokal Indonesia!`,
        en: `Indonesia is rich in natural food ingredients with high nutritional value. We don't need to rely on expensive imported superfoods.

**Indonesian Local Superfoods:**

**1. Tempeh**
- Complete protein with 9 essential amino acids
- Natural probiotics for digestive health
- Cheaper and easily available

**2. Moringa Leaves**
- 7x more vitamin C than oranges
- 4x more calcium than milk

**Advantages of Local Superfoods:**
- Affordable prices
- Easy to find
- Supports local economy

Let's be proud of Indonesian local superfoods!`
      }
    }
  ];

  const navigateToDetail = (artikel) => {
    navigation.navigate('ArtikelDetail', { artikel, language });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
      <MyHeader title={text[language].headerTitle}/>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          padding: 16
        }}>
          {/* Language Toggle & Header Section */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: 18,
                color: colors.black,
                marginBottom: 5
              }}>{text[language].latestArticles}</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: 14,
                color: colors.secondary || '#7f8c8d'
              }}>{text[language].subtitle}</Text>
            </View>
            
            {/* Language Toggle Button */}
            <TouchableWithoutFeedback onPress={toggleLanguage}>
              <View style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 12,
                  color: colors.white,
                  marginRight: 4
                }}>{language === 'id' ? 'ID' : 'EN'}</Text>
                <Icon 
                  name="language" 
                  type="material" 
                  size={14} 
                  color={colors.white}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Articles Grid */}
          {artikelData.map((artikel, index) => (
            <TouchableWithoutFeedback 
              key={artikel.id} 
              onPress={() => navigateToDetail(artikel)}
            >
              <View style={{
                backgroundColor: colors.white,
                borderRadius: 12,
                marginBottom: 16,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                overflow: 'hidden'
              }}>
                {/* Thumbnail */}
                <View style={{
                  height: 180,
                  backgroundColor: colors.light || '#f8f9fa'
                }}>
                  <Image 
                    source={{ uri: artikel.thumbnail }}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover'
                    }}
                    onError={() => {
                      console.log('Image failed to load');
                    }}
                  />
                  
                  {/* Category Badge */}
                  <View style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    backgroundColor: colors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 12
                  }}>
                    <Text style={{
                      fontFamily: fonts.primary[500],
                      fontSize: 11,
                      color: colors.white
                    }}>{artikel.kategori[language]}</Text>
                  </View>
                </View>

                {/* Content */}
                <View style={{
                  padding: 16
                }}>
                  {/* Title */}
                  <Text style={{
                    fontFamily: fonts.primary[600],
                    fontSize: 16,
                    color: colors.black,
                    lineHeight: 22,
                    marginBottom: 8
                  }} numberOfLines={2}>
                    {artikel.judul[language]}
                  </Text>

                  {/* Summary */}
                  <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: 13,
                    color: colors.secondary || '#7f8c8d',
                    lineHeight: 18,
                    marginBottom: 12
                  }} numberOfLines={2}>
                    {artikel.ringkasan[language]}
                  </Text>

                  {/* Meta Info */}
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        width: 4,
                        height: 4,
                        backgroundColor: colors.primary,
                        borderRadius: 2,
                        marginRight: 6
                      }} />
                      <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: 11,
                        color: colors.secondary || '#7f8c8d'
                      }}>{artikel.tanggal}</Text>
                    </View>
                    
                    <Text style={{
                      fontFamily: fonts.primary[400],
                      fontSize: 11,
                      color: colors.secondary || '#7f8c8d'
                    }}>{artikel.durasi} {text[language].readDuration}</Text>
                  </View>

                  {/* Read More Button */}
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Text style={{
                      fontFamily: fonts.primary[500],
                      fontSize: 12,
                      color: colors.primary
                    }}>{text[language].readMore}</Text>
                    
                    <View style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                     <Icon size={10} color={colors.white} name='arrow-forward-outline' type='ionicon'/>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}

          {/* Load More Button */}
          <TouchableWithoutFeedback onPress={() => console.log('Load more articles')}>
            <View style={{
              padding: 12,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 8,
              marginTop: 10,
              marginBottom: 20
            }}>
              <Text style={{
                fontFamily: fonts.primary[500],
                color: colors.primary,
                textAlign: 'center',
                fontSize: 14
              }}>{text[language].loadMore}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  )
}