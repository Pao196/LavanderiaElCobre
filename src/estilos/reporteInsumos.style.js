import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5ee',
  },

  content: {
    padding: 25,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e85d2e',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitulo: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 28,
    fontSize: 16,
  },

  boton: {
    width: '60%',           
    alignSelf: 'center',   
    paddingVertical: 12,    
    borderRadius: 14,
    marginVertical: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  botonSemanal: {
    backgroundColor: '#e85d2e',
  },

  botonMensual: {
    backgroundColor: '#ffb84d',
  },

  textoBoton: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },

  botonVolver: {
    width: '60%',            
    alignSelf: 'center',    
    marginTop: 25,
    backgroundColor: '#6c757d',
    paddingVertical: 12,     
    borderRadius: 14,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  textoVolver: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  loadingBox: {
    marginTop: 40,
    paddingVertical: 50,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  loadingText: {
    color: '#e85d2e',
    marginTop: 14,
    fontSize: 16,
    fontWeight: '700',
  },
});
