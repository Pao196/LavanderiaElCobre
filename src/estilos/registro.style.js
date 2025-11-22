import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#f35b24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f35b24',
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginBottom: 25,
  },
  entrada: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  botonPrincipal: {
    backgroundColor: '#f35b24',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoInferior: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  registrate: {
    textAlign: 'center',
    color: '#f35b24',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
  },
});
