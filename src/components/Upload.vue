<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-1000 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{
            'bg-green-400 border-green-400 border-solid ': isDrag,
          }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="isDrag = false"
          @dragover.prevent.stop="isDrag = true"
          @dragenter.prevent.stop="isDrag = true"
          @dragleave.prevent.stop="isDrag = false"
          @drop.prevent.stop="upload($event)"
        >
          <h5>Drop your files here</h5>
        </div>
        <input
          type="file"
          multiple
          accept="audio/mpeg"
          @change="upload($event)"
        />
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4" v-for="upload in uploads" :key="upload.name">
          <!-- File Name -->
          <div class="flex justify-between items-center">
            <p class="font-bold text-sm m-0" :class="upload.text_color">
              <i :class="upload.icon"></i> {{ upload.name }}
            </p>
            <p class="m-0 font-bold text-sm" :class="upload.text_color">
              {{
                upload.current_progress === 100
                  ? upload.current_progress.toFixed(0)
                  : upload.current_progress.toFixed(1)
              }}%
            </p>
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all duration-300 ease-linear progress-bar bg-blue-400"
              :class="upload.variant"
              :style="{ width: upload.current_progress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from "@/includes/firebase";

export default {
  name: "AppUpload",
  data() {
    return {
      isDrag: false,
      uploads: [],
    };
  },
  props: ["addSong"],
  methods: {
    upload($event) {
      this.isDrag = false;

      // To convery object to an array
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      // To check the type of each file
      files.forEach((file) => {
        if (file.type !== "audio/mpeg") {
          return;
        }

        const storageRef = storage.ref();
        const songsRef = storageRef.child(
          `songs/${auth.currentUser.displayName}/${file.name}`
        );
        const task = songsRef.put(file);

        const uploadIndex =
          this.uploads.push({
            name: file.name,
            current_progress: 0,
            task,
            variant: "bg-blue-400",
            text_color: "",
            icon: "fas fa-spinner fa-spin",
          }) - 1;

        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          () => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_color = "text-red-400";
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: "",
              comment_count: 0,
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            const songRef = await songsCollection.add(song);
            const songSnapShot = await songRef.get();

            this.addSong(songSnapShot);

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_color = "text-green-400";
          }
        );
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>
