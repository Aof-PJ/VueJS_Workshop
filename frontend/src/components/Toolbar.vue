<template>
    <div>
        <v-app-bar 
            app 
            color="grey lighten-4" 
            elevation="1" 
            height="64"
            class="modern-toolbar"
            fixed
        >
            <v-container class="d-flex align-center pa-0">
            <!-- Logo -->
            <div class="logo-section" @click="goHome">
                <!-- <v-img
                    :src="logoUrl"
                    alt="Logo"
                    height="40"
                    width="40"
                    contain
                    class="logo-image"
                ></v-img> -->
                <span class="logo-text">{{ appName }}</span>
            </div>

            <v-spacer></v-spacer>

            <!-- Navigation Menu -->
            <div class="nav-menu">
                <v-btn
                    v-for="item in menuItems"
                    :key="item.name"
                    :to="item.path"
                    text
                    class="nav-btn"
                    :class="{ 'active': isActive(item.path) }"
                >
                <v-icon left size="20">{{ item.icon }}</v-icon>
                {{ item.name }}
                </v-btn>
            </div>

            <!-- User Section -->
            <div class="user-section">
                <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    class="user-btn"
                    >
                    <v-avatar size="32" color="secondary">
                        <!-- <v-img
                        :src="userAvatar"
                        alt="User"
                        ></v-img> -->
                        <v-icon size="20" color="white">mdi-account</v-icon>
                    </v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="userItem in userMenuItems"
                    :key="userItem.name"
                    @click="userItem.action"
                    >
                    <v-list-item-icon>
                        <v-icon>{{ userItem.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ userItem.name }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
                </v-menu>
            </div>
            </v-container>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>  
    </div>
</template>

<script>
export default {
  name: 'ModernToolbar',
  data() {
    return {
      appName: 'Shopuay',
    //   userAvatar: 'https://picsum.photos/32/32?random=2',
      menuItems: [
        {
          name: 'หน้าหลัก',
          path: '/',
          icon: 'mdi-home'
        },
        {
          name: 'ดู Order ทั้งหมด',
          path: '/viewOrders',
          icon: 'mdi-cart'
        },
        {
            name: 'จัดการสินค้า',
            path: '/productsManagement',
            icon: 'mdi-package-variant'
        },
        {
          name: 'อนุมัติ User',
          path: '/userManagement',
          icon: 'mdi-check-circle'
        },
      ],
      userMenuItems: [
        {
          name: 'โปรไฟล์',
          icon: 'mdi-account',
          action: () => this.goToProfile()
        },
        {
          name: 'ตั้งค่า',
          icon: 'mdi-cog',
          action: () => this.goToSettings()
        },
        {
          name: 'ออกจากระบบ',
          icon: 'mdi-logout',
          action: () => this.logout()
        }
      ]
    }
  },
  methods: {
    goHome() {
    //   this.$router.push('/');
    document.location.href = '/';
    },
    isActive(path) {
      return this.$route.path === path;
    },
    goToProfile() {
      this.$router.push('/profile');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    logout() {
      this.$swal.fire({
        title: 'ยืนยันการออกจากระบบ',
        text: 'คุณต้องการออกจากระบบหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          // ลบ token และ redirect ไปหน้า login
          sessionStorage.removeItem('token');
          this.$router.push('/login');
        }
      });
    }
  }
}
</script>

<style scoped>
.modern-toolbar {
  border-bottom: 1px solid #e0e0e0;
}

.logo-section {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.logo-section:hover {
  background-color: #f5f5f5;
}

.logo-image {
  border-radius: 8px;
  margin-right: 12px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2196f3;
  background: linear-gradient(45deg, #2196f3, #21cbf3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  font-weight: 500;
  text-transform: none;
  border-radius: 8px;
  padding: 0 16px;
  height: 40px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-btn:hover {
  background-color: #f0f8ff;
  color: #2196f3;
}

.nav-btn.active {
  background-color: #e3f2fd;
  color: #1976d2;
}

.nav-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(45deg, #2196f3, #21cbf3);
}

.user-section {
  margin-left: 16px;
}

.user-btn {
  transition: transform 0.3s ease;
}

.user-btn:hover {
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
}

/* Mobile Menu (อาจจะเพิ่มในอนาคต) */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 64px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 64px);
    background: white;
    flex-direction: column;
    padding-top: 20px;
    transition: left 0.3s ease;
    z-index: 1000;
  }
  
  .nav-menu.mobile-open {
    left: 0;
  }
  
  .nav-btn {
    width: 90%;
    margin: 4px 0;
    justify-content: flex-start;
  }
}
</style>