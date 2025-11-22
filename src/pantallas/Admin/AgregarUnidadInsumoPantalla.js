import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from '../../estilos/agregarUnidadInsumo.style';

import { db } from '../../servicios/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export default function AgregarUnidadInsumoPantalla({ navigation }) {

  const [insumos, setInsumos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [insumoId, setInsumoId] = useState('');
  const [insumoNombre, setInsumoNombre] = useState('');

  const [unidad, setUnidad] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    const cargarInsumos = async () => {
      const snap = await getDocs(collection(db, 'inventario_gestion_7'));
      const lista = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInsumos(lista);
    };

    cargarInsumos();
  }, []);

  const guardarUnidad = async () => {
    if (!unidad || !stock || !insumoId) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }

    try {
      const ref = doc(db, 'inventario_gestion_7', insumoId);

      const insumoSel = insumos.find(x => x.id === insumoId);

      const nuevasUnidades = [
        ...insumoSel.unidades,
        { unidad, stock: Number(stock) }
      ];

      await updateDoc(ref, { unidades: nuevasUnidades });

      Alert.alert("Éxito", "Unidad agregada correctamente.");
      navigation.goBack();

    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo agregar la unidad.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>Agregar Unidad a Insumo</Text>

      <Text style={styles.label}>Seleccionar Insumo</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text>{insumoNombre || "Elige un insumo"}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <FlatList
              data={insumos}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setInsumoId(item.id);
                    setInsumoNombre(item.nombre);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCerrar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCerrarTexto}>Cerrar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Unidad *</Text>
      <TextInput
        style={styles.input}
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Ej: 10L, 25L, kg"
      />

      <Text style={styles.label}>Stock Inicial *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
        placeholder="Ej: 10"
      />

      <TouchableOpacity style={styles.boton} onPress={guardarUnidad}>
        <Text style={styles.textoBoton}>Guardar Unidad</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonVolver}>Volver</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
