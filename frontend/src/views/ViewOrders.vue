<template>
  <v-container>
    <h2 class="mb-6 text-center text-h4 font-weight-bold">
        รายการ Order {{isAll ? "ทั้งหมด" : ""}}</h2>
    <v-row dense>
      <v-col
        v-for="order in orders"
        :key="order._id"
        cols="12"
        class="d-flex justify-center"
      >
        <v-card
          class="pa-5 mb-4 order-card"
          width="100%"
          max-width="1000"
          elevation="8"
        >
          <v-row align="center">
            <v-col cols="12" md="3">
              <div class="text-h-2 grey--text font-weight-bold">ชื่อสินค้า</div>
              <div>{{ order.product_name }}</div>
            </v-col>
            <v-col cols="12" md="2">
              <div class="text-h-2 grey--text font-weight-bold">จำนวนที่สั่ง</div>
              <div>{{ order.quantities }}</div>
            </v-col>
            <v-col cols="12" md="2">
              <div class="text-h-2 grey--text font-weight-bold">ราคาต่อชิ้น</div>
              <div>{{ order.each_price }}</div>
            </v-col>
            <v-col cols="12" md="2">
              <div class="text-h-2 grey--text font-weight-bold">ราคารวม</div>
              <div>{{ order.total }}</div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="text-h-2 grey--text font-weight-bold">ชื่อผู้สั่ง</div>
              <div>{{ order.customer_name }}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card
            elevation="0"
            v-show="orders.length <= 0"
        >
            <div class="text-center text-h5">----- ไม่มีรายการ Order -----</div>
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
      orders: [],
      isAll: true
    }
  },
  async created() {
    try {
        let product_id = this.$route.query.product_id;
        let res;
        if(!product_id) {
            res = await this.axios.get(`http://localhost:3000/api/v1/orders`, {
                headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
        } else {
            res = await this.axios.get(`http://localhost:3000/api/v1/products/${product_id}/orders`, {
                headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            this.isAll = false;
        }   
        this.orders = res.data.data;
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
  }
}
</script>

<style scoped>
.order-card {
  border-radius: 18px;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  transition: box-shadow 0.2s;
}
.order-card:hover {
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.14);
}
</style>