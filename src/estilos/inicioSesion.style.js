import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#f35b24',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  tarjeta: {
    width: '90%',
    maxWidth: 460,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 30,

    // Sombras más profesionales
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,

    // Espaciado interno elegante
    gap: 14,
  },

  titulo: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: '#f35b24',
    marginBottom: 4,
  },

  subtitulo: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
  },

  entrada: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#f7f7f7',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    fontSize: 15,
    color: '#333',

    // Sombra sutil interior
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 20,
  },

  textoRecordarme: {
    color: '#444',
    fontSize: 14,
  },

  textoOlvido: {
    color: '#f35b24',
    fontSize: 14,
    fontWeight: '600',
  },

  botonPrincipal: {
    backgroundColor: '#f35b24',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,

    
    shadowColor: '#f35b24',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 7,
  },

  textoBoton: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  textoInferior: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    marginTop: 15,
  },

  registrate: {
    textAlign: 'center',
    color: '#f35b24',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
});
