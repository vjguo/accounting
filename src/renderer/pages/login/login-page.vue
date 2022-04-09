<template>
  <div class="login-page">
    <div class="login-page__interface login-interface">
      <div class="login-interface__header">
        <h1 class="login-interface__logo">Accounting</h1>
      </div>
      <div class="login-interface__body">
        <el-form :model="form" label-position="left">
          <el-form-item prop="uesrname">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="login-interface__button" @click="handleSubmit">
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// data
const form = reactive({
  username: '',
  password: ''
})

// methods
const handleSubmit = () => {
  // TODO: submit logic
  console.log(`username: ${form.username} passowrd: ${form.password}`)
  router.replace('/home')
}
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  height: 100%;
  background-image: linear-gradient(
    to left top,
    var(--el-color-primary-light-1),
    var(--el-color-primary-light-9)
  );

  &__interface {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.login-interface {
  width: 400px;
  padding: 50px;
  background-color: white;
  border-radius: 5%;

  &__header {
    margin-bottom: 30px;
  }

  &__logo {
    text-align: center;
  }

  &__button {
    width: 100%;
  }
}
</style>
