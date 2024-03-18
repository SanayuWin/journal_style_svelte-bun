<template>
    <form @submit.prevent="submitHandler">
      <div>
        <!-- <label for="opening-text">Opening Text</label> -->
        <input type="text" id="note" v-model="note" />
      </div>
      <button type="submit">Add Graphic</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        note: "",
      };
    },
    methods: {
      submitHandler() {
        const graphic = {
          title: "", // You may add title and releaseDate if required
          openingText: this.note,
          releaseDate: "",
        };
        this.$emit("onAddMovie", graphic);
        this.note = ""; // Reset note after submission if needed
      },
    },
  };
  </script>
  