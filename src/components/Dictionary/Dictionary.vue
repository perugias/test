<template>
  <div>
    <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem href="dictionary">人员管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class='btnDiv'><Button type="primary"  @click="this.showModal">添加人员</Button></div>
     <Table :columns="dictionaryColumns" :data="userList"></Table>
     <Modal
        v-model="addModal"
        title="添加人员"
        @on-ok="handleSubmit('formCustom')"
        @on-cancel="this.cancel">
         <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="名称" prop="name">
            <Input type="text" v-model="formCustom.name"></Input>
        </FormItem>
        <FormItem label="工号" prop="num">
            <Input type="text" v-model="formCustom.num"></Input>
        </FormItem>
        <FormItem label="层级" prop="role">
            <Input type="text" v-model="formCustom.role"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
            <Button type="ghost" @click="addModal = false" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
     <div slot="footer">
          
        </div>
    </Modal>
  </div>
</template>

<script>
import {
  getDictionaryListApi,
  getMember,
  addMember,
  deleteMember
} from "../../actions/dictionary/dictionary";
import styles from "./style.css";
export default {
  name: "dictionary",
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名称不能为空"));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("工号不能为空"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("层级不能为空"));
      } else {
        callback();
      }
    };

    return {
      userList: [],
      addModal: false,
      deleteModal: false,
      dictionaryColumns: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "工号",
          key: "num"
        },
        {
          title: "层级",
          key: "role"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      console.log(params.row.user_id);
                      this.confirm(params.row.user_id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      formCustom: {
        passwd: "",
        passwdCheck: "",
        age: ""
      },
      ruleCustom: {
        name: [{ validator: validatePass, trigger: "blur" }],
        num: [{ validator: validatePassCheck, trigger: "blur" }],
        role: [{ validator: validateAge, trigger: "blur" }]
      }
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      getMember().then(res => {
        let self = this;
        self.userList = res.users;
        console.log(res);
      });
    },
    ok: function() {
      this.$Message.info("点击了确定");
    },
    cancel: function() {
      this.$Message.info("点击了取消");
    },
    showModal: function() {
      this.addModal = true;
      this.handleReset("formCustom");
    },
    handleSubmit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formCustom.name);
          addMember({
            name: this.formCustom.name,
            role: this.formCustom.role,
            num: this.formCustom.num
          }).then(res => {
            console.log(res);
            if (res.error_code == "0") {
              this.$Message.success("提交成功!");
              this.addModal = false;
              this.loadData();
            }
          });
        } else {
          this.addModal = true;
          this.$Message.error("表单验证失败!");
        }
      });
    },
    handleReset: function(name) {
      this.$refs[name].resetFields();
    },
    confirm: function(id) {
      this.$Modal.confirm({
        title: "删除人员",
        content: "你确定要删除人员吗",
        visible: this.deleteModal,
        onOk: () => {
          deleteMember(id).then(res => {
            console.log(res);
            if (res.error_code == "0") {
              this.$Message.success("删除成功!");
              this.loadData();
            }else{
              this.$Message.error("删除失败!");
            }
          });
        },
        onCancel: () => {
          // this.$Message.info('点击了取消');
        }
      });
    }
  }
};
</script>

<style>

</style>
