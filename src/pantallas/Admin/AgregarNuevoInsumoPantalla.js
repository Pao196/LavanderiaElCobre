import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../../estilos/agregarNuevoInsumo.style';

import { db } from '../../servicios/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AgregarNuevoInsumoPantalla({ navigation }) {

  const [nombre, setNombre] = useState('');
  const [unidad, setUnidad] = useState('');
  const [stock, setStock] = useState('');
  const [unidades, setUnidades] = useState([]);

  const agregarUnidad = () => {
    if (!unidad || !stock) {
      Alert.alert("Error", "Debes ingresar unidad y stock.");
      return;
    }

    setUnidades(prev => [...prev, {
      unidad,
      stock: Number(stock)
    }]);

    setUnidad('');
    setStock('');
  };

  const guardarInsumo = async () => {
    if (!nombre || unidades.length === 0) {
      Alert.alert("Error", "Completa el nombre y agrega al menos una unidad.");
      return;
    }

    try {
      await addDoc(collection(db, 'inventario_gestion_7'), {
        nombre,
        unidades
      });

      Alert.alert("Éxito", "Insumo registrado correctamente.");
      navigation.goBack();

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar el insumo.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>Agregar Nuevo Insumo</Text>

      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Detergente"
      />

      <Text style={styles.label}>Unidad de Medida</Text>
      <TextInput
        style={styles.input}
        value={unidad}
        onChangeText={setUnidad}
        placeholder="Ej: 5L, 20L, kg, ml"
      />

      <Text style={styles.label}>Stock inicial</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
        placeholder="Ej: 10"
      />

      <TouchableOpacity style={styles.botonSecundario} onPress={agregarUnidad}>
        <Text style={styles.textoBoton}>+ Agregar Unidad</Text>
      </TouchableOpacity>

      {unidades.length > 0 && (
        <View style={styles.lista}>
          {unidades.map((u, idx) => (
            <Text key={idx} style={styles.itemUnidad}>
              • {u.unidad} — {u.stock}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.boton} onPress={guardarInsumo}>
        <Text style={styles.textoBoton}>Guardar Insumo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonVolver}>Volver</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
