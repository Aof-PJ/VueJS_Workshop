<template>
  <div class="card">
    <div class="card-image">
      <img :src="imageUrl" :alt="title" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      
      <div class="card-info">
        <div class="price-section">
          <span class="price-label">ราคา:</span>
          <span class="price-value">{{ formatPrice(price) }}</span>
        </div>
        <div class="stock-section">
          <span class="stock-label">เหลือ:</span>
          <span class="stock-value" :class="stockClass">{{ stock }} ชิ้น</span>
        </div>
      </div>
      
      <v-row>
        <button 
          class="card-edit-button" 
          @click="handleEdit"
        >
          แก้ไขสินค้า
        </button>
        <button 
          class="card-delete-button" 
          @click="handleDelete"
        >
          ลบสินค้า
        </button>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    product_id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: [Number, String],
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    onEdit: {
      type: Function,
      default: null
    },
    onDelete: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleEdit() {
      if (this.onEdit && typeof this.onEdit === 'function') {
        this.onEdit(this.product_id);
      }
    },
    handleDelete() {
      if (this.onDelete && typeof this.onDelete === 'function') {
        this.onDelete(this.product_id);
      }
    },
    formatPrice(price) {
      if (typeof price === 'number') {
        return `฿${price.toLocaleString()}`;
      }
      return price;
    }
  },
  computed: {
    stockClass() {
      if (this.stock <= 0) return 'stock-out';
      if (this.stock <= 5) return 'stock-low';
      return 'stock-available';
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  margin: 16px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 20px;
}

.card-title {
  margin: 0 0 12px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
}

.card-description {
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.price-section, .stock-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-label, .stock-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
}

.price-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
}

.stock-value {
  font-size: 0.9rem;
  font-weight: 500;
}

.stock-available {
  color: #38a169;
}

.stock-low {
  color: #ed8936;
}

.stock-out {
  color: #e53e3e;
}

.card-edit-button {
  background: linear-gradient(135deg, #e1ea66 0%, #a0a24b 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
}

.card-edit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #c9d85a 0%, #b9c146 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.card-edit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.card-delete-button {
  background: linear-gradient(135deg, #ea6666 0%, #a24b4b 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
}

.card-delete-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #d85a5a 0%, #c14646 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.card-delete-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>