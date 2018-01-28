<template>
  <v-container v-bind="{ [`grid-list-md`]: true }">
    <v-layout row wrap justify-center>
      <v-flex xs12 md12>
        <v-text-field 
          label="Buscar CD ou Artista..."
          prepend-icon="search"
          single-line
          @keyup="searchCDs"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-between>
      <v-flex md2>
        <v-list subheader>
          <v-subheader>Gênero</v-subheader>
          <v-list-tile avatar v-for="genre in genres" :key="genre.name">
            <v-list-tile-action>
              <v-checkbox v-model="genre.vModel"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ genre.name }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex md10>
        <v-layout row wrap v-if="isFetching === true" justify-center>
          <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="primary"></v-progress-circular>
        </v-layout>
        <v-layout row wrap v-if="isFetching === false">
          <v-flex xs12 md4 v-if="cdsFound.length > 0" v-for="cd in cdsFound" :key="cd.id">
            <v-card router :to="`cd/${cd.id}`">
              <v-card-media v-bind:src="cd.img" height="200px">
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { filter } from 'lodash';

export default {
  created() {
    this.$store.dispatch('getCDs');
  },
  data() {
    return {
      genres: [ 
        { name:'Gospel', vModel: false },
        { name: 'MPB' , vModel: false },
        { name: 'Pop', vModel: false },
        { name: 'Rock', vModel: false },
        { name: 'Samba', vModel: false },
        { name: 'Infantil', vModel: false } 
      ],
    }
  },
  methods: {
    searchCDs(event) {
      const expression = new RegExp(event.target.value, 'i');
      const itemsFound = filter(this.cds, cd => expression.test(cd.title) || expression.test(cd.artist));
      this.$store.dispatch('findCDs', itemsFound);
    },
  },
  computed: {
    cds() {
      return this.$store.getters.loadedCDs;
    },
    cdsFound() {
      return this.$store.getters.cdsFound;
    },
    isFetching() {
      return this.$store.getters.isFetching;
    },
  },
};
</script>
