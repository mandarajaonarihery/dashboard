
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const user = { role: "USER" };

    const getInitials = (name) => {
        return name
            ? name.split(' ').map(n => n[0]).join('').toUpperCase()
            : user?.email?.charAt(0).toUpperCase();
    };

    return (
        <header className="bg-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-end">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 bg-gray-50 py-2 px-4 rounded-lg">
                                    <AccountCircleIcon className="text-[#6BA9E6]"/>
                                    <span className="text-gray-600 font-medium">{user?.email}</span>
                                </div>

                                <div className="relative">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6BA9E6] to-[#1E90FF] flex items-center justify-center text-white font-medium shadow-lg cursor-pointer hover:opacity-90 transition-all duration-300">
                                        {getInitials(user?.name)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile User Icon */}
                        <div className="md:hidden">
                            <div
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6BA9E6] to-[#1E90FF] flex items-center justify-center text-white font-medium shadow-lg">
                                {getInitials(user?.name)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;