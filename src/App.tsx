import './style/font.css';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}></ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
