import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355] relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - Minecraft-style background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 16px),
              repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 16px)
            `,
            backgroundSize: '16px 16px'
          }}
        />
      </div>
      
      {/* Floating blocks decoration */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-[#5E8E62] border-4 border-black opacity-20 shadow-mc" 
        style={{animation: 'float1 4s ease-in-out infinite'}} 
      />
      <div className="absolute top-20 right-20 w-16 h-16 bg-[#8B7355] border-4 border-black opacity-20 shadow-mc" 
        style={{animation: 'float2 5s ease-in-out infinite'}} 
      />
      <div className="absolute bottom-20 left-32 w-10 h-10 bg-[#C6A664] border-4 border-black opacity-20 shadow-mc"
        style={{animation: 'float3 6s ease-in-out infinite'}} 
      />
      <div className="absolute bottom-32 right-40 w-14 h-14 bg-[#2F5F2F] border-4 border-black opacity-20 shadow-mc"
        style={{animation: 'float1 5.5s ease-in-out infinite'}} 
      />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#5E8E62',
            color: '#fff',
            border: '4px solid #1a1a1a',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
            fontFamily: 'VT323, monospace',
            fontSize: '20px',
            textShadow: '2px 2px 0 rgba(0,0,0,1)',
          },
        }}
      />

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}

export default App;