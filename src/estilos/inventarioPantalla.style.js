import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffaf4',
  },

  container: {
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#e85d2e',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  insumoBox: {
    backgroundColor: '#fdecdc',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },

  insumoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  cardUnidad: {
    backgroundColor: '#fff4e8',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#f4b183',
  },

  detalle: {
    fontSize: 16,
    marginBottom: 3,
  },

  detalleMin: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  vacio: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },

  cardColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
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
});
