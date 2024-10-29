import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { logoLight } from "../../assets/images";
const SignUp = () => {
  // ============= Initial State Start here =============
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Error messages
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");

  useEffect(() => {
    fetch("http://localhost:9999/user")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Email Validation
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!firstName) {
      setErrFirstName("Enter your first name");
      isValid = false;
    }
    if (!lastName) {
      setErrLastName("Enter your last name");
      isValid = false;
    }
    if (!email) {
      setErrEmail("Enter your email");
      isValid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a valid email");
      isValid = false;
    }
    if (!phone) {
      setErrPhone("Enter your phone number");
      isValid = false;
    }
    if (!password) {
      setErrPassword("Create a password");
      isValid = false;
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
      isValid = false;
    }
    if (!address) {
      setErrAddress("Enter your address");
      isValid = false;
    }

    if (isValid && checked) {
      const newUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone,
        address: address,
        email: email,
        password: password,
        roll: 0,
      };

      fetch("http://localhost:9999/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Failed to register. Please try again.");
          }
          return response.json();
        })
        .then(() => {
          setSuccessMsg(
            `Hello ${firstName} ${lastName}, welcome to our platform! Your registration was successful.`
          );
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setAddress("");
          navigate("/signin");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with EBAY
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all EBAY services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © EBAY
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="text-center">
            <p className="text-green-500 font-semibold">{successMsg}</p>
            <Link to="/signin">
              <button className="w-full h-10 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign up
              </h1>

            {/* First Name */}
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setErrFirstName(""); }}
                className="w-full p-2 border rounded"
                placeholder="John"
              />
              {errFirstName && <p className="text-red-500 text-sm">{errFirstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setErrLastName(""); }}
                className="w-full p-2 border rounded"
                placeholder="Doe"
              />
              {errLastName && <p className="text-red-500 text-sm">{errLastName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrEmail(""); }}
                className="w-full p-2 border rounded"
                placeholder="john@example.com"
              />
              {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrPhone(""); }}
                className="w-full p-2 border rounded"
                placeholder="123-456-7890"
              />
              {errPhone && <p className="text-red-500 text-sm">{errPhone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrPassword(""); }}
                className="w-full p-2 border rounded"
                placeholder="Create a password"
              />
              {errPassword && <p className="text-red-500 text-sm">{errPassword}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => { setAddress(e.target.value); setErrAddress(""); }}
                className="w-full p-2 border rounded"
                placeholder="123 Main St"
              />
              {errAddress && <p className="text-red-500 text-sm">{errAddress}</p>}
            </div>

            {/* Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="mr-2"
              />
              <span className="text-gray-700">
                I agree to the <span className="text-blue-600">Terms of Service</span> and{" "}
                <span className="text-blue-600">Privacy Policy</span>.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full p-2 mt-4 text-white rounded ${
                checked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
              }`}
              disabled={!checked}
            >
              Create Account
            </button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
