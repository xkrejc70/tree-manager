<template>
  <div>
    <h1>Tree Manager</h1>
    
  </div>
</template>

<script>
import { fetchTreeNodes } from "@/services/apiService.js"


export default {
  data() {
    return {
      nodes: [],
      loading: false,
      error: null,
      newNodeParentId: '',
    }
  },
  async mounted() {
    this.loading = true
    this.error = null
    try {
      const response = await fetchTreeNodes()
      console.log(response.data)
      this.nodes = response.data
    } catch (err) {
      this.error = "Failed to load tree nodes."
    } finally {
      this.loading = false
    }
  },
}
</script>

