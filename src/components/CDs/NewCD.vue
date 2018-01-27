<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md10>
        <v-card>
          <v-card-title>
            <div class="headline">Novo CD</div>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="onSubmit">
              <v-layout row wrap md10>
                <v-flex xs12 md6 v-for="field in formFields" :key="field.name">
                  <v-text-field
                    :name="field.name"
                    :id="field.name"
                    :type="field.type"
                    v-model="field.vModel"
                    :label="field.label"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-btn class="primary" flat type="submit">Cadastrar no estoque</v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { keys, map, capitalize } from 'lodash';

export default {
  data() {
    return { 
      title: '', description: '', artist: '', year: '', img: '', sale_price: '', buy_price: '', genre: '', stock: '',
    };
  },
  computed: {
    formFields() {
      return [
        { name: 'title', vModel: this.title, label: 'Título', type: 'text' },
        { name: 'description', vModel: this.description, label: 'Descrição', type: 'text' },
        { name: 'artist', vModel: this.artist, label: 'Astista', type: 'text' },
        { name: 'genre', vModel: this.genre, label: 'Gênero', type: 'text' },
        { name: 'year', vModel: this.year, label: 'Ano', type: 'number' },
        { name: 'img', vModel: this.img, label: 'URL da Capa', type: 'text' },
        { name: 'sale_price', vModel: this.sale_price, label: 'Preço de venda', type: 'number' },
        { name: 'buy_price', vModel: this.buy_price, label: 'Preço de compra', type: 'number' },
        { name: 'stock', vModel: this.stock, label: 'Quantidade em estoque', type: 'number' },
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log(this.formFields);
      const body = {}
      map(this.formFields, field => {
        body[field.name] = field.vModel;
      });
      console.log(body);
    }
  }
}
</script>
