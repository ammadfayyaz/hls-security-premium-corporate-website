import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SEO from "./components/SEO";
import ExitIntentPopup from "./components/ExitIntentPopup";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={() => <Layout><Home /></Layout>} />
      <Route path={"/products"} component={() => <Layout><Products /></Layout>} />
      <Route path={"/services"} component={() => <Layout><Services /></Layout>} />
      <Route path={"/solutions"} component={() => <Layout><Solutions /></Layout>} />
      <Route path={"/contact"} component={() => <Layout><Contact /></Layout>} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <SEO />
          <Toaster />
          <Router />
          <ExitIntentPopup />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
