<template>
<div class="container">
  <div class="keyboard">
    <div class="keys qwerty">
      <div class="key" v-for="(sound, index) in qwerty" :data-key="sound.keyCode" @click="() => playSound({ keyCode: sound.keyCode})" @transitionend="removeTransition" :class="{ playing: sound.playing}">
        <kbd>{{sound.key.toUpperCase()}}</kbd>
        <span class="sound">{{names[index]}}</span>
        <audio :data-key="sound.keyCode" :src="sound.file"></audio>
      </div>
    </div>
    <div class="keys asdfg">
      <div class="key" v-for="(sound, index) in asdfg" :data-key="sound.keyCode" @click="() => playSound({ keyCode: sound.keyCode})" @transitionend="removeTransition" :class="{ playing: sound.playing}">
        <kbd>{{sound.key.toUpperCase()}}</kbd>
        <span class="sound">{{names[index + 10]}}</span>
        <audio :data-key="sound.keyCode" :src="sound.file"></audio>
      </div>
    </div>
    <div class="keys zxcvb">
      <div class="key" v-for="(sound, index) in zxcvb" :data-key="sound.keyCode" @click="() => playSound({ keyCode: sound.keyCode})" @transitionend="removeTransition" :class="{ playing: sound.playing}">
        <kbd>{{sound.key.toUpperCase()}}</kbd>
        <span class="sound">{{names[index + 19]}}</span>
        <audio :data-key="sound.keyCode" :src="sound.file"></audio>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  keys
} from '../utils';

const allFiles = (ctx => ctx.keys().map(ctx))(require.context('../assets/sounds'));

const sounds = Object.keys(keys)
  .slice(0, allFiles.length)
  .map((f, index) => {
    return {
      key: f,
      keyCode: keys[f],
      file: allFiles[index],
      playing: false
    }
  }).slice(0, 26)

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
    },
    qwerty() {
      return this.sounds.slice(0, 10);
    },
    asdfg() {
      return this.sounds.slice(10, 19);
    },
    zxcvb() {
      return this.sounds.slice(19, 26);
    }
  },
  created() {
    window.addEventListener('keydown', this.playSound);
  }
}
</script>
<style scoped>
.keyboard {
  background: linear-gradient(135deg, #157199 0%, #101a99 100%);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}


.keys {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.key {
  cursor: pointer;
  flex: 1;
  width: 9vw;
  height: 9vw;
  margin: 0.25vw;
  border: 0.2vw solid black;
  border-radius: 5%;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 0.5rem black;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

kbd {
  color: #fff;
  font-size: 5vw;
}

.sound {
  display: none;
  font-size: 1vw;
  color: #0094ff;
}

.playing {
  transform: scale(1.1);
  border-color: #d65b34;
  box-shadow: 0 0 0.75rem #d65b34;
}


@media(min-width: 1100px) {
  .sound {
    display: block;
  }
}
</style>
