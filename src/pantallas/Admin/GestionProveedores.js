import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from '../../estilos/gestionProveedores.style';

import { db } from '../../servicios/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc
} from 'firebase/firestore';

export default function GestionProveedores({ route, navigation }) {

  const proveedor = route?.params?.proveedor;
  const [pedidosAprobados, setPedidosAprobados] = useState([]);
  const [cargando, setCargando] = useState(true);

  if (!proveedor) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>No se seleccionó proveedor</Text>
      </View>
    );
  }

  useEffect(() => {
    const refPedidos = collection(db, 'pedidos_gestion_7');

    const q = query(
      refPedidos,
      where('proveedorId', '==', proveedor.id),  
      where('estado', '==', 'aprobado')
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPedidosAprobados(data);
        setCargando(false);
      },
      error => {
        console.error('Error al cargar pedidos del proveedor:', error);
        Alert.alert('Error', 'No se pudieron cargar los pedidos aprobados.');
        setCargando(false);
      }
    );

    return () => unsubscribe();
  }, [proveedor.id]);

  const editarProveedor = () => {
    navigation.navigate('EditarProveedor', { proveedorId: proveedor.id });
  };

  const eliminarProveedor = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Seguro que deseas eliminar a ${proveedor.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'proveedores_gestion_7', proveedor.id));
              Alert.alert('Proveedor eliminado', `${proveedor.nombre} fue eliminado.`);
              navigation.goBack();
            } catch (error) {
              console.error('Error al eliminar proveedor:', error);
              Alert.alert('Error', 'No se pudo eliminar el proveedor.');
            }
          },
        },
      ]
    );
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#e85d2e" />
        <Text style={styles.textoCargando}>Cargando pedidos aprobados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{proveedor.nombre}</Text>
      <Text style={styles.subtexto}>
        {proveedor.telefono || 'Sin teléfono'} | {proveedor.direccion || 'Sin dirección'}
      </Text>

      <Text style={styles.subtitulo}>Pedidos aprobados</Text>

      <FlatList
        data={pedidosAprobados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entrega}>
            <Text style={styles.label}>📦 Pedido #{item.id}</Text>
            <Text>📅 Fecha: {item.fecha?.toDate?.().toLocaleDateString?.() ?? 'Sin fecha'}</Text>
            <Text>🟢 Estado: {item.estado}</Text>

            <Text style={styles.label}>Insumos:</Text>
            {item.insumos?.map((insumo, index) => (
              <Text key={index} style={styles.insumo}>
                • {insumo.nombre} — {insumo.cantidad} {insumo.unidad || 'unidades'}
              </Text>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay pedidos aprobados registrados para este proveedor.</Text>
        }
      />

      <View style={styles.menuCRUD}>
        <TouchableOpacity style={styles.botonCRUD} onPress={editarProveedor}>
          <Text style={styles.textoBoton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCRUD} onPress={eliminarProveedor}>
          <Text style={styles.textoBoton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
