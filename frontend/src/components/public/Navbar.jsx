import { Link } from "react-router-dom";
import PillNav from "@/components/PillNav";

export default function Navbar() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  return (
    <div
  className="absolute top-6 right-6 w-[30%] 
             bg-gray-900 bg-opacity-80 backdrop-blur-xl 
             shadow-lg rounded-3xl 
             flex justify-end items-center 
             py-8 px-8 z-50"
  style={{ minHeight: "100px" }}
>
      {/* Flex wrapper for alignment */}
      <div
        className="flex items-center space-x-16 w-full"
        style={{
          minHeight: "20px", // ensure pills vertically centered
        }}
      >
        <PillNav
          items={navItems.map((item) => ({
            ...item,
            component: (
              <Link
                to={item.href}
                className="text-white font-semibold hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                {item.label}
              </Link>
            ),
          }))}
        />
      </div>
    </div>
  );
}
