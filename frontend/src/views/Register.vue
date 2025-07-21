<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-form @submit.prevent="handleSubmit()">
      <v-card width="600px" height="600px" elevation="16" class="main-card rounded-xl">
        <div class="text-center px-5 pt-5 ma-5">
            <h1 class="text-h3 font-weight-bold ma-6">Register</h1>
        </div>
        <div class="pa-5 ma-5">
          <v-text-field
            name="username"
            label="username"
            id="username"
            v-model="username"
          />

          <v-text-field
            name="password"
            label="password"
            id="password"
            v-model="password"
            type="password"
          />

          <v-text-field
            name="email"
            label="email"
            id="email"
            v-model="email"
          />

          <v-text-field
            name="phone"
            label="phone"
            id="phone"
            v-model="phone"
          />
        </div>

        <div class="mx-6 text-center">
          <v-btn block
            type="submit"
            class="my-3"
            size="large"
            color="primary"
            :disabled="this.username.trim() === '' 
                    || this.password.trim() === '' 
                    || this.email.trim() === '' 
                    || this.phone.trim() === ''"
          >
            Register
          </v-btn>
          <p class="text-subtitle-1">Already have an account? <a href="/login">Login</a></p>
        </div>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
    export default {
        data() {
            return {
              username: '',
              password: '',
              email: '',
              phone: '',
            }
        },
        computed: {
            isValidScore() {
              const score = +this.score;
              return isNaN(score) || score < 0 || score > 100;
            },
        },
        methods: {
            async handleSubmit() {
              try {
                const req = {
                  username: this.username,
                  password: this.password,
                  email: this.email,
                  phone: this.phone,
                };
                
                await this.axios.post('http://localhost:3000/api/v1/register', req);

                await this.$swal.fire({
                  icon: 'success',
                  title: 'Register Successful',
                  text: 'Please wait for approval.',
                  timer: 2000,
                });

                document.location.href = "/login";
              }catch (error) {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Register Failed',
                  text: error.response.data.message || 'An error occurred during register.',
                })
              }
            },
        }
    }
</script>

<style>
    .text-warning {
        position: relative;
        color: red;
        font-size: 1rem;
        font-weight: 300;
        z-index: 10;
        transform: translateY(-1rem);
    }
</style>