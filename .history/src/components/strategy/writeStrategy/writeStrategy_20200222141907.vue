<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-15 13:30:33
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-22 14:19:06
 -->
<template>
  <div class="srategy-container" id="srategy-container">
    <el-card style="margin: 20px 160px 0 160px;" id="card-container">
      <el-input v-model="ruleForm.title" placeholder="请输入标题..."></el-input>
      <div class="edit_container">
        <el-upload
          class="avatar-uploader quill-img"
          action="http://localhost:8080/apis/file/fileUpload/"
          :show-file-list="false"
          :on-success="quillImgSuccess"
        ></el-upload>
        <quill-editor
          v-model="ruleForm.content"
          ref="myQuillEditor"
          class="editer"
          :options="editorOption"
          @ready="onEditorReady($event)"
        >
          <!-- 自定义toolar -->
          <div id="toolbar" slot="toolbar">
            <!-- Add a bold button -->
            <button class="ql-image" title="图片"></button>
            <!-- <button class="ql-video" title="视频"></button> -->
            <button class="ql-link" title="链接"></button>
            <button class="ql-bold" title="加粗">Bold</button>
            <!-- <button class="ql-italic" title="斜体">Italic</button>
                        <button class="ql-underline" title="下划线">underline</button>
                        <button class="ql-strike" title="删除线">strike</button>
                        <button class="ql-blockquote" title="引用"></button>
            <button class="ql-code-block" title="代码"></button>-->
            <button class="ql-header" value="1" title="标题1"></button>
            <button class="ql-header" value="2" title="标题2"></button>
            <!--Add list -->
            <button class="ql-list" value="ordered" title="有序列表"></button>
            <button class="ql-list" value="bullet" title="无序列表"></button>
            <!-- Add font size dropdown -->
            <select class="ql-header" title="段落格式">
              <option selected>段落</option>
              <option value="1">标题1</option>
              <option value="2">标题2</option>
              <option value="3">标题3</option>
              <option value="4">标题4</option>
              <option value="5">标题5</option>
              <option value="6">标题6</option>
            </select>
            <select class="ql-size" title="字体大小">
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
            </select>
            <!-- <select class="ql-font" title="字体">
                    <option value="SimSun">宋体</option>
                    <option value="SimHei">黑体</option>
                    <option value="Microsoft-YaHei">微软雅黑</option>
                    <option value="KaiTi">楷体</option>
                    <option value="FangSong">仿宋</option>
                    <option value="Arial">Arial</option>
            </select>-->
            <!-- <img src="../../../assets/css/font.css" alt=""> -->
            <!-- Add subscript and superscript buttons -->
            <!-- <select class="ql-color" value="color" title="字体颜色"></select>
                        <select class="ql-background" value="background" title="背景颜色"></select>
                        <select class="ql-align" value="align" title="对齐"></select>
            <button class="ql-clean" title="还原"></button>-->
          </div>
        </quill-editor>
      </div>
      <div style="margin-top: 55px;">
        <el-cascader v-if="!articleId" ref="cascaderAddr" :props="props" v-model="cityCode"></el-cascader>
        <el-input v-else style="width:200px" v-model="ruleForm.cityName" disabled></el-input>
        <el-button @click="handelSubmit" type="primary">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Quill, quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "../../../assets/css/font.css"; //引入font.css
import { queryProvince, queryCity } from "@/api/area";
import { addStrategy, queryArticleById, updateStrategy} from "@/api/strategy";

// 自定义字体大小
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["16px", "18px", "20px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
  "宋体",
  "黑体"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);

export default {
  name: "wirteStrategy",
  props: ["articleId"],
  data() {
    return {
      ruleForm: {
        content: ""
        // content:
        //   '<p>sddsdadsa</p><p><br></p><p>dssdaa</p><p><br></p><p><br></p><p><img src="http://101.132.138.185:8080//img/adb07f25-f57b-4c2c-8111-e26819b80272.jpeg"></p><p><br></p><h3>Sddas的</h3>'
      },
      cityCode: [],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          if (level === 0) {
            queryProvince(1, 1000).then(response => {
              let list = response.data.records;
              const nodes = list.map(x => ({
                value: x.provinceCode,
                label: x.shortName,
                leaf: level >= 1
              }));
              resolve(nodes);
            });
          } else if (level === 1) {
            queryCity(node.data.value, 1, 1000).then(response => {
              let list = response.data.records;
              const nodes = list.map(x => ({
                value: x.cityCode,
                label: x.shortName,
                leaf: level >= 1
              }));
              resolve(nodes);
            });
          }
        }
      },
      editorOption: {
        placeholder: "请输入",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".quill-img input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  components: {
    //使用编辑器
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    let self = this;
    if (self.articleId) {
      var srategy = document.getElementById("srategy-container");
      var container = document.getElementById("card-container");
      container.style.margin = "0";
      srategy.style.padding = "0";
      self.getArticleInfo();
    }
  },
  methods: {
    getArticleInfo() {
      let self = this;
      queryArticleById(self.articleId).then(res => {
        self.ruleForm = res.data;
      });
    },
    //提交
    handelSubmit() {
      let self = this;
      var pathvalue = this.$refs.cascaderAddr.getCheckedNodes()[0];
      let params = self.ruleForm;
      if(!self.articleId){
        params.cityCode = pathvalue.path[1];
        params.cityName = pathvalue.pathLabels[1];
      }
      self.$confirm("是否确认提交", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (self.articleId) {
            updateStrategy(params).then(response => {
              self.$message({
                message: "编辑成功",
                type: "success",
                duration: 1000
              });
            });
          } else {
            addStrategy(params).then(response => {
              self.$message({
                message: "提交成功",
                type: "success",
                duration: 1000
              });
              self.ruleForm = {};
              self.cityCode = [];
            });
          }
      });
    },
    //读取
    onEditorReady(editor) {
      // console.log(editor);
    },
    //上传图片成功
    quillImgSuccess(res, file) {
      // 富文本编辑框图片上传
      // console.log(URL.createObjectURL(file.raw));
      // this.form.icon = URL.createObjectURL(file.raw);
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.data为服务器返回的图片地址
        quill.insertEmbed(
          length,
          "image",
          "http://101.132.138.185:8080/" + res
        );
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@charset "utf-8";
.srategy-container {
  padding: 20px 40px;
}
.avatar-uploader {
  height: 0;
}
.edit_container {
  margin-top: 20px;
}
.editer {
  height: 500px;
}
.ql-toolbar.ql-snow {
  background-color: #e5e5e5;
  border: 0px solid #a5a4a4a3;
}
.ql-snow.ql-toolbar button,
.ql-snow .ql-toolbar button {
  background-color: #f7f7f7;
}
.ql-container.ql-snow {
  border: 3px solid #e5e5e5;
}
.ql-snow /deep/ .ql-picker {
  // width: 90px;
  margin-left: 5px;
}
.ql-snow /deep/ .ql-picker-label {
  background-color: #f7f7f7;
}
</style>
