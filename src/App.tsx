import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./firebase/config";
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(getAuth(app), provider);
        const user = result.user;
        console.log("Signed in user:", user);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
};

function App() {
    const [count, setCount] = useState(0)
    const [phone, setPhone] = useState("")

    async function initialize() {
        console.log("init");
        try {
            const fs = getFirestore(app);
            
            const userDocRef = doc(fs, "user", "uid");
            console.log(userDocRef);
            const userQuerySnapshot = await getDoc(userDocRef);

            if (userQuerySnapshot.exists()) {
                const user = userQuerySnapshot.data();
                console.log("User data:", user);
                if (user.phone) {
                    setPhone(user.phone);
                } else {
                    console.log("Phone field not found in document");
                }
            } else {
                console.log("Document user/doc2 does not exist");
            }
        } catch (error) {
            console.error("Error fetching user document:", error);
        }
    }


    useEffect(() => {
        initialize();
    }, [])

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
                <button onClick={signInWithGoogle}>Sign in with Google</button>
                <p>Phone: {phone}</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App

