<template>
  <div style="position: absolute; top: 0; left: 0; width: 100%; ">
    <el-container>
      <el-header style="--el-header-padding: 0px">
        <div class="container">
          <!-- <div>
            <img src="../assets/icon.png" id="icon" />
          </div> -->
          <div class="nav">
            <div class="nav-left">
              <ul>
                <!-- <li><img src="../assets/icon.png" id="icon" /></li> -->
                <li>
                  <img class="logo-page" src="../assets/读书.png" id="icon" />
                </li>
                <li class="nav-tab">题集 > 考试</li>
              </ul>
            </div>
            <div class="nav-right">
              <ul>
                <!-- <li><img src="../assets/icon.png" id="icon" /></li> -->
                <li>
                  <img
                    class="logo-page"
                    src="../assets/history.png"
                    id="icon"
                  />
                </li>
                <li>
                  <img
                    class="logo-page"
                    src="../assets/antOutline-user-add 2.png"
                    id="icon"
                  />
                </li>
                <li>
                  <img
                    class="logo-page"
                    src="../assets/comment-filling.png"
                    id="icon"
                  />
                </li>
                <li>
                  <img class="logo-page" src="../assets/more1.png" id="icon" />
                </li>
              </ul>
            </div>
          </div>

          <!-- <div>
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              style="margin-top: 10px"
            >
              <el-tab-pane label="题库" name="first"></el-tab-pane>
              <el-tab-pane label="考试" name="second"></el-tab-pane>
              <el-tab-pane label="班级" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </div> -->
          <div></div>
        </div>
      </el-header>

      
  </div>
  
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="80%">
            <div class="subject">
            <div class="sum">题目数：90</div>

            <!-- 单选题 -->
            <div class="select">
              <!-- 第一题 -->
              <template v-for="(item,index) in questionList" :key="index">
                <div >
                  <!-- 题目 -->
                  <div class="timu"> 
                    <div class="title">
                      {{item.question}}
                    </div>

                    <table cellspacing="1" cellpadding="5" class="answer">
                      <tr>
                        <td>{{item.options[0]}}</td>
                        <td>{{item.options[1]}}</td>
                      </tr>
                      <tr>
                        <td>{{item.options[2]}}</td>
                        <td>{{item.options[3]}}</td>
                      </tr>
                    </table>
                  </div>

            
                  <!-- <img src="../assets/md-delete.png" class="md-delete" /> -->

                  <!-- 删除 -->
                  <div class="delete">
                    <img src="../assets/md-delete.png" class="md-delete" />
                  </div>
                </div>

                <!-- 修改老师和横线 -->
                <div>
                  <div>
                    <img
                      class="teacher-logo"
                      src="../assets/teacher-member.png"
                    />

                    <span class="member">{{item.userModel.nickname}} 更新于 {{item.time}}</span>
                  </div>
                  <hr
                    style="
                      margin-top: 15px;
                      border-top: 0.5px solid#BBBBBB;
                      width: 100%;
                    "
                  />
                </div>
              </template>
            
            <!-- 第二题 -->
              <div>
                  <!-- 题目 -->
                  <div class="timu">
                    <div class="title">
                      1、在TCP/IP模型中，哪一层提供端到端的服务？
                    </div>

                    <table cellspacing="1" cellpadding="5" class="answer">
                      <tr>
                        <td>A、传输层</td>
                        <td>B、网络层</td>
                      </tr>
                      <tr>
                        <td>C、网络层</td>
                        <td>D、网络层</td>
                      </tr>
                    </table>
                  </div>
                  <!-- <img src="../assets/md-delete.png" class="md-delete" /> -->

                  <!-- 删除 -->
                  <div class="delete">
                    <img src="../assets/md-delete.png" class="md-delete" />
                  </div>
                </div>

                <!-- 修改老师和横线 -->
                <div>
                  <div>
                    <img
                      class="teacher-logo"
                      src="../assets/teacher-member.png"
                    />

                    <span class="member">赵周周 更新于2021/11/23 18:47</span>
                  </div>
                  <hr
                    style="
                      margin-top: 15px;
                      border-top: 0.5px solid#BBBBBB;
                      width: 100%;
                    "
                  />
                </div>
              </div>
            </div>


        </el-aside>
        <el-main>Main
            <div>
                <el-input placeholder="搜索" prefix-icon="Search"/>
            </div>
            <div class="add">
                <span @click="opendialog">添加题目</span>
                <hr style=" margin-top: 15px; border-top: 0.5px solid#3296FA; width: 100%;"/>
            </div>
            <table cellspacing="1" cellpadding="5" class="add-answer">
                <tr>
                    <td class="table-left question-type" @click="opendialog">单选</td>
                    <td class="question-type">多选</td>
                </tr>
                <tr>
                    <td class="question-type">简答</td>
                    <td class="question-type">填空</td>
                </tr>
                <tr>
                    <td class="question-type">判断</td>
                    <td class="question-type">计算</td>
                </tr>
                <tr>
                    <td class="question-type">完形填空</td>
                </tr>
                <tr>
                    <td class="question-type">阅读理解</td>
                </tr>
                <tr>
                    <td class="question-type">编程</td>
                </tr>
            </table>


            <el-dialog v-model="dialogFormVisible" title="添加题目">
                    <el-form :model="form">
                            <el-input v-model="input" placeholder="请输入题目" class="question-input"/>
                        <div class="button-container">
                            <div>
                                <img src="../assets/md-crop_original (1).png">


                            </div>
                            <div>

                            </div>

                        </div>
                        
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">创建题目</el-button>
                        </span>
                    </template>
                </el-dialog>


        </el-main>
      </el-container>
    </el-container>
  
  </div>
</template>

<script>
import { getAllQuestion } from "../api/getData";
export default {
  data() {
    return {
      dialogFormVisible: false,
      questionList: [
        {
          question: " 1、在TCP/IP模型中，哪一层提供端到端的服务？",
          options: ["A、传输层", "B、网络层", "C、网络层", "D、网络层"],
          userModel: {
            nickname: "赵皱皱",
          },
          time: "2021/11/23 18:47",
        },
      ],
    };
  },
  created() {
    console.log(this.questionList);
    console.log(this.questionList[0]);
    console.log(this.questionList[0].options[0]);
  },
  methods: {
      opendialog(){
          this.dialogFormVisible = true
          console.log("open")

      }
  },
};
</script>




<style scoped>
/* subject */
.subject {
  background: #f9f9f9;
  height: 1000px;
  overflow: hidden;
  position: relative;
}
.sum {
  /* float:left; */
  position: absolute;
  left: 10px;
  top: 5px;
  /* width:100%; */
}
.select {
  /* margin-top:30px; */
  position: absolute;
  margin-top: 20px;
  margin-left: 50px;
  width: 91%;
}
.title {
  /* width: 100%;
    position:absolute;
    left: 50px; */
  display: block !important;
  margin-left: -72%;
  margin-bottom: 10px;
}
.answer1 {
  margin-left: -270px;
  margin-top: 5px;
}
.member {
  color: #959292;
}
.answer {
  margin-bottom: 10px;
}
.teacher-logo {
  border-radius: 50%;
  height: 50px;
  margin-left: -77%;
  margin-right: 10px;
  /* margin-left: -20%; */
  vertical-align: middle;
}
.md-delete {
  height: 50px;
}
.delete {
  margin-right: -85%;
  margin-top: -4%;
}

.timu {
  margin-top: 35px;
}

/* .timu {
  display: inline-block;
  width: 60%;
} 

/* .delete {
  display: inline-block;
}

/* header */
.homeHeader {
  background: white;
  display: flex;
  align-items: center;
}
ul {
  padding-left: 20px;
  margin-top: 10px;
}
li {
  list-style: none;
  display: inline;
  margin-right: 15px;
  font-size: 20px;
}
.container {
  display: flex;
  justify-content: space-between;
}
.elcontainer {
  padding-top: 10px !important;
}
/* nav */
.active {
  border-bottom: 1px solid #3296fa;
}
.nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background: #3296fa;
  padding: 0px;
}
.nav #icon {
  width: 40px;
  height: 40px;
  margin-right: -10px;
  margin-bottom: -10px;
}
.nav-tab {
  color: #f7f7f7;
}
.nav-right #icon {
  width: 30px;
  height: 30px;
  margin-right: -5px;
  margin-top: 5px;
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

.add {
  margin-top: 50px;
}
.table-left {
  margin-right: 10px;
}
.add-answer {
  margin-left: 10px;
}
.question-type {
  width: 110px;
}


/* 弹框添加题目 */
.button-container{
    display: flex;
}
</style>