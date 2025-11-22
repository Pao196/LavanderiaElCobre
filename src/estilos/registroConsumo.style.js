import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff5ee',
  },

  container: {
    flexGrow: 1,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff5ee',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e85d2e',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    width: '75%',
    alignSelf: 'flex-start',
    marginLeft: '12.5%',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#e85d2e',
  },

  input: {
    width: '75%',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ffb84d',
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    color: '#000',
    elevation: 2,
  },

  botonRegistrar: {
    width: '75%',
    backgroundColor: '#e85d2e',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
  },

  textoBotonRegistrar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  botonVolver: {
    width: '75%',
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },

  textoBotonVolver: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    padding: 16,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e85d2e',
    marginBottom: 10,
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
    marginTop: 12,
    backgroundColor: '#e85d2e',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  modalCerrarTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
