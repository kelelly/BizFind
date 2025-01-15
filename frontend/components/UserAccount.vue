<template>
  <div class="user-account">
    <!-- Registration Form -->
    <div v-if="view === 'register'">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <label>
          Username:
          <input type="text" v-model="user.username" required />
        </label>
        <label>
          Email:
          <input type="email" v-model="user.email" required />
        </label>
        <label>
          Password:
          <input type="password" v-model="user.password" required />
        </label>
        <button type="submit">Register</button>
        <p>
          Already have an account? <a @click="view = 'login'">Login here</a>
        </p>
      </form>
    </div>

    <!-- Forgot Password Form -->
    <div v-else-if="view === 'forgotPassword'">
      <h2>Forgot Password</h2>
      <form @submit.prevent="forgotPassword">
        <label>
          Email:
          <input type="email" v-model="forgotPasswordEmail" required />
        </label>
        <button type="submit">Submit</button>
        <p>
          Remembered your password? <a @click="view = 'login'">Login here</a>
        </p>
      </form>
    </div>

    <!-- Reset Password Form -->
    <div v-else-if="view === 'resetPassword'">
      <h2>Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <label>
          New Password:
          <input type="password" v-model="newPassword" required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script>
let UserAccount = {
  setup() {
    let view = ref('register'); // Default view
    let user = ref({
      username: '',
      email: '',
      password: ''
    });
    let forgotPasswordEmail = ref('');
    let newPassword = ref('');
    let resetToken = ref(useRoute().query.token); // Assumes reset token is passed as a query parameter
    let router = useRouter();

    const register = async () => {
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user.value)
        });
        alert('Registration successful! Please log in.');
        view.value = 'login'; // Redirect to login view after successful registration
      } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed. Please try again.');
      }
    };

    const forgotPassword = async () => {
      try {
        const response = await fetch('/api/users/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotPasswordEmail.value })
        });
        alert('Password reset link sent! Check your email.');
        view.value = 'login'; // Redirect to login view after sending reset link
      } catch (error) {
        console.error('Error sending password reset link:', error);
        alert('Failed to send password reset link. Please try again.');
      }
    };

    const resetPassword = async () => {
      try {
        const response = await fetch(`/api/users/reset-password/${resetToken.value}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: newPassword.value })
        });
        alert('Password reset successful! You can now log in with your new password.');
        router.push({ name: 'login' }); // Redirect to login after successful password reset
      } catch (error) {
        console.error('Error resetting password:', error);
        alert('Password reset failed. Please try again.');
      }
    };

    return {
      view,
      user,
      forgotPasswordEmail,
      newPassword,
      register,
      forgotPassword,
      resetPassword
    };
  }
};
</script>

<style scoped>
.user-account {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff; /* White background */
  color: #1b1b1b; /* Dark blue (almost black) text color */
}

.user-account h2 {
  margin-bottom: 1em;
}

.user-account form {
  display: flex;
  flex-direction: column;
}

.user-account form label {
  margin-bottom: 0.5em;
}

.user-account form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-account form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.user-account form button:hover {
  background-color: #0056b3;
}

.user-account p {
  margin-top: 1em;
}

.user-account a {
  color: #007bff;
  cursor: pointer;
}

.user-account a:hover {
  text-decoration: underline;
}
</style>
