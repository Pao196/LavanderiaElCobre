import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff5ee',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#e85d2e',
    textAlign: 'center',
    marginBottom: 28,
  },

  label: {
    width: '75%',
    alignSelf: 'flex-start',
    marginLeft: '12.5%',
    fontSize: 15,
    fontWeight: '700',
    color: '#e85d2e',
    marginTop: 14,
    marginBottom: 6,
  },

  input: {
    width: '75%',
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#ffb84d',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 6,
    fontSize: 15,
    color: '#333',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

 
  boton: {
    width: '75%',
    backgroundColor: '#e85d2e',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  botonSecundario: {
    width: '75%',
    backgroundColor: '#ffa76a',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  textoBoton: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '800',
  },

  listaInsumos: {
    width: '75%',
    backgroundColor: '#ffebd6',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  insumoTexto: { fontSize: 15, color: '#333' },

  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e85d2e',
    marginTop: 18,
    marginBottom: 10,
    textAlign: 'center',
  },

  noHistorial: {
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  historialItem: {
    backgroundColor: '#ffebd6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  historialTexto: { 
    fontSize: 15, 
    color: '#333' 
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: '#e85d2e',
    textAlign: 'center',
  },

  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  modalItemTexto: { fontSize: 16, color: '#333' },

  modalCerrar: { 
    marginTop: 12, 
    paddingVertical: 12, 
    backgroundColor: '#e85d2e',
    borderRadius: 10,
    alignItems: 'center' 
  },

  modalCerrarTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
  },
});
