<template>
  <a ref="link" target="blank" />
</template>

<script setup>
import { ref, onMounted } from "vue";

const link = ref(null);

onMounted(() => {
  import("cardlink").then((module) => {
    const cardlink = module.default
    cardlink.server = "https://api.allorigins.win/raw?url=";
    cardlink([link.value]);
  });
});
</script>
<style>
.card-link {
  height: 100px !important;
}
.card-link-content {
  padding: 20px !important;
}
</style>
