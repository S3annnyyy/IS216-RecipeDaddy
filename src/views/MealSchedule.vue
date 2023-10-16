<style scoped>
    .box {
        background-color: #D9D9D9;
    }

    .button {
        background-color: #E6E3E3;
        border-radius: 10%;
        margin-bottom: 5px;
        margin-left: 190px;
        padding: 5px;
    }

    .center {
        text-align: center;
    }

    .dates {
        border-radius: 10px;
        padding: 5px;
    }
</style>

<template>
    <main class="row mt-3 mx-5">
        <div class="col-3">
            <h1>Meal Schedule</h1>
            <p>14 October - 20 October 2023</p>
        </div>
        <div class="col mt-2">
            <h3>Progress</h3>
        </div>
        <div class="col">
        </div>
    </main>

    <main class="row mx-5">
        <div class="col-3 box">
            <h6>CURRENT WEEK</h6>
            <p>Tuesday, 17 Oct</p>
            <button type="button" class="button">Shopping List</button>
        </div>

        <div class="col">
            charts
        </div>
    </main>

    <div class="row mx-5 mt-3 box dates">
        <div class="col center">
            Mon <br>
            16
        </div>

        <div class="col center">
            Tue <br>
            17
        </div>

        <div class="col center">
            Wed <br>
            18
        </div>

        <div class="col center">
            Thu <br>
            19
        </div>

        <div class="col center">
            Fri <br>
            20
        </div>

        <div class="col center">
            Sat <br>
            21
        </div>

        <div class="col center">
            Sun <br>
            22
        </div>
    </div>
</template>

<script>
    /* questions  = {
        NoOfPax: 3,
        NoOfDays: 2,
        Dates: {
            "19/08/23": {
                breakfast: true,
                lunch: true,
                dinner: false
            },
            "20/08/23": {
                breakfast: false,
                lunch: true,
                dinner: true,
            }
        }
    } */

</script>
