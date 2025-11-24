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
  Platform // Importante para detectar si es Web o Celular
} from 'react-native';

// Asegúrate de que la ruta de tus estilos sea correcta
import { styles } from '../../estilos/registroConsumo.style';

// Asegúrate de que la ruta de tu configuración de firebase sea correcta
import { db, auth } from '../../servicios/firebase';

// Importaciones de Firestore
import { collection, getDocs, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function RegistroConsumoPantalla({ navigation }) {

  const [insumos, setInsumos] = useState([]);
  const [insumoId, setInsumoId] = useState('');
  const [insumoNombre, setInsumoNombre] = useState('');

  const [unidad, setUnidad] = useState(null);
  const [unidadesDisponibles, setUnidadesDisponibles] = useState([]);

  const [cantidad, setCantidad] = useState('');

  const [modalInsumos, setModalInsumos] = useState(false);
  const [modalUnidades, setModalUnidades] = useState(false);
  
  // Estado de carga para evitar doble click y mostrar feedback
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarInsumos();
  }, []);

  const cargarInsumos = async () => {
    try {
      const ref = collection(db, 'inventario_gestion_7');
      const snap = await getDocs(ref);

      const lista = snap.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data().nombre,
        unidades: doc.data().unidades || [],
      }));

      setInsumos(lista);
    } catch (error) {
      console.error("Error cargando insumos:", error);
      mostrarAlerta("Error", "No se pudo cargar el inventario.");
    }
  };

  // Función auxiliar para manejar alertas en Web y Celular
  const mostrarAlerta = (titulo, mensaje, onOK) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}: ${mensaje}`);
      if (onOK) onOK();
    } else {
      Alert.alert(titulo, mensaje, [{ text: 'OK', onPress: onOK }]);
    }
  };

  const seleccionarInsumo = (item) => {
    setInsumoId(item.id);
    setInsumoNombre(item.nombre);
    setUnidadesDisponibles(item.unidades);
    setUnidad(null);
    setModalInsumos(false);
  };

  const registrarConsumo = async () => {
    // 1. Validaciones
    if (!insumoId || !cantidad || !unidad) {
      mostrarAlerta('Atención', 'Debes seleccionar un insumo, una unidad e ingresar la cantidad.');
      return;
    }

    const cantidadNum = Number(cantidad);

    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      mostrarAlerta('Atención', 'La cantidad debe ser un número válido mayor a 0.');
      return;
    }

    setCargando(true); // Bloqueamos botón

    try {
      // 2. Obtener referencia al insumo actual
      const insumoRef = doc(db, 'inventario_gestion_7', insumoId);
      const insumoSnap = await getDoc(insumoRef);

      if (!insumoSnap.exists()) {
        mostrarAlerta('Error', 'El insumo ya no existe en la base de datos.');
        setCargando(false);
        return;
      }

      const dataInsumo = insumoSnap.data();
      const unidadesActuales = dataInsumo.unidades || [];

      // 3. Verificar stock y calcular la resta
      let stockSuficiente = true;
      
      const unidadesFinales = unidadesActuales.map(u => {
        if (u.unidad === unidad.unidad) {
          const stockActual = Number(u.stock);
          if (stockActual < cantidadNum) {
            stockSuficiente = false;
          }
          return { ...u, stock: stockActual - cantidadNum };
        }
        return u;
      });

      if (!stockSuficiente) {
        mostrarAlerta('Stock insuficiente', `No tienes suficientes ${unidad.unidad} para realizar este consumo.`);
        setCargando(false);
        return;
      }

      // 4. Actualizar Inventario (Resta)
      await updateDoc(insumoRef, {
        unidades: unidadesFinales
      });

      // 5. Guardar en Historial de Consumos
      const usuario = auth.currentUser;
      await addDoc(collection(db, 'consumos_gestion_7'), {
        insumoId,
        insumoNombre,
        cantidad: cantidadNum,
        unidad: unidad.unidad,
        fecha: new Date(),
        usuario: usuario?.email || 'Usuario Invitado',
      });

      // 6. ALERTA DE ÉXITO COMPATIBLE (WEB Y MOVIL)
      const mensajeExito = `Se ha registrado el consumo de ${cantidadNum} ${unidad.unidad} de ${insumoNombre} correctamente.`;
      
      mostrarAlerta('¡Acción Completada!', mensajeExito, () => {
        // Esto se ejecuta al dar OK
        limpiarFormulario();
        cargarInsumos();
      });

    } catch (e) {
      console.error("Error al registrar:", e);
      mostrarAlerta('Error', 'Ocurrió un problema al guardar. Verifica tu conexión.');
    } finally {
      setCargando(false); // Desbloqueamos el botón siempre
    }
  };

  const limpiarFormulario = () => {
    setInsumoId('');
    setInsumoNombre('');
    setUnidad(null);
    setUnidadesDisponibles([]);
    setCantidad('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.titulo}>Registro de Consumo</Text>

        {/* SELECCIONAR INSUMO */}
        <Text style={styles.label}>Insumo *</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalInsumos(true)}
        >
          <Text style={{ color: insumoNombre ? '#000' : '#999' }}>
            {insumoNombre || 'Toca para seleccionar...'}
          </Text>
        </TouchableOpacity>

        {/* MODAL INSUMOS */}
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
              <TouchableOpacity style={styles.modalCerrar} onPress={() => setModalInsumos(false)}>
                <Text style={styles.modalCerrarTexto}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* SELECCIONAR UNIDAD */}
        <Text style={styles.label}>Unidad *</Text>
        <TouchableOpacity
          style={styles.input}
          disabled={unidadesDisponibles.length === 0}
          onPress={() => {
            if (unidadesDisponibles.length === 0) {
              mostrarAlerta("Aviso", "Primero selecciona un insumo.");
            } else {
              setModalUnidades(true);
            }
          }}
        >
          <Text style={{ color: unidad ? '#000' : '#999' }}>
            {unidad ? `${unidad.unidad} (Stock: ${unidad.stock})` : 'Selecciona una unidad'}
          </Text>
        </TouchableOpacity>

        {/* MODAL UNIDADES */}
        <Modal visible={modalUnidades} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>Unidades Disponibles</Text>
              {unidadesDisponibles.map((u, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.modalItem}
                  onPress={() => {
                    setUnidad(u);
                    setModalUnidades(false);
                  }}
                >
                  <Text style={styles.modalItemTexto}>
                    {u.unidad} - Disponible: {u.stock}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.modalCerrar} onPress={() => setModalUnidades(false)}>
                <Text style={styles.modalCerrarTexto}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* CANTIDAD */}
        <Text style={styles.label}>Cantidad a consumir *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 2"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        {/* BOTÓN REGISTRAR */}
        <TouchableOpacity 
          style={[styles.botonRegistrar, { opacity: cargando ? 0.7 : 1 }]} 
          onPress={registrarConsumo}
          disabled={cargando}
        >
          <Text style={styles.textoBotonRegistrar}>
            {cargando ? 'Registrando...' : 'Registrar Consumo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotonVolver}>Volver</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}