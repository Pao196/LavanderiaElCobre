import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    padding: 22,
    backgroundColor: '#fff5ee',
    alignItems: 'center'
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e85d2e',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 0.5,
  },

  label: {
    width: '70%',           
    alignSelf: 'flex-start', 
    marginLeft: '15%',      
    fontSize: 15,
    fontWeight: '700',
    color: '#e85d2e',
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    width: '70%',
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#f3c5a1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  boton: {
    alignSelf: 'center',
    backgroundColor: '#e85d2e',
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 25,
    width: '70%',
    
    shadowColor: '#e85d2e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  botonSecundario: {
    alignSelf: 'center',
    backgroundColor: '#ffa76a',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    width: '65%',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 3,
  },

  textoBoton: { 
    color: '#fff', 
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  listaInsumos: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffd8b8',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  insumoTexto: { 
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e85d2e',
    marginTop: 25,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  noHistorial: {
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 12,
  },

  historialItem: {
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffd8b8',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  historialTexto: { 
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    width: '90%',
    maxHeight: '72%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 10,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
    color: '#e85d2e',
    textAlign: 'center',
  },

  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  modalItemTexto: {
    fontSize: 16,
    color: '#333',
  },

  modalCerrar: {
    marginTop: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },

  modalCerrarTexto: {
    fontSize: 17,
    color: '#e85d2e',
    fontWeight: '700',
  },
});
