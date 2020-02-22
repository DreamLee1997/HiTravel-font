<!--
 * @Descripttion: 
 * @version: 
 * @Author: lixiang
 * @Date: 2020-02-15 13:30:33
 * @LastEditors  : lixiang
 * @LastEditTime : 2020-02-15 14:54:55
 -->
<template>
    <div >
        edfss
        <el-form-item label="详细描述" prop="words">
            <div class="edit_container">
              <quill-editor v-model="ruleForm.words" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
              </quill-editor>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    name: 'wirteStrategy',
    data(){
        return {
            ruleForm:{},
            editorOption: {}
        }
    },
    components: {//使用编辑器
        quillEditor
    },
    computed: {
        editor() {
            // return this.$refs.myQuillEditor.quill
        }
    },
    methods:{
        onEditorReady(editor) {
            console.log(editor)
        },
    }
    
}
</script>

<style lang="scss" scoped>
@charset "utf-8";


</style>
