<!--  -->
<template>
  <transition name="slide">
    <div class="modal"
         v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;"
             class="icon-close"
             @click="$emit('close')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;"
             class="btn"
             v-if="btnType==1">{{sureText}}</a>
          <a href="javascript:;"
             class="btn btn-default"
             v-if="btnType==2">{{cancelText}}</a>
          <div class="btn-group"
               v-if="btnType==3">
            <a href="javascript:;"
               class="btn">{{sureText}}</a>
            <a href="javascript:;"
               class="btn btn-default">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "modal",
  emits: ["close"],
  components: {},
  data () {
    //这里存放数据
    return {

    };
  },
  props: {
    // 弹框类型：小small、中middle、大large、表单form
    modalType: {
      type: String,
      default: "form"
    },
    // 弹框标题
    title: String,
    // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
    btnType: String,
    sureText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    showModal: Boolean,
  },
}
</script>
<style  lang="scss" scoped>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
@import "../assets/scss/modal.scss";
</style>