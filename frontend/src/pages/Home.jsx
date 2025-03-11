import React, { useRef } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
const Home = () => {
  const nameRef = useRef(null);
  //   const [user, setUser] = useState(null);

  //   const handleGoogleSignIn = async () => {
  //     const userData = await signInWithGoogle();
  //     setUser(userData);
  //   };

  //   const handleLogout = async () => {
  //     await logout();
  //     setUser(null);
  //   };
  //   const ref = collection(firebase);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameRef.current.value.trim() === "") {
      alert("Please enter a name!");
      return;
    }

    try {
      await addDoc(collection(firestore, "users"), {
        name: nameRef.current.value,
        timestamp: new Date(),
      });
      alert("Data saved successfully!");
      nameRef.current.value = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div>
      <h1>Hello firebase</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          ref={nameRef}
        />
        <button type="submit">SAve</button>
      </form>
    </div>
  );
};

export default Home;
