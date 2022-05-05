<template>
    <div class="container fillcontain">
        <div>
        <div class="search_input" ref="search_input" @mouseleave="mouseout" id="search_input_id">
            <div></div>
            <div class="search_bar" @click="focus()">
                <span>
                    <img src="../assets/search.png" alt="" class="icon"> 
                </span>
                <input type="text" placeholder="搜索" class="input-text" ref="search" @keyup="search()" v-model="search_content" @keyup.enter="finish_input()">
            </div>
            <div v-if="isFocus && !isEmpty">
                <div class="suggestions" v-for="(list,index) in lists" :key="index" @click="selectItem(index)">
                    <div class="suggestion_item">{{list.title}}</div>
                    <div class="suggestion_item">{{list.note}}</div>
                </div>
            </div>
            <div v-if="isFocus && isEmpty && hasHistory">
                <div class="history_suggestion_title">
                    <div>搜索历史</div>
                    <div class="history_clear" @click="clear_history()">
                        <div>
                            <svg t="1567218276841" class="icon clear_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2103" width="200" height="200"><path d="M829.952 271.36h-126.976v-51.2a76.288 76.288 0 0 0-75.776-76.288h-256a76.288 76.288 0 0 0-75.776 76.8v51.2H168.448a25.6 25.6 0 0 0 0 51.2h661.504a25.6 25.6 0 0 0 0-51.712z m-178.176 0h-307.2v-51.2a26.112 26.112 0 0 1 25.6-25.6h256a24.576 24.576 0 0 1 24.576 25.6zM448.512 677.376V398.336a25.6 25.6 0 0 0-51.2 0v279.04a25.6 25.6 0 0 0 51.2 0zM601.088 677.376V398.336a25.6 25.6 0 0 0-51.2 0v279.04a25.6 25.6 0 0 0 51.2 0z" fill="" p-id="2104"></path><path d="M735.744 346.624a25.6 25.6 0 0 0-25.6 25.6v381.44a102.4 102.4 0 0 1-102.4 102.4H390.656a102.4 102.4 0 0 1-102.4-102.4V372.224a25.6 25.6 0 0 0-51.2 0v381.44a153.6 153.6 0 0 0 153.6 153.6h217.6a153.6 153.6 0 0 0 153.6-153.6V372.224a25.6 25.6 0 0 0-26.112-25.6z" fill="" p-id="2105"></path></svg>
                        </div>
                        <div>清空</div>
                    </div>
                </div>
                <div class="suggestions history_suggestion" v-for="(history_list,index) in history_lists" :key="index" ref="historyList" @click="selectHistory(index)">
                    <div class="suggestion_item">{{history_list}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 新建题集按钮 -->
    <el-button type="primary" @click="dialogFormVisible = true" class="new-button">新建题集</el-button>
        
        <!-- 新建题集的表单 -->
        <el-dialog title="新建题集" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="题集名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
                <template #footer>
                    <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addQuestion">确 定</el-button>
                </div>
                </template>
                
        </el-dialog>

        <div class="question-set-list">
            <!-- 题集列表 -->
            <div class="question-set" v-for="item in questionSetList" :key="item.id"        @click="gotoQuestionList(item.id)" >
                <!-- <div><img src="../assets/set.png" alt="" class="image"></div> -->
                <div class="set-left">
                    <div><img src="../assets/icon-section-script.png" alt="" class="image">
                    </div>
                    <div class="set-title">
                        <p class="set-name">{{item.questionSet.name}}</p>
                        <p class="desc-time">创建于  {{item.questionSet.createdat}}</p>
                    </div>
                </div>
                <el-popover
                    placement="top-start"
                    :width="200"
                    trigger="hover"
                >
                    <template #reference>
                        <div class="more-button">
                            <img class="img-more" src="../assets/more.png" alt="">
                        </div>
                    </template>
                    <div>
                        <span class="option" v-for="item in menuList" :key="item">
                            <img class="option-img" :src="item.img" alt="">
                            <p class="option-text">{{item.name}}</p>
                        </span>
                    </div>
                </el-popover>
            </div>
            </div>
        </div>
</template>

<script>
    import {addQuestionSet, getQuestionSet, getAllSet, addSet} from '../api/getData'
    import addImg from '../assets/add.png'
    import listImg from '../assets/list.png'
    import memberImg from '../assets/member.png'
    import deleteImg from '../assets/delete.png'
    import { reactive, ref } from 'vue'

    // const dialogFormVisible = ref(false)

    const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

    export default {
        data() {
            return {
                questionSetList: [],
                menuList:[{
                    "img" : addImg,
                    "name" : "创建刷题题集",
                    
                },{
                    "img" : listImg,
                    "name" : "查看刷题题集",
                
                },{
                    "img" : memberImg,
                    "name" : "成员管理"
                },{
                    "img" : deleteImg,
                    "name" : "删除题集"
                }
                ],
                questionSetName: '',
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    name: '',
                },
                // 搜索
                isFocus:false,
                isEmpty:true,
                search_content:"",
                lists:[],
                history_lists:[],
                flag:0
            }
        },
        created() {
            this.iniData();
        },
        props:{
            isHistory: {		// 是否需要历史记录
                type: Boolean,
                default: true
            },
            lists_title:{		 // 搜索建议标题
                type: Array,
                default: null
            },
            lists_note:{		// 搜索建议备注
                type: Array,
                default: null
            },
            input_length:{		// 搜索框长度
                type: String,
                default: "200px"
            },
        },
        computed: {
            selectValue: function (){
                return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
            },
            hasHistory(){
              if (this.isHistory !== undefined){
                  return this.isHistory;
              } else {
                  return true;
              }
          }
        },
         mounted(){
            // 动态设置输入框长度
            // console.log("设置的长度",this.input_length);
            let search_input_dom = document.getElementById("search_input_id");
            console.log(search_input_dom)
            search_input_dom.style.width = this.input_length;
            //获得历史搜索记录
            let histories = localStorage.getItem('history_lists');
            if ( histories !== "" && histories !== null && histories !== undefined){
                this.history_lists = histories.split(',');
            }
        },
        methods: {
            openFrom(){
                console.log('Mr.Wu yyds!!!!!')
                this.dialogFormVisible = true
                
            },
            //初始化
            iniData() {
                this.getAllQuestionSet()
                
            },

            //新建题集
            addQuestion(){
                const data = {
                    "name": this.form.name
                }
                addSet(data).then(res => {
                    if(res.status == 200){
                        if(res.data.code == 0){
                            let set = {
                                "avatarList": [],
                                "questionSet" : null
                            }
                            set.avatarList.push(res.data.data.avatar)
                            set.questionSet["id"] = res.data.data.set_id
                            set.questionSet["name"] = this.form.name
                            set.questionSet["creayedat"] = res.data.data.createdAt
                            this.questionSetList.push(set)
                            console.log(set)
                        } else {
                            this.$notify({
                                title: '错误',
                                message: res.data.msg,
                                offset: 100
                            })
                        }
                        this.dialogFormVisible = false
                    }
                })

            },

            //获取所有题集
            getAllQuestionSet(){
                getAllSet().then(res => {
                    if(res.status == 200){
                        if (res.data.code == 0){
                            this.questionSetList = res.data.data
                            console.log(this.questionSetList)
                        }
                    }
                }).catch((error) => {
                    console.log(err)
                })
                
            },

            //跳转至题目列表
            gotoQuestionList(setid){
                this.$router.push({path:'/questionManage', query: {setId: setid}})
            },
            
        },
        // async mounted() {
        //     this.labelForm.labels = await this.loadAll();
        //     console.log(this.labelForm.labels);
        // },
    }
</script>

<style>
	/* // @import '../style/mixin'; */
	/* .form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	} */
    .el-main{
        /* background-color: #f3eded; */
        background-color: #F7F7F7;
        
    }

    /* 题集列表 */
    .question-set-list{
        width: 100%;
        margin-top: 20px;
    }
    .question-set{
        margin-left: 90px;
        display: flex;
        background-color: white;
        width: 75%;
        height: 120px;
        box-shadow: #F7F7F7 ;
        margin-bottom: 20px;
        justify-content: space-between;
    }
    .set-content{
        display: inline-block;
    }
    .more-button{
        margin-right: 20px;
        margin-top: 10px;
    }
    .set-left{
        display: flex;
    }
    .img-more{
        width: 30px;
        height: 30px;
    }
    .desc-time{
        color: #858585;
        font-size: 10px;
        position: absolute;

        margin-top: 60px;
    }
    .set-name{
        position: absolute;
        left: 0px;
    }
    .image{
        height: 80px;
        width: 80px;
        display: inline;
        margin-top: 22px;
        margin-left: 30px;

    }
    .set-title{
        width: 300px;
        margin-top: 10px;
        margin-left: 10px;
        font-size: 20px;
        position: relative;
    }
    .menu-list{
        width: 100px;
        height: 100px;
    }
    .option{
        display: flex;
        align-items: center;
        height: 33px;
    }
    .option-img{
        width: 15px;
        height: 15px;
        margin-right: 10px;
    }
    .option-text{
        display: inline;
        font-size: 14px;
    }
	
    .new-button{
        /* background-color: #FFD343; */
        background-color: #3296fa;
        display: block;
        margin-right: 40px;
        height: 40px !important;
        width: 150px;
        color: #ffffff;
        font-size: 17px;
        border: none;
        display: inline !important;
    }
    .container{
        display: flex;
        /* border: 1px  dotted lightcoral ; */
        /* background-color: #F7F7F7; */
        margin: 0;
        padding-top: 0px;
        flex-wrap: wrap;
    }
    
    .visiable{
        visibility: hidden;
    }

    /* 搜索框 */
    .search_input{
        margin-left: 300px;
        width: 600px !important;
        height: 45px;
        background: #ffffff;
        display: inline-block;
        /* border: .5px solid #999999; */
        border-radius: .6rem;

   box-shadow: rgb(213, 209, 209) 0px 0px 10px;
    }
    .search_bar{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
    }
    .input-text{
        background: #ffffff;
    }
   .suggestions{
       width: 86%;
       margin: 0 auto;
       border-top: 0.5px solid #dddddd;
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       padding: .6rem 1rem;
       color: #666666;
       font-size: .8rem;
   }
    suggestions:active{
       color: #007cdc;
   }
   .history_suggestion{
       font-size: 1rem;
   }
   .history_suggestion_title{
       font-size: .8rem;
       color: #aaaaaa;
       text-align: center;
       display: flex;
       flex-direction: row;
       align-items: flex-end;
       margin-bottom: .2rem;
       margin-left: 40%;
       position: relative;
   }
   .history_clear{
       font-size: .68rem;
       position: absolute;
       right: 4%;
       display: flex;
       flex-direction: row;
   }
   .history_clear:active{
       color: black;
   }
   .search_input input[type="text"]{
        width: 80%;
        margin-top: .2rem;
        margin-bottom: .1rem;
        margin-left: .32rem;
        font-size: 18px;
        border: 0;
        outline: none;
        padding-top: .4rem;
        padding-bottom: .4rem;
        background: #fff;
        color: #666666;
    }
    .search_input input[type="text"]::placeholder{
        color: #999999;
    }
    .icon{
        width: 1.6rem;
        height: 1.6rem;
        margin-left: .6rem;
        margin-top: 10px;
    }
    .clear_icon{
        width: .82rem;
        height: .82rem;
        opacity: 0.5;
    }
    .clear_icon:active{
        opacity: 1;
    }
</style>
