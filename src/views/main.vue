<template>
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%">
    <el-container style="height: 100%" class="elcontainer">
        <div class="container">
          <!-- <div>
            <img src="../assets/icon.png" id="icon" />
          </div> -->
          <div class="nav">
            <div class="nav-left">
              <ul>
                <!-- <li><img src="../assets/icon.png" id="icon" /></li> -->
                <li><img class="logo-page" src="../assets/logo1.png" id="icon" /></li>
                <li
                  v-for="(item, index) in tab_list"
                  :key="index"
                  class="nav-tab"
                  :class="{ active: now_tab == item.index }"
                  @click="changeTab(index)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div class="nav-right">
                <el-avatar class="user-picture"> user </el-avatar>
            </div>
          </div>
          <div>

          </div>
        </div>
        <el-main>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-main>

      <el-footer class="homeFooter" style="height: 50px">
        <div class="title">Copyright © 杭州电子科技大学</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      tab_list: [
        {
          name: "题库",
          index: 1,
        },
        {
          name: "考试",
          index: 2,
        },
        {
          name: "班级",
          index: 3,
        },
      ],
      now_tab: 1,
    };
  },
  methods: {
    changeTab(index) {
      this.now_tab = index + 1;
    },
  },
};
</script>

<style scoped>
.homeHeader {
  background: white;
  display: flex;
  align-items: center;
}
li {
  list-style: none;
  display: inline;
  margin-right: 15px;
  font-size: 16px;
}
.elcontainer{
  padding-top: 10px !important;
}
/* nav */
.active {
  border-bottom: 1px solid #3296fa;
}
.nav{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 60px;
}
.user-picture {
    margin-top: 8px;
    margin-right: 20px;
}


/* footer */
.homeFooter {
  background: #3296fa;
  display: flex;
  align-items: center;
  bottom: 0;
  color: white;
  align-items: center;
}
.homeMain {
  background: #f7f7f7;
  display: flex;
  align-items: center;
}

.container {
  display: flex;
  justify-content: space-between;
}
.container #icon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
  margin-bottom: -10px;
}
.search {
  margin-right: 330px;
  width: 600px;
}
.main-head {
  margin: 0 auto;
  width: 2000px;
  /* justify-content: space-around; */
}
.homeFooter .title {
  margin: 0 auto;
  font-size: 10px;
}

.question-set {
  margin: 40px 100px;
}
.one {
  background-color: white;
  height: 200px;
  width: 100%;
}
</style>