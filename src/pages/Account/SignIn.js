import React, { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignIn = () => {
  // State variables for email, password, error messages, success message, loading state, and user list
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Handler functions to set email and password and reset error messages
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email and password
    if (!email) setErrEmail("Enter your email");
    if (!password) setErrPassword("Create a password");

    if (email && password) {
      // Simulate processing time
      setTimeout(() => {
        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (!foundUser || foundUser.status === 0) {
          alert("User or password not found");
        } else {
          sessionStorage.setItem("user", JSON.stringify(foundUser));
          foundUser.roll === 0 ? navigate("/") : navigate("/dashboard");
        }

        setLoading(false);
        // setSuccessMsg(
        //   `Hello! Thank you for logging in. We are verifying your credentials, and additional assistance will be sent to your email: ${email}`
        // );
        // setEmail("");
        // setPassword("");
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay signed in for more
            </h1>
            <p className="text-base">When you sign in, you’re with us!</p>
          </div>
          <div className="flex flex-col gap-3">
            {["Get started fast with EBAY", "Access all EBAY services", "Trusted by online shoppers"].map(
              (text, idx) => (
                <div key={idx} className="w-[300px] flex items-start gap-3">
                  <span className="text-green-500 mt-1">
                    <BsCheckCircleFill />
                  </span>
                  <p className="text-base text-gray-300">
                    <span className="text-white font-semibold font-titleFont">
                      {text}
                    </span>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              )
            )}
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © EBAY
              </p>
            </Link>
            {["Terms", "Privacy", "Security"].map((item, idx) => (
              <p key={idx} className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {/* {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        ) : ( */}
          <form onSubmit={handleSignIn} className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Work Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        {/* )} */}
      </div>
    </div>
  );
};

export default SignIn;
