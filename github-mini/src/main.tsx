import './index.css'
import App from './App.tsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
   <App />
</QueryClientProvider>

