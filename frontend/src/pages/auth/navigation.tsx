import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";


interface NavItem {
  to: string;
  icon: JSX.Element;
  name: string;
}

const navigationItems: NavItem[] = [
  { to: '/', icon: <AiOutlineHome className="mr-2 mt-[3rem]"  size={26} />, name: 'Home' },
  { to: '/shop', icon: <AiOutlineShopping className="mr-2 mt-[3rem]"  size={26} />, name: 'Shop' },
  { to: '/cart', icon: <AiOutlineShoppingCart className="mr-2 mt-[3rem]"  size={26} />, name: 'Cart' },
  { to: '/favorite', icon: <FaHeart className="mr-2 mt-[3rem]"  size={20} />, name: 'Favorites' }
]

const Navigation = () => {
  const {userInfo} = useSelector((state: any) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall('').unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[6%] hover:w-[15%] h-[100vh] fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
      {navigationItems.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <div className="flex items-center">
            {item.icon}
            <span className="hidden nav-item-name mt-[3rem]">{item.name}</span>
          </div>
          {item.name === 'Cart' && (
            <div className="absolute top-9">
            {(
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 flex rounded-full relative w-2 h-2 top-3">
                </span>
              </span>
            )}
          </div>
          )}
        </Link>
      ))}
      </div>

      <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center text-gray-8000 focus">
              {userInfo ? <span className="text-white">{userInfo.username}</span> : (<></>)}
              </button>
      </div>

      <ul>
        <li>
          <Link 
            to='/login'
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Login</span>

          </Link>
        </li>
        <li>
          <Link 
            to='/login'
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Register</span>
          </Link>
        </li>
      </ul>
  
    </div>
  );
};

export default Navigation;