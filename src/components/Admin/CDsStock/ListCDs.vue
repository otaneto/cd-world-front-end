<template>
  <v-layout column>
    <v-layout justify-end>
      <v-btn class="primary" flat route :to="'/admin/cds/new'" >Novo CD</v-btn>
    </v-layout>
    <v-container>
      <v-layout column>
        <div class="headline">Estoque de CDs</div>
        <v-data-table
          v-bind:headers="headers"
          :items="cds"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.artist }}</td>
            <td>{{ props.item.year }}</td>
            <td>{{ props.item.stock.quantity }}</td>
            <td>{{ props.item.stock.updated_at }}</td>
            <td>
              <v-layout row>
                <v-btn flat icon>
                  <v-icon>mode_edit</v-icon>
                </v-btn>
                <v-btn flat icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-layout>
            </td>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', align: 'left' },
        { text: 'Título', value: 'title', align: 'left' },
        { text: 'Artista', value: 'artist', align: 'left' },
        { text: 'Ano', value: 'year', align: 'left' },
        { text: 'Qtd. Estoque', value: 'stock.quantity', align: 'left' },
        { text: 'Atualização Estoque', value: 'stock.updated_at', align: 'left' }
      ]
    }
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
  methods: {
  }
}
</script>
