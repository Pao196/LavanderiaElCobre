import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../../estilos/inicioSesion.style';


import { auth, db } from '../../servicios/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function InicioSesionPantalla({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarInicioSesion = async () => {

    if (!correo || !contrasena) {
      Alert.alert('Campos incompletos', 'Por favor ingresa correo y contraseña.');
      return;
    }

    setCargando(true);

    try {

      const credenciales = await signInWithEmailAndPassword(auth, correo, contrasena);
      const uid = credenciales.user.uid;


      const refUsuario = doc(db, 'usuarios_gestion_7', uid);
      const snap = await getDoc(refUsuario);

      if (!snap.exists()) {
        Alert.alert('Usuario no registrado', 'Tu cuenta no está registrada.');
        await signOut(auth);
        return;
      }

      const datos = snap.data();


      const activo = datos.activo === true || datos.activo === "true";
      const rol = String(datos.rol || '').toLowerCase();

      if (!activo) {
        Alert.alert('Cuenta inactiva', 'Tu usuario ha sido desactivado.');
        await signOut(auth);
        return;
      }


      if (rol === 'admin') {
        Alert.alert('Bienvenido Administrador', 'Accediendo al panel de administración...');
        navigation.replace('Admin');
      } else {
        Alert.alert('Bienvenido Operario', 'Inicio de sesión correcto.');
        navigation.replace('Inicio');
      }

    } catch (error) {

      console.error('Error al iniciar sesión:', error);

      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Correo inválido', 'Ingresa un correo válido.');
          break;
        case 'auth/user-not-found':
          Alert.alert('Usuario no encontrado', 'Revisa tus credenciales.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Contraseña incorrecta', 'Intenta nuevamente.');
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
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Ingresa a tu cuenta</Text>

        <TextInput
          placeholder="usuario@ejemplo.com"
          placeholderTextColor="#aaa"
          value={correo}
          onChangeText={setCorreo}
          style={styles.entrada}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          value={contrasena}
          onChangeText={setContrasena}
          style={styles.entrada}
          secureTextEntry
        />

        <View style={styles.fila}>
          <Text style={styles.textoRecordarme}>Recordarme</Text>

          <TouchableOpacity>
            <Text style={styles.textoOlvido}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.botonPrincipal, cargando && { opacity: 0.7 }]}
          onPress={manejarInicioSesion}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBoton}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.textoInferior}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.registrate}>Regístrate como Operario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
