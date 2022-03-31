import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Icon, Button} from 'react-native-elements'

export default function RegisterForm(){
    return(
        <View style={styles.formContainer}>
             <Input
                 placeholder='Correo electrónico'
                 containerStyle={styles.inputForm}
             />
             <Input
                 placeholder='Contraseña'
                 containerStyle={styles.inputForm}
                 password={true}
                 secureTextEntry={true}
             />
             <Input
                 placeholder='Repetir contraseña'
                 containerStyle={styles.inputForm}
                 password={true}
                 secureTextEntry={true}
             />
             <Button
                 title='Únete'
                 containerStyle={styles.btnContainerRegister}
                 buttonStyle={styles.btnRegister}
             />
        </View>

    )

}
  
const styles = StyleSheet.create({
    formContainer:{
        marginTop: 30,
    },
    inputForm:{
        width: '100%',
        marginTop:20
    },
    btnContainerRegister:{
        marginTop: 20,
        width:'95%'
    },
    btnRegister:{
        backgroundColor:'#00a680'
    }

})