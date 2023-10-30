<template>
    <div class="input-group">
        <select class="custom-select collapse">
            <option selected>Choose</option>
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



