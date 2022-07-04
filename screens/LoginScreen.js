import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import { Button, CheckBox, Icon, Input } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import { baseUrl } from '../shared/baseUrl'
import logo from '../assets/images/logo.png'

const LoginTab = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleLogin = () => {
    console.log('username', username)
    console.log('password', password)
    console.log('remember', remember)
    if (remember) {
      SecureStore.setItemAsync('userinfo', JSON.stringify({ username, password })).catch((error) =>
        console.log('Could not save user info', error)
      )
    } else {
      SecureStore.deleteItemAsync('userinfo').catch((error) =>
        console.log('Could not delete user info', error)
      )
    }
  }

  useEffect(() => {
    SecureStore.getItemAsync('userinfo').then((userdata) => {
      const userinfo = JSON.parse(userdata)
      if (userinfo) {
        setUsername(userinfo.username)
        setPassword(userinfo.password)
        setRemember(true)
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Input
        placeholder='Username'
        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
        value={username}
        onChangeText={(text) => setUsername(text)}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'key' }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
        // secureTextEntry
      />
      <CheckBox
        title='Remember Me'
        center
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button
          title='Login'
          onPress={() => handleLogin()}
          color='#5637DD'
          icon={
            <Icon name='sign-in' type='font-awesome' color='#fff' iconStyle={{ marginRight: 10 }} />
          }
          buttonStyle={{ backgroundColor: '#5637DD' }}
        />
      </View>
      <View style={styles.formButton}>
        <Button
          title='Register'
          onPress={() => navigation.navigate('Register')}
          type='clear'
          icon={
            <Icon
              name='user-plus'
              type='font-awesome'
              color='blue'
              iconStyle={{ marginRight: 10 }}
            />
          }
          titleStyle={{ color: 'blue' }}
        />
      </View>
    </View>
  )
}

const RegisterTab = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [remember, setRemember] = useState(false)
  const [imageUrl, setImageUrl] = useState(baseUrl + 'images/logo.png')

  const handleRegister = () => {
    const userInfo = {
      username,
      password,
      firstName,
      lastName,
      email,
      remember,
    }
    console.log(JSON.stringify(userInfo))
    if (remember) {
      SecureStore.setItemAsync('userinfo', JSON.stringify({ username, password })).catch((error) =>
        console.log('Could not save user info', error)
      )
    } else {
      SecureStore.deleteItemAsync('userinfo').catch((error) =>
        console.log('Could not delete user info', error)
      )
    }
  }

  const getImageFromCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

    if (cameraPermission.status === 'granted') {
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      })
      if (!capturedImage.cancelled) {
        console.log(capturedImage)
        setImageUrl(capturedImage.uri)
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} loadingIndicatorSource={logo} style={styles.image} />
          <Button title='Camera' onPress={getImageFromCamera} />
        </View>
        <Input
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={username}
          onChangeText={(text) => setUsername(text)}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
          // secureTextEntry
        />
        <Input
          placeholder='First Name'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder='Last Name'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={remember}
          onPress={() => setRemember(!remember)}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            title='Register'
            onPress={() => handleRegister()}
            color='#5637DD'
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'
                color='#fff'
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{ backgroundColor: '#5637DD' }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const Tab = createBottomTabNavigator()

const LoginScreen = () => {
  const tabBarOptions = {
    activeBackgroundColor: '#5637DD',
    inactiveBackgroundColor: '#CEC8FF',
    activeTintColor: '#fff',
    inactiveTintColor: '#808080',
    labelStyle: { fontSize: 16 },
  }

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name='Login'
        component={LoginTab}
        options={{
          tabBarIcon: (props) => {
            return <Icon name='sign-in' type='font-awesome' color={props.color} />
          },
        }}
      />
      <Tab.Screen
        name='Register'
        component={RegisterTab}
        options={{
          tabBarIcon: (props) => {
            return <Icon name='user-plus' type='font-awesome' color={props.color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10,
  },
  formInput: {
    marginRight: 10,
  },
  formInput: {
    padding: 8,
    height: 60,
  },
  formCheckbox: {
    margin: 8,
    backgroundColor: null,
  },
  formButton: {
    margin: 20,
    marginRight: 40,
    marginLeft: 40,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
})

export default LoginScreen
