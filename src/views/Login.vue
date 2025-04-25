<template>
  <div
    class="min-h-screen flex items-center justify-center bg-dark-primary p-4 sm:p-6"
  >
    <div
      class="w-full max-w-lg bg-dark-secondary rounded-xl p-8 sm:p-10 shadow-lg border border-dark-accent/30"
    >
      <h1 class="text-3xl sm:text-4xl font-bold text-left mb-8 text-primary">
        Lendly
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <InputField
          label="Email"
          type="email"
          placeholder="exemplo@lendly.com"
        />
        <InputField label="Senha" type="password" placeholder="••••••••" />

        <div class="flex justify-between items-center">
          <a href="#" class="text-accent hover:underline text-sm"
            >Esqueceu a senha?</a
          >
          <Button primary class="px-8"> Entrar </Button>
        </div>
      </form>

      <div class="mt-8 pt-6 border-t border-dark-accent/20">
        <p class="text-text-muted text-center sm:text-left">
          Novo no Lendly?
          <a href="#" class="text-accent hover:underline font-medium"
            >Crie uma conta</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import InputField from "../components/InputField.vue";

const handleLogin = () => {
  // Lógica de login aqui
};
</script>
