import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5ee",
    paddingVertical: 25,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e85d2e",
    marginBottom: 25,
    textAlign: "center",
  },

  item: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 18,

    borderWidth: 1.5,
    borderColor: "#ffb97a",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  nombre: {
    fontSize: 21,
    fontWeight: "700",
    color: "#e85d2e",
    marginBottom: 12,
  },

  unidadBox: {
    backgroundColor: "#fff8f2",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1.2,
    borderColor: "#ffd8b0",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },

  textoFila: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },

  vacio: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
});
