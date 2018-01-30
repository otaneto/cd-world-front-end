<template>
  <v-layout column>
    <v-layout justify-end>
      <v-btn class="primary" flat route :to="'/admin/cds/new'" >Novo CD</v-btn>
    </v-layout>
    <v-container>
      <v-layout row wrap v-if="isFetching === true" justify-center>
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="primary"></v-progress-circular>
      </v-layout>
      <v-layout column v-if="isFetching === false">
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
                  <v-icon>monetization_on</v-icon>
                </v-btn>
                <v-btn flat icon @click="onEditCD(props.item.id)">
                  <v-icon>mode_edit</v-icon>
                </v-btn>
                <v-menu>
                  <v-btn flat icon slot="activator">
                    <v-icon left>delete</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-text>Tem certeza que deseja excluir o CD?</v-card-text>
                    <v-card-actions>
                      <v-btn color="red" flat @click="onDeleteCD(props.item.id)">Sim</v-btn>
                      <v-btn flat>Não</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
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
    isFetching() {
      return this.$store.getters.isFetching;
    },
  },
  methods: {
    onEditCD(id) {
      this.$router.push(`/admin/cds/${id}/edit`);
    },
    onDeleteCD(id) {
      this.$store.dispatch('removeCD', id);
    }
  }
}
</script>
