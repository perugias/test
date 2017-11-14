<script src='./style.css'></script>
<template>
   <div>
    <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem href="dictionary">任务管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class='btnDiv'><Button type="primary"  @click="showModal('add')">添加任务</Button></div>
     <Table :columns="dictionaryColumns" :data="taskList"></Table>
     <Modal
        v-model="addModal"
        :title="modalType==1?'新增任务':'编辑任务'"
        @on-ok="handleSubmit('formCustom')"
        @on-cancel="this.cancel">
         <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="标题" prop="title">
            <Input type="text" v-model="formCustom.title"></Input>
        </FormItem>

        <FormItem label="描述" prop="description">
            <Input type="text" v-model="formCustom.description"></Input>
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
  getTask,
  addTask,
  deleteTask,
  editTask
} from "../../actions/dictionary/dictionary";
export default {
  name: "hospital",
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名称不能为空"));
      } else {
        callback();
      }
    };

    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("描述不能为空"));
      } else {
        callback();
      }
    };

    return {
      taskList: [],
      addModal: false,
      deleteModal: false,
      modalType: 1, //1是新增任务，2是编辑任务
      taskId: "",
      dictionaryColumns: [
        {
          title: "名称",
          key: "title"
        },
        {
          title: "描述",
          key: "description"
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
                      console.log(params.row.id);
                      this.showModal("edit", params.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      console.log(params.row.id);
                      this.deleteConfirm(params.row.id);
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
        title: "",
        description: ""
      },
      ruleCustom: {
        title: [{ validator: validatePass, trigger: "blur" }],
        description: [{ validator: validateAge, trigger: "blur" }]
      }
    };
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    loadData: function () {
      getTask().then(res => {
        let self = this;
        self.taskList = res.data;
        console.log(res);
      });
    },
    ok: function () { },
    cancel: function () { },
    showModal: function (method, id) {
      console.log(method);
      if (method == "add") {
        this.modalType = 1;
      }
      if (method == "edit") {
        this.modalType = 2;
        this.taskId = id;
      }

      this.addModal = true;
      this.handleReset("formCustom");
    },
    handleSubmit: function (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalType == 1) {
            addTask({
              title: this.formCustom.title,
              description: this.formCustom.description
            }).then(res => {
              console.log(res);
              if (res.success) {
                this.$Message.success("提交成功!");
                this.addModal = false;
                this.loadData();
              }
            });
          } else if (this.modalType == 2) {
            editTask({
              id: this.taskId,
              title: this.formCustom.title,
              description: this.formCustom.description
            }).then(res => {
              console.log(res);
              if (res.success) {
                this.$Message.success("编辑成功!");
                this.addModal = false;
                this.loadData();
              } else {
                this.$Message.error("编辑失败!");
              }
            });
          }
        } else {
          this.addModal = true;
        }
      });
    },
    handleReset: function (name) {
      this.$refs[name].resetFields();
    },
    deleteConfirm: function (id) {
      this.$Modal.confirm({
        title: "删除任务",
        content: "你确定要删除该项任务吗",
        visible: this.deleteModal,
        onOk: () => {
          deleteTask(id).then(res => {
            console.log(res);
            if (res.success) {
              this.$Message.success("删除成功!");
              this.loadData();
            } else {
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

