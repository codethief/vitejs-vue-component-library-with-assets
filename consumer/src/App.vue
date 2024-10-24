<template>
  Library component using SVG: <br />
  <MyComponent />

  <br />

  Importing the SVG from the library directly: <br />
  <img :src="MySVG" />
</template>

<script lang="ts" setup>
import { MyComponent } from 'my-library'
import MySVG from 'my-library/assets/logo.svg?url'
</script>
