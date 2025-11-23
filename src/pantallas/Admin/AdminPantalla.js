import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { styles } from '../../estilos/adminPantalla.style';
import AdminCard from '../../componentes/Admincard.js';

export default function AdminPantalla({ navigation, route }) {
  const usuarioParam = route.params?.usuario;

  const [usuarioDatos] = useState(usuarioParam || {
    nombre: 'Cargando...',
    correo: '...'
  });

  return (
    <SafeAreaView style={styles.fondo}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Panel de Administración</Text>

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

      </ScrollView>
    </SafeAreaView>
  );
}
