import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffaf4',   
  },

  container: {
    flex: 1,
    padding: 20,                  
  },

  titulo: {
    fontSize: 24,                 
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#e85d2e',
  },


  alertaBox: {
    backgroundColor: '#fdecdc',   
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },


  alertaCard: {
    backgroundColor: '#fff4e8',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#f4b183',   
  },

  alertaTitulo: {
    fontSize: 20,                 
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  alertaDetalle: {
    fontSize: 16,
    marginBottom: 3,
    color: '#333',
  },

  alertaDetalleMin: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  vacio: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },

  botonVolver: {
    backgroundColor: '#6c757d', 
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    backgroundColor: '#fffaf4',
  },

  textoCargando: {
    marginTop: 10,
    color: '#777',
    fontSize: 15,
  },
});
