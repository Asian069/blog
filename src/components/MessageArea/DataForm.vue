<template>
  <div>
      <form id="data-form-container" ref="form" @submit.prevent="handleSubmit" class="data-form-container">
        <!-- prevent 阻止表单的默认行为 -->
        <!-- 阻止默认行为后，我们要运行自己的组件handlesubmit -->
          <div class="form-item">
              <div class="input-area">
                  <input type="text" maxLength="10" v-model="formData.nickname" placeholder="用户昵称" />
                  <span class="tip">{{formData.nickname.length}}/10</span>
              </div>
              <div class="error">{{ error.nickname }}</div>
          </div>
          <div class="form-item">
              <div class="text-area">
                  <textarea placeholder="输入内容"  v-model="formData.content"></textarea>
                  <span class="tip" maxLength="300">{{formData.content.length}}/300</span>
              </div>
              <div class="error">{{ error.content }}</div>
          </div>
          <div class="form-item">
              <div class="button-area">
                  <button :disabled="isSubmiting">{{isSubmiting?"提交中...":"提交"}}</button>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
export default {
    data(){
      return {
        formData:{
          nickname:"",
          content: "",
        },
        error:{
          nickname: "",
          content: "",
        },
        isSubmiting:false, // 是否正在提交中
      }
    },
    methods:{
      handleSubmit(){
        // console.log("正在提交");
        this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
        this.error.content = this.formData.content ? "" : "请填写内容";
        if(this.error.nickname || this.error.content){ //如果其中一个有错误的话就不能提交
          return;
        }else{
          this.isSubmiting = true; // 正在提交,防止重复点击
          this.$emit("submit", this.formData, (successMsg)=>{ // 用回调的方式处理，父组件的事情做完，子组件接着做剩下的事情
            this.$showMessage({
                content: successMsg,
                type: "success",
                duration: 1000,
                container: this.$refs.form,
                callback:()=>{
                    this.isSubmiting = false;
                    
                    this.formData.nickname = "";
                    this.formData.content = "";
                }
            })
          }); // 把表单事件发给父组件，让父组件处理
        }
      }
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none; //可以操控文本框大小
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>