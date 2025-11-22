import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff5ee',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff5ee',
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#e85d2e',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 0.3,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7ef',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#ffb97a',
    padding: 15,
    marginVertical: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  itemInfo: {
    flex: 1,
  },

  itemNombre: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },

  itemCantidad: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
  },

  indicador: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 12,
  },

  vacio: {
    textAlign: 'center',
    color: '#777',
    marginTop: 25,
    fontSize: 15,
    fontStyle: 'italic',
  },

  botonVolver: {
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1.8,
    borderColor: '#e85d2e',
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 25,
    marginBottom: 40,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 2,
  },

  textoBotonVolver: {
    textAlign: 'center',
    color: '#e85d2e',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5ee',
  },

  textoCargando: {
    marginTop: 10,
    color: '#777',
    fontSize: 15,
  },
});
