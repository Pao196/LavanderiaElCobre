import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../../estilos/alertas.style';

import { db } from '../../servicios/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function AlertasPantalla({ navigation }) {

  const [alertas, setAlertas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const ref = collection(db, 'inventario_gestion_7');

    const unsubscribe = onSnapshot(ref, snapshot => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const unidadesBajas = [];

      lista.forEach(item => {
        if (Array.isArray(item.unidades)) {
          item.unidades.forEach(u => {
            const stock = Number(u.stock || 0);
            const minimo = Number(u.minimo || 2);

            // Determinar si es alerta
            if (stock <= minimo + 13) {
              unidadesBajas.push({
                nombre: item.nombre,
                stock,
                unidad: u.unidad,
                minimo,
              });
            }
          });
        }
      });

      setAlertas(unidadesBajas);
      setCargando(false);
    });

    return unsubscribe;
  }, []);

  const obtenerColor = (stock) => {
    const s = Number(stock);

    if (s > 50) return '#4caf50';
    if (s > 15) return '#ffb84d';
    return '#ff4d4d';
  };

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#e85d2e" />
        <Text style={styles.textoCargando}>Cargando alertas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Alertas de Inventario</Text>

        {alertas.length === 0 ? (
          <Text style={styles.vacio}>
            Todo el inventario está en niveles óptimos.
          </Text>
        ) : (
          <FlatList
            data={alertas}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => {
              const color = obtenerColor(item.stock);

              return (
                <View style={styles.alertaBox}>

                  {/* TÍTULO DE LA ALERTA (NOMBRE DEL INSUMO) */}
                  <Text style={styles.alertaTitulo}>{item.nombre}</Text>

                  {/* TARJETA INTERNA IGUAL A INVENTARIO */}
                  <View style={[styles.alertaCard, { borderLeftColor: color }]}>

                    <Text style={styles.alertaDetalle}>
                      Stock:{' '}
                      <Text style={{ color, fontWeight: 'bold' }}>
                        {item.stock}
                      </Text>
                    </Text>

                    <Text style={styles.alertaDetalle}>
                      Unidad:{' '}
                      <Text style={{ fontWeight: 'bold' }}>
                        {item.unidad}
                      </Text>
                    </Text>

                    <Text style={styles.alertaDetalleMin}>
                      (Mínimo: {item.minimo})
                    </Text>

                  </View>
                </View>
              );
            }}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        )}

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
