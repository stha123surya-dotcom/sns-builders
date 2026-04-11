import { useState, useEffect } from 'react';
import { SEO } from '../SEO';
import { Calculator, Ruler, Compass, Hammer, LogIn, LogOut } from 'lucide-react';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';

export function AppToolsTab() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const tools = [
    { name: "Material Estimator", icon: Calculator, desc: "Calculate concrete, bricks, and steel requirements." },
    { name: "Unit Converter", icon: Ruler, desc: "Convert between metric and imperial construction units." },
    { name: "Area Planner", icon: Compass, desc: "Plan floor areas and plot dimensions easily." },
    { name: "Project Tracker", icon: Hammer, desc: "Track construction phases and milestones." },
  ];

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full"></div></div>;
  }

  if (!user) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <SEO title="App Tools Login" description="Login to access our construction tools." />
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <Hammer size={40} className="text-accent" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Access App Tools</h1>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          Please log in to access our suite of professional construction and estimation tools.
        </p>
        <button 
          onClick={handleLogin}
          className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <LogIn size={20} /> Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="App Tools" 
        description="Experience our construction and building tools to help you plan and estimate your projects." 
      />
      
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Experience our Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Welcome back, {user.displayName}! We provide a suite of digital tools to help you estimate materials, plan spaces, and track your construction projects efficiently.
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, i) => (
          <div key={i} className="group bg-surface p-6 rounded-2xl border border-border hover:border-accent transition-colors cursor-pointer flex gap-6 items-start">
            <div className="w-16 h-16 shrink-0 bg-muted group-hover:bg-accent/10 rounded-2xl flex items-center justify-center text-primary group-hover:text-accent transition-colors">
              <tool.icon size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{tool.name}</h3>
              <p className="text-muted-foreground">{tool.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
