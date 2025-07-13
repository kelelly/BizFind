<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { useUserStore } from "~/stores/user";
import { onMounted } from "vue";
import { supabase } from "~/utils/supabase";

const { getSession } = useAuth();
const userStore = useUserStore();

// Fetch initial session on app load
onMounted(async () => {
  await getSession();
});

// Realtime auth state tracking
supabase.auth.onAuthStateChange((event, session) => {
  userStore.setUser(session?.user || null);
});
</script>

<style>
body {
  background-color: #f5f5f5;
  color: #333;
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 20px;
}

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.header,
.footer {
  background-color: #003366;
  color: #fff;
  padding: 1em;
}

.footer {
  text-align: center;
  margin-top: auto;
}
</style>
