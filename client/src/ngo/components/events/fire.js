import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyDkS8NyQjohdwDH5PqWuVVYQfzDCwK3MnE",
    authDomain: "raspberrypi-a43ed.firebaseapp.com",
    projectId: "raspberrypi-a43ed",
    storageBucket: "raspberrypi-a43ed.appspot.com",
    messagingSenderId: "335172368391",
    appId: "1:335172368391:web:fcc97e92c2957b415c92a2"
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
export default storage;
