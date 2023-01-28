import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    loadDocument();
  }, [docCollection, cancelled, id]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
