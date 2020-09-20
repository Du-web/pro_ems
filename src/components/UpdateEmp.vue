<template>
    <div id="wrap">
        <div id="top_content">
            <div id="header">
                <div id="rightheader">
                    <p>
                        2009/11/20
                        <br />
                    </p>
                </div>
                <div id="topheader">
                    <h1 id="title">
                        <a href="#">Main</a>
                    </h1>
                </div>
                <div id="navigation">
                </div>
            </div>
            <div id="content">
                <p id="whereami">
                </p>
                <h1>
                    update Emp info:
                </h1>
<!--                <form action="emplist.html" method="post">-->
                    <table cellpadding="0" cellspacing="0" border="0"
                           class="form_table">
                        <tr>
                            <td valign="middle" align="right">
                                id:
                            </td>
                            <td valign="middle" align="left">
                                {{$route.params.num}}
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                name:
                            </td>
                            <td valign="middle" align="left">
                                <input type="text" class="inputgri" name="name" v-model="emp_name"/>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                photo:
                            </td>
                            <td valign="middle" align="left">
                                <img :src="photo" style="height: 60px;"/>
                                <input type="file" name="photo" ref="photo"/>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                salary:
                            </td>
                            <td valign="middle" align="left">
                                <input type="text" class="inputgri" name="salary" v-model="salary"/>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                age:
                            </td>
                            <td valign="middle" align="left">
                                <input type="text" class="inputgri" name="age" v-model="age"/>
                            </td>
                        </tr>
                    </table>
                    <p>
                        <input type="submit" class="el-button" value="确定更改" @click="updateEmp" />
                    </p>
<!--                </form>-->
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
        name: "UpdateEmp",
        data(){
            return {
                id:'',
                emp_name: '',
                salary: '',
                age: '',
                photo: ''

            }
        },
        methods:{
            getParams(){
                let emp_id = this.$route.params.num;
                this.id = emp_id
                this.$axios({
                    url: "http://127.0.0.1:8000/emsapp/emp/" + emp_id + "/",
                    method: 'get',
                }).then(res => {
                    let response = res.data.results
                    this.emp_name = response.emp_name
                    this.salary = response.salary
                    this.age = response.age
                    this.photo = response.img
                }).catch(error => {
                    console.log(error);
                })
            },
            updateEmp(){
                let file = this.$refs.photo.files[0]
                let formData = new FormData();
                formData.append('emp_name', this.emp_name);
                formData.append('salary', this.salary);
                formData.append('age', this.age);
                formData.append('img', file);
                this.$axios({
                    url: "http://127.0.0.1:8000/emsapp/emp/" + this.id + "/",
                    method: 'patch',
                    // data:{
                    //     emp_name:this.emp_name,
                    //     salary:this.salary,
                    //     age:this.age
                    // }
                    data: formData,
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res);
                    alert('更新成功');
                    this.$router.push('/index');
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        created() {
            this.getParams()
        },
        watch:{
            '$route': 'getParams'
        }

    }
</script>

<style scoped>

</style>
