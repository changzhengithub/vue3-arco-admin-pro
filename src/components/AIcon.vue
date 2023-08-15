<template>
  <arcoIcon></arcoIcon>
</template>
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
const props = defineProps<{
  icon: string
}>()
const Component = resolveComponent(props.icon)
const arcoIcon = () => h(Component)
</script>