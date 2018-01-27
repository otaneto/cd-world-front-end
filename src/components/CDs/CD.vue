<template>
  <v-container v-bind="{ [`grid-list-md`]: true }">
    <v-layout row wrap>
      <v-flex xs12 md8>
        <v-carousel>
          <v-carousel-item
            :key="cd.img"
            v-bind:src="cd.img"
            transition="fade"
          >
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <v-layout column>
              <div class="headline">{{ cd.title }}</div>
              <div class="grey--text" v-if="cd.stock.quantity > 0">Quantidade em estoque: {{ cd.stock.quantity }}</div>
              <div class="grey--text" v-else>Item indisponível</div>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <h1>R$ {{ cd.sale_price }}</h1>
            <br>
            <div>Cod.: {{ cd.id }}</div>
            <div>{{ cd.artist }}, {{ cd.year }}</div>
            <div>{{ cd.genre }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat class="primary" route :to="`/cd/${cd.id}/buy`">Comprar</v-btn>
            <v-btn flat route to="/">Voltar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    cd() {
      console.log(this.id);
      return this.$store.getters.loadedCD(this.id);
    },
  },
};
</script>