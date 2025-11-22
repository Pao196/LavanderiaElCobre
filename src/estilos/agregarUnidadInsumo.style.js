import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 22,
    backgroundColor: '#fff5ee',
    flexGrow: 1,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#e85d2e',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.4,
  },

  label: {
    width: '60%',              
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
    color: '#e85d2e',
    alignSelf: 'flex-start',   
    marginLeft: '20%',         
  },

  input: {
    width: '60%',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ffb84d',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    fontSize: 15,
    color: '#7a7777ff',

    shadowColor: '#777575ff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },

  boton: {
    width: '60%',
    backgroundColor: '#e85d2e',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',

    shadowColor: '#e85d2e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  botonVolver: {
    width: '60%',
    backgroundColor: '#6c757d',
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  textoBotonVolver: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    width: '85%',
    maxHeight: '75%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 10,
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
    marginTop: 18,
    paddingVertical: 12,
    backgroundColor: '#e85d2e',
    borderRadius: 10,
    alignItems: 'center',
  },

  modalCerrarTexto: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
