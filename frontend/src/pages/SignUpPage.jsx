import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import FloatingParticles from "../components/FloatingParticles";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355] relative overflow-hidden">
      <FloatingParticles />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-6xl md:h-[800px] z-10"
      >
        <BorderAnimatedContainer>
          {/* Title Bar */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-[#8B6F47] to-[#6B5433] border-b-4 border-black flex items-center justify-between px-4 z-50">
            <span className="text-2xl font-bold text-white font-vt323" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
              SIGNUP.TXT
            </span>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-[#5E8E62] border-2 border-black flex items-center justify-center">
                <span className="text-white text-lg leading-none">−</span>
              </div>
              <div className="w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center">
                <span className="text-white text-lg leading-none">×</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row pt-10 h-full">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r-4 border-black bg-gradient-to-br from-[#3A6A3F] to-[#2F5F2F]">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#5E8E62] border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-mc">
                    <MessageCircleIcon className="w-10 h-10 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3 font-vt323" style={{textShadow: '3px 3px 0 rgba(0,0,0,1)'}}>
                    CREATE ACCOUNT
                  </h2>
                  <p className="text-white text-2xl font-vt323" style={{textShadow: '2px 2px 0 rgba(0,0,0,0.8)'}}>
                    Sign up for a new account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* FULL NAME */}
                  <div>
                    <label className="block text-white text-xl font-bold mb-1 font-vt323 tracking-widest">FULL NAME</label>
                    <div className="relative group">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white z-20" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.5))'}} />
                      <input
                        type="text"
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        className="w-full bg-[#4A7C4E] border-4 border-black p-3 pl-14 text-white text-xl font-vt323 focus:outline-none focus:border-white shadow-mc-inner placeholder-[#a0c7a3]"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-white text-xl font-bold mb-1 font-vt323 tracking-widest">EMAIL</label>
                    <div className="relative group">
                      <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white z-20" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.5))'}} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#4A7C4E] border-4 border-black p-3 pl-14 text-white text-xl font-vt323 focus:outline-none focus:border-white shadow-mc-inner placeholder-[#a0c7a3]"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-white text-xl font-bold mb-1 font-vt323 tracking-widest">PASSWORD</label>
                    <div className="relative group">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white z-20" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.5))'}} />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-[#4A7C4E] border-4 border-black p-3 pl-14 text-white text-xl font-vt323 focus:outline-none focus:border-white shadow-mc-inner placeholder-[#a0c7a3]"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ y: 4 }}
                    className="w-full bg-[#5E8E62] border-4 border-black py-4 text-white text-2xl font-bold shadow-mc hover:bg-[#6FA073] mt-4 font-vt323"
                    type="submit" 
                    disabled={isSigningUp}
                    style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}
                  >
                    {isSigningUp ? <LoaderIcon className="w-8 h-8 animate-spin mx-auto" /> : "CREATE ACCOUNT"}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="text-white text-xl font-vt323 hover:underline underline-offset-4" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
                    ALREADY HAVE AN ACCOUNT? LOGIN
                  </Link>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-8 bg-gradient-to-bl from-[#4A7C4E] to-[#3A6A3F]">
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="border-4 border-black shadow-mc-xl p-4 bg-[#5E8E62] mb-8"
              >
                <img src="/signup.png" alt="Signup" className="w-full h-auto object-contain" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-6 font-vt323 tracking-wider" style={{textShadow: '3px 3px 0 rgba(0,0,0,1)'}}>
                Start Your Journey Today
              </h3>
              <div className="flex justify-center gap-4">
                {["FREE", "EASY SETUP", "PRIVATE"].map(tag => (
                  <span key={tag} className="px-4 py-1 bg-[#8B7355] border-4 border-black text-white font-vt323 text-xl shadow-mc" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </motion.div>
    </div>
  );
}

export default SignUpPage;