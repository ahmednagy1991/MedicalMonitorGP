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
import AsyncStorage from '@react-native-async-storage/async-storage';

import GetLocation from 'react-native-get-location';

class SensorsScreen extends Component {
  state = {
    sensors: [],
    modalVisible: false,
    sensorsValues: '',
    latitude:0,
    longitude:0
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

        AsyncStorage.getItem('CRED', (err, result) => {
          if (result !== null) {
            var sen_obj = JSON.parse(this.state.sensorsValues);
            var ob = JSON.parse(result);
            fetch('http://95.111.240.80/ionia/api/DeviceOperations/ReadSensors',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  FK_PatientId: ob.id,
                  Latitude:this.state.latitude,
                  Longitude:this.state.longitude,
                  HR: sen_obj.HeartRate,
                  Temprature: sen_obj.Temprature,
                }),
              },
            )
              .then(response => response.json())
              .then(json => {})
              .catch(error => {});
          }
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
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        this.setState({latitude:location.latitude,longitude:location.longitude})
        alert(location.latitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });

    //   requestLocationPermission()
    //  //AsyncStorage.removeItem('CRED');
    //  this.watchID = navigator.geolocation.watchPosition((position) => {
    //     // Create the object to update this.state.mapRegion through the onRegionChange function
    //     let region = {
    //       latitude:       position.coords.latitude,
    //       longitude:      position.coords.longitude,
    //       latitudeDelta:  0.00922*1.5,
    //       longitudeDelta: 0.00421*1.5
    //     }
    //     this.onRegionChange(region, region.latitude, region.longitude);
    //   }, (error)=>console.log(error));
    this.getSensors();
  }
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });
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
