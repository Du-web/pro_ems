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
                    login
                </h1>
                <table cellpadding="0" cellspacing="0" border="0"
                       class="form_table">
                    <tr>
                        <td valign="middle" align="right">
                            username:
                        </td>
                        <td valign="middle" align="left">
                            <input type="text" class="inputgri" name="name" v-model="username"/>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" align="right">
                            password:
                        </td>
                        <td valign="middle" align="left">
                            <input type="password" class="inputgri" name="pwd" v-model="pwd"/>
                        </td>
                    </tr>
                </table>
                <p>
                    <input type="submit" class="el-button" value="登录" @click="user_login"/>
                    &nbsp;&nbsp;
                    <router-link to="/register">注册</router-link>
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
        name: "Login",
        data(){
            return{
                username: '',
                pwd: ''
            }
        },
        methods:{
            user_login(){
                this.$axios({
                    url: "http://127.0.0.1:8000/emsapp/login/",
                    method:'post',
                    data: {
                        username:this.username,
                        password:this.pwd
                    }
                }).then(res => {
                    console.log(res);
                    let username = res.data.results['username']
                    sessionStorage.setItem('user', username)
                    this.$router.push("/index")
                }).catch(error => {
                    alert('用户名或密码不对')
                })
            }

        }
    }
</script>

<style scoped>

</style>
