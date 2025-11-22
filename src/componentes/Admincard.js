import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AdminCard({ texto, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.textoCard}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ffb84d',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    elevation: 2,
  },
  textoCard: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
});
