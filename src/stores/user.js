import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(formData) {
      const userCred = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      usersCollection.doc(userCred.user.uid).set({
        name: formData.name,
        email: formData.email,
        age: formData.age,
        country: formData.country,
        type: formData.type,
      });

      userCred.user.updateProfile({
        displayName: userCred.user.name,
      });

      this.userLoggedIn = true;
    },
    async authenticate(formData) {
      await auth.signInWithEmailAndPassword(formData.email, formData.password);

      this.userLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();

      this.userLoggedIn = false;
    },
  },
});
