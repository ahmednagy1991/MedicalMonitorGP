import React, {Component} from 'react';
import {Alert, Button, TextInput, View, StyleSheet, Text} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const {username, password} = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[s.formGroup,{width: '100%'}]}>
        <Text style={[s.text, s.title]} for="username">username :</Text>
          <TextInput
            value={this.state.username}
            id="username"
            onChangeText={username => this.setState({username})}
            placeholder={'Username'}
            style={[s.formControl]}
          />
        </View>
       <View style={[s.formGroup,{width: '100%'}]}>
        <Text style={[s.text, s.title]} for="username">password :</Text>
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder={'Password'}
            secureTextEntry={true}
            style={[s.formControl]}
          />
        </View>
        <View style={[s.formGroup]}>
          <Button
            title={'Login'}
            style={[s.btnDanger]}
            onPress={this.onLogin.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
     margin:15
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
export default Login;
