<style scoped>
.card {
  border-radius: 15px;
}

.countdown-label {
  font-size: 12px;
  color: #545454;
}

.countdown-numbers {
  font-size: 30px;
  font-weight: bold;
}

.countdown-header {
  font-size: 18px;
  font-weight: bold;
  word-wrap: normal;
}

main {
  margin-left: 25px;
  margin-right: 25px;
}

.award {
  width: 60px;
  height: auto;
  position: absolute;
  right: 15px;
  top: 10px;
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
}

th {
  background-color: rgb(249, 249, 249);
}

td {
  background-color: white;
}

.progress-bar {
  background-color: #f2f2f2;
  border-radius: 20px;
}

.progress {
  background-color: rgb(160, 247, 183);
  border-radius: 20px;
}

/* checking if user is logged in */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.login-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
}
</style>

<template>
  <main>
    <h3 class="pt-3">Leaderboard</h3>

    <div class="row mb-4 d-flex justify-content-center">
      <!-- Start: Joined members card -->
      <div class="col-lg-3 col-md-6 col-sm-12 card-group">
        <div class="card" style="background-color: #f6e6f0">
          <div class="card-body">
            <img src="../assets/members.png" style="width: 50px; height: auto" />
            <p class="card-text mt-3 mb-1" style="color: #545454">Joined members</p>
            <span style="font-size: 20px; font-weight: bold">{{ totalMembers }}+</span>
          </div>
        </div>
      </div>
      <!-- End: Joined members card -->

      <!-- Start: Personal metrics -->
      <div class="col-lg-3 col-md-6 col-sm-12 card-group">
        <div class="card" style="background-color: #ddecf8">
          <div class="card-body">
            <img src="../assets/food.png" style="width: 54px; height: auto" />
            <p class="card-text mt-4" style="color: #545454">
              Current Ranking:
              <span style="font-size: 20px; font-weight: bold; color: black">{{
                individualRanking
              }}</span>

              <br />
              Total score:
              <span style="font-size: 20px; font-weight: bold; color: black">{{
                individualFoodSaved
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- End: Personal metrics -->

      <!-- Start: Countdown timer -->
      <div class="col-lg-6 col-md-12 col-sm-12 card-group">
        <div class="card" style="background-color: #ffffe4">
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-lg-4 col-md-4 col-sm-4 countdown-header">
                Remaining time to completion 🔥
              </div>

              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="row text-center gx-0 pb-4">
                  <div class="col-3">
                    <span id="day" class="countdown-numbers"></span>
                    <div class="countdown-label">DAYS</div>
                  </div>

                  <div class="col-1">
                    <span style="font-size: 35px; font-weight: bold">:</span>
                  </div>

                  <div class="col-3">
                    <span id="hour" class="countdown-numbers"></span>
                    <div class="countdown-label">HOURS</div>
                  </div>

                  <div class="col-1">
                    <span style="font-size: 35px; font-weight: bold">:</span>
                  </div>

                  <div class="col-3">
                    <span id="min" class="countdown-numbers"></span>
                    <div class="countdown-label">MINUTES</div>
                  </div>
                </div>
              </div>

              <div class="col-lg-2 col-md-2 col-sm-2">
                <img src="../assets/winner.png" width="60px" height="auto" />
              </div>
            </div>

            <div class="row" style="border-top: 0.5px solid #545454">
              <span class="px-2 pt-1" style="font-size: 15px; color: #545454">
                Leaderboard will refresh every Sunday!
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Countdown timer -->
    </div>

    <h4>Current leaders</h4>

    <div class="row mb-4 d-flex justify-content-center">
      <!-- Start: First place -->
      <div class="col-lg-4 col-md-12 col-sm-12 card-group">
        <div class="card position-relative">
          <div class="card-body">
            <img src="../assets/profile1.png" style="width: 100px; height: auto" />
            <h5 class="card-title d-inline">{{ nameOne }}</h5>
            <p class="card-text pt-2 mb-1">Total score: {{ scoreOne }}</p>
            <img src="../assets/first.png" class="award" />
          </div>
        </div>
      </div>
      <!-- End: First place -->

      <!-- Start: Second place -->
      <div class="col-lg-4 col-md-6 col-sm-12 card-group">
        <div class="card position-relative">
          <div class="card-body">
            <img src="../assets/profile2.png" style="width: 100px; height: auto" />
            <!-- Hold a varaible, pull from backend -->
            <h5 class="card-title d-inline">{{ nameTwo }}</h5>
            <!-- add variable, pull from backend -->
            <p class="card-text pt-2 mb-1">Total score: {{ scoreTwo }}</p>
            <img src="../assets/second.png" class="award" />
          </div>
        </div>
      </div>
      <!-- End: Second place -->

      <!-- Start: Third place -->
      <div class="col-lg-4 col-md-6 col-sm-12 card-group">
        <div class="card position-relative">
          <div class="card-body">
            <img src="../assets/profile3.png" style="width: 100px; height: auto" />
            <!-- Hold a varaible pull from backend -->
            <h5 class="card-title d-inline">{{ nameThree }}</h5>
            <!-- add variable, pull from backend -->
            <p class="card-text pt-2 mb-1">Total score: {{ scoreThree }}</p>
            <img src="../assets/third.png" class="award" />
          </div>
        </div>
      </div>
      <!-- End: Third place -->
    </div>

    <h4>National Ranking</h4>

    <table class="table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Total Score</th>
        </tr>
      </thead>

      <tbody v-for="(person, index) in sorted" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ person.username }}</td>
        <td>
          <div class="container">
            <div class="progress-bar">
              <div
                class="progress"
                :style="{ width: getPercentage(person.food_saved, scoreOne) }"
              ></div>
            </div>
            <span>{{ person.food_saved }}</span>
            <!-- THIS -->
          </div>
        </td>
      </tbody>
    </table>
  </main>
  <!-- THIS PORTION IS FOR USER AUTHENTICATION CHECK -->
  <div v-if="showLoginAlert" class="overlay" @click="routeBackToHome"></div>
  <div v-if="showLoginAlert" class="login-alert">
    <LoginFailed />
    <p>Please log in first to access this feature.</p>
  </div>
  <!-- END OF USER AUTHENTICATION CHECK -->
</template>

<script>
import LoginFailed from '../components/LoginFailed.vue'

// adding variables that will be changed after pulling from backend
export default {
  data() {
    return {
      // variables
      nameOne: '',
      nameTwo: '',
      nameThree: '',
      scoreOne: 0.0,
      scoreTwo: 0.0,
      scoreThree: 0.0,
      showLoginAlert: false,
      totalMembers: 0,
      individualData: null,
      individualRanking: 0,
      individualFoodSaved: 0.0,
      sorted: [],
      fakePeople: [
        {
          username: 'John Smith',
          food_saved: '1204.00'
        },
        {
          username: 'Berry Nice',
          food_saved: '1090.00'
        },
        {
          username: 'Samantha',
          food_saved: '1086.00'
        },
        {
          username: 'Elizabeth Lee',
          food_saved: '1003.00'
        },
        {
          username: 'Brad Low',
          food_saved: '996.00'
        },
        {
          username: 'Izzy Johnson',
          food_saved: '974.00'
        },
        {
          username: 'Hope',
          food_saved: '956.00'
        },
        {
          username: 'Lunar Young',
          food_saved: '877.00'
        },
        {
          username: 'Perry Plat',
          food_saved: '853.00'
        },
        {
          username: 'Sam123',
          food_saved: '810.00'
        },
        {
          username: 'Chef Ferb',
          food_saved: '791.00'
        },
        {
          username: 'Alfredo Cream',
          food_saved: '763.00'
        },
        {
          username: 'Sir Ketchup',
          food_saved: '729.00'
        },
        {
          username: 'Stanford',
          food_saved: '691.00'
        },
        {
          username: 'I<3Food',
          food_saved: '643.00'
        },
        {
          username: 'Macs Burg',
          food_saved: '598.00'
        },
        {
          username: 'Thor',
          food_saved: '574.00'
        },
        {
          username: 'Spidey',
          food_saved: '543.00'
        },
        {
          username: 'Loo Zer',
          food_saved: '439.00'
        }
      ]
    }
  },
  mounted() {
    // Update the countdown immediately and then every second
    this.updateCountdown()
    setInterval(this.updateCountdown, 1000)

    // get user info
    this.getUserInfo()

    // check if user is loggedIn
    this.checkUserLoggedIn()
  },
  components: {
    LoginFailed
  },
  methods: {
    // THESE FUNCTIONS ARE FOR USER AUTHENITCATION
    routeBackToHome() {
      this.showLoginAlert = false
      this.$router.push({ path: '/' })
    },
    checkUserLoggedIn() {
      if (!sessionStorage.getItem('AuthToken')) {
        this.showLoginAlert = true
      }
    },

    // get user Info + All user info for leaderboard
    getUserInfo() {
      // console.log(sessionStorage);
      const authToken = sessionStorage.AuthToken
      const user = sessionStorage.user
      // get data from backend
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL

      // get leaderboard data
      this.$axios
        .get(`${baseUrl}/leaderboard`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then((response) => {
          // console.log(response.data);

          var allPeople = this.fakePeople.concat(response.data)
          this.totalMembers = allPeople.length
          this.sorted = this.sortByFoodSaved(allPeople)

          var topThree = this.sorted.slice(0, 3)
          this.nameOne = topThree[0].username
          this.scoreOne = topThree[0].food_saved

          this.nameTwo = topThree[1].username
          this.scoreTwo = topThree[1].food_saved

          this.nameThree = topThree[2].username
          this.scoreThree = topThree[2].food_saved
        })
        .catch((error) => {
          console.log(error)
        })

      // get logged-in user data
      this.$axios
        .get(`${baseUrl}/user?=username=${user}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then((response) => {
          console.log(response.data)
          this.individualData = response.data

          for (let i = 0; i < this.sorted.length; i++) {
            if (this.sorted[i].username == this.individualData.username) {
              this.individualRanking = i + 1
            }
          }
          this.individualFoodSaved = this.individualData.food_saved
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // Countdown timer
    updateCountdown() {
      const now = new Date()
      const dayOfWeek = now.getDay() // 0 (Sunday) to 6 (Saturday)

      // Calculate the time remaining until the next Sunday at 23:59:59
      if (dayOfWeek == 0) {
        var daysUntilSunday = 0
      } else {
        var daysUntilSunday = 7 - dayOfWeek
      }
      var hoursUntilMidnight = 23 - now.getHours()
      var minutesUntilMidnight = 59 - now.getMinutes()
      var secondsUntilMidnight = 59 - now.getSeconds()

      const totalSecondsRemaining =
        daysUntilSunday * 24 * 60 * 60 +
        hoursUntilMidnight * 60 * 60 +
        minutesUntilMidnight * 60 +
        secondsUntilMidnight

      const days = Math.floor(totalSecondsRemaining / (24 * 60 * 60))
      const hours = Math.floor((totalSecondsRemaining % (24 * 60 * 60)) / (60 * 60))
      const minutes = Math.floor((totalSecondsRemaining % (60 * 60)) / 60)

      document.getElementById('day').innerHTML = days
      document.getElementById('hour').innerHTML = hours
      document.getElementById('min').innerHTML = minutes
    },
    sortByFoodSaved(arr) {
      // Use the Array sort() method to sort the array
      arr.sort((a, b) => {
        // Convert the "food_saved" values to numbers for comparison
        const foodSavedA = parseFloat(a.food_saved)
        const foodSavedB = parseFloat(b.food_saved)

        // Compare and sort in descending order (from most to least)
        return foodSavedB - foodSavedA
      })

      return arr
    },
    getPercentage(foodSaved, top_foodSaved) {
      let percent = Math.round((foodSaved / top_foodSaved) * 100).toString()
      percent = percent + '%'
      return percent
    }
  }
}
</script>
