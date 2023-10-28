<template>
    <div class="container-fluid text">
      <h1 class="prefix">Lets save the earth, one</h1><br/>
      <h1>
        <span class="word" :class="currentWordClass" @animationend="resetAnimation">{{ words[currentWordIndex] }}</span>
      </h1><br/>
      <h1 class="suffix">at a time.</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        words: ['GRAM', 'RECIPE', 'STEP'],
        currentWordIndex: 0,
        currentWordClass: 'in', // Start with 'in' class
      };
    },
    methods: {
      changeWord() {
        this.currentWordClass = 'out';
        setTimeout(() => {
          this.currentWordIndex =
            this.currentWordIndex === this.words.length - 1 ? 0 : this.currentWordIndex + 1;
          this.currentWordClass = 'in';
        }, 400);
      },
      resetAnimation() {
        if (this.currentWordClass === 'out') {
          this.currentWordClass = 'in';
        }
      },
    },
    mounted() {
      setInterval(this.changeWord, 4000);
    },
  };
  </script>
  
  <style scoped>
  h1 {
    display: inline-block;
    margin: 0;
    overflow: hidden;
    font-size: 3rem; 
    line-height: 10rem; 
  }
  
  .word {
    font-size: 10rem;
    color: #EE1D52;
    display: block;
    animation-duration: 0.4s;
  }
  
  .in {
    animation-name: slideIn;
  }
  
  .out {
    animation-name: slideOut;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  } 

  @media (max-width: 550px) {
    h1 {
      font-size: 2rem;
      line-height: 5rem;
    }
    .word {
      font-size: 6rem;
    }
  }
  </style>
  