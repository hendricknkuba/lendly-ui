<template>
  <div
    class="min-h-screen flex items-center justify-center bg-dark-primary p-4 sm:p-6"
  >
    <div
      class="w-full max-w-lg bg-dark-secondary rounded-xl p-8 sm:p-10 shadow-lg border border-dark-accent/30"
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
          @blur="v$.name.$touch()"
          :error="v$.name.$errors[0]?.$message"
        />

        <InputField
          label="Email"
          type="email"
          placeholder="exemplo@lendly.com"
          v-model="form.email"
          @blur="v$.name.$touch()"
          :error="v$.email.$errors[0]?.$message"
        />

        <InputField
          label="Senha"
          type="password"
          placeholder="••••••••"
          v-model="form.password"
          @blur="v$.name.$touch()"
          :error="v$.password.$errors[0]?.$message"
        />
        <Button primary class="w-full mt-4 py-3" :disabled="v$.$invalid && v$.$autoDirty">
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
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/auth";

const isLoading = ref(false);
const router = useRouter();
const error = ref("");
const success = ref(false);
const rules = {
  email: { required, email },
  name: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(50),
  },
  password: {
    required,
    minLength: minLength(6),
    containsUppercase: (value) => /[A-Z]/.test(value),
    containsNumber: (value) => /[0-9]/.test(value),
  },
};
const form = reactive({
  name: "",
  email: "",
  password: "",
});

const v$ = useVuelidate(rules, form, { $autoDirty: true});
console.log(v$.$invalid);

const handleRegister = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await register(form);
    console.log("Registro bem sucedido: ", response);

    success.value = true;
    setTimeout(() => {
      alert("Redireciona após 2s");
    }, 2000);
  } catch (err) {
    console.error("Erro ao registrar: ", err);
  }
  isLoading.value = false;
};

const submit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.log("Validação falhou");
    return;
  }
  handleRegister();
};
</script>
