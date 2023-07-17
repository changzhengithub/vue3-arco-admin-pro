<script setup lang="ts">
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'

const msg = ref('xxxxx')
const id = ref(1)

const getEvent = (params: number) => {
  console.log(params)
}

</script>

<template>
  <main>
    <p>{{ msg }}</p>
    <p>{{ id }}</p>
    <TheWelcome v-model:title="msg" v-model:id.capitalize="id" @CLOSE_EVENT="getEvent" />
  </main>
</template>
