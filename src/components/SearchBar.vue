<template>
    <!-- <div class="input-group">
        <button v-if="dropDown == 'false'" class="btn btn-outline-secondary dropdown-toggle collapse" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
        <button v-else class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
        <input type="text" class="form-control">
    </div> -->
    <div class="input-group">
        <select class="custom-select collapse">
            <option selected>testing change</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        <select class="custom-select collapse">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        <input type="text" class="form-control">
        <button class="btn btn-outline-secondary" type="button">Button</button>
    </div>
</template>

<script>
export default {
    props: [
        'dropDown'
    ]
}
</script>

<style scoped>

</style>
