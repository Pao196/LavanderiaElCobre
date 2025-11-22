import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff5ee',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e85d2e',
    marginBottom: 5,
  },
  subtexto: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e85d2e',
    marginBottom: 10,
  },
  entrega: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#ffebd6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e85d2e33',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  insumo: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
  vacio: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5ee',
  },
  textoCargando: {
    marginTop: 10,
    color: '#555',
  },
  menuCRUD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  botonCRUD: {
    backgroundColor: '#e85d2e',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
