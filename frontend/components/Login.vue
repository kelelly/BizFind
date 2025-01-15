<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <label>
        <input type="radio" value="user" v-model="accountType" /> User
        <input type="radio" value="business" v-model="accountType" /> Business
      </label>
      <button type="submit">Login</button>
      <p>
        Don't have an account? <a @click="$router.push({ name: 'Register' })">Register here</a>
      </p>
      <p>
        <a @click="$router.push({ name: 'ForgotPassword' })">Forgot Password?</a>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let Login = {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const accountType = ref('user');

    const login = async () => {
      try {
        const endpoint = accountType.value === 'business' ? '/api/business/login' : '/api/users/login';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        const redirectRoute = accountType.value === 'business' ? 'BusinessDashboard' : 'UserDashboard';
        router.push({ name: redirectRoute });
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please check your credentials.');
      }
    };

    return {
      email,
      password,
      accountType,
      login,
    };
  },
};
</script>

<style scoped>
.login {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff; /* White background */
  color: #1b1b1b; /* Dark blue (almost black) text color */
}

.login h2 {
  margin-bottom: 1em;
}

.login form {
  display: flex;
  flex-direction: column;
}

.login form label {
  margin-bottom: 0.5em;
}

.login form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.login form button:hover {
  background-color: #0056b3;
}

.login p {
  margin-top: 1em;
}

.login a {
  color: #007bff;
  cursor: pointer;
}

.login a:hover {
  text-decoration: underline;
}
</style>
