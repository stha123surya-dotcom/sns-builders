import { SEO } from '../SEO';
import { ArrowRight, Building2, HardHat, Ruler, Paintbrush, Compass } from 'lucide-react';
import { TabType } from '../Sidebar';

const TESTIMONIALS = [
  {
    name: "Ravindra Shrestha",
    location: "Hetauda",
    project: "Residential Building Design",
    message: "Shape and Structure Builders transformed our vision into reality. Their attention to detail in our residential building design was just exceptional. Highly recommended!",
    bgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Dilmaya Shrestha",
    location: "Birgunj",
    project: "Residential Building",
    message: "We are absolutely thrilled with our new home. The construction quality is top-notch and the team was incredibly professional throughout the entire process.",
    bgImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Gyaneshwori Shrestha",
    location: "",
    project: "Interior Design and Construction",
    message: "The interior design and construction exceeded our expectations. They perfectly balanced aesthetics with functionality to create our dream space.",
    bgImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Manoj Sah",
    location: "Rautahat",
    project: "Residential design and Interior",
    message: "A truly seamless experience from design to interior finishing. They perfectly understood our requirements and delivered a beautifully crafted home.",
    bgImage: "https://images.unsplash.com/photo-1600607687930-cebc5a7df222?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Susma Mishra",
    location: "Lalitpur",
    project: "Residential design and Interior",
    message: "Outstanding residential design and interior work! The team was highly responsive, brought innovative ideas, and executed everything flawlessly.",
    bgImage: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=800&auto=format&fit=crop"
  }
];

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

      {/* Testimonials Section */}
      <section className="mb-12 overflow-hidden bg-surface py-12 rounded-3xl border border-border shadow-sm">
        <div className="px-8 md:px-12 mb-10">
          <h2 className="text-3xl font-bold">Client Testimonials</h2>
        </div>
        
        <div className="relative flex overflow-hidden w-full group cursor-grab active:cursor-grabbing pb-4">
          <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
            {/* First set of testimonials */}
            <div className="flex gap-6 px-3">
              {TESTIMONIALS.map((t, i) => (
                <div key={`orig-${i}`} className="relative w-[350px] md:w-[450px] h-[320px] rounded-3xl overflow-hidden shrink-0 group/card shadow-lg border border-border">
                  <img src={t.bgImage} alt={t.project} className="absolute inset-0 w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 group-hover/card:bg-black/70 transition-colors duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                    <div className="text-lg md:text-xl italic text-white/90 leading-relaxed font-medium">
                      "{t.message}"
                    </div>
                    <div>
                      <div className="w-12 h-1 bg-accent mb-4 rounded-full shadow-sm"></div>
                      <h4 className="font-bold text-xl drop-shadow-sm">{t.name} {t.location ? <span className="text-white/80 font-medium">({t.location})</span> : ''}</h4>
                      <p className="text-sm font-bold text-accent mt-1 tracking-wide uppercase drop-shadow-sm">{t.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate set for perfectly seamless scroll loop */}
            <div className="flex gap-6 px-3">
              {TESTIMONIALS.map((t, i) => (
                <div key={`dup-${i}`} className="relative w-[350px] md:w-[450px] h-[320px] rounded-3xl overflow-hidden shrink-0 group/card shadow-lg border border-border">
                  <img src={t.bgImage} alt={t.project} className="absolute inset-0 w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 group-hover/card:bg-black/70 transition-colors duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                    <div className="text-lg md:text-xl italic text-white/90 leading-relaxed font-medium">
                      "{t.message}"
                    </div>
                    <div>
                      <div className="w-12 h-1 bg-accent mb-4 rounded-full shadow-sm"></div>
                      <h4 className="font-bold text-xl drop-shadow-sm">{t.name} {t.location ? <span className="text-white/80 font-medium">({t.location})</span> : ''}</h4>
                      <p className="text-sm font-bold text-accent mt-1 tracking-wide uppercase drop-shadow-sm">{t.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
