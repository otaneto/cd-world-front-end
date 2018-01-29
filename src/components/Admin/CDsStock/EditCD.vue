<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md10>
        <v-btn flat route :to="'/admin'">Voltar</v-btn>
        <v-card>
          <v-card-title>
            <div class="headline">Editar CD</div>
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
                <barcode v-bind:value="formFields[6].vModel">
                  Não foi possível gerar o código de barras'
                </barcode>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-btn class="primary" flat type="submit">Confirmar Edição</v-btn>
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
import { keys, map, assign } from 'lodash';
import VueBarcode from 'vue-barcode';

export default {
  props: ['id'],
  components: {
    'barcode': VueBarcode,
  },
  computed: {
    formFields() {
      return [
        { name: 'title', vModel: this.cd.title, label: 'Título', type: 'text', disabled: false },
        { name: 'description', vModel: this.cd.description, label: 'Descrição', type: 'text', disabled: false },
        { name: 'artist', vModel: this.cd.artist, label: 'Astista', type: 'text', disabled: false },
        { name: 'genre', vModel: this.cd.genre, label: 'Gênero', type: 'text', disabled: false },
        { name: 'year', vModel: this.cd.year, label: 'Ano', type: 'number', disabled: false },
        { name: 'img', vModel: this.cd.img, label: 'URL da Capa', type: 'text', disabled: false },
        { name: 'bar_code', label: 'Código de Barras', vModel: this.cd.bar_code, type: 'number', disabled: true },
      ];
    },
    cd() {
      return this.$store.getters.loadedCD(this.id);
    }
  },
  methods: {
    onSubmit() {
      let body = {}
      map(this.formFields, field => {
        if (field.type === 'number') {
          body[field.name] = Number(field.vModel);
        } else {
          body[field.name] = field.vModel;
        }
      });
      body = assign(this.cd, body, { stock: { updated_at: new Date().toISOString(), quantity: this.cd.stock.quantity } });
      this.$store.dispatch('updateCD', body);
    }
  }
}
</script>
