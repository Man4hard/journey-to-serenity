import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import Progress from "./pages/Progress";
import Tools from "./pages/Tools";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import LanguageToggle from "@/components/LanguageToggle";
import BottomNav from "@/components/BottomNav";
import EmergencyButton from "@/components/EmergencyButton";
import AchievementWatcher from "@/components/AchievementWatcher";
import { useApp } from "@/contexts/AppContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { hasOnboarded } = useApp();

  return (
    <BrowserRouter>
      {/* Achievement watcher for sounds & haptics */}
      <AchievementWatcher />
      
      {hasOnboarded && (
        <>
          <LanguageToggle />
          <EmergencyButton />
          <BottomNav />
        </>
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AppProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
