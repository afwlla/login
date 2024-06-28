<template>
  <div>
    <div v-if="account.id">
      <p>HI, {{ account.name }}</p>
      <button @click="logout()">logout</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span>Id</span>
        <input type="text" id="loginId" v-model="form.loginId">
      </label>
      <label for="loginPwd">
        <span>Pwd</span>
        <input type="password" id="loginPwd" v-model="form.loginPwd">
      </label>
      <hr>
      <button @click="submit()">login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios'

const account = ref({
  id:null,
  name:''
})
const form = ref({
  loginId:'',
  loginPwd: ''
})

const getAccount = async () => {
  await axios.get('/api/account').then((res)=>{
  account.value= res.data
})}
getAccount()

const submit = ()=>{
  axios.post('/api/account', form.value).then((res)=>{
    account.value= res.data
    alert('login success')
  }).catch(()=>alert('login fail'))
}

const logout = () =>{
  axios.delete('/api/account').then(()=>{
    alert('logout success');
    account.value.id = null;
    account.value.name = '';
  })
}
</script>

<style lang="scss" scoped>

</style>