import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../../estilos/inicioPantalla.style';

import { auth, db } from '../../servicios/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function InicioPantalla({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setCargando(false);
      return;
    }

    const obtenerDatos = async () => {
      try {
        const ref = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUsuario(snap.data());
        } else {
          Alert.alert('Usuario no encontrado', 'Tu perfil no está registrado.');
        }

      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#ff6b35" />
        <Text style={{ color: '#777', marginTop: 10 }}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.fondo}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Text style={styles.titulo}>Panel del Operario</Text>

        <View style={styles.tarjetaUsuario}>
          <View style={styles.datosUsuario}>
            <Text style={styles.nombre}>{usuario?.nombre || 'Operario'}</Text>
            <Text style={styles.correo}>{usuario?.correo || ''}</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RegistroConsumo')}
          >
            <Text style={styles.textoCard}>Registrar Consumo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Inventario')}
          >
            <Text style={styles.textoCard}>Consultar Inventario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Alertas')}
          >
            <Text style={styles.textoCard}>Ver Alertas</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
