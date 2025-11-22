import { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../../estilos/adminPantalla.style';
import AdminCard from '../../componentes/Admincard.js';

// Añadimos 'route' a las props para recibir los parámetros
export default function AdminPantalla({ navigation, route }) {

  // Intentamos obtener el usuario que viene desde App.js -> NavegacionApp
  const usuarioParam = route.params?.usuario;

  // Inicializamos el estado con los datos reales, o un fallback si algo fallara
  const [usuarioDatos, setUsuarioDatos] = useState(usuarioParam || {
    nombre: 'Cargando...',
    correo: '...'
  });

  // Ya no necesitamos cargar nada, porque los datos ya vienen listos desde App.js
  // Pero mantenemos el estado 'cargando' false para que renderice directo.
  
  const cerrarSesion = async () => {
    Alert.alert('Sesión', 'Cierre de sesión gestionado por la Intranet.');
    // Aquí podrías redirigir a la web externa si quisieras
  };

  return (
    <SafeAreaView style={styles.fondo}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Panel de Administración</Text>

        {/* AQUÍ SE MUESTRAN LOS DATOS REALES */}
        <View style={styles.tarjetaUsuario}>
          <Text style={styles.nombre}>{usuarioDatos?.nombre || 'Sin Nombre'}</Text>
          <Text style={styles.correo}>{usuarioDatos?.correo || 'Sin Correo'}</Text>
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