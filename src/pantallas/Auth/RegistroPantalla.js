import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../../estilos/registro.style';


import { auth, firestore } from '../../servicios/firebase';
import { 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';

export default function RegistroPantalla({ navigation }) {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarRegistro = async () => {

    if (!nombre || !correo || !contrasena) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    setCargando(true);

    try {

      const credencial = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const uid = credencial.user.uid;


      await setDoc(doc(firestore, 'usuarios_gestion_7', uid), {
        nombre: nombre.trim(),
        correo: correo.toLowerCase(),
        creadoEn: serverTimestamp(),
        rol: 'operario',
        activo: true,           
      });

      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión.');
      navigation.replace('InicioSesion');

    } catch (error) {
      console.error('Error al registrar:', error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Error', 'El correo ya está en uso.');
          break;

        case 'auth/invalid-email':
          Alert.alert('Error', 'Correo inválido.');
          break;

        case 'auth/weak-password':
          Alert.alert('Error', 'La contraseña es débil.');
          break;

        default:
          Alert.alert('Error', error.message);
      }

    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.fondo}>
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Crear Cuenta</Text>
        <Text style={styles.subtitulo}>Regístrate como nuevo operario</Text>

        <TextInput
          placeholder="Nombre completo"
          placeholderTextColor="#aaa"
          style={styles.entrada}
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          placeholder="usuario@ejemplo.com"
          placeholderTextColor="#aaa"
          style={styles.entrada}
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          style={styles.entrada}
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />

        <TouchableOpacity
          style={[styles.botonPrincipal, cargando && { opacity: 0.7 }]}
          onPress={manejarRegistro}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBoton}>Registrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.textoInferior}>¿Ya tienes una cuenta?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('InicioSesion')}>
          <Text style={styles.registrate}>Inicia sesión aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
