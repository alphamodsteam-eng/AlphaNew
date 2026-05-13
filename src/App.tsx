/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  House, 
  Gamepad2, 
  Bomb, 
  Network, 
  Settings, 
  Menu, 
  Cpu,
  ChevronRight,
  User,
  Bell,
  ShieldCheck,
  History,
  HelpCircle,
  LogOut,
  Flame,
  Radio
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import GameCarousel from "./components/GameCarousel";

type Page = "HOME" | "PLAY_NOW" | "SERVER" | "SETTING";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("HOME");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{name: string, img: string} | null>(null);
  const [loadingGame, setLoadingGame] = useState<string | null>(null);

  const navItems = [
    { id: "HOME", label: "HOME", icon: House },
    { id: "PLAY_NOW", label: "PLAY NOW", icon: Gamepad2 },
    { id: "SERVER", label: "NETWORK", icon: Network },
    { id: "SETTING", label: "SETTING", icon: Settings },
  ] as const;

  const handleGameSelect = (game: {name: string, img: string}) => {
    setLoadingGame(game.name);
    setTimeout(() => {
      setSelectedGame(game);
      setLoadingGame(null);
    }, 1500); // Wait 1.5 seconds to simulate loading
  };

  const renderPage = () => {
    switch (currentPage) {
      case "HOME":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 space-y-6 pb-24"
          >
            {/* Promo Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 text-white overflow-hidden relative shadow-xl shadow-red-200/50 cursor-pointer"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  <span>Server Online</span>
                </div>
                <h2 className="text-2xl font-horror mb-1 leading-tight tracking-[0.05em] text-white drop-shadow-sm">Alpha Advanced Server</h2>
                <p className="text-red-100 text-sm opacity-90 max-w-[200px]">Get highly accurate predictions for your favorite games to maximize your winnings.</p>
              </div>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-6 -top-6 w-32 h-32 bg-red-400 rounded-full blur-2xl opacity-40"
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -right-12 -bottom-12 w-40 h-40 bg-rose-500 rounded-full blur-3xl opacity-30"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -bottom-4"
              >
                <Gamepad2 className="w-24 h-24 text-white opacity-20 -rotate-12" />
              </motion.div>
            </motion.div>

            <div>
              <div className="flex items-center justify-between px-1 mb-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Flame className="w-5 h-5 text-orange-500 fill-orange-500/20" />
                  </motion.div>
                  <h2 className="text-xl font-horror text-gray-800 tracking-wider">BEST PREDICTORS</h2>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center space-x-1.5 text-[10px] font-bold text-red-600 bg-red-50/80 px-2.5 py-1.5 rounded-lg tracking-wider border border-red-100 shadow-sm"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span className="font-tech">LIVE</span>
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Wingo Predictor", img: "https://lh3.googleusercontent.com/-USDPrEd1VYP8XSgT9TcncULTLcKRSno09eDe6HlQnXUA7wnXPbPdqqUbfSZodw9KqI" },
                  { name: "Trx Predictor", img: "https://play-lh.googleusercontent.com/ieLC3fRvJ-lIGNcei4TF4l0RBWu_04kpNI9GIQXa3-W24sJ1m5XwwkrN0mIutyrihA" },
                  { name: "Aviator Predictor", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMGpTiKx0MuuMj266bTL4vlHWJM8-1DqrAi74Z8yK5nQ" },
                  { name: "Chicken Road 2", img: "https://play-lh.googleusercontent.com/AlFw_nGMwf3ILG76Fh86xapntqdpvJvXN8syc2U6xZzMfapz-9NPZbvuwR8lmArVKik" },
                ].map((game, i) => (
                  <motion.div 
                    key={i} 
                    onClick={() => !loadingGame && handleGameSelect(game)}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 120, damping: 15 }}
                    whileHover={!loadingGame ? { y: -6, scale: 1.02 } : {}}
                    whileTap={!loadingGame ? { scale: 0.98 } : {}}
                    className="relative overflow-hidden bg-gradient-to-br from-white to-red-50/50 rounded-2xl p-2.5 shadow-sm border border-red-100 flex flex-col hover:shadow-xl hover:shadow-red-200/50 hover:border-red-200 transition-all cursor-pointer group"
                  >
                    {loadingGame === game.name && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-2xl"
                      >
                         <div className="w-8 h-8 rounded-full border-4 border-red-200 border-t-red-600 animate-spin mb-2"></div>
                         <span className="text-[10px] font-bold text-red-800 tracking-widest uppercase">Connecting...</span>
                      </motion.div>
                    )}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
                      <img 
                        src={game.img} 
                        alt={game.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
                         <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                         <span className="text-[9px] font-bold text-white tracking-widest uppercase">Online</span>
                      </div>
                    </div>
                    <h3 className="font-display font-black text-gray-800 text-[13px] tracking-tight leading-tight text-center pb-1">{game.name}</h3>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Wingo Predictor Info Box */}
            <AnimatePresence>
              {selectedGame?.name === "Wingo Predictor" && !loadingGame && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white rounded-2xl border border-red-100 p-4 shadow-xl shadow-red-200/30 mt-2 overflow-hidden relative max-w-[320px] mx-auto"
                >
                  <div className="absolute top-0 right-0 p-2 opacity-[0.02] -mr-6 -mt-6">
                    <ShieldCheck size={140} className="text-red-900" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col items-center text-center space-y-1 mb-4 border-b border-red-50 pb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-200 mb-1.5">
                        <Cpu size={24} className="animate-pulse" />
                      </div>
                      <h4 className="text-[9px] font-display font-black tracking-[0.2em] text-red-500 uppercase">Alpha Advanced System</h4>
                      <h3 className="text-base font-horror font-black text-gray-900 tracking-wider uppercase leading-tight">WINGO ANALYZER</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-3 bg-gray-50/80 p-2 rounded-xl border border-gray-100 group hover:border-red-200 transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-500 flex-shrink-0">
                          <Gamepad2 size={14} />
                        </div>
                        <div>
                          <p className="text-[8px] font-tech font-bold text-gray-400 uppercase tracking-widest">Wingo Select</p>
                          <p className="text-[10px] font-display font-black text-gray-800 uppercase">30s • 1m • 3m • 5m</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 bg-gray-50/80 p-2 rounded-xl border border-gray-100 group hover:border-red-200 transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-500 flex-shrink-0">
                          <Network size={14} />
                        </div>
                        <div>
                          <p className="text-[8px] font-tech font-bold text-gray-400 uppercase tracking-widest">Available Servers</p>
                          <p className="text-[10px] font-display font-black text-gray-800 uppercase">S1-S3 • PRO MAX</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 bg-red-50/40 p-2 rounded-xl border border-red-100 group hover:border-red-200 transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-600 flex-shrink-0">
                          <Cpu size={14} />
                        </div>
                        <div>
                          <p className="text-[8px] font-tech font-bold text-red-400 uppercase tracking-widest">Original Version</p>
                          <p className="text-[10px] font-display font-black text-red-600 uppercase tracking-wider">NEXUS AI V2.2</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 bg-gray-50/80 p-2 rounded-xl border border-gray-100 group hover:border-red-200 transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-500 flex-shrink-0">
                          <ShieldCheck size={14} />
                        </div>
                        <div>
                          <p className="text-[8px] font-tech font-bold text-gray-400 uppercase tracking-widest">LEVEL MAINTAINCE MAX</p>
                          <p className="text-[10px] font-display font-black text-gray-800 uppercase">MAINTENANCE 3/4</p>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 pt-3 border-t border-red-50 flex items-center justify-center space-x-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                      <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">SYSTEM FULLY ACTIVE</span>
                    </motion.div>

                    {/* Start Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentPage("PLAY_NOW")}
                      className="w-full mt-5 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl py-3.5 shadow-lg shadow-red-200 border border-red-500/20 flex items-center justify-center space-x-3 group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                      <Gamepad2 size={18} className="text-white" />
                      <span className="font-horror tracking-[0.1em] text-sm">START WINGO PREDICTION</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      case "PLAY_NOW":
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className={`flex-1 flex flex-col h-full bg-gray-50 relative ${selectedGame?.name === "Wingo Predictor" ? "overflow-hidden" : "overflow-y-auto pb-24"}`}
          >
            {selectedGame?.name === "Wingo Predictor" ? (
              <div className="w-full flex-1 h-[calc(100dvh-64px)] relative bg-[#c8c8c8]">
                <iframe 
                  src="https://visionary-sawine-07b8ab.netlify.app/" 
                  className="w-full h-full border-none"
                  title="Wingo Prediction System"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center p-8">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-4 border-4 border-dashed border-gray-200">
                  <Gamepad2 size={40} />
                </div>
                <h3 className="text-xl font-horror text-gray-800 uppercase tracking-widest">Select A Predictor</h3>
                <p className="text-gray-400 text-sm max-w-[240px] mt-2">Choose a game from the home page to start seeing real-time predictions.</p>
                <button 
                  onClick={() => setCurrentPage("HOME")}
                  className="mt-6 px-8 py-3 bg-red-600 text-white font-black text-xs tracking-[0.2em] rounded-xl shadow-lg shadow-red-200 uppercase"
                >
                  Go To Home
                </button>
              </div>
            )}
          </motion.div>
        );
      case "SERVER":
        return (
          <motion.div 
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            className="p-5 h-full pb-24 space-y-4"
          >
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-800 tracking-tight">System Status</h2>
                <p className="text-gray-500 text-sm">Alpha Advanced Node</p>
              </div>
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center border border-green-100">
                <Network size={24} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                 <div className="text-2xl font-black text-gray-800">12ms</div>
                 <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Latency</div>
               </div>
               <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                 <div className="text-2xl font-black text-gray-800">99.9%</div>
                 <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Uptime</div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white overflow-hidden relative shadow-lg">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    <span>Global Link Active</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">Server Cluster 01</h3>
                <p className="text-gray-400 text-xs mb-4">Handling 10k+ live predictions.</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1 font-medium text-gray-300">
                      <span>Server Load</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-red-400 h-1.5 rounded-full w-[42%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1 font-medium text-gray-300">
                      <span>Algorithm Integrity</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-green-400 h-1.5 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "SETTING":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-6 pb-24 h-full flex items-center justify-center"
          >
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[100dvh] bg-[#F9FAFB] text-gray-800 font-sans flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Top Header */}
      <header className={`flex-shrink-0 bg-red-600 px-4 py-3 flex items-center justify-between z-50 relative w-full transition-all duration-300 ${isScrolled ? 'shadow-[0_4px_30px_rgba(220,38,38,0.3)] bg-red-600/95 backdrop-blur-md' : ''}`}>
        <div className="bg-white shadow-md p-2 rounded-xl text-red-600 hover:bg-gray-50 transition-colors cursor-pointer">
          <User size={20} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-horror tracking-[0.05em] text-white text-center flex-1 mx-2 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          ALPHA ADVANCE SERVER
        </h1>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-white shadow-md p-2 rounded-xl text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Menu size={20} strokeWidth={2.5} />
        </button>
      </header>

      {/* Main Body with Sidebar and Content */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        
        {/* Content Area */}
        <main 
          onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 10)}
          className="flex-1 flex flex-col overflow-y-auto scroll-smooth bg-[#F9FAFB] pb-safe"
        >
          <AnimatePresence mode="wait">
            <div key={currentPage} className="min-h-full flex flex-col flex-1">
              {renderPage()}
            </div>
          </AnimatePresence>
        </main>

        {/* Backdrop for Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-gray-900/20 backdrop-blur-[2px] z-30"
            />
          )}
        </AnimatePresence>

        {/* Right Side Navigation (New Control) */}
        <motion.nav 
          initial={false}
          animate={{ x: isMenuOpen ? 0 : "150%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          className="absolute right-0 top-0 bottom-0 w-[4.25rem] bg-white flex-shrink-0 flex flex-col justify-center z-40 border-l border-gray-100 shadow-[-8px_0_30px_rgba(0,0,0,0.05)]"
        >
           {/* The solid vertical line on the left edge */}
           <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600" />

           <div className="flex flex-col w-full relative z-10 space-y-2 py-4">
             {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                   <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="relative flex items-center justify-center h-[4.25rem] w-full group outline-none"
                   >
                       {isActive && (
                         <motion.div
                             layoutId="active-side-nav"
                            className="absolute left-0 w-[85%] h-full bg-red-600 rounded-r-[0.75rem]"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                         >
                             {/* Top smooth curve */}
                             <div 
                               className="absolute -top-[0.75rem] left-0 w-[0.75rem] h-[0.75rem] bg-transparent" 
                               style={{ 
                                 borderBottomLeftRadius: '0.75rem', 
                                 boxShadow: '-4px 4px 0 4px #DC2626' 
                               }} 
                             />
                             {/* Bottom smooth curve */}
                             <div 
                               className="absolute -bottom-[0.75rem] left-0 w-[0.75rem] h-[0.75rem] bg-transparent" 
                               style={{ 
                                 borderTopLeftRadius: '0.75rem', 
                                 boxShadow: '-4px -4px 0 4px #DC2626' 
                               }} 
                             />
                         </motion.div>
                      )}
                      
                      <div className={`relative z-10 flex flex-col items-center justify-center transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-600'}`}>
                         <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "mb-0.5" : ""} />
                         <AnimatePresence>
                           {isActive && (
                             <motion.span 
                               initial={{ opacity: 0, height: 0, y: 5 }}
                               animate={{ opacity: 1, height: 'auto', y: 0 }}
                               exit={{ opacity: 0, height: 0, y: 5 }}
                               className="text-[8px] font-black tracking-widest mt-0.5 overflow-hidden uppercase"
                             >
                               {item.label}
                             </motion.span>
                           )}
                         </AnimatePresence>
                      </div>
                   </button>
                )
             })}
           </div>
        </motion.nav>
      </div>
    </div>
  );
}

function SettingLink({ icon: Icon, label, last }: { icon: any, label: string, last?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors group ${!last ? 'border-b border-gray-200' : ''}`}>
      <div className="flex items-center space-x-3">
        <div className="text-gray-400 group-hover:text-red-600 transition-colors">
          <Icon size={20} />
        </div>
        <span className="font-semibold text-gray-800">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
    </button>
  );
}

