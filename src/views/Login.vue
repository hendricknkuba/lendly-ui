<template>
  <div
    class="min-h-screen lg:w-xl flex items-center justify-center bg-dark-primary p-4 sm:p-6"
  >
    <div
      class="w-full max-w-2xl bg-dark-secondary rounded-xl p-8 sm:p-12 shadow-lg border border-dark-accent/30"
    >
      <h1 class="text-3xl sm:text-4xl font-bold text-left mb-8 text-primary">
        Lendly
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <InputField
          label="Email"
          type="email"
          placeholder="exemplo@lendly.com"
          v-model="form.email"
          @blur="handleBlur('email')"
          :error="emailError"
        />
        <InputField
          label="Senha"
          type="password"
          placeholder="••••••••"
          v-model="form.password"
          @blur="handleBlur('password')"
          :error="passwordError"
        />

        <div class="flex justify-between items-center">
          <a href="#" class="text-accent hover:underline text-sm"
            >Esqueceu a senha?</a
          >
          <Button
            primary
            class="px-8"
            :disabled="v$.$invalid && v$.$autoDirty"
            :isLoading="isLoading"
          >
            Entrar
          </Button>
        </div>
      </form>

      <div class="mt-8 pt-6 border-t border-dark-accent/20">
        <p class="text-text-muted text-center sm:text-left">
          Novo no Lendly?
          <router-link
            to="/register"
            class="text-accent hover:underline font-medium"
            >Crie uma conta</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import InputField from "../components/InputField.vue";
import { login } from "../services/auth";
import { helpers } from "@vuelidate/validators";
import { required, email, minLength } from "@vuelidate/validators";
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";

const isLoading = ref(false);
const rules = {
  email: {
    required: helpers.withMessage("O e-mail é obrigatório", required),
    email: helpers.withMessage("Digite um e-mail válido", email),
  },
  password: {
    required: helpers.withMessage("A senha é obrigatória", required),
    minLength: helpers.withMessage("Mínimo 8 caracteres", minLength(8)),
  },
};
const form = reactive({
  email: "",
  password: "",
});

const v$ = useVuelidate(rules, form, { $autoDirty: true });

const handleBlur = (field) => {
  if (v$.value && v$.value[field]) {
    v$.value[field].$touch();
  }
};

const emailError = computed(() => {
  return v$.value?.email?.$errors[0]?.$message || "";
});

const passwordError = computed(() => {
  return v$.value?.password?.$errors[0]?.$message || "";
});

const handleLogin = async () => {
  isLoading.value = true;
  try {
    const response = await login(form);
    console.log("Login bem sucedido: ", response);
    setTimeout(() => {
      alert("Redireciona!");
    }, 2000);
  } catch (err) {
    console.error("Erro ao fazer login: ", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
