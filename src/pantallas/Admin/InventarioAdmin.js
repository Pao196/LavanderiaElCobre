import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

import { styles } from '../../estilos/inventarioAdmin.style';


import { db } from '../../servicios/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function InventarioAdmin() {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    const ref = collection(db, 'inventario_gestion_7');

    const unsubscribe = onSnapshot(
      ref,
      snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInventario(data);


        let alertas = [];

        data.forEach(item => {
          item.unidades?.forEach(u => {
            if (Number(u.stock) <= 2) {
              alertas.push(`${item.nombre} (${u.unidad})`);
            }
          });
        });

        if (alertas.length > 0) {
          Alert.alert(
            'Stock Bajo',
            `Las siguientes unidades están por debajo del mínimo:\n\n${alertas.join('\n')}`
          );
        }
      },
      error => {
        console.error('Error al obtener inventario:', error);
        Alert.alert('Error', 'No se pudo cargar el inventario.');
      }
    );

    return () => unsubscribe();
  }, []);

  const obtenerColor = (stock) => {
    const s = Number(stock);

    if (s > 50) return '#4caf50';   
    if (s > 15) return '#ffb84d';   
    return '#ff4d4d';               
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nombre}>{item.nombre}</Text>

      {item.unidades?.map((u, idx) => (
        <View key={idx} style={styles.unidadBox}>
          <Text style={styles.textoFila}>
            Cantidad:{' '}
            <Text style={{ color: obtenerColor(u.stock), fontWeight: 'bold' }}>
              {u.stock}
            </Text>
          </Text>

          <Text style={styles.textoFila}>Unidad: {u.unidad}</Text>

          <Text style={styles.textoFila}>(Mínimo: 2)</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inventario de Insumos</Text>

      <FlatList
        data={inventario}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay insumos registrados.</Text>
        }
      />
    </View>
  );
}
