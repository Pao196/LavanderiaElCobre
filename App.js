import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';

// Importamos la navegación completa
import NavegacionApp from './src/navegacion/NavegacionApp';

// Firebase
import { db } from './src/servicios/firebase.js'; // Asegúrate de que este path sea correcto
import { doc, getDoc } from 'firebase/firestore';

const DASHBOARD_REDIRECT_URL = "https://lavanderia-el-cobre.vercel.app/";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rutaInicial, setRutaInicial] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const validarSesion = async () => {
      try {
        // 1. Obtener URL y Token
        let url = await Linking.getInitialURL();
        let token = null;

        if (url) {
          const { queryParams } = Linking.parse(url);
          token = queryParams?.auth_token;
        }

        // Modo Desarrollo (Opcional): Si no hay token, forzar uno para probar (comentar en producción)
        // if (!token) token = "TU_UID_DE_PRUEBA"; 

        if (!token) {
          manejarFallo("No se detectó token de sesión.");
          return;
        }

        // 2. Buscar usuario en Firestore usando el token como ID
        const userRef = doc(db, 'usuarios', token);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const rol = (data.rol || 'operario').toLowerCase();

          // 3. Definir ruta inicial según rol
          if (rol === 'administrador' || rol === 'admin') {
            setRutaInicial('Admin');
          } else {
            setRutaInicial('Inicio');
          }
          setLoading(false);
        } else {
          manejarFallo("Usuario no encontrado en la base de datos.");
        }

      } catch (e) {
        console.error(e);
        manejarFallo("Error de conexión.");
      }
    };

    validarSesion();
  }, []);

  const manejarFallo = (mensaje) => {
    if (Platform.OS === 'web') {
      // Si falla, devolver a la intranet
      window.location.href = DASHBOARD_REDIRECT_URL;
    } else {
      setErrorMsg(mensaje);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#e85d2e" />
        <Text style={{ marginTop: 10, color: '#e85d2e' }}>Validando credenciales...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', marginBottom: 20 }}>
          {errorMsg}
        </Text>
        <Text style={{ color: '#555' }}>Por favor ingresa desde la Intranet.</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#e85d2e" />
      {/* Pasamos la ruta calculada al navegador */}
      <NavegacionApp rutaInicial={rutaInicial} />
    </NavigationContainer>
  );
}