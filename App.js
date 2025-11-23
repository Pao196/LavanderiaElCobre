import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';

import NavegacionApp from './src/navegacion/NavegacionApp';
import { db } from './src/servicios/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Usuario por defecto para acceso libre (Invitado)
const GUEST_USER = {
  nombre: "Usuario Invitado",
  email: "invitado@elcobre.cl",
  rol: "administrador", // Rol alto para que puedas probar todas las pantallas
  uid: "guest-mobile-id"
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rutaInicial, setRutaInicial] = useState('Inicio'); 
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    const iniciarApp = async () => {
      try {
        // 1. Intentar obtener token de la URL (Deep Linking)
        let url = await Linking.getInitialURL();
        let token = null;

        if (url) {
          const { queryParams } = Linking.parse(url);
          token = queryParams?.auth_token;
        }

        // 2. Si hay token, intentamos validar con Firebase real
        if (token) {
          try {
            const userRef = doc(db, 'usuarios', token);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const data = userSnap.data();
              setDatosUsuario(data);

              const rol = (data.rol || 'operario').toLowerCase();
              // Definir ruta según rol real
              if (rol === 'administrador' || rol === 'admin') {
                setRutaInicial('Admin');
              } else {
                setRutaInicial('Inicio');
              }
              
              setLoading(false);
              return; // Éxito, terminamos aquí
            }
          } catch (firebaseError) {
            console.log("Error validando token, pasando a modo invitado...");
          }
        }

        // 3. FALLBACK: Si no hay token o falló la validación -> MODO INVITADO
        // Esto asegura que la app SIEMPRE abra
        console.log("Iniciando como Invitado");
        setDatosUsuario(GUEST_USER);
        setRutaInicial('Admin'); // Por defecto al modo más completo
        setLoading(false);

      } catch (e) {
        console.error(e);
        // En caso de error catastrófico, también entramos como invitado
        setDatosUsuario(GUEST_USER);
        setRutaInicial('Admin');
        setLoading(false);
      }
    };

    iniciarApp();
  }, []);

  // Pantalla blanca limpia mientras carga (es muy rápido)
  // Quitamos el ActivityIndicator y el texto para que se sienta nativo
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#e85d2e" />
      {/* Pasamos los datos a la navegación */}
      <NavegacionApp rutaInicial={rutaInicial} datosUsuario={datosUsuario} />
    </NavigationContainer>
  );
}