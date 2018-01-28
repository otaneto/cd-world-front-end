<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <div class="headline">Vendas</div>
      </v-flex>
      <v-data-table
        v-bind:headers="headers"
        :items="sales"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.cd.title }}</td>
          <td>{{ props.item.cd.artist }}</td>
          <td>{{ props.item.cd.amount }}</td>
          <td>{{ props.item.date }}</td>
          <td>
            <v-btn flat icon>
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID Venda', value: 'id', align: 'left' },
        { text: 'Título', value: 'title', align: 'left' },
        { text: 'Artista', value: 'artist', align: 'left' },
        { text: 'Quantidade', value: 'amount', align: 'left' },
        { text: 'Data da venda', value: 'date', align: 'left' },
      ]
    }
  },
  computed: {
    sales() {
      console.log(this.$store.getters.sales);
      return this.$store.getters.sales;
    },
  },
  methods: {
  }
}
</script>
