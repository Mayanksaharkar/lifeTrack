import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Alert } from "react-native";
import { db } from "../firebaseConfig";
import { uploadImage } from "../utils/imageStorage";

const initialCheckInData = {
  mood: {
    index: null,
    label: null,
  },
  notes: "",
  imageUri: null,
  imageUrl: null,
  grids: {
    emotions: [],
    people: [],
    weather: [],
    meals: [],
    selfCare: [],
    other: [],
  },
  checkInDate: "",
};

const CheckInContext = createContext(undefined);

export function CheckInProvider({ children }) {
  const [checkInData, setCheckInData] = useState(initialCheckInData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInDisplay, setCheckInDisplay] = useState([]);

  const setMood = (index, label) => {
    setCheckInData((prev) => ({
      ...prev,
      mood: { index, label },
    }));
  };

  const fetchCheckIns = async (user) => {
    if (!user?.uid) return;
    try {
      const q = query(
        collection(db, "check-ins"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCheckInDisplay(data);
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };

  const setCheckInDate = (date) => {
    setCheckInData((prev) => ({
      ...prev,
      checkInDate: date,
    }));
  };

  const setNotes = (notes) => {
    setCheckInData((prev) => ({
      ...prev,
      notes,
    }));
  };

  const setImageUri = async (uri) => {
    if (!uri) {
      setCheckInData((prev) => ({
        ...prev,
        imageUri: null,
        imageUrl: null,
      }));
      return;
    }

    try {
      setIsSubmitting(true);
      const imageUrl = await uploadImage(uri);
      setCheckInData((prev) => ({
        ...prev,
        imageUri: uri,
        imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setGridSelection = useCallback((gridType, selections) => {
    setCheckInData((prev) => ({
      ...prev,
      grids: {
        ...prev.grids,
        [gridType]: selections,
      },
    }));
  }, []);

  const resetCheckIn = () => {
    setCheckInData(initialCheckInData);
  };

  const deleteCheckIn = async (id) => {
    try {
      const checkInRef = doc(db, "check-ins", id);
      await deleteDoc(checkInRef);
      setCheckInDisplay((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting check-in:", error);
      Alert.alert("Error", "Failed to delete check-in. Please try again.");
    }
  };

  const value = useMemo(
    () => ({
      checkInData,
      setMood,
      setNotes,
      setImageUri,
      setGridSelection,
      resetCheckIn,
      isSubmitting,
      setIsSubmitting,
      setCheckInDate,
      checkInDisplay,
      setCheckInDisplay,
      fetchCheckIns,
      deleteCheckIn,
    }),
    [checkInData, isSubmitting, setGridSelection, checkInDisplay]
  );

  return (
    <CheckInContext.Provider value={value}>{children}</CheckInContext.Provider>
  );
}

export function useCheckIn() {
  const context = useContext(CheckInContext);
  if (context === undefined) {
    throw new Error("useCheckIn must be used within a CheckInProvider");
  }
  return context;
}
