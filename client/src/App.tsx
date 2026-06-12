import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { PassportPage } from "./pages/PassportPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useAuthStore } from "./store/authStore";
import { BackgroundAudio } from "./components/ui/BackgroundAudio";
import { EconomyPage } from "./pages/EconomyPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "whitelist", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "passport", element: <PassportPage /> },
      { path: "economy", element: <EconomyPage /> },
    ],
  },
]);

export default function App() {
  const bootstrap = useAuthStore((s) => s.bootstrap);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return (
    <>
      <RouterProvider router={router} />

      <BackgroundAudio
        src="/audio/blackbox-Classified Thunder.mp3"
         coverImage="/audio/blackbox-cover.jpg"
          title="Classified Thunder"
          subtitle="Blackbox Division Theme"
         volume={0.25}
        storageKey="t9x-global-audio-enabled"
      />
    </>
  );
}