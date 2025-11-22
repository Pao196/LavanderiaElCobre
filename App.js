import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';

import NavegacionApp from './src/navegacion/NavegacionApp';
import { db } from './src/servicios/firebase';
import { doc, getDoc } from 'firebase/firestore';

const DASHBOARD_REDIRECT_URL = "https://lavanderia-cobre-landingpage.vercel.app/intranet/dashboard";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rutaInicial, setRutaInicial] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState(null); // <--- NUEVO ESTADO
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const validarSesion = async () => {
      try {
        let url = await Linking.getInitialURL();
        let token = null;

        if (url) {
          const { queryParams } = Linking.parse(url);
          token = queryParams?.auth_token;
        }

        // Para pruebas locales (descomentar si es necesario):
        // if (!token) token = "AQUI_TU_UID_REAL_DE_FIREBASE"; 

        if (!token) {
          manejarFallo("No se detectó token de sesión.");
          return;
        }

        const userRef = doc(db, 'usuarios', token);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          // Guardamos los datos reales para pasarlos a las pantallas
          setDatosUsuario(data); 

          const rol = (data.rol || 'operario').toLowerCase();

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
        <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', marginBottom: 20 }}>{errorMsg}</Text>
        <Text style={{ color: '#555' }}>Por favor ingresa desde la Intranet.</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#e85d2e" />
      {/* Pasamos ruta Y datos del usuario a la navegación */}
      <NavegacionApp rutaInicial={rutaInicial} datosUsuario={datosUsuario} />
    </NavigationContainer>
  );
}