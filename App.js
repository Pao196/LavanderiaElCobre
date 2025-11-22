import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

// --- 1. CONFIGURACIÓN DE FIREBASE ---
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, doc, getDoc, updateDoc, Timestamp, 
  collection, query, onSnapshot 
} from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDyvGTl21W5eQu1GUfre9MGiE23Gm_S8m0",
    authDomain: "lavanderiaelcobre-4212b.firebaseapp.com",
    projectId: "lavanderiaelcobre-4212b",
    storageBucket: "lavanderiaelcobre-4212b.firebasestorage.app",
    messagingSenderId: "250289358691",
    appId: "1:250289358691:web:05d026af7a59ecb98f3556",
};

// Inicializar Firebase solo si no existe
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();

const COLLECTIONS = {
    users: 'usuarios',
    inventario: 'inventario_gestion_7',
};

const MAIN_INTRANET_URL = "https://lavanderia-cobre-landingpage.vercel.app/intranet/dashboard";

// --- 2. CONTEXTO DE AUTENTICACIÓN ---
const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAndSetUser = async (uid, email, displayName) => {
        if (!uid) return false;
        try {
            const userDocRef = doc(db, COLLECTIONS.users, uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Actualizar último acceso en segundo plano
                updateDoc(userDocRef, { ultimo_acceso: Timestamp.now() }).catch(() => {});

                const rol = (userData.rol || userData.role || 'operario').toLowerCase();
                let mappedRole = 'operario';
                if (rol === 'administrador' || rol === 'admin') mappedRole = 'admin';

                const newUser = {
                    uid: uid,
                    email: userData.correo || userData.email || email,
                    displayName: userData.nombre || userData.displayName || displayName,
                    role: mappedRole
                };
                setUser(newUser);
                return true;
            }
        } catch (error) { 
            console.error("Error fetching user:", error); 
        }
        return false;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                if (!user || user.uid !== firebaseUser.uid) {
                    await fetchAndSetUser(firebaseUser.uid, firebaseUser.email || '', firebaseUser.displayName || '');
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const loginWithToken = async (token) => {
      if (!token) return false;
      setLoading(true);
      try {
          // Simulación: En producción usarías un Custom Token. Aquí usamos el UID directo.
          const success = await fetchAndSetUser(token, 'usuario@intranet.cl', 'Usuario Intranet');
          setLoading(false);
          return success;
      } catch (error) {
          setLoading(false);
          return false;
      }
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
        if (Platform.OS === 'web') {
            window.location.href = MAIN_INTRANET_URL;
        }
    };
    
    const value = useMemo(() => ({ user, loading, signOut, loginWithToken }), [user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

// --- 3. COMPONENTES VISUALES (Estilo Naranjo) ---

// Pantalla de Carga estilo "Naranjo" (Traducida a React Native Styles)
const LoadingScreen = ({ mensaje = "Validando credenciales...", esError = false }) => (
    <View style={styles.loadingBackground}>
        <View style={styles.loadingContent}>
            {esError ? (
                <Text style={{ fontSize: 50 }}>⚠️</Text>
            ) : (
                <ActivityIndicator size="large" color="#f97316" style={{ transform: [{ scale: 1.5 }] }} />
            )}
            
            <Text style={[styles.loadingText, esError && styles.errorText]}>
                {mensaje}
            </Text>
        </View>
    </View>
);

const DashboardScreen = ({ navigation }) => {
    const { user, signOut } = useAuth();
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Lavandería El Cobre</Text>
                    <Text style={styles.headerSubtitle}>Bienvenido, {user?.displayName}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Panel de Control</Text>
                    <Text style={styles.cardText}>Rol actual: {user?.role.toUpperCase()}</Text>
                </View>

                <View style={styles.grid}>
                    <TouchableOpacity 
                        style={styles.gridItem} 
                        onPress={() => navigation.navigate('Inventario')}
                    >
                        <Text style={styles.gridIcon}>📦</Text>
                        <Text style={styles.gridText}>Inventario</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.gridItem} 
                        onPress={() => alert('Funcionalidad en desarrollo')}
                    >
                        <Text style={styles.gridIcon}>📝</Text>
                        <Text style={styles.gridText}>Consumo</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const InventarioScreen = () => {
    const [items, setItems] = useState([]);
    const [loadingInv, setLoadingInv] = useState(true);
    
    useEffect(() => {
        const q = query(collection(db, COLLECTIONS.inventario));
        const unsub = onSnapshot(q, (snap) => {
            setItems(snap.docs.map(d => ({id: d.id, ...d.data()})));
            setLoadingInv(false);
        });
        return unsub;
    }, []);

    if (loadingInv) return <View style={styles.center}><ActivityIndicator color="#e85d2e" /></View>;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Inventario Actual</Text>
                {items.map(item => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.itemTitle}>{item.nombre}</Text>
                        <View style={styles.divider} />
                        {item.unidades?.map((u, i) => (
                            <View key={i} style={styles.row}>
                                <Text style={styles.itemText}>{u.unidad}</Text>
                                <Text style={[styles.itemText, { fontWeight: 'bold', color: '#e85d2e' }]}>
                                    {u.stock}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

// --- 4. NAVEGACIÓN ---

const Stack = createNativeStackNavigator();

function MainNavigation() {
    const { user, loading, loginWithToken } = useAuth();
    const [verifyingUrl, setVerifyingUrl] = useState(true);

    useEffect(() => {
        const checkUrl = async () => {
            if (Platform.OS === 'web') {
                try {
                    const initialUrl = await Linking.getInitialURL();
                    if (initialUrl) {
                        // Parsear la URL para buscar ?auth_token=...
                        const { queryParams } = Linking.parse(initialUrl);
                        const token = queryParams?.auth_token;

                        if (token) {
                            const success = await loginWithToken(token);
                            if (!success) {
                                // Token inválido
                                window.location.href = MAIN_INTRANET_URL;
                                return;
                            }
                        } else if (!user && !loading) {
                            // Sin token y sin sesión previa
                            window.location.href = MAIN_INTRANET_URL;
                            return;
                        }
                    } else if (!user && !loading) {
                        window.location.href = MAIN_INTRANET_URL;
                        return;
                    }
                } catch (e) {
                    console.error("Error link", e);
                }
            }
            setVerifyingUrl(false);
        };

        if (!loading) {
            checkUrl();
        }
    }, [loading, user]);

    if (loading || verifyingUrl) {
        return <LoadingScreen />;
    }

    if (!user) return null; // Redirección en proceso

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#e85d2e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
        }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Inventario" component={InventarioScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <MainNavigation />
            </AuthProvider>
        </NavigationContainer>
    );
}

// --- 5. ESTILOS NATIVOS (Traducción de tu CSS) ---
const styles = StyleSheet.create({
    // Estilo Naranjo de Carga
    loadingBackground: {
        flex: 1,
        backgroundColor: '#ffedd5', // orange-100
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContent: {
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: '600',
        color: '#ea580c', // orange-600
    },
    errorText: {
        color: '#dc2626', // red-600
    },
    
    // Estilos Generales
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 25,
        borderBottomWidth: 4,
        borderBottomColor: '#e85d2e',
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e85d2e',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#fed7aa', // orange-200
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#c2410c', // orange-700
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        color: '#444',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    gridItem: {
        width: '48%',
        backgroundColor: '#fff7ed', // orange-50
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ffcc80',
    },
    gridIcon: {
        fontSize: 30,
        marginBottom: 10,
    },
    gridText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ea580c',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    itemText: {
        fontSize: 16,
        color: '#555',
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#ef4444',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});