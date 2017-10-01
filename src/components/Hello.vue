<template>
<div class="container">
  <div class="keys">
    <div class="key" v-for="(sound, index) in sounds" :data-key="sound.keyCode" @click="() => playSound({ keyCode: sound.keyCode})" @transitionend="removeTransition" :class="{ playing: sound.playing}">
      <kbd>{{sound.key.toUpperCase()}}</kbd>
      <span class="sound">{{names[index]}}</span>
      <audio :data-key="sound.keyCode" :src="sound.file"></audio>
    </div>
  </div>
</div>
</template>

<script>
const allFiles = (ctx => ctx.keys().map(ctx))(require.context('../assets/sounds'));

import {
  keys
} from '../utils';

const sounds = Object.keys(keys)
  .slice(0, allFiles.length)
  .map((f, index) => {
    return {
      key: f,
      keyCode: keys[f],
      file: allFiles[index],
      playing: false
    }
  });

export default {
  name: 'hello',
  data() {
    return {
      sounds
    }
  },
  methods: {
    playSound(e) {
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
      if (!audio) return;
      this.sounds.find(s => s.keyCode === e.keyCode).playing = true;
      audio.currentTime = 0;
      audio.play();
    },
    removeTransition(e) {
      if (e.propertyName !== 'transform') return;
      this.sounds.find(s => s.keyCode === parseInt(e.target.dataset.key)).playing = false;
    }
  },
  computed: {
    names() {
      return this.sounds.map(s => s.file.match(/\/\w*\./g)[0].slice(1, -1));
    }
  },
  created() {
    window.addEventListener('keydown', this.playSound);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #157199 0%, #101a99 100%);
  background-size: cover;
  height: 100vh;
}

.keys {
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  overflow: hidden;
}

.key {
  margin: 0.1rem;
  padding: 0.25rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 0.5rem black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
}

kbd {
  color: #fff;
  font-size: 2rem;
}

.sound {
  font-size: 0.5rem;
  color: #0094ff;
}

.playing {
  transform: scale(1.1);
  border-color: #0094ff;
  box-shadow: 0 0 0.1rem #0094ff;
}


@media(min-width: 1100px) {
  .keys {
    display: grid;
    grid-template-columns: repeat(10, 10%);
  }
  .key {
    margin: 0.5rem;
    padding: 0.5rem;
    border: 0.2rem solid black;
  }
  kbd {
    font-size: 4rem;
  }
  .sound {
    font-size: 0.75rem;
    color: #0094ff;
  }
  .playing {
    transform: scale(1.1);
    border-color: #0094ff;
    box-shadow: 0 0 0.2rem #0094ff;
  }
}
</style>
