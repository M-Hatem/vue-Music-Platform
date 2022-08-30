import { defineStore } from "pinia";
import { Howl } from "howler";
import helper from "@/includes/helper";

export default defineStore("player", {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
  }),
  actions: {
    async newSong(song) {
      if (song.original_name === this.currentSong.original_name)
        return this.toggleAudio();

      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.currentSong = song;
      this.sound = new Howl({
        html5: true,
        src: [song.url],
      });

      this.sound.play();

      this.sound.on("play", () => {
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      // if there's no sound playing already
      if (!this.sound.playing) return;

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek($event) {
      if (!this.sound.playing) return;

      const { x, width } = $event.currentTarget.getBoundingClientRect();

      const clickX = $event.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;

      this.sound.seek(seconds);

      this.sound.once("seek", this.progress);
    },
  },
  getters: {
    playing(state) {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },
});
