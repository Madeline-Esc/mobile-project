import React, {useState} from "react"
import { StyleSheet, View } from 'react-native'
import {Input, Button, Icon} from 'react-native-elements'
import firebase from 'firebase'

export default function ChangeDisplayPasswordForm(props){
    const {setShowModal, toastRef} = props
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)


    
    const reauthenticate = (password) =>{
        var user = firebase.auth().currentUser
        var credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential((credentials))
    }
    
    const onChangePasswordPress= ()=>{
        
        if(!password){
            setError('Debes ingresar tu contraseña actual')
        }else{
            reauthenticate(password).then(()=>{
            if(!password || !newPassword){
                setError('Debes rellenar todos los campos')
            }else if(newPassword.length < 6){
                setError('La contraseña debe tener mínimo 6 caracteres')
            }else if(newPassword === password){
                setError('Debes ingresar una contraseña diferente a la actual')
            } else {
            setIsLoading(true)
            firebase
            .auth()
            .currentUser.updatePassword(newPassword)
            .then(()=>{
                console.log('Contraseña actualizada con éxito')
                setIsLoading(false)
                setShowModal(false)
            })
            .catch((error) =>{
                console.log('No se pudo actualizar la contraseña')
                setError(error.message)
                setIsLoading(false)

            })
        }
    }).catch((error)=>{
        setErrorCurrentPassword(error.message)
    })

    setError(null)
    setErrorCurrentPassword(null)
    
}

}

        
    return(
         <View style={styles.view}>
             <Input  
             placeholder='Ingresa tu contraseña actual'
             containerStyle={styles.input}
             secureTextEntry={showCurrentPassword ? false: true}
             rightIcon={<Icon
                type='material-community'
                name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
                onPress={()=> setShowCurrentPassword(!showCurrentPassword)}
                 
             />}
             onChange={(e)=>setPassword(e.nativeEvent.text)}
             errorMessage={errorCurrentPassword}
             />

            <Input  
             placeholder='Ingresa una nueva contraseña'
             containerStyle={styles.input}
             secureTextEntry={showPassword ? false : true}
             defaultValue={''}
             rightIcon={<Icon
                 type='material-community'
                 name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                 onPress={()=> setShowPassword(!showPassword)}
                 
                 />}
             onChange={(e)=>setNewPassword(e.nativeEvent.text)}
             errorMessage={error}
             />



             <Button
                 title= 'Cambiar contraseña'
                 containerStyle={styles.btnContainer}
                 buttonStyle={styles.btn}
                 onPress={onChangePasswordPress}
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

