import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import CheckBox from 'react-native-check-box';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;
import {AsyncStorage} from 'react-native';
class SensorsScreen extends Component {
  state = {
    sensors: [],
    modalVisible: false,
    sensorsValues: '',
  };

  getSensors() {
    this.setState({modalVisible: true, errorModalVisible: false});
    fetch('http://192.168.1.40/getSensors')
      .then(response => response.json())
      .then(json => {
        this.setState({sensors: json, modalVisible: false, sensorsValues: ''});
      })
      .catch(error => {});
  }

  onStart() {
    this.setState({modalVisible: true});
    var body_obj = this.state.sensors
      .filter(st => st.checked === true)
      .map(function (item) {
        return item.value;
      });

    fetch('http://192.168.1.40/readSensors', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sensors: body_obj}),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          modalVisible: false,
          sensorsValues: JSON.stringify(json),
        });
        //call api here
        //this.props.navigation.navigate('Register', {name: 'Jane'});
        //this.setState({modalVisible: false, errorModalVisible: false});
      })
      .catch(error => {
        //Alert.alert('err');
        // this.setState({modalVisible: false, errorModalVisible: true});
      });
  }

  componentDidMount() {
    AsyncStorage.removeItem('CRED');
    this.getSensors();
  }

  render() {
    const {sensors, modalVisible, sensorsValues} = this.state;

    const onButtonPress = () => {
      const selectedCheckBoxes = sensors.find(cb => cb.checked === true);
    };

    const toggleCheckbox = (id, index) => {
      const checkboxData = [...sensors];
      checkboxData[index].checked = !checkboxData[index].checked;
      this.setState({sensors: checkboxData});
    };

    const renderSensors = sensors.map((sen, index) => {
      return (
        <React.Fragment>
          <View style={styles.checkboxContainer}>
            <CheckBox
              key={sen.value}
              value={sen.value}
              style={styles.checkbox}
              isChecked={sen.checked}
              onClick={() => {
                toggleCheckbox(sen.id, index);
              }}
            />
            <Text style={[s.text, s.title]}>{sen.label}</Text>
          </View>
        </React.Fragment>
      );
    });

    return (
      <View style={[styles.container]}>
        <Text style={styles.modalText}>{sensorsValues}</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" />
              <Text style={styles.modalText}></Text>
              <Text style={styles.modalText}>
                Please wait while reading sensor values
              </Text>
            </View>
          </View>
        </Modal>
        {renderSensors}
        <Button
          title={'Start'}
          style={[s.btnDanger]}
          onPress={this.onStart.bind(this)}
        />
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
export default SensorsScreen;
