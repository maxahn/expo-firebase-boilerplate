import { useContext } from "react";

import FirebaseContext, {
  FirebaseProvider,
} from "../services/Firebase/FirebaseContext";

const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error("Context must be used inside the Provider");

  return context;
};

export { FirebaseContext, FirebaseProvider, useFirebase };
