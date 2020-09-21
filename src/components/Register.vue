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
          注册
        </h1>
        <table cellpadding="0" cellspacing="0" border="0"
               class="form_table">
          <tr>
            <td valign="middle" align="right">
              用户名:
            </td>
            <td valign="middle" align="left">
              <input type="text" class="inputgri" name="username" v-model="username" @blur="onName"/>
                &nbsp;&nbsp;
                <span style="color: red">{{span_name}}</span>
            </td>
          </tr>
          <tr>
            <td valign="middle" align="right">
              真实姓名:
            </td>
            <td valign="middle" align="left">
              <input type="text" class="inputgri" name="name" v-model="real_name" @blur="reName"/>
                &nbsp;&nbsp;
                <span style="color: red">{{span_rename}}</span>
            </td>
          </tr>
          <tr>
            <td valign="middle" align="right">
              密码:
            </td>
            <td valign="middle" align="left">
              <input type="password" class="inputgri" name="pwd" v-model="pwd" @blur="onPWD"/>
                &nbsp;&nbsp;
                <span style="color: red">{{span_pwd}}</span>
            </td>
          </tr>
          <tr>
            <td valign="middle" align="right">
              确认密码:
            </td>
            <td valign="middle" align="left">
              <input type="password" class="inputgri" name="re_pwd" v-model="re_pwd" @blur="rePWD"/>
                &nbsp;&nbsp;
                <span style="color: red">{{span_repwd}}</span>
            </td>
          </tr>
          <tr>
            <td valign="middle" align="right">
              性别:
            </td>
            <td valign="middle" align="left">
              男
              <input type="radio" class="inputgri" name="sex" value="m" @click="gender=0" checked="checked"/>
              女
              <input type="radio" class="inputgri" name="sex" value="f" @click="gender=1"/>
            </td>
          </tr>

        </table>
        <p>
          <input type="submit" class="el-button" value="注册" @click="regist"/>
            &nbsp;&nbsp;
            <router-link to="/login">登录</router-link>
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
        name: "Register",
        data(){
            return {
                username: '',
                real_name: '',
                pwd: '',
                re_pwd: '',
                gender: 0,
                span_name: '',
                span_rename:'',
                span_pwd: '',
                span_repwd: ''
            }
        },
        methods: {
            pattern_name(){
               let pattern = /\w{2,}/;
               if (this.username){
                   return pattern.test(this.username)
               }else {
                   this.span_name = '用户名不能为空';
                   return false;
               }
            },
            pattern_rename(){
                let pattern = /[\u4e00-\u9fa5]/;
                if (this.real_name){
                    return pattern.test(this.real_name)
                }else {
                    this.span_rename = '真实姓名不能为空';
                    return false;
                }
            },
            pattern_pwd(){
                let pattern = /^\w{6,18}$/;
                if (this.pwd){
                    return pattern.test(this.pwd)
                }else {
                    this.span_pwd = '密码不能为空';
                    return false;
                }
            },
            onName(){
                let bool = this.pattern_name();
                 if (bool === false){
                     this.span_name = '用户名的长度至少为2';
                     return false;
                 }else {
                     this.span_name = '';
                 }
            },
            reName(){
                let bool = this.pattern_rename();
                if (bool === false){
                    this.span_rename = '请填写中文的姓名';
                    return false;
                }else {
                    this.span_rename = '';
                }
            },
            onPWD(){
                let bool_pwd = this.pattern_pwd()
                if (bool_pwd === false){
                    this.span_pwd = '密码必须为6到18位字母、数字或下划线';
                    return false;
                }else {
                    this.span_pwd = '';
                }
            },
            rePWD(){
                if (this.pwd === this.re_pwd){
                    this.span_repwd = '';
                }else {
                    this.span_repwd = '两次密码不一致';
                    return false;
                }
            },
            regist(){
                let bool_name = this.pattern_name();
                let bool_rename = this.pattern_rename();
                let bool_pwd = this.pattern_pwd();
                if (bool_name === false || bool_rename === false || bool_pwd === false){
                    return false;
                }
                this.$axios({
                    url: "http://127.0.0.1:8000/emsapp/users/",
                    method: 'post',
                    data: {
                        username: this.username,
                        real_name: this.real_name,
                        password: this.pwd,
                        re_pwd: this.re_pwd,
                        gender: this.gender,
                    }
                }).then(res => {
                    console.log(res);
                    if (res.data.message){
                        alert('恭喜你，注册成功')
                        this.$router.push('login/')
                    }
                }).catch(error => {
                    alert('用户名已存在或者密码错误')
                })
            }
        }
    }
</script>

<style scoped>

</style>
