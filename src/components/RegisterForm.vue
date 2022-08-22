<template>
  <div
    class="text-white text-center p-4 font-bold rounded mb-4"
    :class="regAlertVariant"
    v-if="regShowAlert"
  >
    {{ regAlertMsg }}
  </div>
  <!-- Registration Form -->
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
        name="name"
      />
      <error-message class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        name="email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <error-message class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" #default="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600 block" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
        name="confirm_password"
      />
      <error-message class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <error-message class="text-red-600" name="country" />
    </div>
    <!-- Type -->
    <div class="mb-3">
      <label class="inline-block mb-2">Type</label>
      <vee-field
        as="select"
        name="type"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Artist">Artist</option>
        <option value="Listener">Listener</option>
      </vee-field>
      <error-message class="text-red-600" name="type" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        value="1"
      />
      <label class="inline-block">Accept terms of service</label>
      <error-message class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 disabled:bg-purple-400 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="regInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
  name: "AppRegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:9|max:100|exclude:password",
        confirm_password: "confirmed:@password",
        country: "required|country_excluded:Antartica",
        tos: "tos",
        type: "required",
      },
      userData: {
        country: "USA",
        tos: "1",
        type: "Listener",
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariant: "bg-blue-500",
      regAlertMsg: "Please wait! You are Logged in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(formData) {
      this.regInSubmission = true;
      this.regShowAlert = true;
      this.regAlertVariant = "bg-blue-500";
      this.regAlertMsg = "Loading, You are being registered!";

      try {
        await this.createUser(formData);
      } catch (error) {
        this.regInSubmission = false;
        this.regShowAlert = true;
        this.regAlertVariant = "bg-red-500";
        this.regAlertMsg = "Something went wrong, Please try again!";
        return;
      }

      this.regInSubmission = true;
      this.regShowAlert = true;
      this.regAlertVariant = "bg-green-500";
      this.regAlertMsg = "Success, You have Signed up successfully!";
      window.location.reload();
    },
  },
};
</script>
