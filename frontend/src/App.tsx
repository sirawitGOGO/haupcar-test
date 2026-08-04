import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import HomePage from "./pages/HomePage"

const queryClint = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClint}>
      <HomePage />
    </QueryClientProvider>
  )
}

export default App
