import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import ModalWrapper from "../../components/modal-wrapper";
import Login from "../../components/login";
import Register from "../../components/register";

interface NavItem {
  to: string;
  icon: JSX.Element;
  name: string;
}

const navigationItems: NavItem[] = [
  {
    to: "/",
    icon: (
      <div className="mr-2 mt-[3rem]">
        <AiOutlineHome size={26} />
      </div>
    ),
    name: "Home",
  },
  {
    to: "/shop",
    icon: (
      <div className="mr-2 mt-[3rem]">
        <AiOutlineShopping size={26} />
      </div>
    ),
    name: "Shop",
  },
  {
    to: "/cart",
    icon: (
      <div className="mr-2 mt-[3rem]">
        <AiOutlineShoppingCart size={26} />
      </div>
    ),
    name: "Cart",
  },
  {
    to: "/favorite",
    icon: (
      <div className="mr-2 mt-[3rem]">
        <FaHeart size={20} />
      </div>
    ),
    name: "Favorites",
  },
];

const Navigation = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall("").unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-customPlum w-[4rem] hover:w-[15%] h-[100vh] fixed"
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
              <span className="hidden nav-item-name mt-[3rem]">
                {item.name}
              </span>
            </div>
            {item.name === "Cart" && (
              <div className="absolute top-9">
                {
                  <span>
                    <span className="px-1 py-0 text-sm text-white bg-customLightOrange flex rounded-full relative w-2 h-2 top-3"></span>
                  </span>
                }
              </div>
            )}
          </Link>
        ))}
      </div>

      <ul>
        <li>
          {userInfo ? (
            <button
              onClick={logoutHandler}
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <div className="flex items-center">
                <div className="mr-2 mt-[3rem]">
                  <AiOutlineLogout size={26} />
                </div>
                <span className="hidden nav-item-name mt-[3rem]">Logout</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center"
            >
              <div className="flex items-center">
                <div className="mr-2 mt-[3rem]">
                  <AiOutlineLogin size={26} />
                </div>
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
              </div>
            </button>
          )}
        </li>
        {!userInfo && (
          <li>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="flex items-center"
            >
              <div className="flex items-center">
                <div className="mr-2 mt-[3rem]">
                  <AiOutlineUserAdd size={26} />
                </div>
                <span className="hidden nav-item-name mt-[3rem]">Register</span>
              </div>
            </button>
          </li>
        )}
      </ul>

      {showLoginModal && (
        <ModalWrapper onCloseModal={() => setShowLoginModal(false)}>
          <Login />
        </ModalWrapper>
      )}
      {showRegisterModal && (
        <ModalWrapper onCloseModal={() => setShowRegisterModal(false)}>
          <Register />
        </ModalWrapper>
      )}
    </div>
  );
};

export default Navigation;
