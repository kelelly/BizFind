<template>
  <!-- same template as before -->
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const user = ref({
      username: '',
      email: '',
      password: ''
    });
    const newPassword = ref('');
    const view = ref('profile'); // Default view

    async function fetchUserProfile() {
      try {
        const response = await fetch('/api/users/profile');
        user.value = await response.json();
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    async function updateProfile() {
      try {
        const { password,...userData } = user.value;
        await fetch('/api/users/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...userData, password })
        });
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Profile update failed. Please try again.');
      }
    }

    async function resetPassword() {
      try {
        await fetch('/api/users/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: newPassword.value })
        });
        alert('Password reset successful!');
        newPassword.value = ''; // Clear the new password field
      } catch (error) {
        console.error('Error resetting password:', error);
        alert('Password reset failed. Please try again.');
      }
    }

    onMounted(fetchUserProfile);

    return {
      user,
      newPassword,
      view,
      updateProfile,
      resetPassword
    };
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.user-profile h2 {
  margin-bottom: 1em;
}

.user-profile form {
  display: flex;
  flex-direction: column;
}

.user-profile form label {
  margin-bottom: 0.5em;
}

.user-profile form input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-profile form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.user-profile form button:hover {
  background-color: #0056b3;
}

.user-profile p {
  margin-top: 1em;
}

.user-profile a {
  color: #007bff;
  cursor: pointer;
}

.user-profile a:hover {
  text-decoration: underline;
}
</style>
