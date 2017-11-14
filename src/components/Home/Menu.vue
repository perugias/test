<style scoped>

.layout-menu-left {
    background: #464c5b;
    width: 240px;
}

</style>
<template>
    <div class="layout-menu-left">
    <Menu theme="dark" width="auto" :open-names="['1','2']" @on-select="turnUrl">
        <Submenu name="1">
            <template slot="title"><Icon type="ios-navigate"></Icon>人员管理</template>
            <MenuItem name="dictionary"> 字典管理</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title"><Icon type="ios-keypad"></Icon>宣教管理</template>
            <MenuItem name="task">任务管理</MenuItem>
        </Submenu>
    </Menu>
    </div>
</template>
<script>
export default {
    methods: {
        turnUrl(name) {
            this.$router.push(name)
        }
    }
}
</script>