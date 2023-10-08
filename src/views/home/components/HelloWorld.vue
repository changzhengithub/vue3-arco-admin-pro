<template>
  <div class="greet">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>


<style lang="less" scoped>

</style>
