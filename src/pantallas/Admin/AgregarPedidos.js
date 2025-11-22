import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from '../../estilos/agregarPedidos.style';
import { db } from '../../servicios/firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function AgregarPedidos() {

  const [proveedorId, setProveedorId] = useState('');
  const [proveedorNombre, setProveedorNombre] = useState('');
  const [listaProveedores, setListaProveedores] = useState([]);
  const [modalProv, setModalProv] = useState(false);

  const [listaInsumos, setListaInsumos] = useState([]);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  const [modalInsumo, setModalInsumo] = useState(false);

  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');
  const [modalUnidad, setModalUnidad] = useState(false);

  const [cantidad, setCantidad] = useState('');
  const [insumosAgregados, setInsumosAgregados] = useState([]);

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');


  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje(texto);
    setTipoMensaje(tipo);

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  useEffect(() => {
    const cargarProveedores = async () => {
      const ref = collection(db, 'proveedores_gestion_7');
      const snap = await getDocs(ref);

      const lista = snap.docs.map(d => ({
        id: d.id,
        nombre: d.data().nombre
      }));

      setListaProveedores(lista);
    };

    const cargarInsumos = async () => {
      const ref = collection(db, 'inventario_gestion_7');
      const snap = await getDocs(ref);

      const lista = snap.docs.map(d => ({
        id: d.id,
        nombre: d.data().nombre,
        unidades: d.data().unidades || []
      }));

      setListaInsumos(lista);
    };

    cargarProveedores();
    cargarInsumos();
  }, []);

  const agregarInsumo = () => {
    if (!insumoSeleccionado || !unidadSeleccionada || !cantidad) {
      mostrarMensaje('Completa insumo, unidad y cantidad.', 'error');
      return;
    }

    const nuevo = {
      nombre: insumoSeleccionado.nombre,
      unidad: unidadSeleccionada,
      cantidad: Number(cantidad)
    };

    setInsumosAgregados(prev => [...prev, nuevo]);

    setInsumoSeleccionado(null);
    setUnidadSeleccionada('');
    setCantidad('');

    mostrarMensaje('Insumo agregado correctamente', 'success');
  };

  const registrarPedido = async () => {
    if (!proveedorId || insumosAgregados.length === 0) {
      mostrarMensaje('Selecciona proveedor y agrega insumos.', 'error');
      return;
    }

    try {

      const pedidoRef = await addDoc(collection(db, 'pedidos_gestion_7'), {
        proveedorId,
        proveedorNombre,
        fecha: new Date(),
        estado: 'aprobado',
        insumos: insumosAgregados
      });

      await addDoc(collection(db, `proveedores_gestion_7/${proveedorId}/pedidos`), {
        pedidoId: pedidoRef.id,
        fecha: new Date(),
        estado: 'aprobado',
        insumos: insumosAgregados
      });

      const inventarioSnap = await getDocs(collection(db, 'inventario_gestion_7'));

      for (const item of insumosAgregados) {
        let docEncontrado = null;

        inventarioSnap.forEach((d) => {
          if (d.data().nombre === item.nombre) {
            docEncontrado = { id: d.id, ...d.data() };
          }
        });

        if (!docEncontrado) {
          await addDoc(collection(db, 'inventario_gestion_7'), {
            nombre: item.nombre,
            unidades: [{
              unidad: item.unidad,
              stock: item.cantidad
            }]
          });
          continue;
        }

        let unidades = docEncontrado.unidades || [];
        let idx = unidades.findIndex(u => u.unidad === item.unidad);

        if (idx === -1) {
          unidades.push({
            unidad: item.unidad,
            stock: item.cantidad
          });
        } else {
          unidades[idx].stock += item.cantidad;
        }

        await updateDoc(doc(db, 'inventario_gestion_7', docEncontrado.id), {
          unidades
        });
      }

      mostrarMensaje('Pedido registrado y stock actualizado', 'success');

      setProveedorId('');
      setProveedorNombre('');
      setInsumosAgregados([]);

    } catch (error) {
      console.error(error);
      mostrarMensaje('No se pudo registrar el pedido.', 'error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Agregar Pedido</Text>


      {mensaje !== '' && (
        <View style={[
          styles.mensajeBox,
          tipoMensaje === 'success' ? styles.mensajeExito :
          tipoMensaje === 'error' ? styles.mensajeError :
          styles.mensajeWarning
        ]}>
          <Text style={styles.mensajeTexto}>{mensaje}</Text>
        </View>
      )}


      <Text style={styles.label}>Proveedor *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setModalProv(true)}>
        <Text>{proveedorNombre || 'Selecciona un proveedor'}</Text>
      </TouchableOpacity>


      <Modal visible={modalProv} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Elegir Proveedor</Text>

            <FlatList
              data={listaProveedores}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setProveedorId(item.id);
                    setProveedorNombre(item.nombre);
                    setModalProv(false);
                  }}
                >
                  <Text style={styles.modalItemTexto}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCerrar}
              onPress={() => setModalProv(false)}
            >
              <Text style={styles.modalCerrarTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.subtitulo}>Insumos</Text>

      <Text style={styles.label}>Insumo *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setModalInsumo(true)}>
        <Text>{insumoSeleccionado?.nombre || 'Selecciona un insumo'}</Text>
      </TouchableOpacity>


      <Modal visible={modalInsumo} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Elegir Insumo</Text>

            <FlatList
              data={listaInsumos}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setInsumoSeleccionado(item);
                    setUnidadSeleccionada('');
                    setModalInsumo(false);
                  }}
                >
                  <Text style={styles.modalItemTexto}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCerrar}
              onPress={() => setModalInsumo(false)}
            >
              <Text style={styles.modalCerrarTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Text style={styles.label}>Unidad *</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          if (!insumoSeleccionado) {
            mostrarMensaje('Selecciona un insumo primero', 'warning');
            return;
          }
          setModalUnidad(true);
        }}
      >
        <Text>{unidadSeleccionada || 'Selecciona una unidad'}</Text>
      </TouchableOpacity>


      <Modal visible={modalUnidad} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Unidades Disponibles</Text>

            <FlatList
              data={insumoSeleccionado?.unidades || []}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setUnidadSeleccionada(item.unidad);
                    setModalUnidad(false);
                  }}
                >
                  <Text style={styles.modalItemTexto}>{item.unidad}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCerrar}
              onPress={() => setModalUnidad(false)}
            >
              <Text style={styles.modalCerrarTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Text style={styles.label}>Cantidad *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 5"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <TouchableOpacity style={styles.botonSecundario} onPress={agregarInsumo}>
        <Text style={styles.textoBoton}>+ Agregar Insumo</Text>
      </TouchableOpacity>

      {insumosAgregados.length > 0 && (
        <View style={styles.listaInsumos}>
          {insumosAgregados.map((item, idx) => (
            <Text key={idx} style={styles.insumoTexto}>
              • {item.nombre} — {item.cantidad} {item.unidad}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.boton} onPress={registrarPedido}>
        <Text style={styles.textoBoton}>Guardar Pedido</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
