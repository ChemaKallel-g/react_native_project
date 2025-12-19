// index.js (ou index.ts)
import { AppRegistry } from 'react-native';
import App from './App'; // Importe votre nouveau fichier App.tsx
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);