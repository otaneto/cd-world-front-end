<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-icon left>fa-music</v-icon>
          CD World
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-for="item in menuItems" v-if="item.show" :key="item.title" flat router :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        menuItems: [
          { icon: 'supervisor_account', title: 'Admin', link: '/admin', show: this.isLogged },
          { icon: 'input', title: 'Cadastrar', link: '/sign-up', show: !this.isLogged },
          { icon: 'lock_open', title: 'Login', link: '/login', show: !this.isLogged },
          { icon: 'account_circle', title: 'User', link: '/', show: this.isLogged },
        ],
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      isLogged() {
        return this.user !== null && this.user !== undefined;
      }
    },
  };
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
