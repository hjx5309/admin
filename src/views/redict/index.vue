<template>

</template>
<script>
export default {
  created() {
    var redict = this.$store.getters.redict
    this.$router.replace({ path: redict })
  }
}
</script>


