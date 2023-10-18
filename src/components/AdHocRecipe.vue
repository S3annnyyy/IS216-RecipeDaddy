<template>
    This is the adhoc recipe page {{ userId }}
    <br/>
    This is the JSON prompt {{ data }}
</template>

<script>
    export default {
        data() {
            return {
                userId: '',
                data: JSON.parse(this.$route.query.data),
            }
        },
        mounted() {
            this.userId = this.$route.params.id           
        }         
        
    }
</script>