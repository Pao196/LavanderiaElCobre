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
    marginBottom: 25,
    letterSpacing: 0.3,
  },


  alertaBox: {
    backgroundColor: '#fdecdc',    
    padding: 18,
    borderRadius: 16,
    marginBottom: 28,
  },


  alertaCard: {
    backgroundColor: '#fff4e8',     
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#f4b183',     
  },

  alertaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },

  alertaDetalle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },

  alertaDetalleMin: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  vacio: {
    textAlign: 'center',
    color: '#777',
    marginTop: 25,
    fontSize: 15,
    fontStyle: 'italic',
  },

  botonVolver: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },

  textoBotonVolver: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
