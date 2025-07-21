<template>
    <v-card 
        @click="expand = !expand" 
        class="expand-card" 
        elevation="6"
        :class="{ 'expanded': expand }"
    >
        <v-card-title class="expand-card-header d-flex align-center">
            <v-icon :color="color" class="mr-3" size="24">{{ icon }}</v-icon>
            <span class="header-text">{{ header }}</span>
            <v-spacer></v-spacer>
            <v-icon class="expand-icon" :class="{ 'rotated': expand }">
                mdi-chevron-down
            </v-icon>
        </v-card-title>
        
        <v-expand-transition>
            <v-card-text v-show="expand" class="expand-card-body">
                <div class="body-content" v-html="body"></div>
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<script>
export default {
    name: 'CardExpandComponent',
    props: {
        header: String,
        body: String,
        icon: {
            type: String,
            default: 'mdi-information'
        },
        color: {
            type: String,
            default: '#2196F3'
        }
    },
    data() {
        return {
            expand: false
        }
    }
}
</script>

<style scoped>
.expand-card {
    margin: 0.5rem 0;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(0,0,0,0.05);
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    overflow: hidden;
    position: relative;
}

.expand-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, v-bind(color), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.expand-card:hover::before {
    opacity: 1;
}

.expand-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    border-color: rgba(0,0,0,0.1);
}

.expand-card.expanded {
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.expand-card.expanded::before {
    opacity: 1;
}

.expand-card-header {
    padding: 1.2rem 1.5rem;
    font-weight: 600;
    color: #333;
    background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6));
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}

.expand-card:hover .expand-card-header {
    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
}

.header-text {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.expand-icon {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #666;
}

.expand-icon.rotated {
    transform: rotate(180deg);
}

.expand-card-body {
    padding: 1.5rem;
    background: rgba(255,255,255,0.95);
    border-top: 1px solid rgba(0,0,0,0.05);
}

.body-content {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    animation: fadeInContent 0.4s ease-out;
}

.body-content >>> br {
    margin-bottom: 0.5rem;
}

@keyframes fadeInContent {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .expand-card-header {
        padding: 1rem 1.2rem;
    }
    
    .header-text {
        font-size: 1rem;
    }
    
    .expand-card-body {
        padding: 1.2rem;
    }
    
    .body-content {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .expand-card-header {
        padding: 0.8rem 1rem;
    }
    
    .header-text {
        font-size: 0.95rem;
    }
    
    .expand-card-body {
        padding: 1rem;
    }
}
</style>