<template>
  <div>
    <a v-for="link in links" :href="link" ref="linkRef" target="blank" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
defineProps({
  links: {
    type: Array,
    default: () => [],
  },
});

const linkRef = ref();

onMounted(() => {
  import("./link").then((module) => {
    const cardlink = module.default;
    cardlink.server = "https://api.allorigins.win/raw?url=";
    cardlink(linkRef.value);
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
