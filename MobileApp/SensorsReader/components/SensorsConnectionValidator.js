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
import {AsyncStorage} from 'react-native';

class SensorsConnectionValidator extends Component {
  state = {
    modalVisible: true,
    errorModalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible, errorModalVisible: !visible});
  };

  setErrorModalVisible = visible => {
    this.setState({modalVisible: !visible, errorModalVisible: visible});
  };

  checkSensorConnection() {
    this.setState({modalVisible: true, errorModalVisible: false});
    fetch('http://192.168.1.40/ping')
      .then(response => response.json())
      .then(json => {
        AsyncStorage.getItem('CRED', (err, result) => {
          if (result !== null) {
            this.props.navigation.navigate('SensorsScreen');
          } else {
            this.props.navigation.navigate('Register');
          }
        });

        this.setState({modalVisible: false, errorModalVisible: false});
      })
      .catch(error => {
        this.setState({modalVisible: false, errorModalVisible: true});
      });
  }

  componentDidMount() {
    this.checkSensorConnection();
  }

  render() {
    const {modalVisible, errorModalVisible} = this.state;
    return (
      <View style={styles.centeredView}>
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
                Please wait while connecting to device
              </Text>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={errorModalVisible}
          onRequestClose={() => {
            setErrorModalVisible(!errorModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Can't find any devices connected on your WIFI network please
                check your device is connected and Retry
              </Text>
              <Button
                onPress={() => this.checkSensorConnection()}
                title="Retry"></Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default SensorsConnectionValidator;
