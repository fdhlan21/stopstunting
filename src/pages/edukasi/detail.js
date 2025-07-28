import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Share } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'

export default function ArtikelDetail({navigation, route}) {
  const { artikel } = route.params;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${artikel.judul}\n\n${artikel.ringkasan}\n\nBaca selengkapnya di aplikasi Gizi & Kesehatan`,
        title: artikel.judul,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleBookmark = () => {
    // Logic untuk bookmark artikel
    console.log('Bookmark artikel:', artikel.id);
    // Tambahkan toast notification
  };

  return (
    <View style={{
        flex: 1,
        backgroundColor: colors.white
    }}>
      <MyHeader title="Detail Artikel" onBack={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={{
          height: 250,
          backgroundColor: colors.light || '#f8f9fa'
        }}>
          <Image 
            source={{ uri: artikel.thumbnail }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover'
            }}
          />
          
          {/* Overlay Gradient */}
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            backgroundColor: 'rgba(0,0,0,0.3)'
          }} />
          
          {/* Category Badge */}
          <View style={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16
          }}>
            <Text style={{
              fontFamily: fonts.primary[500],
              fontSize: 12,
              color: colors.white
            }}>{artikel.kategori}</Text>
          </View>
        </View>

        {/* Content Container */}
        <View style={{
          padding: 20
        }}>
          {/* Article Title */}
          <Text style={{
            fontFamily: fonts.primary[700],
            fontSize: 24,
            color: colors.black,
            lineHeight: 32,
            marginBottom: 16
          }}>
            {artikel.judul}
          </Text>

          {/* Article Meta */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.light || '#f1f2f6'
          }}>
            {/* Author Avatar */}
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: 16,
                color: colors.white
              }}>
                {artikel.penulis.charAt(0)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: 14,
                color: colors.black,
                marginBottom: 2
              }}>
                {artikel.penulis}
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 12,
                  color: colors.secondary || '#7f8c8d'
                }}>
                  {artikel.tanggal}
                </Text>
                <View style={{
                  width: 4,
                  height: 4,
                  backgroundColor: colors.secondary || '#7f8c8d',
                  borderRadius: 2,
                  marginHorizontal: 8
                }} />
                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 12,
                  color: colors.secondary || '#7f8c8d'
                }}>
                  {artikel.durasi}
                </Text>
              </View>
            </View>
          </View>

          {/* Article Summary */}
          <View style={{
            backgroundColor: colors.light || '#f8f9fa',
            padding: 16,
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: colors.primary,
            marginBottom: 24
          }}>
            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 14,
              color: colors.black,
              marginBottom: 8
            }}>Ringkasan Artikel</Text>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 14,
              color: colors.secondary || '#7f8c8d',
              lineHeight: 20
            }}>
              {artikel.ringkasan}
            </Text>
          </View>

          {/* Article Content */}
          <View style={{
            marginBottom: 24
          }}>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 16,
              color: colors.black,
              lineHeight: 24,
              textAlign: 'justify'
            }}>
              {artikel.konten}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={{
            flexDirection: 'row',
            marginBottom: 24,
            justifyContent: 'space-between'
          }}>
            {/* Bookmark Button */}
            <TouchableWithoutFeedback onPress={handleBookmark}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginRight: 8
              }}>
                <Text style={{
                  fontSize: 16,
                  marginRight: 8
                }}>🔖</Text>
                <Text style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 14,
                  color: colors.primary
                }}>Simpan</Text>
              </View>
            </TouchableWithoutFeedback>

            {/* Share Button */}
            <TouchableWithoutFeedback onPress={handleShare}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginLeft: 8
              }}>
                <Text style={{
                  fontSize: 16,
                  marginRight: 8
                }}>📤</Text>
                <Text style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 14,
                  color: colors.white
                }}>Bagikan</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Related Articles Section */}
          <View style={{
            borderTopWidth: 1,
            borderTopColor: colors.light || '#f1f2f6',
            paddingTop: 24
          }}>
            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 18,
              color: colors.black,
              marginBottom: 16
            }}>Artikel Terkait</Text>

            {/* Related Article Cards */}
            <View style={{
              backgroundColor: colors.light || '#f8f9fa',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12
            }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: 14,
                color: colors.black,
                marginBottom: 8
              }}>Tips Hidrasi yang Tepat untuk Olahraga</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: 12,
                color: colors.secondary || '#7f8c8d',
                marginBottom: 8
              }}>Pelajari cara menjaga hidrasi saat berolahraga...</Text>
              <Text style={{
                fontFamily: fonts.primary[500],
                fontSize: 12,
                color: colors.primary
              }}>Baca Artikel →</Text>
            </View>

            <View style={{
              backgroundColor: colors.light || '#f8f9fa',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12
            }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: 14,
                color: colors.black,
                marginBottom: 8
              }}>Manfaat Olahraga Rutin untuk Kesehatan Mental</Text>
              <Text style={{
                fontFamily: fonts.primary[400],
                fontSize: 12,
                color: colors.secondary || '#7f8c8d',
                marginBottom: 8
              }}>Olahraga tidak hanya baik untuk tubuh, tapi juga pikiran...</Text>
              <Text style={{
                fontFamily: fonts.primary[500],
                fontSize: 12,
                color: colors.primary
              }}>Baca Artikel →</Text>
            </View>
          </View>

          {/* Back to Articles Button */}
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{
              backgroundColor: colors.secondary || '#95a5a6',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              marginTop: 16,
              marginBottom: 40
            }}>
              <Text style={{
                fontFamily: fonts.primary[500],
                fontSize: 14,
                color: colors.white,
                textAlign: 'center'
              }}>← Kembali ke Daftar Artikel</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  )
}