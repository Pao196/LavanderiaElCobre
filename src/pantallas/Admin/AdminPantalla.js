import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Se mantiene auth por si quieres usarlo en el futuro, pero no bloquea la entrada
import { auth } from '../../servicios/firebase';

import { styles } from '../../estilos/adminPantalla.style';
import AdminCard from '../../componentes/Admincard.js';

export default function AdminPantalla({ navigation }) {

  // Configuración forzada para entrar directo como Admin
  const [cargando, setCargando] = useState(false);
  const [esAdmin, setEsAdmin] = useState(true);
  const [usuarioDatos, setUsuarioDatos] = useState({
    nombre: 'Administrador Local',
    correo: 'admin@sistema.local'
  });

  // El useEffect de seguridad se ha eliminado para permitir acceso libre.

  const cerrarSesion = async () => {
    // Como no hay pantalla de login, solo mostramos una alerta
    Alert.alert('Sesión', 'Estás en modo sin autenticación. No hay pantalla de login a la cual volver.');
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#ff6b35" />
        <Text style={styles.textoCargando}>Cargando panel...</Text>
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