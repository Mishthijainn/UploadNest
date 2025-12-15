import AppRoutes from "./routes";
import { ThemeProvider } from "./context/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AppRoutes />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
