<template>
    <div id="wrap">
        <div id="top_content">
            <div id="header">
                <div id="rightheader">
                    <p>
                        2009/11/20
                        <br />
                        <router-link to="/login">安全退出</router-link>
                    </p>
                </div>
                <div id="topheader">
                    <h1 id="title">
                        <a href="#">main</a>
                    </h1>
                </div>
                <div id="navigation">
                </div>
            </div>
            <div id="content">
                <p id="whereami">
                </p>
                <h1>
                    欢迎{{user_msg}}进入管理系统！
                </h1>
                <table class="table">
                    <tr class="table_header">
                        <td>
                            ID
                        </td>
                        <td>
                            Name
                        </td>
                        <td>
                            Photo
                        </td>
                        <td>
                            Salary
                        </td>
                        <td>
                            Age
                        </td>
                        <td>
                            Operation
                        </td>
                    </tr>
                    <tr class="row1" v-for="(emp,index) in emp_list" :key="emp.id">
                        <td>{{emp.id}}</td>
                        <td>{{emp.emp_name}}</td>
                        <td><img :src="emp.img" style="height: 60px;"></td>
                        <!--                        <td>{{emp.img}}</td>-->
                        <td>{{emp.salary}}</td>
                        <td>{{emp.age}}</td>
                        <td><a href="javascript:;" @click="del_emp(emp.id)">删除员工</a>&nbsp;
                            <a href="javascript:;" @click="update_emp(emp.id)">更新员工</a>
                        </td>
                    </tr>
                </table>
                <p>
                    <el-button>
                        <router-link to="/add">添加员工</router-link>
                    </el-button>
                </p>
            </div>
        </div>
        <div id="footer">
            <div id="footer_bg">
                ABC@126.com
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data(){
            return {
                user_msg: '',
                emp_list: [],
            }
        },
        methods:{
            AllEmp(){
                this.$axios.get("http://127.0.0.1:8000/emsapp/emp/").then(res => {
                    this.emp_list = res.data.results;
                }).catch(error => {
                    this.$message.error('查询失败')
                })
            },
            update_emp(num){
                console.log(num);
                this.$router.push('/update/' + num)
            },
            del_emp(num){
                let val = window.confirm('确定要删删除吗？')
                if (val){
                    this.$axios({
                        url: "http://127.0.0.1:8000/emsapp/emp/" + num + "/",
                        method: 'delete',
                    }).then(res => {
                        console.log(res);
                        this.emp_list = res.data.results
                    }).catch(error => {
                        console.log(error);
                    })
                }

            }
        },
        created() {
            let username = sessionStorage.getItem('user');
            if (username){
                this.user_msg = username;
            }else {
                this.$router.push('/login');
            }
            this.AllEmp();
        }
    }
</script>

<style scoped>

</style>
