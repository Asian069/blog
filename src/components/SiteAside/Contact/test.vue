<template>
    <div class="test-container">
        <Contact />
    </div>
</template>

<script>
import Contact from './';
import '@/styles/global.less';

export default {
    components:{
        Contact,
    }
}
</script>

<style scoped>
    .test-container{
        width: 400px;
        height: 400px;
        border: 2px solid red;
        background: black;
        margin: 0 auto;
        padding-top: 200px;
    }
</style>
