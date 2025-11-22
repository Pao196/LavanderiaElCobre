import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';

import { styles } from '../../estilos/registroConsumo.style';

import { db, auth } from '../../servicios/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function RegistroConsumoPantalla({ navigation }) {

  const [insumos, setInsumos] = useState([]);
  const [insumoId, setInsumoId] = useState('');
  const [insumoNombre, setInsumoNombre] = useState('');

  const [unidad, setUnidad] = useState('');
  const [unidadesDisponibles, setUnidadesDisponibles] = useState([]);

  const [cantidad, setCantidad] = useState('');

  const [modalInsumos, setModalInsumos] = useState(false);
  const [modalUnidades, setModalUnidades] = useState(false);

  useEffect(() => {
    const cargarInsumos = async () => {
      const ref = collection(db, 'inventario_gestion_7');
      const snap = await getDocs(ref);

      const lista = snap.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data().nombre,
        unidades: doc.data().unidades || [],
      }));

      setInsumos(lista);
    };

    cargarInsumos();
  }, []);

  const seleccionarInsumo = (item) => {
    setInsumoId(item.id);
    setInsumoNombre(item.nombre);
    setUnidadesDisponibles(item.unidades);
    setUnidad('');
    setModalInsumos(false);
  };

  const registrarConsumo = async () => {
    if (!insumoId || !cantidad || !unidad) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    try {
      const usuario = auth.currentUser;

      await addDoc(collection(db, 'consumos_gestion_7'), {
        insumoId,
        insumoNombre,
        cantidad: Number(cantidad),
        unidad: unidad.unidad,
        fecha: new Date(),
        usuario: usuario?.email || 'desconocido',
      });

      Alert.alert('Registro exitoso', 'El consumo ha sido registrado.');

      setInsumoId('');
      setInsumoNombre('');
      setUnidad('');
      setUnidadesDisponibles([]);
      setCantidad('');

    } catch (e) {
      Alert.alert('Error', 'No se pudo registrar el consumo.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.titulo}>Registro de Consumo</Text>

        <Text style={styles.label}>Insumo *</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalInsumos(true)}
        >
          <Text style={{ color: insumoNombre ? '#000' : '#999' }}>
            {insumoNombre || 'Selecciona un insumo'}
          </Text>
        </TouchableOpacity>

        <Modal visible={modalInsumos} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>Seleccionar Insumo</Text>

              <FlatList
                data={insumos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => seleccionarInsumo(item)}
                  >
                    <Text style={styles.modalItemTexto}>{item.nombre}</Text>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                style={styles.modalCerrar}
                onPress={() => setModalInsumos(false)}
              >
                <Text style={styles.modalCerrarTexto}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Unidad *</Text>
        <TouchableOpacity
          style={styles.input}
          disabled={unidadesDisponibles.length === 0}
          onPress={() => unidadesDisponibles.length > 0 && setModalUnidades(true)}
        >
          <Text style={{ color: unidad ? '#000' : '#999' }}>
            {unidad?.unidad || 'Selecciona una unidad'}
          </Text>
        </TouchableOpacity>

        <Modal visible={modalUnidades} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>Seleccionar Unidad</Text>

              {unidadesDisponibles.map((u, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.modalItem}
                  onPress={() => {
                    setUnidad(u);
                    setModalUnidades(false);
                  }}
                >
                  <Text style={styles.modalItemTexto}>{u.unidad}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.modalCerrar}
                onPress={() => setModalUnidades(false)}
              >
                <Text style={styles.modalCerrarTexto}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Cantidad *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 5"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        <TouchableOpacity style={styles.botonRegistrar} onPress={registrarConsumo}>
          <Text style={styles.textoBotonRegistrar}>Registrar Consumo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotonVolver}>Volver</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
