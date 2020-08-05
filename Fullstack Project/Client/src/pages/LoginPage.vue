<template>
  <div class="container" id="register-component">
    <h1 class="title"> 
      DEV <font-awesome-icon icon="cookie-bite" size="md"/> UR
    </h1>
    <h3>Login To Your Account</h3>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="4"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="4"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        id="register"
        >Login</b-button
      >
      <div class="mt-2" style="text-align: center;">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/Login",
          {
            username: this.form.username,
            password: this.form.password
          }
        );
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        if(this.$router.history.current.path !== "/")
          this.$router.push("/")
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
  #register-component {
    font-family: 'Palanquin Dark';
    color: #333333;
    background-color: whitesmoke;
    // -webkit-box-shadow: 1px 6px 7px 4px rgba(120,120,120,1);
    // -moz-box-shadow: 1px 6px 7px 4px rgba(120,120,120,1);
    // box-shadow: 1px 6px 7px 4px rgba(120,120,120,1);
    padding: 2%;
    margin-top: 65px;
  }
  .container {
    max-width: 550px;
  }
  h3 {
    text-align: center;
    margin-bottom: 30px;
  }
  h1 {
    text-align: center;
  }

  #register-component{
    font-size: 115%;
  }

  #register-component input:focus,
  #register-component input:active,
  #register-component input{
    border: none;
    outline: none !important;
    background-color: transparent !important;
    box-shadow: none; 
  }

  #register-component input:focus,
  #register-component input{
    border-bottom: #333333 1px solid; 
    border-radius: 0; 
  }

  input:internal-autofill-selected{
    background-color: whitesmoke;
  }

  #register,
  #register:focus,
  #reset:focus,
  #reset {
    width: 60%;
    margin: 5%;
    margin-left: 20%;
    margin-right: 20%;
    font-size: 115%;
    outline: none;
    border: none;
    box-shadow: none;
  }

  #register {
    background-color: #333333;
  }
</style>