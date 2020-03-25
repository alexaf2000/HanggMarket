<template></template>

<script>
export default {
  validate({ params }) {
    // Must be a number the id
    return /^\d+$/.test(params.id);
  }
};
</script>

<style>
</style>
