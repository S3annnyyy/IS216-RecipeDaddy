<template>
  <div class="video-container">
    <video src="../assets/video.mp4" muted loop autoplay class="video-obj" id="video-obj"></video>
  </div>

  <div class="content-container">
        <h1>Home</h1>
        <p>This is a home page</p>

        <div>
          <h2>Lorem, ipsum.</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique laborum, dolore error fuga ratione distinctio odio, saepe, vel ullam cupiditate beatae eos accusamus soluta eveniet deserunt? Ipsum tempore minima sunt!</p>
          <p>Accusamus laborum recusandae iste natus eveniet sunt minima quod, est consequuntur voluptas consectetur, in nam praesentium minus quis iure, error architecto perferendis voluptates ducimus ea voluptate aut animi? Dolores, animi.</p>
          <p>Fugit dolore quasi expedita, quos eius asperiores explicabo consequuntur nulla omnis dolor reprehenderit inventore, rem soluta nobis deleniti vero sunt officiis praesentium repellendus voluptatum! Error repellendus veritatis asperiores tenetur at?</p>
        </div>

        <div class="target" ref="targetEl">
          <h2>Lorem, ipsum.</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit repudiandae quos facilis iste nemo corporis ipsa, animi ipsum ab maxime, dolorum odio, placeat vero nesciunt modi est? Numquam, ducimus inventore?</p>
          <p>Aspernatur nam incidunt et vitae dolorum quibusdam reprehenderit adipisci sunt rerum odio impedit corporis, aperiam iusto eveniet praesentium iste quae corrupti! Aut, qui magni nesciunt maiores numquam sint mollitia voluptas.</p>
          <p>Blanditiis eligendi iure aspernatur amet vel excepturi provident ipsum dolores repellat quam, atque aperiam in illum et nulla vitae saepe. Voluptatum harum neque inventore eaque. Cum beatae adipisci itaque impedit.</p>
          <p>Voluptatem quo cum quibusdam, ullam perspiciatis ducimus deserunt fugit animi ut sint enim amet officiis, adipisci temporibus quia nemo commodi aut magni minus, sed maxime vitae eaque saepe rem! Mollitia.</p>
          <p>Obcaecati debitis expedita veniam ducimus voluptas quisquam doloremque, magni architecto veritatis blanditiis unde recusandae dolore est quae tempora ipsa ipsum, atque dolor amet sit voluptatum fuga magnam. Provident, temporibus neque.</p>
          <p>Dolorum odio ullam tempore mollitia aliquam ratione, voluptatum provident deleniti accusantium nisi eum consequatur in doloremque, ducimus aspernatur repellendus adipisci officiis commodi vel! Tempora quos placeat aperiam dignissimos animi incidunt.</p>
          <p>Sint doloremque natus ut veniam fugit. Necessitatibus, fuga! Sit omnis laborum harum vero saepe! Suscipit, nobis rerum unde maiores architecto asperiores facere quae deserunt aspernatur voluptatibus explicabo, perferendis inventore a?</p>
          <p>Atque, ducimus! Officia, recusandae! Labore, voluptate modi necessitatibus eveniet temporibus ratione aliquam eum provident sunt vel porro nisi, laboriosam iste quia libero culpa architecto! Laboriosam in architecto enim et ipsam.</p>
          <p>Dicta hic dolorem minima maiores ut inventore quod harum eius beatae modi cumque reprehenderit corrupti possimus, alias repudiandae, neque perspiciatis assumenda dignissimos, vero at provident! Voluptas earum sapiente aspernatur rem.</p>
          <p>Itaque eaque quos quod delectus perspiciatis corporis veritatis quisquam, enim accusantium tempora dolore sapiente qui eos a veniam debitis dignissimos inventore voluptate laudantium ipsam modi recusandae similique. Assumenda, cupiditate libero.</p>
        </div>

        <div class="target" ref="targetEl2">
          <h1>Lorem ipsum dolor sit amet.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit similique rerum qui, ad sed cumque eveniet dolores error minima mollitia quos, odit ipsa sequi consequuntur, soluta voluptatum voluptatem accusamus quis.</p>
          <p>Necessitatibus quam voluptatem inventore dolores cupiditate repellendus! Eum natus modi voluptate fuga dolore dolorum, ipsum officia eius veritatis sapiente eveniet ad dolor quidem, nobis ut sunt esse unde. Repudiandae, natus.</p>
          <p>Quasi ad iusto aspernatur laboriosam tempore ea possimus error doloremque incidunt dolore, cum, aut libero sit amet reprehenderit dignissimos recusandae delectus. Esse laboriosam maiores repudiandae minus debitis sint ullam veniam!</p>
          <p>Odio magnam voluptatum aliquam porro aliquid, ipsum vero ab accusantium asperiores eum sed, impedit saepe iste nemo possimus mollitia fuga aut laboriosam et laborum fugiat dolorum repellat maiores? Dolor, laboriosam.</p>
        </div>

        <div class="target" ref="targetEl2">
          <h1>Lorem ipsum dolor sit amet.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit similique rerum qui, ad sed cumque eveniet dolores error minima mollitia quos, odit ipsa sequi consequuntur, soluta voluptatum voluptatem accusamus quis.</p>
          <p>Necessitatibus quam voluptatem inventore dolores cupiditate repellendus! Eum natus modi voluptate fuga dolore dolorum, ipsum officia eius veritatis sapiente eveniet ad dolor quidem, nobis ut sunt esse unde. Repudiandae, natus.</p>
          <p>Quasi ad iusto aspernatur laboriosam tempore ea possimus error doloremque incidunt dolore, cum, aut libero sit amet reprehenderit dignissimos recusandae delectus. Esse laboriosam maiores repudiandae minus debitis sint ullam veniam!</p>
          <p>Odio magnam voluptatum aliquam porro aliquid, ipsum vero ab accusantium asperiores eum sed, impedit saepe iste nemo possimus mollitia fuga aut laboriosam et laborum fugiat dolorum repellat maiores? Dolor, laboriosam.</p>
        </div>
      </div>
</template>

<script setup>
  import { useMotion } from '@vueuse/motion'
  import { ref, computed, onMounted } from 'vue'

  const template = {
    initial: {
      opacity: 0,
      y: 100
    },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 800,

      }
    }
  }
  const targetEl = ref()
  const targetEl2 = ref()

  useMotion(targetEl, template)
  useMotion(targetEl2, template)
</script>

<style scoped>
  .video-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%; 
    overflow: hidden;
  }

  .video-container video {
    /* Make video to at least 100% wide and tall */
    min-width: 100%; 
    min-height: 100%; 

    /* Setting width & height to auto prevents the browser from stretching or squishing the video */
    width: auto;
    height: auto;

    /* Center the video */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .content-container {
    position: relative;
    padding-top: 100vh;
  }
</style>
