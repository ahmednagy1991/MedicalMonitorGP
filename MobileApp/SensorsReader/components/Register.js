import React, {Component} from 'react';
import {Alert, Button, TextInput, View, StyleSheet, Text} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {AsyncStorage} from 'react-native';
import {withNavigation} from 'react-navigation';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      username: '',
      email: '',
      mobile: '',
      age: '',
    };
  }

  componentDidMount() {
    //AsyncStorage.removeItem('CRED');
    AsyncStorage.getItem('CRED', (err, result) => {
      if (result !== null) {
         this.props.navigation.navigate('SensorsScreen');
      }
    });
  }

  onLogin() {
    const {id, username, email, mobile, age} = this.state;

    AsyncStorage.setItem('CRED', JSON.stringify(this.state), () => {
      this.props.navigation.navigate('SensorsScreen');
    });
  
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[s.formGroup, {width: '100%'}]}>
          <Text style={[s.text, s.title]} for="username">
            Username :
          </Text>
          <TextInput
            value={this.state.username}
            id="username"
            onChangeText={username => this.setState({username})}
            placeholder={'Username'}
            style={[s.formControl]}
          />
        </View>

        <View style={[s.formGroup, {width: '100%'}]}>
          <Text style={[s.text, s.title]} for="username">
            Age :
          </Text>
          <TextInput
            value={this.state.age}
            onChangeText={age => this.setState({age})}
            placeholder={'age'}
            keyboardType="numeric"
            style={[s.formControl]}
          />
        </View>

        <View style={[s.formGroup, {width: '100%'}]}>
          <Text style={[s.text, s.title]} for="username">
            Email :
          </Text>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder={'email'}
            style={[s.formControl]}
          />
        </View>

        <View style={[s.formGroup, {width: '100%'}]}>
          <Text style={[s.text, s.title]} for="username">
            Mobile :
          </Text>
          <TextInput
            value={this.state.mobile}
            onChangeText={mobile => this.setState({mobile})}
            placeholder={'mobile'}
            style={[s.formControl]}
          />
        </View>

        <View style={[s.formGroup]}>
          <Button
            title={'Register'}
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
    margin: 15,
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
export default Register;
