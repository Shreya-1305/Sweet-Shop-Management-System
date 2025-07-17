import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isManagementPage = location.pathname === "/sweet-management";

  return (
    <nav className="bg-[#FFB343] text-[#614419] px-6 py-2 shadow-md w-full">
      <div className="relative flex items-center justify-center">
        {/* Center - Title */}
        <h1 className="text-3xl font-bold tracking-wide">Sweet Shop</h1>

        {/* Right - Manage Stock Link (only if not on /sweet-management) */}
        {!isManagementPage && (
          <Link
            to="/sweet-management"
            className="absolute right-6 text-[#614419] text-lg font-medium px-3 py-1 rounded-md transition duration-300 hover:bg-[#FFE7B2] hover:text-[#5a3600] no-underline"
            style={{ textDecoration: "none" }}
          >
            Manage Stock
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
