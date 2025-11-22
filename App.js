import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  ScrollView
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

// Configuración directa
const firebaseConfig = {
    apiKey: "AIzaSyDyvGTl21W5eQu1GUfre9MGiE23Gm_S8m0",
    authDomain: "lavanderiaelcobre-4212b.firebaseapp.com",
    projectId: "lavanderiaelcobre-4212b",
    storageBucket: "lavanderiaelcobre-4212b.firebasestorage.app",
    messagingSenderId: "250289358691",
    appId: "1:250289358691:web:05d026af7a59ecb98f3556",
};

// Inicializar solo si no existe
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
          // Simulación: Login con UID directo
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

// --- 3. COMPONENTES DE PANTALLA (Usando React Native) ---

const LoadingScreen = () => (
    <View style={styles.loadingContainer}>
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#e85d2e" />
        </View>
        <Text style={styles.loadingText}>Validando credenciales...</Text>
    </View>
);

const DashboardScreen = ({ navigation }) => {
    const { user, signOut } = useAuth();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Bienvenido, {user?.displayName}</Text>
                <Text style={styles.cardText}>Rol: {user?.role.toUpperCase()}</Text>
            </View>

            <View style={styles.menuGrid}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Inventario')}>
                    <Text style={styles.menuText}>📦 Inventario</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => alert('Próximamente')}>
                    <Text style={styles.menuText}>📝 Consumo</Text>
                </TouchableOpacity>
                {user?.role === 'admin' && (
                    <TouchableOpacity style={[styles.menuItem, styles.adminItem]} onPress={() => alert('Admin')}>
                        <Text style={styles.menuText}>⚙️ Admin</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const InventarioScreen = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const q = query(collection(db, COLLECTIONS.inventario));
        const unsub = onSnapshot(q, (snap) => {
            setItems(snap.docs.map(d => ({id: d.id, ...d.data()})));
        });
        return unsub;
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Inventario</Text>
            {items.map(item => (
                <View key={item.id} style={styles.card}>
                    <Text style={styles.itemTitle}>{item.nombre}</Text>
                    {item.unidades?.map((u, i) => (
                        <Text key={i} style={styles.itemText}>• {u.stock} {u.unidad}</Text>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

// --- 4. LÓGICA DE NAVEGACIÓN Y CONTROL DE ACCESO ---

const Stack = createNativeStackNavigator();

function Navigation() {
    const { user, loading, loginWithToken } = useAuth();
    const [isCheckingUrl, setIsCheckingUrl] = useState(true);

    useEffect(() => {
        const checkUrlToken = async () => {
            if (Platform.OS === 'web') {
                // Forma segura de obtener URL en Expo Web
                try {
                    const url = await Linking.getInitialURL();
                    if (url) {
                        // Parsear manualmente si Linking.parse falla o no trae queryParams
                        const urlObj = new URL(url);
                        const params = new URLSearchParams(urlObj.search);
                        const token = params.get('auth_token');

                        if (token) {
                            const success = await loginWithToken(token);
                            if (!success) {
                                window.location.href = MAIN_INTRANET_URL;
                                return;
                            }
                        } else if (!user && !loading) {
                            window.location.href = MAIN_INTRANET_URL;
                            return;
                        }
                    } else if (!user && !loading) {
                         window.location.href = MAIN_INTRANET_URL;
                         return;
                    }
                } catch (e) {
                    console.error("Error parsing URL", e);
                    if (!user) window.location.href = MAIN_INTRANET_URL;
                }
            }
            setIsCheckingUrl(false);
        };

        if (!loading) {
            checkUrlToken();
        }
    }, [loading, user]);

    if (loading || isCheckingUrl) {
        return <LoadingScreen />;
    }

    if (!user) return null; 

    return (
        <Stack.Navigator screenOptions={{ 
            headerStyle: { backgroundColor: '#e85d2e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
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
                <Navigation />
            </AuthProvider>
        </NavigationContainer>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff5ee', 
    },
    spinnerContainer: {
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#e85d2e', 
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e85d2e',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff5ee',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ffccbc',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d84315',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        color: '#555',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    menuItem: {
        width: '48%',
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adminItem: {
        backgroundColor: '#fff3e0',
        borderWidth: 1,
        borderColor: '#e85d2e',
    },
    menuText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#d32f2f',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemText: {
        fontSize: 15,
        color: '#666',
        marginTop: 5,
    }
});