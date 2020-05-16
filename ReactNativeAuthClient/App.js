import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Page,
  Form,
  FormLabel,
  FormValue,
} from 'react-native';
import {authorize} from 'react-native-app-auth';
import {revoke} from 'react-native-app-auth';

const config = {
  // issuer: 'https://dev-326028.okta.com/oauth2/default',
  clientId: 'R2dpxQ3vPrtfgF72',
  redirectUrl: 'com.auth:/callback',
  scopes: ['user_info'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://gekko.peterlauhn.com:9081/auth/oauth/authorize',
    tokenEndpoint: 'https://gekko.peterlauhn.com:9081/auth/oauth/token',
    // revocationEndpoint: 'https://demo.identityserver.io/connect/revoke',
  },
  usePKCE: false,
  clientSecret: 'fDw7Mpkk5czHNuSRtmhGmAGL42CaxQB9',
};

class App extends React.Component {
  state = {
    accessToken: '',
    accessTokenExpirationDate: '',
  };

  handleAuthorize = async () => {
    try {
      console.log("start");
      const newAuthState = await authorize(config);
      console.log("end");
      console.log(newAuthState);

      this.setState({
        accessToken: newAuthState.accessToken,
        accessTokenExpirationDate: newAuthState.accessTokenExpirationDate,
        refreshToken: newAuthState.refreshToken,
      });
    } catch (error) {
      // console.log(error);
      Alert.alert('Failed to log in', error.message + error.code);
    }
  };

  handleLogout = async () => {
    try {
      console.log(this.state.refreshToken);
      const result = await revoke(config, {
        tokenToRevoke: this.state.accessToken,
        sendClientId: true,
      });
      console.log(result);

      this.setState({
        accessToken: '',
        accessTokenExpirationDate: '',
      });
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };

  render() {
    return (
      <View>
        <Button
          onPress={this.handleAuthorize}
          title="Auth"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.handleLogout}
          title="Logout"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <View>
          <Text>accessToken</Text>
          <Text>{this.state.accessToken}</Text>
          <Text>accessTokenExpirationDate</Text>
          <Text>{this.state.accessTokenExpirationDate}</Text>
        </View>
      </View>
    );
  }
}

export default App;
