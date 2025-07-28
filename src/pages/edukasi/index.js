import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { Icon } from 'react-native-elements';

export default function EdukasiGizi({navigation}) {
  
  // Data dummy artikel
  const artikelData = [
    {
      id: 1,
      judul: "10 Makanan Super untuk Meningkatkan Imunitas Tubuh",
      thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
      ringkasan: "Pelajari makanan-makanan yang dapat meningkatkan sistem imun tubuh secara alami",
      kategori: "Imunitas",
      tanggal: "24 Juli 2025",
      durasi: "5 menit baca",
      penulis: "Dr. Sarah Nutritionist",
      konten: `Sistem imunitas tubuh adalah pertahanan alami kita terhadap berbagai penyakit dan infeksi. Untuk menjaga sistem imun tetap kuat, kita perlu mengonsumsi makanan yang kaya akan nutrisi penting.

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

Konsumsi makanan-makanan ini secara teratur dalam diet seimbang Anda untuk menjaga sistem imunitas tetap optimal.`
    },
    {
      id: 2,
      judul: "Panduan Lengkap Gizi Seimbang untuk Anak-Anak",
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
      ringkasan: "Tips praktis memberikan nutrisi terbaik untuk tumbuh kembang optimal anak",
      kategori: "Anak",
      tanggal: "23 Juli 2025",
      durasi: "7 menit baca",
      penulis: "Dr. Maya Pediatric",
      konten: `Gizi seimbang sangat penting untuk mendukung tumbuh kembang anak yang optimal. Masa anak-anak adalah periode pertumbuhan yang pesat, sehingga kebutuhan nutrisi harus dipenuhi dengan baik.

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

**Contoh Menu Harian:**
- Sarapan: Oatmeal dengan buah dan susu
- Snack: Buah potong atau yogurt
- Makan siang: Nasi, ikan, sayur, buah
- Snack: Kacang rebus atau smoothie
- Makan malam: Sup ayam dengan sayuran

Ingat, pola makan yang dibentuk sejak kecil akan terbawa hingga dewasa. Jadilah contoh yang baik bagi anak dalam memilih makanan sehat.`
    },
    {
      id: 3,
      judul: "Manfaat Luar Biasa Air Putih untuk Kesehatan Tubuh",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      ringkasan: "Mengapa air putih adalah minuman terbaik dan bagaimana memenuhi kebutuhan hidrasi harian",
      kategori: "Hidrasi",
      tanggal: "22 Juli 2025",
      durasi: "4 menit baca",
      penulis: "Dr. Alex Hydration",
      konten: `Air adalah komponen terbesar dalam tubuh manusia, mencapai 60-70% dari total berat badan. Tanpa air, tubuh tidak dapat berfungsi dengan optimal.

**Manfaat Air Putih untuk Kesehatan:**

**1. Mengatur Suhu Tubuh**
Air membantu mengatur suhu tubuh melalui keringat dan pernapasan, menjaga tubuh tetap sejuk.

**2. Melancarkan Pencernaan**
Air membantu memecah makanan dan menyerap nutrisi, serta mencegah sembelit.

**3. Membersihkan Racun**
Ginjal membutuhkan air untuk menyaring limbah dari darah dan mengeluarkannya melalui urin.

**4. Melumasi Sendi**
Air adalah komponen utama cairan sendi, membantu pergerakan yang lancar dan mengurangi nyeri.

**5. Mengangkut Nutrisi**
Darah yang 90% terdiri dari air mengangkut oksigen dan nutrisi ke seluruh tubuh.

**6. Menjaga Kesehatan Kulit**
Hidrasi yang cukup membuat kulit lembap, elastis, dan tampak lebih muda.

**7. Meningkatkan Fungsi Otak**
Otak yang terhidrasi dengan baik dapat bekerja lebih fokus dan jernih.

**Kebutuhan Air Harian:**
- Dewasa: 8-10 gelas (2-2.5 liter) per hari
- Anak-anak: 6-8 gelas (1.5-2 liter) per hari
- Ibu hamil/menyusui: 10-12 gelas (2.5-3 liter) per hari

**Tips Meningkatkan Konsumsi Air:**

1. **Mulai Hari dengan Air**: Minum 1-2 gelas air saat bangun tidur
2. **Bawa Botol Air**: Selalu bawa botol air kemana pun pergi
3. **Set Reminder**: Gunakan alarm atau aplikasi pengingat minum air
4. **Tambah Rasa Alami**: Beri potongan lemon, mentimun, atau mint
5. **Minum Sebelum Makan**: Minum air 30 menit sebelum makan
6. **Perhatikan Warna Urin**: Urin kuning muda menandakan hidrasi yang baik

**Tanda-Tanda Dehidrasi:**
- Mulut kering
- Pusing atau sakit kepala
- Urin berwarna gelap
- Kelelahan
- Kulit kering

Jangan tunggu sampai haus untuk minum air. Jadikan minum air putih sebagai kebiasaan sehari-hari untuk kesehatan optimal.`
    },
    {
      id: 4,
      judul: "Diet Mediterania: Pola Makan Sehat untuk Jantung",
      thumbnail: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop",
      ringkasan: "Kenali pola makan tradisional yang terbukti menyehatkan jantung dan mencegah penyakit kronis",
      kategori: "Jantung",
      tanggal: "21 Juli 2025",
      durasi: "6 menit baca",
      penulis: "Dr. Maria Cardiologist",
      konten: `Diet Mediterania adalah pola makan yang terinspirasi dari kebiasaan makan tradisional negara-negara di sekitar Laut Mediterania seperti Yunani, Italia, dan Spanyol.

**Prinsip Diet Mediterania:**

**Makanan Utama:**
- **Minyak Zaitun**: Sumber lemak sehat utama
- **Ikan dan Seafood**: 2-3 kali per minggu
- **Kacang-kacangan**: Almond, walnut, pistasio
- **Buah dan Sayur**: Beragam warna, segar dan musiman
- **Whole Grains**: Gandum utuh, oat, quinoa
- **Yogurt dan Keju**: Dalam jumlah sedang

**Makanan yang Dibatasi:**
- Daging merah (maksimal 1-2 kali per minggu)
- Makanan olahan dan kemasan
- Gula tambahan dan pemanis buatan
- Mentega dan lemak jenuh

**Manfaat untuk Kesehatan Jantung:**

1. **Menurunkan Kolesterol Jahat (LDL)**
Lemak tak jenuh dari minyak zaitun dan kacang-kacangan membantu menurunkan kolesterol berbahaya.

2. **Mengurangi Peradangan**
Antioksidan dari buah, sayur, dan minyak zaitun mengurangi peradangan dalam pembuluh darah.

3. **Mengatur Tekanan Darah**
Potasium dari buah dan sayur membantu mengontrol tekanan darah.

4. **Meningkatkan Kolesterol Baik (HDL)**
Omega-3 dari ikan meningkatkan kolesterol baik yang melindungi jantung.

**Contoh Menu Harian:**

**Sarapan:**
- Greek yogurt dengan madu dan kacang walnut
- Buah beri segar
- Teh herbal

**Makan Siang:**
- Salad sayuran dengan minyak zaitun
- Ikan salmon panggang
- Roti gandum utuh
- Buah anggur

**Makan Malam:**
- Sup lentil dengan sayuran
- Hummus dengan sayur mentah
- Segelas wine merah (opsional)

**Snack:**
- Kacang almond panggang
- Buah zaitun
- Buah segar

**Tips Memulai Diet Mediterania:**

1. **Ganti Minyak**: Gunakan minyak zaitun untuk memasak
2. **Makan Ikan**: Minimal 2 kali seminggu
3. **Perbanyak Sayur**: Isi setengah piring dengan sayuran
4. **Pilih Whole Grains**: Ganti nasi putih dengan brown rice
5. **Snack Sehat**: Pilih kacang-kacangan daripada keripik

**Penelitian Ilmiah:**
Studi menunjukkan diet Mediterania dapat:
- Mengurangi risiko penyakit jantung hingga 30%
- Menurunkan risiko stroke
- Mencegah diabetes tipe 2
- Mengurangi risiko beberapa jenis kanker

Diet Mediterania bukan hanya pola makan, tetapi gaya hidup sehat yang menekankan pada makanan alami, aktivitas fisik, dan kebersamaan saat makan.`
    },
    {
      id: 5,
      judul: "Superfood Lokal Indonesia yang Kaya Nutrisi",
      thumbnail: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=250&fit=crop",
      ringkasan: "Temukan makanan super dari Indonesia yang tidak kalah bergizi dari superfood import",
      kategori: "Lokal",
      tanggal: "20 Juli 2025",
      durasi: "5 menit baca",
      penulis: "Dr. Sari Nutritionist",
      konten: `Indonesia kaya akan bahan makanan alami yang memiliki nilai gizi tinggi. Kita tidak perlu bergantung pada superfood import yang mahal, karena superfood lokal tidak kalah berkualitas.

**Superfood Lokal Indonesia:**

**1. Tempe**
- Protein lengkap dengan 9 asam amino esensial
- Probiotik alami untuk kesehatan pencernaan
- Isoflavon untuk kesehatan jantung
- Lebih murah dan mudah didapat

**2. Daun Kelor (Moringa)**
- 7x vitamin C lebih banyak dari jeruk
- 4x kalsium lebih banyak dari susu
- 4x vitamin A lebih banyak dari wortel
- 3x potasium lebih banyak dari pisang

**3. Ubi Ungu**
- Anthocyanin sebagai antioksidan kuat
- Beta karoten untuk kesehatan mata
- Serat tinggi untuk pencernaan
- Indeks glikemik rendah

**4. Kelapa Muda**
- Elektrolit alami untuk hidrasi
- Potasium untuk kesehatan jantung
- Asam laurat untuk imunitas
- Air kelapa sebagai isotonic drink alami

**5. Pisang**
- Potasium untuk otot dan jantung
- Vitamin B6 untuk metabolisme
- Triptofan untuk mood yang baik
- Serat untuk pencernaan

**6. Pepaya**
- Papain enzim untuk pencernaan
- Vitamin C untuk imunitas
- Lycopene untuk kesehatan kulit
- Antioksidan tinggi

**7. Kunyit**
- Curcumin anti-inflamasi
- Antioksidan kuat
- Antibakteri alami
- Detoksifikasi hati

**8. Bayam Merah**
- Zat besi tinggi untuk darah
- Folat untuk ibu hamil
- Betacyanin sebagai antioksidan
- Nitrat untuk performa otot

**9. Kacang Merah**
- Protein nabati berkualitas
- Serat tinggi
- Folat dan zat besi
- Indeks glikemik rendah

**10. Ikan Teri**
- Kalsium tinggi untuk tulang
- Omega-3 untuk otak
- Protein lengkap
- Harga terjangkau

**Cara Mengolah Superfood Lokal:**

**Tempe:**
- Tempe bacem dengan bumbu rempah
- Tempe orek dengan sayuran
- Burger tempe untuk anak-anak

**Daun Kelor:**
- Smoothie daun kelor dengan buah
- Sayur bening daun kelor
- Teh daun kelor kering

**Ubi Ungu:**
- Ubi kukus sebagai pengganti nasi
- Smoothie ubi ungu dengan susu
- Kolak ubi ungu sehat

**Keunggulan Superfood Lokal:**
- **Harga Terjangkau**: Lebih murah dari superfood import
- **Mudah Didapat**: Tersedia di pasar tradisional
- **Segar**: Tidak perlu pengawet untuk import
- **Sesuai Iklim**: Cocok dengan tubuh orang Indonesia
- **Mendukung Ekonomi Lokal**: Membantu petani Indonesia

**Tips Konsumsi:**
1. Variasi setiap hari untuk nutrisi lengkap
2. Kombinasikan dengan makanan pokok
3. Olah dengan cara sehat (kukus, rebus, panggang)
4. Konsumsi dalam keadaan segar
5. Jangan berlebihan, tetap seimbang

Mari bangga dengan superfood lokal Indonesia dan jadikan bagian dari menu harian kita untuk hidup yang lebih sehat dan berkelanjutan.`
    }
  ];

  const navigateToDetail = (artikel) => {
    navigation.navigate('ArtikelDetail', { artikel });
  };

  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
      <MyHeader title="Edukasi Gizi dan Kesehatan"/>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          padding: 16
        }}>
          {/* Header Section */}
          <View style={{
            marginBottom: 20
          }}>
            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 18,
              color: colors.black,
              marginBottom: 5
            }}>Artikel Terbaru</Text>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 14,
              color: colors.secondary || '#7f8c8d'
            }}>Pelajari tips kesehatan dan gizi terkini</Text>
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
                      // Fallback jika gambar gagal load
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
                    }}>{artikel.kategori}</Text>
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
                    {artikel.judul}
                  </Text>

                  {/* Summary */}
                  <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: 13,
                    color: colors.secondary || '#7f8c8d',
                    lineHeight: 18,
                    marginBottom: 12
                  }} numberOfLines={2}>
                    {artikel.ringkasan}
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
                    }}>{artikel.durasi}</Text>
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
                    }}>Baca Selengkapnya</Text>
                    
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
              }}>Lihat Artikel Lainnya</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  )
}