<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md10>
        <v-btn flat route :to="'/admin'">Voltar</v-btn>
        <v-card>
          <v-card-title>
            <div class="headline">Novo CD</div>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="onSubmit">
              <v-layout row wrap md10 justify-space-between>
                <v-flex xs12 md5 v-for="field in formFields" :key="field.name">
                  <v-text-field
                    :name="field.name"
                    :id="field.name"
                    :type="field.type"
                    v-model="field.vModel"
                    :label="field.label"
                    :step="field.step"
                    required
                    :disabled="field.disabled"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <barcode v-bind:value="formFields[9].vModel">
                  Não foi possível gerar o código de barras'
                </barcode>
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
import { keys, map, random } from 'lodash';
import VueBarcode from 'vue-barcode';

export default {
  components: {
    'barcode': VueBarcode,
  },
  data() {
    return { 
      title: '', description: '', artist: '', year: '', img: '', sale_price: '', buy_price: '', genre: '', stock: '',
    };
  },
  computed: {
    formFields() {
      return [
        { name: 'title', vModel: this.title, label: 'Título', type: 'text', disabled: false },
        { name: 'description', vModel: this.description, label: 'Descrição', type: 'text', disabled: false },
        { name: 'artist', vModel: this.artist, label: 'Astista', type: 'text', disabled: false },
        { name: 'genre', vModel: this.genre, label: 'Gênero', type: 'text', disabled: false },
        { name: 'year', vModel: this.year, label: 'Ano', type: 'number', disabled: false },
        { name: 'img', vModel: this.img, label: 'URL da Capa', type: 'text', disabled: false },
        { name: 'sale_price', vModel: this.sale_price, label: 'Preço de venda', type: 'number', step: '0.01', disabled: false },
        { name: 'buy_price', vModel: this.buy_price, label: 'Preço de compra', type: 'number', step: '0.01', disabled: false },
        { name: 'stock', vModel: this.stock, label: 'Quantidade em estoque', type: 'number', disabled: false },
        { name: 'bar_code', label: 'Código de Barras', vModel: random(79111111111111111, 79999999999999999), type: 'number', disabled: true },
      ]
    }
  },
  methods: {
    onSubmit() {
      const body = {}
      map(this.formFields, field => {
        if (field.type === 'number') {
          body[field.name] = Number(field.vModel);
        } else {
          body[field.name] = field.vModel;
        }
        if(field.name === 'stock') {
          body[field.name] = { updated_at: new Date().toISOString(), quantity: field.vModel};
        }
      });
      this.$store.dispatch('newCD', body);
    }
  }
}
</script>
