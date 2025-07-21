<template>
    <v-container grid-list-xl class="self-bg pa-0" fluid>
        <div class="overlay"></div>
        <v-row no-gutters class="fill-height align-center justify-center">
            <v-col cols="12" md="10" lg="8">
                <v-card width="100%" elevation="16" class="main-card rounded-xl pa-8 mt-5">
                    <v-row no-gutters>
                        <!-- Profile Section -->
                        <v-col cols="12" md="6" class="d-flex align-top justify-center">
                            <div class="d-flex flex-column align-center profile-section" style="gap: 24px;">
                                <div class="avatar-wrapper">
                                    <v-card height="auto" elevation="8" outlined class="rounded-circle avatar-card pa-4">
                                        <img src="../assets/profile.jpg" class="profile-img">
                                        <!-- <div class="status-indicator"></div> -->
                                    </v-card>
                                </div>
                                <v-divider class="my-2 custom-divider"></v-divider>
                                <div class="text-center">
                                    <div class="name-title font-weight-bold text-h4">Panatthapong Jornpradit(Aof)</div>
                                    <div class="subtitle text-h6 mt-2">Computer Engineering Student</div>
                                    <div class="university-name text-body-1 mt-1">Prince of Songkla University</div>
                                </div>
                                
                                <!-- Social Links -->
                                <div class="social-links d-flex" style="gap: 16px;">
                                    <v-btn icon small class="social-btn" href="https://github.com/Aof-PJ">
                                        <v-icon>mdi-github</v-icon>
                                    </v-btn>
                                    <v-btn icon small class="social-btn" href="https://www.facebook.com/AofStopper">
                                        <v-icon>mdi-facebook</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-col>
                        
                        <!-- Content Section -->
                        <v-col cols="12" md="6" class="d-flex align-center justify-center">
                            <v-card width="100%" elevation="0" class="pa-4 transparent-card content-section">
                                <div v-for="(item, idx) in items" :key="idx" class="mb-4">
                                    <CardExpand 
                                        :index="idx"
                                        :header="item.header"
                                        :body="item.body"
                                        :icon="item.icon"
                                        :color="item.color"
                                        @click.native="toggleExpand(idx)"
                                    />
                                    <transition-group name="fade-slide" tag="div">
                                        <v-row v-if="expanded[idx] && item.images && item.images.length" key="img-row" class="justify-center mt-3">
                                            <v-col v-for="(img, imgIdx) in item.images" :key="imgIdx" cols="6" md="3" class="d-flex justify-center">
                                                <v-card elevation="4" class="image-card rounded-lg">
                                                    <v-img 
                                                        :src="img" 
                                                        width="100" 
                                                        height="100" 
                                                        class="rounded-lg"
                                                        contain
                                                    ></v-img>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </transition-group>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardExpand from '../components/CardExpand.vue'
export default {
    name: 'myProfile',
    components: { CardExpand },
    data() {
        return {
            items: [
                {
                    header: "Education",
                    body: "จบจากมหาวิทยาลัยสงขลานครินทร์ คณะวิศวกรรมศาสตร์<br>สาขาวิศวกรรมคอมพิวเตอร์",
                    icon: "mdi-school",
                    color: "#4CAF50"
                },
                {
                    header: "Hobbies",
                    body: "🎮 เล่นเกม - ชอบเกม RPG และ Action มีเล่นเกมอินดี้บ้างบางเวลา<br>🎵 ฟังเพลง - ไม่มีแนวเพลงที่แน่นอน ถ้าฟังแล้วเข้าหูคือฟังหมด<br>💪 ออกกำลังกาย - Body Weigh Training & Cardio",
                    images: [require('../assets/DS3.jpg'), require('../assets/ER.jpg'), require('../assets/LOP.jpg'), require('../assets/Val.png'), require('../assets/Repo.jpg'), require('../assets/RE2.jpg')],
                    icon: "mdi-gamepad-variant",
                    color: "#FF9800"
                },
                {
                    header: "Interest",
                    body: "💻 Game Development <br>🗄️ Video Editing<br>🎨 Animation<br>",
                    images: [require('../assets/Unity.png'), require('../assets/Vegas.png'), require('../assets/Animate.png')],
                    icon: "mdi-code-tags",
                    color: "#2196F3"
                },
            ],
            expanded: [false, false, false],
        }
    },
    methods: {
        toggleExpand(idx) {
            this.$set(this.expanded, idx, !this.expanded[idx]);
        }
    }
}
</script>

<style scoped>
.self-bg {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

.self-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    z-index: 0;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(2px);
    z-index: 1;
}

.self-bg > *:not(.overlay) {
    position: relative;
    z-index: 2;
}

.main-card {
    background: rgba(255, 255, 255, 0.718);
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    transition: all 0.3s ease;
}

.main-card:hover {
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}

.profile-section {
    animation: fadeInUp 0.8s ease-out;
}

.avatar-wrapper {
    position: relative;
}

.avatar-card {
    background: rgb(253, 240, 255);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    border: 2px solid rgba(255,255,255,0.3);
    transition: all 0.3s ease;
    position: relative;
}

.avatar-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.profile-img {
    width: 220px;
    height: 220px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    border: 3px solid rgba(255,255,255,0.5);
    transition: all 0.3s ease;
}

.profile-img:hover {
    transform: scale(1.05);
}

.status-indicator {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    background: #4CAF50;
    border-radius: 50%;
    border: 3px solid white;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
    100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
}

.custom-divider {
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #667eea, transparent);
    border: none;
}

.name-title {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
    margin-bottom: 8px;
}

.subtitle {
    color: #555;
    font-weight: 500;
    opacity: 0.9;
}

.university-name {
    color: #777;
    font-style: italic;
    opacity: 0.8;
}

.social-links {
    margin-top: 16px;
}

.social-btn {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    transition: all 0.3s ease;
}

.social-btn:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.9);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.content-section {
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.transparent-card {
    background: transparent;
    box-shadow: none;
}

.image-card {
    transition: all 0.3s ease;
    overflow: hidden;
    width: 100px;
    height: 100px;
}

.image-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.image-card .v-image {
    background: rgba(255,255,255,0.9);
}

.fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.5s ease;
}

.fade-slide-enter, .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 960px) {
    .main-card {
        padding: 1.5rem !important;
        margin: 1rem;
    }
    
    .profile-img {
        width: 160px !important;
        height: 160px !important;
    }
    
    .name-title {
        font-size: 1.5rem !important;
    }
    
    .content-section {
        margin-top: 2rem;
    }
    
    .image-card {
        width: 80px;
        height: 80px;
    }
}

@media (max-width: 600px) {
    .profile-img {
        width: 120px !important;
        height: 120px !important;
    }
    
    .name-title {
        font-size: 1.3rem !important;
    }
    
    .main-card {
        padding: 1rem !important;
    }
    
    .image-card {
        width: 70px;
        height: 70px;
    }
}
</style>