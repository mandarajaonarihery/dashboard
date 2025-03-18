import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/images/logos/logo.png';
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
    AdminPanelSettings, SettingsRounded
} from "@mui/icons-material";

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = { role: "ADMIN" }; // Simule un utilisateur connecté avec le rôle ADMIN

    const navigate = useNavigate();

    const navigation = [
        {
            name: 'Accueil',
            path: '/admin/home',
            icon: <DashboardIcon className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Formations',
            path: '/admin/formations',
            icon: <SchoolIcon className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Actualités',
            path: '/admin/actualities',
            icon: <NewspaperIcon className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Prix Obtenus',
            path: '/admin/prix-obtenus',
            icon: <EmojiEventsIcon className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Partenaires',
            path: '/admin/partners',
            icon: <HandshakeIcon className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Projets',
            path: '/admin/projects',
            icon: <AssignmentIcon className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Portfolio',
            path: '/admin/portfolio',
            icon: <AssignmentIcon className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Utilisateurs',
            path: '/admin/users',
            icon: <AdminPanelSettings className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        },
        {
            name: 'Parametres',
            path: '/admin/settings',
            icon: <SettingsRounded className="w-5 h-5"/>,
            requiredRoles: ['ADMIN'],
        }
    ];

    const handleLogout = () => {
      
        navigate('/login');
    };

    const handleMobile = (path) => {
        setIsMobileMenuOpen(false);
        //stocké dans la localstorage le dernier chemin visité par l'utilisateur
        localStorage.setItem('last_path', path);
        navigate(path);
    };
    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <CloseIcon className="text-[#6BA9E6] w-5 h-5"/>
                ) : (
                    <MenuIcon className="text-[#6BA9E6] w-5 h-5"/>
                )}
            </button>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-white transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="flex flex-col h-screen">
                    {/* Logo Section - Hauteur fixe */}
                    <div className="p-4 flex justify-center">
                        <div className="relative w-24 h-24">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Navigation - Espace flexible */}
                    <div className="flex-1 flex flex-col justify-between">
                        {/* Menu Items */}
                        <nav className="p-2">
                            <div className="space-y-1">
                                {navigation.filter(item => item.requiredRoles.includes(user.role)).map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({isActive}) =>
                                            `flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-all duration-200
                                            ${isActive
                                                ? 'text-[#6BA9E6] bg-blue-50 font-medium border-r-4 border-[#6BA9E6]'
                                                : 'text-gray-500 hover:text-[#6BA9E6] hover:bg-gray-50'}`
                                        }
                                        onClick={() => handleMobile(item.path)}
                                    >
                                        <span className="text-current">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </nav>

                        {/* Logout Button - Toujours en bas */}
                        <div className="p-2">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-gray-500
                                         hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                            >
                                <LogoutIcon className="w-5 h-5"/>
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;