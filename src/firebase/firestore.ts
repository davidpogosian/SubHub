// src/firebase/firestore.ts

import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./config";

// Initialize Firestore
const db = getFirestore(app);
export default db;


