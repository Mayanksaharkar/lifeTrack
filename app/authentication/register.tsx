import {
  Box,
  Button,
  Input,
  InputField,
  InputIcon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { useAuth } from "@/context/AuthContext";
export default function RegisterScreen() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { handleRegister } = useAuth();
  return (
    <Box style={styles.container}>
      <VStack space="lg">
        {/* Name */}
        <Input style={styles.input} variant="rounded" size="lg">
          <InputIcon as={User} />
          <InputField
            placeholder="Name"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
        </Input>

        {/* Email */}
        <Input style={styles.input} variant="rounded" size="lg">
          <InputIcon as={Mail} />
          <InputField
            placeholder="Email"
            keyboardType="email-address"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
        </Input>

        {/* Password */}
        <Input style={styles.input} variant="rounded" size="lg">
          <InputIcon as={Lock} />
          <InputField
            placeholder="Password"
            secureTextEntry
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
          />
        </Input>

        {/* Register Button */}
        <Button onPress={() => handleRegister(user)} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Button>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
    marginTop: 40,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
