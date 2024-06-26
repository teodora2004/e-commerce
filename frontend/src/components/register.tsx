import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/api/usersApiSlice";
import { setCredentials } from "../redux/features/auth/authSlice";
import Input from "./input";
import Loader from "./loader";
import loginImage from "../assets/login.svg";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state: any) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast("Passwords don't match");
      return;
    }

    try {
      const res = await register({ email, username, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully registered!");
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="mb-10">
      <section className="flex flex-nowrap justify-evenly">
        <img className="w-[50%]" src={loginImage} alt="Image" />
        <div className="w-[40%]">
          <h1 className="text-2xl font-semibold mb-4 text-customLightOrange text-center">
            Register
          </h1>
          <form onSubmit={submitHandler} className="container">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="userName"
              type="userName"
              label="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              error={!passwordsMatch ? "Passwords do not match" : null}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="w-[100%] bg-customPlum text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <div className="h-6 text-center pt-2">
              {isLoading && <Loader />}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
