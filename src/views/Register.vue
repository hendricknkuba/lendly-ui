<template>
  <div
    class="min-h-screen lg:w-xl flex items-center justify-center bg-dark-primary p-4 sm:p-6"
  >
    <div
      class="w-full max-w-2xl bg-dark-secondary rounded-xl p-8 sm:p-12 shadow-lg border border-dark-accent/30"
    >
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-left text-primary">
          Criar Conta
        </h1>
        <p class="text-text-muted mt-2">Gerencie suas finanças com o Lendly</p>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="submit" class="space-y-6">
        <InputField
          label="Nome Completo"
          type="text"
          placeholder="Seu nome"
          v-model="form.name"
          @blur="handleBlur('name')"
          :error="nameError"
        />

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
        <Button
          primary
          class="w-full mt-4 py-3"
          :disabled="v$.$invalid && v$.$autoDirty"
          :loading="isLoading"
        >
          <span v-if="!isLoading">Registrar</span>
          <span v-else>Carregando...</span>
        </Button>
      </form>

      <!-- Link para Login -->
      <div class="mt-8 pt-6 border-t border-dark-accent/20">
        <p class="text-text-muted text-center sm:text-left">
          Já tem uma conta?
          <router-link
            to="/login"
            class="text-accent hover:underline font-medium"
            >Faça login</router-link
          >
        </p>
      </div>

      <div v-if="error" class="mt-4 p-3 bg-loss/10 text-loss rounded-lg">
        {{ error }}
      </div>
      <div v-if="success" class="mt-4 p-3 bg-profit/10 text-profit rounded-lg">
        Conta criada! Redirecionando...
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import InputField from "../components/InputField.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/auth";
import { helpers } from "@vuelidate/validators";

const isLoading = ref(false);
const error = ref("");
const router = useRouter();
const success = ref(false);
const rules = {
  name: {
    required: helpers.withMessage("O nome é obrigatório", required),
    minLength: helpers.withMessage("Mínimo 3 caracteres", minLength(3)),
    hasUpperCase: helpers.withMessage(
      "Deve conter pelo menos 1 letra maiúscula",
      (value) => /[A-Z]/.test(value)
    ),
  },
  email: {
    required: helpers.withMessage("O e-mail é obrigatório", required),
    email: helpers.withMessage("Digite um e-mail válido", email),
  },
  password: {
    required: helpers.withMessage("A senha é obrigatória", required),
    minLength: helpers.withMessage("Mínimo 8 caracteres", minLength(8)),
    hasUpperCase: helpers.withMessage(
      "Deve conter 1 letra maiúscula",
      (value) => /[A-Z]/.test(value)
    ),
    hasNumber: helpers.withMessage("Deve conter 1 número", (value) =>
      /[0-9]/.test(value)
    ),
    hasSpecialChar: helpers.withMessage(
      "Deve conter 1 caractere especial (!@#$%^&*)",
      (value) => /[!@#$%^&*]/.test(value)
    ),
  },
};
const form = reactive({
  name: "",
  email: "",
  password: "",
});

const v$ = useVuelidate(rules, form, { $autoDirty: true });

const handleBlur = (field) => {
  if (v$.value && v$.value[field]) {
    v$.value[field].$touch();
  }
};

const nameError = computed(() => {
  return v$.value?.name?.$errors[0]?.$message || "";
});

const emailError = computed(() => {
  return v$.value?.email?.$errors[0]?.$message || "";
});

const passwordError = computed(() => {
  return v$.value?.password?.$errors[0]?.$message || "";
});

const handleRegister = async () => {
  isLoading.value = true;
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  error.value = "";

  try {
    const response = await register(form);
    console.log("Registro bem sucedido: ", response);
    success.value = true;
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    console.error("Erro ao registrar: ", err);
  } finally {
    isLoading.value = false;
  }
};

const submit = async () => {
  handleRegister();
};
</script>
