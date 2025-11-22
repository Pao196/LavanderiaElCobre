import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 28,
    color: '#ff6b35',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 25,
  },

  tarjetaUsuario: {
    width: '92%',
    maxWidth: 440,
    backgroundColor: '#fff7f2',
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#ffb84d',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,

    alignItems: 'center',
    marginBottom: 35,
  },

  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff6b35',
    marginBottom: 4,
  },

  correo: {
    fontSize: 15,
    color: '#777',
  },

  menu: {
    width: '100%',
    maxWidth: 450,
    gap: 18,
    marginBottom: 40,
  },

  card: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ffb84d',
    borderRadius: 14,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 3,
  },

  textoCard: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },

  botonSalir: {
    backgroundColor: '#e85d2e',
    paddingVertical: 14,
    borderRadius: 14,
    width: '23%',
    alignSelf: 'center',

    shadowColor: '#e85d2e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  textoBotonSalir: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCargando: {
    marginTop: 10,
    color: '#777',
    fontSize: 15,
  },
});
