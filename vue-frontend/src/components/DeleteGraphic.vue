<template>
  <form @submit.prevent="submitHandler">
    <button type="submit">Delete Graphic</button>
  </form>
</template>

<script>
export default {
  methods: {
    submitHandler() {
      this.$emit("onDeleteGraphic");
    },
  },
};
</script>
