import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 22,
    backgroundColor: '#fff5ee',
  },

  titulo: { 
    fontSize: 28,
    fontWeight: '800',
    color: '#e85d2e',
    marginBottom: 25,
    textAlign: 'center',
  },

  item: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 15,

    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f7c9a1',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  texto: { 
    fontSize: 17,
    fontWeight: '700',
    color: '#e85d2e',
    marginBottom: 4,
  },

  subtexto: { 
    fontSize: 14,
    color: '#555',
  },

  botonAgregar: {
    marginTop: 20,
    alignSelf: 'center',

    backgroundColor: '#e85d2e',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 14,

    shadowColor: '#e85d2e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },

  textoBoton: { 
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  vacio: { 
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    marginTop: 35,
  },

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5ee',
  },

  textoCargando: { 
    marginTop: 12,
    fontSize: 15,
    color: '#666',
  },
});
