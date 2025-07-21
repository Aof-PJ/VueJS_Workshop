<template>
    <v-container grid-list-xs>
        <v-row class="align-center mb-4">
            <v-col>
                <h1 class="text-h3 font-weight-bold">จัดการสินค้า</h1>
            </v-col>
            <v-col class="d-flex justify-end" cols="auto">
                <v-btn color="primary" @click="openAddModal">
                    เพิ่มสินค้า
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                v-for="(item, index) in items"
                :key="index"
                cols="24"
                md="3"
            >
                <CardManagement 
                    :product_id="item._id"
                    :title="item.productName" 
                    :imageUrl="item.imageUrl" 
                    :description="item.description" 
                    :price="item.price" 
                    :stock="item.remaining" 
                    :onEdit="() => openEditModal(item)"
                    :onDelete="handleDelete"
                />
            </v-col>
        </v-row>

        <!-- Add/Edit Modal -->
        <v-dialog v-model="isOpenModal" max-width="500px">
            <v-card>
                <v-card-title class="headline">{{ isAddMode ? 'เพิ่มสินค้า' : 'แก้ไขสินค้า' }}</v-card-title>
                <v-card-text>
                    <v-text-field v-model="inputForm.productName" label="ชื่อสินค้า" />
                    <v-text-field v-model="inputForm.remaining" label="จำนวนคงเหลือ" type="number" />
                    <v-text-field v-model="inputForm.price" label="ราคา" type="number" />
                    <v-text-field v-model="inputForm.description" label="รายละเอียด" />
                    <v-text-field v-model="inputForm.imageUrl" label="Image URL" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="isAddMode ? confirmAdd() : confirmEdit()">ยืนยัน</v-btn>
                    <v-btn color="black" text @click="isOpenModal = false; isAddMode = false;">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import CardManagement from '../components/CardStore_Management.vue'

    export default {
        components: {
            CardManagement,
        },
        data() {
            return {
                items: [],
                isOpenModal: false,
                isAddMode: false,
                inputForm: {
                    _id: '',
                    productName: '',
                    remaining: 0,
                    price: 0,
                    description: '',
                    imageUrl: ''
                }
            }
        },
        async created() {
            try {
                var res = await this.axios.get(`http://localhost:3000/api/v1/products/`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                this.items= res.data.data;
                // console.log(this.items[0]._id);

            }catch (error) {
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
                    await this.$swal.fire({
                        icon: 'error',
                        title: 'Ops!',
                        text: error.response.data.message,
                        timer: 2000,
                    })

                    // document.location.href = "/";
                }
            }
        },
        methods: {
            openEditModal(item) {
                this.inputForm = { ...item };
                this.isOpenModal = true;
            },
            openAddModal() {
                this.isAddMode = true;
                this.inputForm = {
                    productName: '',
                    remaining: 0,
                    price: 0,
                    description: '',
                    imageUrl: ''
                };
                this.isOpenModal = true;
            },
            async confirmEdit() {
                this.isOpenModal = false;
                await this.handleEdit(this.inputForm._id, { ...this.inputForm });
            },
            async confirmAdd() {
                await this.handleAdd({ ...this.inputForm });
            },
            async handleEdit(product_id, updatedData) {
                // ตัวอย่าง: เรียก API หรืออัพเดตข้อมูลใน items
                try {
                    console.log("update data", updatedData);
                    await this.axios.put(
                        `http://localhost:3000/api/v1/products/${product_id}`,
                        updatedData,
                        {
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                            }
                        }
                    );
                    // // อัปเดตข้อมูลใน items
                    // const idx = this.items.findIndex(item => item._id === product_id);
                    // if (idx !== -1) {
                    //     this.$set(this.items, idx, { ...updatedData, _id: product_id });
                    // }
                    this.$swal.fire({
                        icon: 'success',
                        title: 'แก้ไขสำเร็จ',
                        timer: 1500,
                    });
                    // window.location.reload();
                } catch (error) {
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
                    }
                }
            },
            async handleAdd(newData) {
                try {
                    await this.axios.post(
                        `http://localhost:3000/api/v1/products/`,
                        newData,
                        {
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                            }
                        }
                    );
                    this.items.push(newData);
                    this.$swal.fire({
                        icon: 'success',
                        title: 'เพิ่มสินค้าสำเร็จ',
                        timer: 1500,
                    });
                    // window.location.reload();
                } catch (error) {
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
                    }
                }
            },
            handleDelete(product_id) {
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Confirm'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await this.axios.delete(`http://localhost:3000/api/v1/products/${product_id}`, {
                                headers: {
                                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                                }
                            });
                            this.$swal.fire(
                                'Deleted!',
                                'Your product has been deleted.',
                                'success'
                            );
                            // Remove the deleted item from the list
                            this.items = this.items.filter(item => item._id !== product_id);
                        } catch (error) {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Delete Failed',
                                text: error.response.data.message || 'An error occurred during deletion.',
                            });
                        }
                    }
                });
            }

        }
    }
</script>

<style>

</style>