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
      age: 0,
    };
  }

  componentDidMount() {
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('CRED');
        if (value !== null) {
          // We have data!!
          Alert(value);
          this.props.navigation.navigate('SensorsScreen', {name: 'Jane'});
        }
      } catch (error) {
        // Error retrieving data
      }
    };
  }

  onLogin() {
    const {id, username, email, mobile, age} = this.state;
    _storeData = async () => {
      try {
        await AsyncStorage.setItem(
          'CRED',
          'id:' +
            id +
            'username:' +
            username +
            'email:' +
            email +
            'mobile:' +
            mobile +
            'age:' +
            age,
        );
      } catch (error) {
        // Error saving data
      }
    };
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[s.formGroup, {width: '100%'}]}>
          <Text style={[s.text, s.title]} for="username">
            username :
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
            age :
          </Text>
          <TextInput
            value={this.state.age}
            onChangeText={age => this.setState({age})}
            placeholder={'age'}
            keyboardType='numeric'
            style={[s.formControl]}
          />
        </View>

        <View style={[s.formGroup, {width: '100%'}]}>
          <Text style={[s.text, s.title]} for="username">
            email :
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
            mobile :
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
