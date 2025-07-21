<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 90vh;">
    <v-row class="align-end justify-center">
        <v-col class="text-center">
            <h1 class="text-h3 font-weight-bold">Grade Calculator</h1>
            <p class="text-subtitle-1">Calculate your GPA easily!</p>
        </v-col>
    </v-row>
    <v-row class="align-start justify-center">
        <v-card width="600px" height="600px" elevation="16" class="main-card rounded-xl">
            <div class="pa-5 ma-5">
                <v-text-field
                    name="Score"
                    label="Score"
                    placeholder="Enter your score"
                    id="score"
                    v-model="score"
                    :error="isValidScore"
                    :error-messages="isValidScore ? 'กรุณาป้อนตัวเลข (0-100)' : ''"
                />


                <!-- ตารางเกรด -->
                <v-card class="mb-4" variant="outlined">
                    <v-card-title class="text-h6 font-weight-bold justify-center">
                        ระบบจะแสดงเกรดที่ได้
                    </v-card-title>
                    <v-card-subtitle class="mb-2 text-center">
                        ตามช่วงคะแนนดังนี้
                    </v-card-subtitle>
                    
                    <div class="d-flex justify-center">
                        <table class="mx-4 mb-4">
                            <thead>
                                <tr>
                                    <th class="text-center font-weight-bold px-5">เกรด</th>
                                    <th class="text-center font-weight-bold px-5">ช่วงคะแนน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center font-weight-bold">A</td>
                                    <td class="text-center font-weight-bold">80 - 100</td>
                                </tr>
                                <tr>
                                    <td class="text-center font-weight-bold">B</td>
                                    <td class="text-center font-weight-bold">70 - 79</td>
                                </tr>
                                <tr>
                                    <td class="text-center font-weight-bold">C</td>
                                    <td class="text-center font-weight-bold">60 - 69</td>
                                </tr>
                                <tr>
                                    <td class="text-center font-weight-bold">D</td>
                                    <td class="text-center font-weight-bold">50 - 59</td>
                                </tr>
                                <tr>
                                    <td class="text-center font-weight-bold">F</td>
                                    <td class="text-center font-weight-bold">0 - 49</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </v-card>

                <h1><span class="text-h5">ผลลัพธ์ : {{grade}}</span></h1>
                <v-btn
                    size="large"
                    color="primary"
                    @click="GradeCalulate()"
                    @disabled="isValidScore"
                >
                    Calculate
                </v-btn>
            </div>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        data() {
            return {
                score: '',
                grade: ''
            }
        },
        computed: {
            isValidScore() {
                const score = +this.score;
                return isNaN(score) || score < 0 || score > 100;
            },
        },
        methods: {
            GradeCalulate() {
                const score = +this.score;
                if (isNaN(score) || score < 0 || score > 100 || this.score === '') {
                    this.grade = '';
                    return;
                }
                
                if (score >= 80) {
                    this.grade = 'A';
                } else if (score >= 70) {
                    this.grade = 'B';
                } else if (score >= 60) {
                    this.grade = 'C';
                } else if (score >= 50) {
                    this.grade = 'D';
                } else {
                    this.grade = 'F';
                }
            }
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