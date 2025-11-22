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

import { auth, db } from '../../servicios/firebase';
import { doc, getDoc } from 'firebase/firestore';


import { styles } from '../../estilos/adminPantalla.style';


import AdminCard from '../../componentes/Admincard.js';

export default function AdminPantalla({ navigation }) {

  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const [usuarioDatos, setUsuarioDatos] = useState(null);

  useEffect(() => {
    const verificarRol = async () => {
      try {
        const usuario = auth.currentUser;

        if (!usuario) {
          Alert.alert('Sesión inválida', 'Debes iniciar sesión nuevamente.');
          navigation.replace('InicioSesion');
          return;
        }


        const ref = doc(db, 'usuarios', usuario.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          Alert.alert('Error', 'No se encontraron datos del usuario.');
          navigation.replace('InicioSesion');
          return;
        }

        const datos = snap.data();
        setUsuarioDatos(datos);


        if (String(datos.rol).toLowerCase() === 'admin') {
          setEsAdmin(true);
        } else {
          Alert.alert('Acceso restringido', 'No tienes permisos de administrador.');
          navigation.replace('Inicio');
        }

      } catch (error) {
        console.error('Error al verificar rol:', error);
        Alert.alert('Error', 'Ocurrió un problema al verificar tu rol.');
        navigation.replace('InicioSesion');
      } finally {
        setCargando(false);
      }
    };

    verificarRol();
  }, []);

  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      navigation.replace('InicioSesion');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#ff6b35" />
        <Text style={styles.textoCargando}>Verificando permisos...</Text>
      </View>
    );
  }

  if (!esAdmin) return null;

  return (
    <SafeAreaView style={styles.fondo}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Panel de Administración</Text>

        <View style={styles.tarjetaUsuario}>
          <Text style={styles.nombre}>{usuarioDatos?.nombre}</Text>
          <Text style={styles.correo}>{usuarioDatos?.correo}</Text>
        </View>

        <View style={styles.menu}>
          <AdminCard texto="Inventario de Insumos" onPress={() => navigation.navigate('InventarioAdmin')} />
          <AdminCard texto="Generar Reportes" onPress={() => navigation.navigate('ReportesInsumos')} />
          <AdminCard texto="Lista de Proveedores" onPress={() => navigation.navigate('ListaProveedores')} />
          <AdminCard texto="Agregar Pedido" onPress={() => navigation.navigate('AgregarPedidos')} />
          <AdminCard texto="Agregar Nuevo Insumo" onPress={() => navigation.navigate('AgregarNuevoInsumo')} />
          <AdminCard texto="Agregar Unidad a Insumo" onPress={() => navigation.navigate('AgregarUnidadInsumo')} />

        </View>

        <TouchableOpacity style={styles.botonSalir} onPress={cerrarSesion}>
          <Text style={styles.textoBotonSalir}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
