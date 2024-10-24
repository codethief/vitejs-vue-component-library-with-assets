<script setup lang="ts">
import Logo from './assets/logo.svg?url'
</script>

<template>
  <div>
    I'm a library component that displays an SVG: <br />

    <svg viewBox="0 0 261.76 226.69">
      <!-- Note that in logo.svg we have added an ID `the-logo` -->
      <use :href="`${Logo}#the-logo`" />
    </svg>
  </div>
</template>

