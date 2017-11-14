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
<script src='./Task.js'></script>

