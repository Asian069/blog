<template>
    <div class="test-container">
        <Menu  />
    </div>
    
    
</template>

<script>
import Menu from './'
import '@/styles/global.less'

export default{
    components:{
        Menu,
    }
}
</script>

<style scoped>
.test-container{
   width: 400px;
   height: 600px;
   border: 2px solid red;
   background: black;
   margin: 0 auto; 
}
</style>
