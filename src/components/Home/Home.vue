<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.layout-main {
  flex: 1;
}

.layout-right {
  flex: 1;
}

.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}


</style>
<template>
  <div class="layout">
    <div style="height:40px">Vue测试平台</div>
    <Row type="flex" class="layout-main">
      <menu-list></menu-list>
      <Col class='layout-right'>
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
      </div>
      <div class="layout-copy">
        2011-2016 &copy; TalkingData
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import MenuList from './Menu.vue'
export default {
  components: {
    MenuList,
  }
}
</script>