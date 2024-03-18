<template>
    <div
      :style="{
        borderRadius: border_radius + 'px',
        height: height + 'px',
        width: width + 'px',
        backgroundColor: 'black'
      }"
    >
      <Graphic v-for="graph in graphic" :key="graph.id" :graph="graph" />
    </div>
  </template>
  
  <script>
  import Graphic from "./Graphic.vue";
  
  export default {
    components: {
      Graphic
    },
    props: {
      graphic: {
        type: Array,
        required: true
      },
      border_radius: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 100
      },
      width: {
        type: Number,
        default: 100
      }
    }
  };
  </script>
  
  <style scoped>
  /* You can add scoped styles here if needed */
  </style>
  