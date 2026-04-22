import { SEO } from '../SEO';
import { ArrowRight, Building2, HardHat, Ruler, Paintbrush, Compass } from 'lucide-react';
import { TabType } from '../Sidebar';

interface WebpageTabProps {
  setActiveTab: (tab: TabType) => void;
}

export function WebpageTab({ setActiveTab }: WebpageTabProps) {
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
          <button 
            onClick={() => setActiveTab('contact')}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            Get Free Quote <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="mb-12 bg-surface p-8 md:p-12 rounded-3xl border border-border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Shape and Structure Builders is a premier construction company dedicated to transforming visions into reality. With years of experience in the industry, we have built a reputation for excellence, reliability, and innovative design.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of expert architects, engineers, and builders work collaboratively to deliver projects that not only meet but exceed our clients' expectations. From residential homes to large-scale commercial complexes, we bring the same level of dedication and craftsmanship to every project.
            </p>
          </div>
          <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden">
            <img 
              src="https://picsum.photos/seed/aboutus/800/600" 
              alt="About Us" 
              className="absolute inset-0 w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Our Specialization</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: Ruler, 
              title: "Building Design", 
              desc: "Comprehensive architectural blueprints and conceptual designs tailored to your vision.",
              bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
            },
            { 
              icon: Building2, 
              title: "Construction", 
              desc: "End-to-end execution of residential, commercial, and industrial building projects with uncompromising quality.",
              bgImage: "https://github.com/stha123surya-dotcom/website-practice/blob/main/Images/IMG_20220304_134141.jpg?raw=true"
            },
            { 
              icon: HardHat, 
              title: "Engineering", 
              desc: "Robust structural engineering, site assessments, and technical planning for maximum safety and longevity.",
              bgImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
            },
            { 
              icon: Paintbrush, 
              title: "Interior Design", 
              desc: "Aesthetic, functional, and modern interior transformations that elevate your living and working spaces.",
              bgImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
            },
            { 
              icon: Compass, 
              title: "Vastu Consultation", 
              desc: "Traditional architectural alignment to maximize natural harmony, energy, and prosperity in your environment.",
              bgImage: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?q=80&w=800&auto=format&fit=crop"
            }
          ].map((item, i) => (
            <div key={i} className="relative bg-black group rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all min-h-[300px] flex flex-col justify-end p-8">
              <img 
                src={item.bgImage} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none transition-colors duration-500" />
              
              <div className="relative z-10 text-white">
                <div className="w-14 h-14 bg-accent/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:-translate-y-2 transition-transform duration-500 shadow-lg">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/80 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
