import { SEO } from '../SEO';
import { ArrowRight, Building2, HardHat, Ruler } from 'lucide-react';

export function WebpageTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Home" 
        description="Welcome to Shape and Structure Builders. Building your dreams with quality on-time projects." 
      />
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground mb-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/construction/1920/1080?blur=2')] bg-cover bg-center" />
        <div className="relative z-10 p-8 md:p-16 lg:p-20 flex flex-col items-start max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-accent text-accent-foreground text-xs font-bold tracking-wider uppercase mb-6">
            Building Your Dreams
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Welcome to the Shape and Structure Builders
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
            Our goal then and now is to provide quality on-time projects. We specialize in residential, commercial, and industrial construction.
          </p>
          <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            Get Free Quote <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Our Specialization</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: "Commercial", desc: "Modern office spaces and retail centers built to last." },
            { icon: HardHat, title: "Residential", desc: "Custom homes and renovations tailored to your lifestyle." },
            { icon: Ruler, title: "Architecture", desc: "Innovative design and structural planning services." }
          ].map((item, i) => (
            <div key={i} className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-accent mb-6">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
