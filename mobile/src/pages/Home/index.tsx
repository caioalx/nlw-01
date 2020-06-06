import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Image, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface SelectItem {
  label: string;
  value: string
}

const Home = () => {
  const [ufs, setUFs] = useState<SelectItem[]>([]);
  const [cities, setCities] = useState<SelectItem[]>([]);  

  const [uf, setSelectedUf] = useState('0');
  const [city, seSelectedCity] = useState('0');  

  const navigation = useNavigation();

  useEffect(()=> {
      axios
        .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then(response => {
              const ufInitials = response.data.map(uf => {
                return {
                  label: uf.sigla, 
                  value: uf.sigla
                }
              });
              setUFs(ufInitials)
          })
  }, []);

  useEffect(() => {
      if(uf === '0') {
          return;
      }

      axios
          .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
          .then(response => {
              const cityNames = response.data.map(city => {
                return {
                  label: city.nome,
                  value: city.nome
                }
              });
              setCities(cityNames);
          })        

  }, [uf]);  

  function handleNavigateToPoint() {
    navigation.navigate('Point', {
      uf, 
      city
    });
  }

  return (
    <KeyboardAvoidingView style={{flex:1}}  behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}   
      >
          <View style={styles.main}>
            <Image source={require('../../assets/logo.png')} />
            <View>
              <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
              <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
            </View>
          </View>

          <View style={styles.footer}>

            <RNPickerSelect 
              style={pickerSelectStyles}
              Icon={() => { return <Icon name="chevron-down" color="gray" size={24} />}}
              placeholder={{
                label: 'Selecione um estado',
                value: null
              }}
              items={ufs} 
              onValueChange={(uf) => setSelectedUf(uf)}/>

            <RNPickerSelect 
              style={pickerSelectStyles}
              Icon={selectIcon}
              placeholder={{
                label: 'Selecione uma cidade',
                value: null
              }} 
              items={cities} 
              onValueChange={selectIcon}/>              

            <RectButton style={styles.button} onPress={handleNavigateToPoint}>
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name="arrow-right" color="#FFF" size={24} />
                </Text>
              </View>
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </RectButton>
          </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
};

const selectIcon = () => {
  return <Icon name="chevron-down" color="gray" size={24} />;
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      paddingRight: 30
    },
    iconContainer: {
      top: 20,
      right: 12,
    } 
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;