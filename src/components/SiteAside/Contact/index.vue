<template>
    <ul class="contact-container">
        <li>
            <a target="_blank" :href="data.github">
                <div class="icon">
                    <Icon type="github"/>
                </div>
                <span>{{ data.githubName }}</span>
            </a>
        </li>
        <li>
            <a :href="`mailTo:${data.mail}`">
                <div class="icon">
                    <Icon type="mail"/>
                </div>
                <span>{{ data.mail }}</span>
            </a>
        </li>
        <li>
            <a :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
                <div class="icon">
                    <Icon type="qq"/>
                </div>
                <span>{{data.qq}}</span>
            </a>
            <div class="pop">
                <img 
                    :src="data.qqQrCode" alt=""
                />
            </div>
        </li>
        <li>
            <a>
                <div class="icon weixin">
                    <Icon type="weixin"/>
                </div>
                <span>{{data.weixin}}</span>
            </a>
            <div class="pop">
                <img 
                    :src="data.weixinQrCode" alt=""
                />
            </div>
        </li>
    </ul>
</template>

<script>
import Icon from '@/components/Icon';
import { mapState } from "vuex";
export default {
    components:{
        Icon,
    },
    computed: mapState("setting", ["data"]),
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.contact-container{
    list-style: none;
    padding: 13px;
    margin: 0;
    color:@gray;
    @itemHeight: 25px;
    li{
        height: @itemHeight;
        line-height: 25px;
        margin: 13px 0;
        position: relative;
        &:hover{
            .pop{
                transform: scaleY(1)
            }
        }
        a{
            display: flex;
            align-items: center;
            cursor: pointer;
            .icon{
                font-size: 26px;
                width: 35px;
                &.weixin{
                    font-size: 32px;
                    text-indent: -3px;
                }
            }
        }
        .pop{
            position: absolute;
            left: 0px;
            bottom: @itemHeight + 2px;
            padding: 4px 6px;
            background: #fff;
            border-radius: 5px;
            transform: scaleY(0);
            transform-origin: center bottom;
            transition: 0.3s;
            img{
                width: 130px;
                height: 130px;
            }
            &:after{
                content:"";
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 8px;
                height: 8px;
                background: #fff;
                bottom: -4px;
                transform: rotate(45deg);
            }
        }
    }
}
</style>

