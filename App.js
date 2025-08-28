import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let URL = 'http://192.168.100.164:3000/api';
    setLoading(true);
    try {
      const response = await fetch(`${URL}/user`);
      if (!response.ok) {
        throw new Error(`Erro de servidor: ${response.status}`);
      }
      const result = await response.json();
      setData(result); 
    } catch (error) {
      console.log(error)
      Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <Text>projeto tcc</Text>
      <View>
        <Text>Buscar dados</Text>
        {
          data && data.map(item => {
            return <Text>{item.username}</Text>
          })}

          { loading? (
            <ActivityIndicator />
          ) : ( 
            <Button title='Buscar Dados' onPress={fetchData}/>
          )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
