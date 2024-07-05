import AppNavigation from "./src/navigation";
import { LogBox } from "react-native";
// import './index.css'

LogBox.ignoreAllLogs();

export default function App() {
  return <AppNavigation />;
}
