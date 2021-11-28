import { useState } from 'react';
import { Navigate } from 'react-router';

import { useUserContext } from '../../context/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const { login, token } = useUserContext();

  const onChange = (e, save) => {
    save(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const logged = await login(username, password);

    setError(!logged);
    setUsername('');
    setPassword('');
  };

  if (token) {
    return <Navigate replace to="/redirect" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 relative overflow-hidden backdrop-filter backdrop-opacity-25">
      <main className="w-2/4 max-w-3xl h-2/4 bg-gradient-to-r from-red-400 to-pink-200  rounded-md absolute p-8 md:p-10 shadow-2xl">
        <form
          className="flex flex-col gap-4 items-center justify-center"
          onSubmit={onSubmitHandler}
        >
          <h2 className="uppercase text-gray-800 font-monserrat font-black text-4xl mb-4">
            PROGRAWEB
          </h2>

          {error && (
            <p className="w-full rounded p-3 text-center text-white font-roboto bg-red-700 select-none">
              Un error ha ocurrido en el inicio de sesión
            </p>
          )}

          <input
            className="font-medium w-full text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
            type="text"
            placeholder="e.g. username"
            onChange={(e) => onChange(e, setUsername)}
          />
          <input
            className="font-medium w-full text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
            type="password"
            placeholder="e.g password"
            onChange={(e) => onChange(e, setPassword)}
          />
          <button className="mt-6 w-full transition rounded-full border border-black duration-300 ease-in-out text-xl text-extrabold uppercase bg-black hover:bg-blue-700 py-2 px-4 text-gray-100 ">
            Sign In{' '}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
