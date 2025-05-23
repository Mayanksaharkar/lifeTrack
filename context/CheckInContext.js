import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
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

export const CheckInProvider = ({ children }) => {
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

  const setGridSelection = useCallback((gridType, selectionOrUpdater) => {
    setCheckInData(prev => {
      // Get existing grids or initialize empty object
      const prevGrids = prev.grids || {};
      
      // Calculate the new selection - handle both direct value and updater function
      const newSelection = typeof selectionOrUpdater === 'function'
        ? selectionOrUpdater(prevGrids[gridType])
        : selectionOrUpdater;
      
      return {
        ...prev,
        grids: {
          ...prevGrids,
          [gridType]: newSelection
        }
      };
    });
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

  const contextValue = useMemo(
    () => ({
      checkInData,
      setCheckInData,
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
    [checkInData, setMood, setGridSelection, isSubmitting, checkInDisplay]
  );

  return (
    <CheckInContext.Provider value={contextValue}>
      {children}
    </CheckInContext.Provider>
  );
};

export function useCheckIn() {
  const context = useContext(CheckInContext);
  if (context === undefined) {
    throw new Error("useCheckIn must be used within a CheckInProvider");
  }
  return context;
}
