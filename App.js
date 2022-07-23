/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import publicIP from 'react-native-public-ip';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// component
import StyledButton from './src/component/StyledButton.js';

const App = () => {
  const [ipAddr, setIpAddr] = useState('');
  const [ipInfo, setIpInfo] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setIpAddr('');
    getDeviceIp();
    setSearchHistory([]);
  };

  const getDeviceIp = () => {
    publicIP()
      .then(ip => {
        getIpInfo(ip);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const searchPublicIp = () => {
    setSearchHistory(prev => [...prev, ipAddr]);
    getIpInfo(ipAddr);
  };

  const getIpInfo = async ip_address => {
    let response = await fetch(`https://ipinfo.io/${ip_address}/geo`);
    let json = await response.json();
    setIpInfo(json);
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Welcome to react native Ip Info app</Text>
        <TextInput
          style={styles.input}
          onChangeText={setIpAddr}
          value={ipAddr}
        />
        <StyledButton
          onPress={searchPublicIp}
          title="Ip Info"
          buttonStyle={styles.buttonInfo}
          textStyle={styles.text}
        />
        <StyledButton
          onPress={init}
          title="Clear"
          buttonStyle={styles.buttonClear}
          textStyle={styles.text}
        />
        <View style={styles.info}>
          <Text>{ipInfo.ip}</Text>
          <Text>{ipInfo.hostname}</Text>
          <Text>{ipInfo.city} </Text>
          <Text>{ipInfo.region}</Text>
          <Text>{ipInfo.country}</Text>
          <Text>{ipInfo.loc}</Text>
          <Text>{ipInfo.org} </Text>
          <Text>{ipInfo.postal}</Text>
          <Text>{ipInfo.timezone} </Text>
          <Text>{ipInfo.readme}</Text>
        </View>
        {searchHistory.length > 0 && (
          <ScrollView style={styles.info}>
            <Text style={styles.title}>History</Text>
            {searchHistory.map((item, index) => {
              return (
                <Text key={index} onPress={() => getIpInfo(item)}>
                  {item}
                </Text>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonInfo: {
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  buttonClear: {
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  info: {
    marginLeft: 12,
    marginRight: 12,
  },
});

export default App;
