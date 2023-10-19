<style scoped>
.title {
    margin: 20px;
}

.member {
    background-color: #f2fff2;
    height: 200px;
    border-radius: 20px;
    margin-right: 30px;
}

.meals {
    background-color: #e9edff;
    height: 200px;
    border-radius: 20px;
    margin-right: 30px;
}

.countdown {
    background-color: #fefbf2;
    height: 200px;
    border-radius: 20px;
}

main {
    margin: auto;
    justify-content: center;
}

.lead {
    border: 0.5px solid #545454;
    border-radius: 20px;
    height: 200px;
}

table, tr {
    width: 100%;
}

th, td {
    text-align: center;
}
</style>

<template>
    <h3 class="title">Leaderboard</h3>
    <main class="row">
        <div class="col-2 member">
            <img src="">
            <p style="color: #545454">Joined Members</p>
            <p style="font-weight: bold; font-size: 25px;">325+</p>
        </div>
        <div class="col-2 meals">
            
        </div>
        <div class="col-6 countdown">

        </div>
    </main>

    <h4 class="title mb-3">Current Leaders</h4>
    <main class="row mb-5">
        <div class="col lead" style="margin-right: 30px;">

        </div>
        <div class="col lead" style="margin-right: 30px;">

        </div>
        <div class="col lead">

        </div>
    </main>

    <h4 class="title">National Ranking</h4>
    <table class="table">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Today's Metrics</th>
                <th>Total Score</th>
            </tr>
        </thead>

        <tbody class="table-light">
            <tr>
                <td>1</td>
                <td>Why the fuck won't this centralise</td>
                <td>Some chart hopefully</td>
                <td>2342</td>
            </tr>

            <tr>
                <td>2</td>
                <td>Going insane</td>
                <td>Some chart hopefully</td>
                <td>2043</td>
            </tr>

            <tr>
                <td>3</td>
                <td>Going insane</td>
                <td>Some chart hopefully</td>
                <td>2043</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
</script>