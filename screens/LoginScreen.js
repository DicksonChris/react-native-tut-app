import {useEffect, useState} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import { CheckBox, Input } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'

const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleLogin = () => {
    console.log('username', username)
    console.log('password', password)
    console.log('remember', remember)
    if (remember) {
      SecureStore.setItemAsync('userinfo', JSON.stringify({username, password})).catch(error => console.log('Could not save user info', error))
    } else {
      SecureStore.deleteItemAsync('userinfo').catch(error => console.log('Could not delete user info', error))
    }
  }

  useEffect(() => {
    SecureStore.getItemAsync('userinfo').then(userdata => {
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
        onChangeText={text => setUsername(text)}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'key' }}
        value={password}
        onChangeText={text => setPassword(text)}
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
          onPress={()=>handleLogin()}
          color='#5637DD'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
  },
  formInput: {
    marginRight: 10
  },
  formInput: {
    padding: 10
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null
  },
  formButton: {
    margin: 40
  }
})

export default LoginScreen