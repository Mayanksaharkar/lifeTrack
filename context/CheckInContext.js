import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { uploadImage } from '../utils/imageStorage';

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
};

const CheckInContext = createContext(undefined);

export function CheckInProvider({ children }) {
  const [checkInData, setCheckInData] = useState(initialCheckInData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setMood = (index, label) => {
    setCheckInData((prev) => ({
      ...prev,
      mood: { index, label },
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
      // Upload image to ImgBB
      const imageUrl = await uploadImage(uri);
      
      setCheckInData((prev) => ({
        ...prev,
        imageUri: uri,
        imageUrl: imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
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

  const value = useMemo(() => ({
    checkInData,
    setMood,
    setNotes,
    setImageUri,
    setGridSelection,
    resetCheckIn,
    isSubmitting,
    setIsSubmitting,
  }), [checkInData, isSubmitting, setGridSelection]);

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
