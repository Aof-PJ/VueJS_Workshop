<template>
  <v-container class="product-detail">
    <h1 class="text-h3 font-weight-bold">รายละเอียดสินค้า</h1>
    <v-row>
      <!-- รูปภาพสินค้า -->
      <v-col cols="12" md="6">
        <v-card>
          <v-img
            :src="product.imageUrl"
            height="400"
            contain
          ></v-img>
        </v-card>
      </v-col>

      <!-- ข้อมูลสินค้า -->
      <v-col cols="12" md="6">
        <div class="product-info">
          <h1 class="product-title">{{ product.productName }}</h1>
          
          <div class="price-section">
            <span class="price">฿{{ formatPrice(product.price) }}</span>
          </div>

          <div class="stock-section">
            <span class="stock-label">สินค้าคงเหลือ:</span>
            <span class="stock-value" :class="stockClass">{{ product.remaining }} ชิ้น</span>
          </div>

          <div class="description-section">
            <h3>รายละเอียดสินค้า</h3>
            <p class="description">{{ product.description }}</p>
          </div>

          <!-- ส่วนสั่งซื้อ -->
          <div class="order-section">
            <div class="quantity-section">
              <label class="quantity-label">จำนวนที่ต้องการสั่ง:</label>
              <div class="quantity-controls">
                <v-btn
                  icon
                  small
                  @click="decreaseQuantity"
                  :disabled="orderQuantity <= 1"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                
                <v-text-field
                  v-model.number="orderQuantity"
                  type="number"
                  min="1"
                  :max="product.remaining"
                  class="quantity-input"
                  dense
                  outlined
                  hide-details
                  @input="validateQuantity"
                ></v-text-field>
                
                <v-btn
                  icon
                  small
                  @click="increaseQuantity"
                  :disabled="orderQuantity >= product.remaining"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>

            <div class="total-section">
              <span class="total-label">ยอดรวม:</span>
              <span class="total-price">฿{{ formatPrice(totalPrice) }}</span>
            </div>

            <v-btn
              color="primary"
              large
              block
              @click="handleOrder"
              :disabled="!canOrder"
              :loading="isOrdering"
            >
              <v-icon left>mdi-cart</v-icon>
              สั่งซื้อสินค้า
            </v-btn>

            <div v-if="!canOrder" class="error-message">
              <span v-if="product.remaining === 0">สินค้าหมดแล้ว</span>
              <span v-else-if="orderQuantity > product.remaining">
                จำนวนที่เลือกเกินสินค้าคงเหลือ
              </span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- ปุ่มกลับ -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-btn 
          text 
          @click="goBack"
          color="grey"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          กลับหน้าหลัก
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {
        id: 1,
        productName: 'product name',
        price: 0,
        remaining: 0,
        description: 'something went wrong',
        imageUrl: 'https://picsum.photos/500/500'
      },
      orderQuantity: 1,
      isOrdering: false
    }
  },
  computed: {
    totalPrice() {
      return this.product.price * this.orderQuantity;
    },
    canOrder() {
      return this.product.remaining > 0 && 
             this.orderQuantity > 0 && 
             this.orderQuantity <= this.product.remaining;
    },
    stockClass() {
      if (this.product.remaining <= 0) return 'stock-out';
      if (this.product.remaining <= 5) return 'stock-low';
      return 'stock-available';
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString();
    },
    increaseQuantity() {
      if (this.orderQuantity < this.product.remaining) {
        this.orderQuantity++;
      }
    },
    decreaseQuantity() {
      if (this.orderQuantity > 1) {
        this.orderQuantity--;
      }
    },
    validateQuantity() {
      if (this.orderQuantity < 1) {
        this.orderQuantity = 1;
      } else if (this.orderQuantity > this.product.remaining) {
        this.orderQuantity = this.product.remaining;
      }
    },
    async handleOrder() {
      if (!this.canOrder) return;

      this.isOrdering = true;
      
      try {
        var res = await this.axios.post(`http://localhost:3000/api/v1/products/${this.product.id}/orders`,
            {
                "quantities" : this.orderQuantity
            }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        console.log("res data", res.data.data);

        // จำลองการสั่งซื้อสำเร็จ
        // await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.$swal.fire({
          icon: 'success',
          title: 'สั่งซื้อสำเร็จ',
          text: `สั่งซื้อ ${this.product.productName} จำนวน ${this.orderQuantity} ชิ้น`,
          timer: 2000
        });

        // อัพเดทสต็อกหลังสั่งซื้อ
        this.product.remaining -= this.orderQuantity;
        this.orderQuantity = 1;

      } catch (error) {
        if(error.response.data.status === 401) {
            await this.$swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: error.response.data.message,
                timer: 2000,
            })

            document.location.href = "/login";
            return;
        } else {
            this.$swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: error.response.data.message,
            });
        }
      } finally {
        this.isOrdering = false;
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  async created() {
    try {
        let product_id = this.$route.query.product_id;

        var res = await this.axios.get(`http://localhost:3000/api/v1/products/${product_id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        this.product.id = product_id
        this.product.productName = res.data.data.productName;
        this.product.price = res.data.data.price;
        this.product.remaining = res.data.data.remaining;
        this.product.description = res.data.data.description;
        this.product.imageUrl = res.data.data.imageUrl || 'https://picsum.photos/500/500';
    }catch (error) {
        if(error.response.data.status === 401) {
            await this.$swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Please login to access this page.',
                timer: 2000,
            })

            document.location.href = "/login";
        } else {
            await this.$swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: error.response.data.message,
                timer: 2000,
            })

            // document.location.href = "/";
        }
    }
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.price-section {
  margin-bottom: 15px;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2196f3;
}

.stock-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stock-label {
  font-weight: 500;
  color: #666;
}

.stock-value {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.stock-available {
  color: #4caf50;
  background-color: #e8f5e8;
}

.stock-low {
  color: #ff9800;
  background-color: #fff3e0;
}

.stock-out {
  color: #f44336;
  background-color: #ffebee;
}

.description-section {
  margin-bottom: 30px;
}

.description-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.description {
  color: #666;
  line-height: 1.6;
}

.order-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.quantity-section {
  margin-bottom: 20px;
}

.quantity-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 200px;
}

.quantity-input {
  width: 80px;
}

.total-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-weight: 500;
  color: #333;
}

.total-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2196f3;
}

.error-message {
  margin-top: 10px;
  color: #f44336;
  font-size: 0.9rem;
  text-align: center;
}
</style>