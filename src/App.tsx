import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar, TabType } from './components/Sidebar';
import { WebpageTab } from './components/tabs/WebpageTab';
import { AppToolsTab } from './components/tabs/AppToolsTab';
import { ProjectsTab } from './components/tabs/ProjectsTab';
import { BlogsTab } from './components/tabs/BlogsTab';
import { OffersTab } from './components/tabs/OffersTab';
import { ContactTab } from './components/tabs/ContactTab';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const getActiveTab = (): TabType => {
    const path = location.pathname.split('/')[1];
    switch (path) {
      case 'tools': return 'tools';
      case 'projects': return 'projects';
      case 'blogs': return 'blogs';
      case 'offers': return 'offers';
      case 'contact': return 'contact';
      default: return 'webpage';
    }
  };
  const activeTab = getActiveTab();

  const setActiveTab = (tab: TabType) => {
    if (tab === 'webpage') {
      navigate('/');
    } else {
      navigate(`/${tab}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-primary text-primary-foreground sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-lg">
              <img 
                src="https://github.com/stha123surya-dotcom/website-practice/blob/main/Images/logo.png?raw=true" 
                alt="Logo" 
                className="h-7 w-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-7 h-7 bg-accent rounded-md flex items-center justify-center font-bold text-xs shadow-sm text-white">
                S&S
              </div>
            </div>
            <span className="font-bold tracking-wide">Shape & Structure</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<WebpageTab setActiveTab={setActiveTab} />} />
              <Route path="/tools" element={<AppToolsTab selectedTool={selectedTool} setSelectedTool={setSelectedTool} />} />
              <Route path="/projects" element={<ProjectsTab />} />
              <Route path="/blogs" element={<BlogsTab />} />
              <Route path="/blogs/:blogId" element={<BlogsTab />} />
              <Route path="/offers" element={<OffersTab setActiveTab={setActiveTab} />} />
              <Route path="/contact" element={<ContactTab />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
