import { SEO } from '../SEO';
import { Calculator, Ruler, Compass, Hammer } from 'lucide-react';

export function AppToolsTab() {
  const tools = [
    { name: "Material Estimator", icon: Calculator, desc: "Calculate concrete, bricks, and steel requirements." },
    { name: "Unit Converter", icon: Ruler, desc: "Convert between metric and imperial construction units." },
    { name: "Area Planner", icon: Compass, desc: "Plan floor areas and plot dimensions easily." },
    { name: "Project Tracker", icon: Hammer, desc: "Track construction phases and milestones." },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="App Tools" 
        description="Experience our construction and building tools to help you plan and estimate your projects." 
      />
      
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Experience our Tools</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          We provide a suite of digital tools to help you estimate materials, plan spaces, and track your construction projects efficiently.
        </p>
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
