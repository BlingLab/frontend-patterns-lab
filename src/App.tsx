import { PatternLayout } from './playground/PatternLayout';
import { patternRoutes } from './playground/routes';

export default function App() {
  return <PatternLayout routes={patternRoutes} />;
}
