<template>
  <v-layout row>
    <v-navigation-drawer permanent light height="100%">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" route :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-layout>
      <v-layout>
        <router-view></router-view>
      </v-layout>
    </v-layout>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        items: [
          { icon: 'library_music', title: 'Estoque de CDs', link: '/admin', show: this.isLogged },
          { icon: 'shopping_basket', title: 'Vendas', link: '/admin/sales', show: !this.isLogged },
          { icon: 'insert_chart', title: 'Dashboard', link: '/admin/dashboard', show: !this.isLogged },
        ]
      }
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      isLogged() {
        return this.user !== null && this.user !== undefined;
      },
    }
  };
</script>
