<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-form @submit.prevent="handleSubmit()">
      <v-card width="600px" height="500px" elevation="16" class="main-card rounded-xl">
        <div class="text-center px-5 pt-5 ma-5">
            <h1 class="text-h3 font-weight-bold ma-6">Login</h1>
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
        </div>

        <div class="mx-6 text-center">
          <v-btn block
            type="submit"
            class="my-3"
            size="large"
            color="primary"
            :disabled="this.username.trim() === '' || this.password.trim() === ''"
          >
            Login
          </v-btn>
          <p class="text-subtitle-1">Don't have an account? <a href="/register">Register here!</a></p>
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
              password: ''
            }
        },
        methods: {
            async handleSubmit() {
              try {
                const req = {
                  username: this.username,
                  password: this.password
                };
                
                var res = await this.axios.post('http://localhost:3000/api/v1/login', req);
                sessionStorage.setItem('token', res.data.data.token);

                await this.$swal.fire({
                  icon: 'success',
                  title: 'Login Successful',
                  text: 'I knew you will read this message!',
                  timer: 1000,
                });

                document.location.href = "/";
              }catch (error) {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Login Failed',
                  text: error.response.data.message || 'An error occurred during login.',
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