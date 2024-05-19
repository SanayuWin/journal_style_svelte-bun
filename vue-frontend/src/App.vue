<template>
  <div>
    <section>
      <AddGraphic @onAddMovie="addGraphicHandler" />
    </section>
    <section>
      <button @click="fetchGraphicHandler">Fetch Graphic</button>
    </section>
    <section>
      <DeleteGraphic @onDeleteGraphic="deleteGraphicHandler" />
    </section>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <GraphicList :graphic="graphic" />
    </div>
    <!-- <ShapeList :graphic="graphic" /> -->
  </div>
</template>

<script>
import GraphicList from "./components/GraphicList.vue";
import AddGraphic from "./components/AddGraphic.vue";
// import ShapeList from "./components/ShapeList.vue";
import DeleteGraphic from "./components/DeleteGraphic.vue";

export default {
  components: {
    GraphicList,
    AddGraphic,
    // ShapeList,
    DeleteGraphic,
  },
  data() {
    return {
      graphic: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchGraphicHandler() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch("http://localhost:1323/api/items");
        // const response = await fetch("http://localhost:8080/v1/graphic");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        console.log(data);
        this.graphic = Object.values(data).map(item => ({
          key: item.id,
          num: item.num,
          layer: item.layer,
          height: item.height,
          width: item.width,
          x_axis: item.x_axis,
          y_axis: item.y_axis,
          border_weight: item.border_weight,
          border_color: item.border_color,
          border_radius: item.border_radius,
          font_size: item.font_size,
          font_weight: item.font_weight,
          note: item.note,
          created_at: item.created_at,
        }));
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    async addGraphicHandler(movie) {
      try {
        const response = await fetch("http://localhost:8080/v1/graphic", {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error adding graphic:", error);
      }
    },
    async deleteGraphicHandler() {
      try {
        const response = await fetch("http://localhost:8080/v1/delete-graphic", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        await response.json();
        console.log("delete success");
      } catch (error) {
        console.error("Error deleting graphic:", error);
      }
    },
  },
  mounted() {
    this.fetchGraphicHandler();
  },
};
</script>
