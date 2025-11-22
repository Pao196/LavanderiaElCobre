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
    fontWeight: 'bold',
    color: '#e85d2e',
    textAlign: 'center',
    marginBottom: 20,
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

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  boton: {
    width: '75%',
    backgroundColor: '#e85d2e',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  botonSecundario: {
    width: '75%',
    backgroundColor: '#ffb84d',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  lista: {
    width: '75%',
    backgroundColor: '#fff7f2',
    borderRadius: 12,
    padding: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ffd7a3',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  itemUnidad: {
    fontSize: 15,
    paddingVertical: 4,
    color: '#444',
  },

  botonVolver: {
    width: '75%',
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  textoBotonVolver: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
