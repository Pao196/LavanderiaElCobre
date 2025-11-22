import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioSesionPantalla from '../pantallas/Auth/InicioSesionPantalla';
import RegistroPantalla from '../pantallas/Auth/RegistroPantalla';

import AlertasPantalla from '../pantallas/Operario/AlertasPantalla';
import InicioPantalla from '../pantallas/Operario/InicioPantalla';
import InventarioPantalla from '../pantallas/Operario/InventarioPantalla';
import RegistroConsumoPantalla from '../pantallas/Operario/RegistroConsumoPantalla';

import AdminPantalla from '../pantallas/Admin/AdminPantalla';
import AgregarPedidos from '../pantallas/Admin/AgregarPedidos';
import AgregarProveedor from '../pantallas/Admin/AgregarProveedor';
import EditarProveedor from '../pantallas/Admin/EditarProveedor';
import GestionProveedores from '../pantallas/Admin/GestionProveedores';
import InventarioAdmin from '../pantallas/Admin/InventarioAdmin';
import ListaProveedores from '../pantallas/Admin/ListaProveedores';
import ReportesInsumos from '../pantallas/Admin/ReportesInsumos';
import AgregarNuevoInsumoPantalla from '../pantallas/Admin/AgregarNuevoInsumoPantalla';
import AgregarUnidadInsumoPantalla from '../pantallas/Admin/AgregarUnidadInsumoPantalla';

import { headerOptions } from '../estilos/navegacion.style';

const Stack = createNativeStackNavigator();

export default function NavegacionApp() {
  return (
    <Stack.Navigator
      initialRouteName="InicioSesion"
      screenOptions={headerOptions}
    >
      <Stack.Screen name="InicioSesion" component={InicioSesionPantalla} />
      <Stack.Screen name="Registro" component={RegistroPantalla} />

      <Stack.Screen name="Inicio" component={InicioPantalla} />
      <Stack.Screen name="RegistroConsumo" component={RegistroConsumoPantalla} />
      <Stack.Screen name="Inventario" component={InventarioPantalla} />
      <Stack.Screen name="Alertas" component={AlertasPantalla} />

      <Stack.Screen name="Admin" component={AdminPantalla} />
      <Stack.Screen name="InventarioAdmin" component={InventarioAdmin} />
      <Stack.Screen name="GestionProveedores" component={GestionProveedores} />
      <Stack.Screen name="ReportesInsumos" component={ReportesInsumos} />
      <Stack.Screen name="ListaProveedores" component={ListaProveedores} />
      <Stack.Screen name="AgregarProveedor" component={AgregarProveedor} />
      <Stack.Screen name="EditarProveedor" component={EditarProveedor} />
      <Stack.Screen name="AgregarPedidos" component={AgregarPedidos} />
      <Stack.Screen name="AgregarNuevoInsumo" component={AgregarNuevoInsumoPantalla} />
      <Stack.Screen name="AgregarUnidadInsumo" component={AgregarUnidadInsumoPantalla} />

    </Stack.Navigator>
  );
}
