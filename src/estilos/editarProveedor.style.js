import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 25,
    backgroundColor: '#fff5ee',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#e85d2e',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 0.4,
  },


  label: {
    alignSelf: 'flex-start',
    marginLeft: '15%',    
    width: '70%',
    fontSize: 15,
    fontWeight: '700',
    color: '#e85d2e',
    marginTop: 12,
    marginBottom: 6,
  },

 
  input: {
    width: '70%',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ffb84d',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },


  botonGuardar: {
    width: '70%',
    backgroundColor: '#e85d2e',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 28,
    alignItems: 'center',

    shadowColor: '#e85d2e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textoBotonGuardar: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 0.3,
  },


  botonVolver: {
    width: '70%',
    borderWidth: 1.8,
    borderColor: '#e85d2e',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 18,
    marginBottom: 30,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  textoBotonVolver: {
    textAlign: 'center',
    color: '#e85d2e',
    fontWeight: '800',
    fontSize: 15,
  },


  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5ee',
  },

  loadingText: {
    fontSize: 16,
    marginTop: 15,
    color: '#555',
  },
});
