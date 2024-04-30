import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import Input from "../../components/input";
import loginImage from "../../assets/login.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: any) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }))
      navigate('/');
    } catch (error: any) {
      toast.error(error?.data?.message || error.message)
    }
  }

  return (
    <div className="mb-10">
      <section className="flex flex-nowrap justify-evenly">
        <img className="w-[50%]" src={loginImage} alt="Image" />
        <div className="">
          <h1 className="text-2xl font-semibold mb-4 text-customLightOrange text-center">Sign in</h1>

          <form onSubmit={submitHandler} className="container">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={isLoading}
              type="submit"
              className="w-[100%] bg-customPlum text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="h-6 text-center pt-2">
              {isLoading && <Loader />}
            </div>


            <div className="mt-4 align-bottom">
              <p className="text-black">
                New Customer?
                <Link to='/register' className="mx-3 text-customDarkOrange hover:underline">Register now!</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
