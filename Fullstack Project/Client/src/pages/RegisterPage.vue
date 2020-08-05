<template>
  <div class="container" id="register-component">
    <h1 class="title"> 
      DEV <font-awesome-icon icon="cookie-bite" size="md"/> UR
    </h1>
    <h3>Create Your Account</h3>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <!-- USERNAME -->
	  <b-form-group
        id="input-group-username"
        label-cols-sm="4"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username accepts only alphabet characters
        </b-form-invalid-feedback>
      </b-form-group>
	  <!-- FIRSTNAME -->
	  <b-form-group
        id="input-group-firstname"
        label-cols-sm="4"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
          First name accepts only alphabet characters
        </b-form-invalid-feedback>
      </b-form-group>
	  <!-- LASTNAME -->
	  <b-form-group
        id="input-group-lastname"
        label-cols-sm="4"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
          Last name accepts only alphabet characters
        </b-form-invalid-feedback>
      </b-form-group>
	  <!-- COUNTRY -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="4"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>
	  <!-- PASSWORD -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="4"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
		<b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.mustBeStrong"
        >
          Have at least one numeric value and one special character
        </b-form-invalid-feedback>
      </b-form-group>
	  <!-- CONFIRM PASSWORD -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="4"
        label="Confirmation:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>
	  <!-- EMAIL -->
	  <b-form-group
        id="input-group-email"
        label-cols-sm="4"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email is not in valid form
        </b-form-invalid-feedback>
      </b-form-group>
	  <!-- PROFILE IMAGE -->
	  <b-form-group
        id="input-group-lastname"
        label-cols-sm="4"
        label="Profile Image:"
        label-for="profileImage"
      >
        <b-form-input
          id="profileImage"
          v-model="$v.form.profileImage.$model"
          type="text"
          :state="validateState('profileImage')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.profileImage.url">
          Profile Image accepts only valid URL input
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger" id="reset">
        <font-awesome-icon icon="trash-alt" size="md"/>
         - Reset
      </b-button>
      <b-button type="submit" id="register" variant="primary">
        <font-awesome-icon icon="check" size="md"/>
         - Register
      </b-button>

      <div class="mt-2" style="text-align: center;">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  url,
  sameAs,
  email
} from "vuelidate/lib/validators";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profileImage: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
//   FOR EACH PARAMETERS SET THE VALIDATION METHODS
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
	    },
	    firstName: {
		  required,  
		  alpha
	    },
	    lastName: {
		  required,  
		  alpha
	    },
      country: {
        required
      },
      password: {
        required,
		  length: (p) => minLength(5)(p) && maxLength(10)(p),
		  mustBeStrong: (p) => {
			var hasNumber = new RegExp('(?=.*[0-9])');
			var hasSpecialChar = new RegExp('(?=.*[!@#$%^&*])');
			if( hasNumber.test(p) && hasSpecialChar.test(p)) return true;
			return false;
		  }
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
	    },
	    email: {
		  required,
		  email
	    },
	    profileImage: {
      url,
      required
	    }
    }
  },
  mounted() {
    this.countries.push(...countries);

  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        console.log(this.form.firstName)
        const response = await this.axios.post(
          "http://localhost:3000/Register",
          {
            username: this.form.username,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
            image: this.form.profileImage
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
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
  margin-top: 15px;
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
  width: 40%;
  margin: 5%;
  font-size: 115%;
  outline: none;
  border: none;
  box-shadow: none;
}

#register {
  background-color: #333333;
}
</style>