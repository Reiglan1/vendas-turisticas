import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo.webp";

interface MenuItem {
  label: string;
  hasSubmenu?: boolean;
  submenuItems?: string[];
  link?: string;
}

export default function HeaderApp() {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems: MenuItem[] = [
    {
      label: "Citytours brasília",
      hasSubmenu: true,
      submenuItems: ["Pacotes", "Roteiros", "Passeios", "Reservas"],
    },
    {
      label: "LojaBSBTUR",
      hasSubmenu: true,
      submenuItems: ["Produtos", "Promoções", "Carrinho", "Minha Conta"],
    },
    {
      label: "Blog & Dicas",
      link: "/",
    },
    {
      label: "Sobre nós",
      link: "/sobre-nos",
    },
    {
      label: "Contato",
      link: "/",
    },
  ];

  const handleMouseEnter = (label: string) => {
    // Cancela qualquer timeout pendente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    const item = menuItems.find((item) => item.label === label);
    if (item?.hasSubmenu) {
      setOpenSubmenu(label);
    }
  };

  const handleMouseLeave = () => {
    // Adiciona um pequeno delay antes de fechar para dar tempo do mouse chegar ao submenu
    timeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 150);
  };

  const handleClick = (label: string) => {
    const item = menuItems.find((item) => item.label === label);
    if (item?.hasSubmenu) {
      setOpenSubmenu(openSubmenu === label ? null : label);
    }
  };

  return (
    <header className="bg-gradient-to-r from-azul-1 to-blue-700 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container flex items-center justify-between lg:justify-center py-5 uppercase font-bold text-white">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img className="w-10 h-10" src={Logo} alt="Logo" />
          </Link>
          <div className="w-px h-10 bg-white hidden lg:block"></div>
        </div>

        {/* Hamburger Button - Mobile Only */}
        <button
          className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-0">
          {menuItems.map((item, index) => (
          <div key={item.label} className="flex items-center gap-0">
            <div
              className="relative group cursor-pointer px-5"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(item.label)}
            >
              {item.link ? (
                <Link 
                  to={item.link}
                  className="flex items-center gap-1 hover:text-amarelo-1 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <div className="flex items-center gap-1 hover:text-amarelo-1 whitespace-nowrap">
                  {item.label}
                  {item.hasSubmenu && (
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openSubmenu === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              )}

              {item.hasSubmenu && openSubmenu === item.label && (
                <div
                  className="absolute top-full left-0 pt-1 bg-transparent min-w-[200px] z-50"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-azul-1 text-white rounded shadow-lg mt-1">
                    {item.submenuItems?.map((subItem) => (
                      <div
                        key={subItem}
                        className="px-4 py-3 cursor-pointer transition-colors first:rounded-t last:rounded-b hover:text-amarelo-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Aqui você pode adicionar a navegação para cada item]
                          console.log(`Navegar para: ${subItem}`);
                        }}
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {index < menuItems.length - 1 && (
              <div className="w-px h-10 bg-white"></div>
            )}
          </div>
        ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[70px] left-0 right-0 bg-blue-500 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container py-4">
          {menuItems.map((item) => (
            <div key={item.label} className="border-b border-blue-400">
              {item.link ? (
                <Link
                  to={item.link}
                  className="flex items-center justify-between py-3 cursor-pointer text-white hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div
                  className="flex items-center justify-between py-3 cursor-pointer text-white hover:text-blue-200 transition-colors"
                  onClick={() => handleClick(item.label)}
                >
                  <span>{item.label}</span>
                  {item.hasSubmenu && (
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        openSubmenu === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              )}

              {/* Mobile Submenu */}
              {item.hasSubmenu && openSubmenu === item.label && (
                <div className="bg-blue-600 rounded-md mb-3">
                  {item.submenuItems?.map((subItem) => (
                    <div
                      key={subItem}
                      className="px-4 py-2 text-white hover:bg-blue-700 cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Navegar para: ${subItem}`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
