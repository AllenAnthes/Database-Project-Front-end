<template>
  <div id="app">
    <db-header align="center"></db-header>
    <el-row class="container">
      <el-col :span="2" class="menu">
        <sidebar id="sidebar"></sidebar>
      </el-col>
      <el-col :span="22" class="content">
        <db-filterinput></db-filterinput>
        <db-table></db-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <footer class="footer">
          <db-footer></db-footer>
        </footer>
    </el-col>
    </el-row>
  </div>
</template>

<script>

  import Sidebar from './components/Sidebar.vue'
  import DbHeader from './components/DbHeader.vue'
  import DbFooter from './components/DbFooter.vue'
  import DbTable from './components/DbTable.vue'
  import DbFilterinput from "./components/DbFilterInput.vue";

  // Add headers




export default {
  data () {
    return {
      msg: 'Want something new?'
    }
  },

    components: {
        DbFilterinput,
        Sidebar, DbHeader,
        DbFooter, DbTable,
    },
}
</script>


<style>
  element.style {
    background-color: rgb(10, 47, 88);
  }

  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  #sidebar, body, html {
    height: 100%;
  }

  #app {

    position: relative;
  }

  footer, div {
    display: block;
  }

  .container {
    padding-top: 70px;
    flex: 1;
  }

  .container, #app {
    height: 100%;
  }

  .menu {
    height: 100%;
    background-color: #eef1f6;
  }

  .content {
    padding: 25px 25px 125px;
  }

  .footer {
    height: 120px;
    background-color: #324057;
    color: #a4aebd;
    width: 100%;
    z-index: 1000;
    margin-top: -120px;
    line-height: 1;
    font-size: 22px;
  }

</style>