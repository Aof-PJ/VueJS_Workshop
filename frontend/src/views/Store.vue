<template>
    <v-container grid-list-xs>
        <v-row>
            <h1 class="text-h3 font-weight-bold">Store</h1>
        </v-row>
        <v-row>
            <v-col
                v-for="(item, index) in items"
                :key="index"
                cols="24"
                md="3"
            >
                <Card 
                    :product_id="item._id"
                    :title="item.productName" 
                    :imageUrl="item.imageUrl" 
                    :description="item.description" 
                    :price="item.price" 
                    :stock="item.remaining" 
                    :onViewDetails="handleViewDetails"
                    :onViewOrders="handleViewOrders"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Card from '../components/CardStore.vue'

    export default {
        components: {
            Card,
        },
        data() {
            return {
                items: []
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
            handleViewDetails(product_id) {
                document.location.href = "/productDetail?product_id=" + product_id;
            },
            handleViewOrders(product_id) {
                document.location.href = "/viewOrders?product_id=" + product_id;
            }
        }
    }
</script>

<style>

</style>