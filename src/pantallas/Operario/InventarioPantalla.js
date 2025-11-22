import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../../estilos/inventarioPantalla.style';

import { db } from '../../servicios/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function InventarioPantalla({ navigation }) {

  const [insumos, setInsumos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const ref = collection(db, 'inventario_gestion_7');

    const unsubscribe = onSnapshot(ref, snapshot => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data().nombre,
        unidades: doc.data().unidades || []
      }));

      setInsumos(lista);
      setCargando(false);
    });

    return unsubscribe;
  }, []);

  const filtrarInsumos = () => {
    return insumos.filter(i =>
      (i.nombre || '').toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const obtenerColorStock = (cantidad) => {
    const num = Number(cantidad) || 0;
    if (num > 50) return '#4caf50';
    if (num > 15) return '#ffb84d';
    return '#ff4d4d';
  };


  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#e85d2e" />
        <Text style={styles.textoCargando}>Cargando inventario...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Inventario de Insumos</Text>

        <TextInput
          placeholder="Buscar insumo..."
          placeholderTextColor="#999"
          value={busqueda}
          onChangeText={setBusqueda}
          style={styles.input}
        />

        <FlatList
          data={filtrarInsumos()}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.insumoBox}>
              <Text style={styles.insumoTitulo}>{item.nombre}</Text>

              {item.unidades.map((u, index) => {
                const color = obtenerColorStock(u.stock, u.minimo);

                return (
                  <View key={index} style={styles.cardUnidad}>
                    <Text style={styles.detalle}>
                      Cantidad:{' '}
                      <Text style={{ color, fontWeight: 'bold' }}>
                        {u.stock}
                      </Text>
                    </Text>

                    <Text style={styles.detalle}>
                      Unidad: <Text style={{ fontWeight: 'bold' }}>{u.unidad}</Text>
                    </Text>

                    <Text style={styles.detalleMin}>
                      (Mínimo: {u.minimo || 2})
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.vacio}>No hay insumos registrados.</Text>
          }
        />

        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotonVolver}>Volver</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
