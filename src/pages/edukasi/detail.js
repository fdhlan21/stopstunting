import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Share } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { Icon } from 'react-native-elements';

export default function ArtikelDetail({navigation, route}) {
  const { artikel, language: initialLanguage = 'id' } = route.params;
  const [language, setLanguage] = useState(initialLanguage);

  // Bilingual text content
  const text = {
    id: {
      title: "Detail Artikel",
      summary: "Ringkasan Artikel",
      save: "Simpan",
      share: "Bagikan",
      relatedArticles: "Artikel Terkait",
      readArticle: "Baca Artikel →",
      backToList: "← Kembali ke Daftar Artikel",
      shareMessage: "Baca selengkapnya di aplikasi Gizi & Kesehatan",
      readDuration: "menit baca"
    },
    en: {
      title: "Article Details",
      summary: "Article Summary",
      save: "Save",
      share: "Share",
      relatedArticles: "Related Articles",
      readArticle: "Read Article →",
      backToList: "← Back to Article List",
      shareMessage: "Read more in Nutrition & Health app",
      readDuration: "min read"
    }
  };

  // Related articles data (bilingual)
  const relatedArticles = [
    {
      id: 'related-1',
      title: {
        id: "Tips Hidrasi yang Tepat untuk Olahraga",
        en: "Proper Hydration Tips for Exercise"
      },
      summary: {
        id: "Pelajari cara menjaga hidrasi saat berolahraga...",
        en: "Learn how to maintain hydration during exercise..."
      }
    },
    {
      id: 'related-2',
      title: {
        id: "Manfaat Olahraga Rutin untuk Kesehatan Mental",
        en: "Benefits of Regular Exercise for Mental Health"
      },
      summary: {
        id: "Olahraga tidak hanya baik untuk tubuh, tapi juga pikiran...",
        en: "Exercise is not only good for the body, but also the mind..."
      }
    }
  ];

  const handleShare = async () => {
    try {
      const shareTitle = typeof artikel.judul === 'object' ? artikel.judul[language] : artikel.judul;
      const shareSummary = typeof artikel.ringkasan === 'object' ? artikel.ringkasan[language] : artikel.ringkasan;
      
      const result = await Share.share({
        message: `${shareTitle}\n\n${shareSummary}\n\n${text[language].shareMessage}`,
        title: shareTitle,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleBookmark = () => {
    // Logic untuk bookmark artikel
    const articleId = artikel.id;
    console.log('Bookmark artikel:', articleId);
    // TODO: Tambahkan toast notification atau state management
    // Bisa menggunakan AsyncStorage untuk menyimpan bookmark
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  // Helper function to get text in current language
  const getText = (textObj) => {
    if (typeof textObj === 'object' && textObj !== null && !Array.isArray(textObj)) {
      return textObj[language] || textObj.id || textObj.en || '';
    }
    return String(textObj || '');
  };

  return (
    <View style={{
        flex: 1,
        backgroundColor: colors.white
    }}>
      <MyHeader 
        title={text[language].title} 
        onBack={() => navigation.goBack()} 
      />
      
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
          
          {/* Category Badge and Language Toggle */}
          <View style={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16
            }}>
              <Text style={{
                fontFamily: fonts.primary[500],
                fontSize: 12,
                color: colors.white
              }}>{getText(artikel.kategori)}</Text>
            </View>
            
            {/* Language Toggle */}
            <TouchableWithoutFeedback onPress={toggleLanguage}>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 12,
                  color: colors.primary,
                  marginRight: 4
                }}>{language === 'id' ? 'ID' : 'EN'}</Text>
                <Icon 
                  name="language" 
                  type="material" 
                  size={14} 
                  color={colors.primary}
                />
              </View>
            </TouchableWithoutFeedback>
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
            {getText(artikel.judul)}
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
                {artikel.penulis ? artikel.penulis.charAt(0) : 'A'}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: fonts.primary[600],
                fontSize: 14,
                color: colors.black,
                marginBottom: 2
              }}>
                {artikel.penulis || 'Anonymous'}
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
                  {artikel.tanggal || 'Date not available'}
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
                  {typeof artikel.durasi === 'number' ? artikel.durasi : (artikel.durasi || '5')} {text[language].readDuration}
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
            }}>{text[language].summary}</Text>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 14,
              color: colors.secondary || '#7f8c8d',
              lineHeight: 20
            }}>
              {getText(artikel.ringkasan)}
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
              {getText(artikel.konten)}
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
                <Icon 
                  name="bookmark-outline" 
                  type="ionicon" 
                  size={16} 
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 14,
                  color: colors.primary
                }}>{text[language].save}</Text>
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
                <Icon 
                  name="share-outline" 
                  type="ionicon" 
                  size={16} 
                  color={colors.white}
                  style={{ marginRight: 8 }}
                />
                <Text style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 14,
                  color: colors.white
                }}>{text[language].share}</Text>
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
            }}>{text[language].relatedArticles}</Text>

            {/* Related Article Cards */}
            {relatedArticles.map((relatedArticle, index) => (
              <TouchableWithoutFeedback 
                key={relatedArticle.id}
                onPress={() => console.log('Navigate to related article:', relatedArticle.id)}
              >
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
                  }}>{getText(relatedArticle.title)}</Text>
                  <Text style={{
                    fontFamily: fonts.primary[400],
                    fontSize: 12,
                    color: colors.secondary || '#7f8c8d',
                    marginBottom: 8
                  }}>{getText(relatedArticle.summary)}</Text>
                  <Text style={{
                    fontFamily: fonts.primary[500],
                    fontSize: 12,
                    color: colors.primary
                  }}>{text[language].readArticle}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>

          {/* Back to Articles Button */}
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{
              backgroundColor: colors.secondary || '#95a5a6',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              marginTop: 16,
              marginBottom: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon 
                name="arrow-back-outline" 
                type="ionicon" 
                size={16} 
                color={colors.white}
                style={{ marginRight: 8 }}
              />
              <Text style={{
                fontFamily: fonts.primary[500],
                fontSize: 14,
                color: colors.white,
                textAlign: 'center'
              }}>{text[language].backToList}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  )
}