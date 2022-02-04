<template>
    <div class="site-aside-container">
        <template v-if="data">
            <!-- avatar 有值的的时候才显示 -->
            <Avatar :url="data.avatar" />
            <h1 class="name">{{ data.siteTitle }}</h1>
        </template>
        <Menu />
        <Contact v-if="data" />
        <p v-if="data" class="footer">
        {{ data.icp }}
        </p>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import Menu from './Menu';
import Contact from './Contact';
import { mapState } from 'vuex';
export default {
    components:{
        Avatar,
        Menu,
        Contact,
    },
    computed:mapState("setting",["data"])
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.site-aside-container{
    width: 100%;
    height: 100%;
    background: @dark;
    padding: 10px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    .avatar-container{
        margin: 0 auto;
    }
    .name{
        font-size: 1.1em;
        text-align: center;
        color: #fff;
    }
    .footer{
        font-size: 14px;
        text-align: center;
    }
    
}
</style>
