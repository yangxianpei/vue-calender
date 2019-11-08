<template>
   <div>
     <!-- <calender :value="now" @input="val=>now=val"></calender> -->
      <calender v-model="now"></calender>
   </div>
</template>
<script>
import calender from './calender'
export default {
  data(){
    return{
      now:new Date()
    }
  },
  components:{
      calender
  }
}
</script>

<style lang="less">

</style>