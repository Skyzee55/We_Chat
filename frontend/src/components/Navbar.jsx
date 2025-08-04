import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-50 bg-base-100 border-b border-base-300 shadow-sm backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-base-content">WeChat</span>
        </Link>

        {/* Right: User Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="hover:bg-primary/10 rounded-full p-2 transition"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-base-content" />
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="hover:bg-primary/10 rounded-full p-2 transition"
                title="Profile"
              >
                <User className="w-5 h-5 text-base-content" />
              </Link>

              <button
                onClick={logout}
                className="hover:bg-error/10 text-error rounded-full p-2 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
