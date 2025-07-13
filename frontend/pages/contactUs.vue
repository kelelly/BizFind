<template>
  <div class="contact-us">
    <h1>Contact Us</h1>
    <p>
      We'd love to hear from you! If you have any questions, feedback, or need
      assistance, please reach out using the contact form below.
    </p>

    <form @submit.prevent="sendMessage">
      <label>
        Name:
        <input type="text" v-model="contact.name" required />
      </label>
      <label>
        Email:
        <input type="email" v-model="contact.email" required />
      </label>
      <label>
        Message:
        <textarea v-model="contact.message" required></textarea>
      </label>
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Sending..." : "Send Message" }}
      </button>
    </form>

    <div class="contact-info">
      <h2>Our Contact Information</h2>
      <p>Email: in4bizfind.com</p>
      <p>Phone: +254742584681</p>
      <p>Facebook Page: @BizzareEmpire</p>
      <p>X Handle: @BizEmperor</p>
      <p>Address: Baraton Street, Box 2500-30100, Eldoret</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "~/utils/supabase"; // ✅ use your centralized client

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const isSubmitting = ref(false);
const contact = ref<ContactForm>({
  name: "",
  email: "",
  message: "",
});

const sendMessage = async () => {
  isSubmitting.value = true;
  try {
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: contact.value.name,
        email: contact.value.email,
        message: contact.value.message,
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to send your message. Please try again.");
    } else {
      alert("Your message has been sent successfully!");
      contact.value = { name: "", email: "", message: "" };
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("An error occurred while sending your message.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-us {
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
  background-color: #ffffff;
  color: #1b1b1b;
}

.contact-us h1 {
  margin-bottom: 1em;
}

.contact-us form {
  display: flex;
  flex-direction: column;
}

.contact-us form label {
  margin-bottom: 0.5em;
}

.contact-us form input,
.contact-us form textarea {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-us form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}

.contact-us form button:hover {
  background-color: #0056b3;
}

.contact-info {
  margin-top: 2em;
}

.contact-info h2 {
  margin-bottom: 1em;
}

.contact-info p {
  margin-bottom: 0.5em;
}
</style>
