<template>
  <div
    class="text-white text-center p-4 font-bold rounded mb-4"
    :class="logAlertVariant"
    v-if="logShowAlert"
  >
    {{ logAlertMsg }}
  </div>
  <!-- Login Form -->
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="logInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>
<script>
export default {
  name: "AppLoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|min:3|max:100|email",
        password: "required|min:9|max:100|exclude:password",
      },
      logInSubmission: false,
      logShowAlert: false,
      logAlertVariant: "bg-green-500",
      logAlertMsg: "Please wait! You are Logged in.",
    };
  },
  methods: {
    login(formData) {
      this.logInSubmission = true;
      this.logShowAlert = true;
      console.log(formData);
    },
  },
};
</script>
