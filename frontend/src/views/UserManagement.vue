<template>
  <v-container>
    <h2 class="mb-6 text-center text-h4 font-weight-bold">User Management</h2>
    <v-row dense>
      <v-col
        v-for="user in users"
        :key="user._id"
        cols="12"
        class="d-flex justify-center"
      >
        <v-card
          class="pa-5 mb-4 user-card"
          width="100%"
          max-width="1000"
          elevation="8"
        >
          <v-row align="center">
            <v-col cols="12" md="3" class="text-center">
              <v-avatar size="64" color="primary" class="mb-2">
                <v-icon size="40">mdi-account</v-icon>
              </v-avatar>
              <div class="font-weight-bold text-h6">{{ user.username }}</div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="text-subtitle-2 grey--text">Email</div>
              <div>{{ user.email }}</div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="text-subtitle-2 grey--text">Phone</div>
              <div>{{ user.phone }}</div>
            </v-col>
            <v-col cols="12" md="2" class="d-flex align-center">
              <v-chip :color="user.isApprove ? 'green' : 'red'" dark>
                {{ user.isApprove ? 'Approved' : 'Not Approved' }}
              </v-chip>
            </v-col>
            <v-col cols="12" md="1" class="d-flex align-center justify-end">
              <v-btn
                color="success"
                :disabled="user.isApprove"
                @click="approveUser(user)"
                class="font-weight-bold"
              >
                อนุมัติ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      const res = await this.axios.get('http://localhost:3000/api/v1/users', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      this.users = res.data.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await this.$swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: error.response.data.message,
          timer: 2000,
        });
        document.location.href = "/login";
      } else {
        await this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response ? error.response.data.message : 'An unexpected error occurred.',
          timer: 2000,
        });
      }
    }
  },
  methods: {
    async approveUser(user) {
      try {
        await this.axios.put(
          `http://localhost:3000/api/v1/users/${user._id}/approve`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
          }
        );
        user.isApprove = true;
        this.$swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: `User ${user.username} has been approved.`,
          timer: 1500,
        });
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response ? error.response.data.message : 'An unexpected error occurred.',
          timer: 2000,
        });
      }
    }
  }
}
</script>

<style scoped>
.user-card {
  border-radius: 18px;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  transition: box-shadow 0.2s;
}
.user-card:hover {
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.14);
}
</style>