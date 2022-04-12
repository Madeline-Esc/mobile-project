import React, {useState} from "react"
import { StyleSheet, View } from 'react-native'
import {Input, Button, Icon} from 'react-native-elements'
import firebase from 'firebase'
import { validateEmail } from "../../utils/validation"



export default function ChangeDisplayEmailForm(props){
    const {email, setShowModal, toastRef, setReloadUserInfo} = props
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const reauthenticate = (password) =>{
        const user = firebase.auth().currentUser
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential((credentials))
    }
    
    const onSubmit= ()=>{
        setErrorEmail(null)
        setErrorPassword(null)
        
        if(!password){
            setErrorPassword('Ingresa tu contraseña actual')
        }else{
            reauthenticate(password).then(()=>{
            if(!newEmail){
                setErrorEmail('Este campo no puede estar vacío')
            }else if(newEmail === email){
                setErrorEmail('Debes ingresar un email diferente al actual')
            } else if(!validateEmail(newEmail)){
                   setErrorEmail('Debes ingresar un email válido')
            } else {
            setIsLoading(true)
            const update = newEmail
            firebase
            .auth()
            .currentUser.updateEmail(update)
            .then(()=>{
                console.log('Email actualizado con éxito')
                setIsLoading(false)
                setReloadUserInfo(true)
                setShowModal(false)
            })
            .catch(() =>{
                console.log('No se pudo actualizar el email')
                setIsLoading(false)
            })
        }
    }).catch((errorPassword)=>{
        setErrorPassword(errorPassword.message)
    })
    
}

}

        
    return(
         <View style={styles.view}>
             <Input  
             placeholder='Ingresa un nuevo correo'
             containerStyle={styles.input}
             rightIcon={{
                 type:'material-community',
                 name:'at',
                 color:'#c2c2c2'
             }}
             defaultValue={email}
             onChange={(e)=>setNewEmail(e.nativeEvent.text)}
             errorMessage={errorEmail}
             />

            <Input  
             placeholder='Ingresa tu contraseña'
             containerStyle={styles.input}
             secureTextEntry={showPassword ? false : true}
             rightIcon={<Icon
                 type='material-community'
                 name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                 onPress={()=> setShowPassword(!showPassword)}
                 
                 />}
             defaultValue={password || ''}
             onChange={(e)=>setPassword(e.nativeEvent.text)}
             errorMessage={errorPassword}
             />



             <Button
                 title= 'Cambiar correo'
                 containerStyle={styles.btnContainer}
                 buttonStyle={styles.btn}
                 onPress={onSubmit}
                 loading={isLoading}
             />
         </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: '95%'
    },
    btn:{
        backgroundColor: '#00a680'
    }
})

