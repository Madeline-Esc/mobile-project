import React from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation, Input, Icon, Button} from '@react-navigation/native'
import LoginForm from '../../components/Account/LoginForm'




import { validateEmail} from '../../utils/validation'
import firebase from 'firebase'


export default function Login(){

    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const navigation = useNavigation()
    
    return(
    <ScrollView>

        {/* Desde aquì le estoy agregando cosas */}
         <View style={styles.formContainer}>
             <Input
                 placeholder='Correo electrónico'
                 containerStyle={styles.inputForm}
                 onChange={(e)=>onChange(e, 'email')}
                 rightIcon={<Icon type='material-community' name='at' iconStyle={styles.iconRight}/>}
             />
             <Input
                 placeholder='Contraseña'
                 containerStyle={styles.inputForm}
                 password={true}
                 secureTextEntry={showPassword ? false : true}
                 onChange={(e)=>onChange(e, 'password')}
                 rightIcon={<Icon 
                    type='material-community' 
                    name={showPassword ? 'eye-off-outline':'eye-outline' }
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowPassword(!showPassword)}
            />}
             />
             <Input
                 placeholder='Repetir contraseña'
                 containerStyle={styles.inputForm}
                 password={true}
                 secureTextEntry={showRepeatPassword ? false : true}
                 onChange={(e)=>onChange(e, 'repeatPassword')}
                 rightIcon={<Icon 
                    type='material-community'
                    name={showRepeatPassword ? 'eye-off-outline':'eye-outline' }
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowRepeatPassword(!showRepeatPassword)}
             />}
             />
             <Button
                 title='Únete'
                 containerStyle={styles.btnContainerRegister}
                 buttonStyle={styles.btnRegister}
                 onPress={onSubmit}
             />
        </View>





        <Image
            source={require('../../../assets/img/goiko-logo.png')}
            resizeMode='contain'
            style={styles.logo}
        
        />

            <View style={styles.viewContainer}>
                <Text>Login Form</Text>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
    </ScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation()
    return(
        <Text style = {styles.textRegister}>
           ¿Aùn no tienes cuenta? { ' '}
            <Text 
                style= {styles.linkRegister}
                onPress={()=>navigation.navigate('register')}
            >
                Sign Up
            </Text>
        </Text>

    )
}

const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: 150,
        marginTop: 20
    },
    viewContainer:{
        marginRight:40,
        marginLeft: 40
    },
    divider:{
        backgroundColor: '#00a680',
        margin: 40
    },
    textRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    linkRegister:{
        color: '#00a680',
        fontWeight: 'bold'
    },
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
    },
    iconRight:{
        color: '#c1c1c1'
    }


})


   

