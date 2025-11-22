import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// Esto es necesario para que Expo Web funcione correctamente.
registerRootComponent(App);