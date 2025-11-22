import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from '../../estilos/editarProveedor.style';

import { db } from '../../servicios/firebase';
import {
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

export default function EditarProveedor({ route, navigation }) {

  const { proveedorId } = route.params || {};

  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!proveedorId) {
      Alert.alert('Error', 'No se recibió el ID del proveedor.');
      navigation.goBack();
      return;
    }

    const obtenerProveedor = async () => {
      try {
        const ref = doc(db, 'proveedores_gestion_7', proveedorId);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          Alert.alert('Error', 'Proveedor no encontrado.');
          navigation.goBack();
          return;
        }

        const data = snap.data();
        setNombre(data.nombre || '');
        setCiudad(data.ciudad || '');
        setDireccion(data.direccion || '');
        setTelefono(data.telefono || '');
        setCorreo(data.correo || '');

      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'No se pudo cargar la información.');
        navigation.goBack();
      } finally {
        setCargando(false);
      }
    };

    obtenerProveedor();
  }, [proveedorId]);

  const guardarCambios = async () => {
    if (!nombre || !ciudad || !direccion || !telefono) {
      Alert.alert('Error', 'Debes completar todos los campos obligatorios.');
      return;
    }

    try {
      const ref = doc(db, 'proveedores_gestion_7', proveedorId);

      await updateDoc(ref, {
        nombre,
        ciudad,
        direccion,
        telefono,
        correo
      });

      Alert.alert('Éxito', 'Proveedor actualizado correctamente.');
      navigation.goBack();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar el proveedor.');
    }
  };

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e85d2e" />
        <Text style={styles.loadingText}>Cargando información...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>Editar Proveedor</Text>

      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del proveedor"
      />

      <Text style={styles.label}>Ciudad *</Text>
      <TextInput
        style={styles.input}
        value={ciudad}
        onChangeText={setCiudad}
        placeholder="Ciudad"
      />

      <Text style={styles.label}>Dirección *</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
        placeholder="Dirección completa"
      />

      <Text style={styles.label}>Teléfono *</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        placeholder="Número de contacto"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        placeholder="Correo electrónico"
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarCambios}>
        <Text style={styles.textoBotonGuardar}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonVolver}>Volver</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
