import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ExitIntentPopup from "./components/ExitIntentPopup";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Contact from "./pages/Contact";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ProductCategory from "./pages/ProductCategory";
import ServiceDetail from "./pages/ServiceDetail";
import { getProductCategoryBySlug, getServiceBySlug } from "@/lib/landingPages";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={() => <Layout><Home /></Layout>} />
      <Route path={"/products"} component={() => <Layout><Products /></Layout>} />
      <Route path={"/products/security-alarm-systems"} component={() => <Layout><ProductCategory category={getProductCategoryBySlug("security-alarm-systems")!} /></Layout>} />
      <Route path={"/products/cctv-systems"} component={() => <Layout><ProductCategory category={getProductCategoryBySlug("cctv-systems")!} /></Layout>} />
      <Route path={"/products/electric-fence-systems"} component={() => <Layout><ProductCategory category={getProductCategoryBySlug("electric-fence-systems")!} /></Layout>} />
      <Route path={"/products/fire-detection-systems"} component={() => <Layout><ProductCategory category={getProductCategoryBySlug("fire-detection-systems")!} /></Layout>} />
      <Route path={"/products/gate-automation-systems"} component={() => <Layout><ProductCategory category={getProductCategoryBySlug("gate-automation-systems")!} /></Layout>} />
      <Route path={"/products/home-automation-systems"} component={() => <Layout><ProductCategory category={getProductCategoryBySlug("home-automation-systems")!} /></Layout>} />
      <Route path={"/services"} component={() => <Layout><Services /></Layout>} />
      <Route path={"/services/24-7-monitoring"} component={() => <Layout><ServiceDetail service={getServiceBySlug("24-7-monitoring")!} /></Layout>} />
      <Route path={"/services/armed-response"} component={() => <Layout><ServiceDetail service={getServiceBySlug("armed-response")!} /></Layout>} />
      <Route path={"/services/preventive-maintenance"} component={() => <Layout><ServiceDetail service={getServiceBySlug("preventive-maintenance")!} /></Layout>} />
      <Route path={"/services/security-audits"} component={() => <Layout><ServiceDetail service={getServiceBySlug("security-audits")!} /></Layout>} />
      <Route path={"/services/security-guards"} component={() => <Layout><ServiceDetail service={getServiceBySlug("security-guards")!} /></Layout>} />
      <Route path={"/services/security-escort-service"} component={() => <Layout><ServiceDetail service={getServiceBySlug("security-escort-service")!} /></Layout>} />
      <Route path={"/services/event-security"} component={() => <Layout><ServiceDetail service={getServiceBySlug("event-security")!} /></Layout>} />
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
          <Toaster />
          <GoogleAnalytics />
          <Router />
          <ExitIntentPopup />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
