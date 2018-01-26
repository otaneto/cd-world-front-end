<template>
  <v-container v-bind="{ [`grid-list-md`]: true }">
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field 
          label="Buscar CD ou Artista..."
          prepend-icon="search"
          single-line
          @keyup="searchCDs"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4 v-if="cdsFound.length > 0" v-for="cd in cdsFound" :key="cd.id">
        <v-card router :to="`cd/${cd.id}`">
          <v-card-media v-bind:src="cd.imgs[0].url" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ cd.title }}</h3>
              <h3>R$ {{ cd.sale_price }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div>{{ cd.artist }}, {{ cd.year }}</div>
            <h3 v-if="cd.stock.quantity > 0" class="green--text">Item Disponível</h3>
            <h3 v-else class="red--text">Item Indisponível</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn 
              class="primary"
              flat
              route
              :to="`cd/${cd.id}`"
            >
              Detalhes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 v-if="cdsFound.length <= 0">
        <p class="">Nenhum CD encontrado</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { filter } from 'lodash';
export default {
  methods: {
    searchCDs(event) {
      const expression = new RegExp(event.target.value, 'i');
      const itemsFound = filter(this.cds, cd => expression.test(cd['title']) || expression.test(cd['artist']));
      this.$store.dispatch('getCDs', itemsFound);
    }
  },
  computed: {
    cds() {
      return this.$store.getters.loadedCDs;
    },
    cdsFound() {
      return this.$store.getters.cdsFound;
    }
  },
};
</script>
