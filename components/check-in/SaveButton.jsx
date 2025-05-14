import { Box, Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CheckCircle } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { useCheckIn } from "../../context/CheckInContext";
import { db } from "../../firebaseConfig";
import { router } from "expo-router";

export default function SaveButton() {
  const {
    checkInData,
    isSubmitting,
    setIsSubmitting,
    resetCheckIn,
    fetchCheckIns,
  } = useCheckIn();
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const checkInDataToSave = {
        userId: user.uid,
        timestamp: serverTimestamp(),
        ...checkInData,
      };

      const docRef = await addDoc(
        collection(db, "check-ins"),
        checkInDataToSave
      );
      console.log("Check-in saved with ID:", docRef.id);
      resetCheckIn(); // Reset form after successful save
    } catch (error) {
      console.error("Error saving check-in:", error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
      await fetchCheckIns(user);
      router.push("/home");
    }
  };

  return (
    <Box px="$4" mt="$2" mb="$5">
      <Button
        className="rounded-full"
        backgroundColor="$blue500"
        onPress={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Spinner color="white" />
        ) : (
          <>
            <CheckCircle size={20} color="white" />
            <ButtonText className="ml-2 text-white">Save</ButtonText>
          </>
        )}
      </Button>
    </Box>
  );
}
