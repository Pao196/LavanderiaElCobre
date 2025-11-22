import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from '../../estilos/listaProveedores.style';


import { db } from '../../servicios/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function ListaProveedores({ navigation }) {

  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {


    const coleccionRef = collection(db, 'proveedores_gestion_7');


    const unsubscribe = onSnapshot(
      coleccionRef,
      snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProveedores(data);
        setCargando(false);
      },
      error => {
        console.error('Error al obtener proveedores:', error);
        Alert.alert('Error', 'No se pudieron cargar los proveedores.');
        setCargando(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const verProveedor = (proveedor) => {
    navigation.navigate('GestionProveedores', { proveedor });
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#e85d2e" />
        <Text style={styles.textoCargando}>Cargando proveedores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Proveedores</Text>

      <FlatList
        data={proveedores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => verProveedor(item)}
          >
            <Text style={styles.texto}>{item.nombre}</Text>
            <Text style={styles.subtexto}>
              {item.telefono || 'Sin teléfono'} | {item.direccion || 'Sin dirección'}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay proveedores registrados.</Text>
        }
      />

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('AgregarProveedor')}
      >
        <Text style={styles.textoBoton}>Agregar Proveedor</Text>
      </TouchableOpacity>
    </View>
  );
}
