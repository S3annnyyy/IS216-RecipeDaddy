<template>
    <main class="row">
        <div class="col-10">
            <div class="input-group input-group-lg">

                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Input type</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action before</a></li>
                    <li><a class="dropdown-item" href="#">Another action before</a></li>               
                </ul>

                
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Cuisine type</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Western</a></li>
                    <li><a class="dropdown-item" href="#">Mediterranean</a></li>
                    <li><a class="dropdown-item" href="#">French</a></li>
                    <li><a class="dropdown-item" href="#">Asian</a></li>
                </ul>
                <input type="text" class="form-control" aria-label="Text input with 2 dropdown buttons">
                <button class="btn btn-outline-secondary" type="submit" aria-expanded="false">
                    <span class="submit-button-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" class="arrow">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </main>
</template>

<script>



</script>

<style scoped>

</style>