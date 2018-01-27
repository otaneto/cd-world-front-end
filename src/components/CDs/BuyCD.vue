<template>
  <v-container v-bind="{ [`grid-list-md`]: true }">
    <v-layout row wrap>
      <v-flex xs12 md10>
        <v-card color="blue">
          <v-card-text>
            <v-layout row>
              <v-flex xs7 md9>
                <div class="headline white--text">{{ cd.title }}</div>
                <div class="white--text">{{ cd.artist }}, {{ cd.year }}</div>
                <v-layout row align-center md4>
                  <div class="white--text">Quantidade Comprada: </div>
                  <v-flex md1>
                    <v-text-field style="font-size: 12px" dark single-line :value="amount" type="number"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs5 md3>
                <v-card-media
                  :src="cd.imgs[0].url"
                  height="125px"
                  contain
                >
                </v-card-media>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            <div class="headline">Confirmar compra</div>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="onSubmit">
                <v-layout xs12 md10 row wrap>
                  <v-flex xs12 md6 v-for="field in formFields" :key="field.name">
                    <v-text-field
                      :name="field.name"
                      :label="field.label"
                      :id="field.id"
                      v-model="field.vModel"
                      :type="field.type"
                      :required="field.required"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn flat route :to="`/cd/${cd.id}`">Voltar</v-btn>
                    <v-btn class="primary" flat type="submit">Confirmar</v-btn>
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
import { assign } from 'lodash';

export default {
  props: ['id'],
  data() {
    return {
      address: '',
      postal_code: '',
      house_number: '',
      tel_number: '',
      amount: 1,
    };
  },
  methods: {
    onSubmit() {
      const newSale = {};
      this.formFields.map(field => {
        newSale[field.name] = field.vModel;
        newSale.cd = assign(this.cd, { amount: this.amount });
        newSale.user = this.user.uid;
      });
      this.$store.dispatch('newPurchase', newSale);
    },
  },
  computed: {
    cd() {
      return this.$store.getters.loadedCD(this.id);
    },
    user() {
      return this.$store.getters.user;
    },
    formFields() {
      return [
        { name: 'address', label: 'Endereço', id: 'address', vModel: this.address, type: 'text', required: true },
        { name: 'postal_code', label: 'CEP', id: 'postal_code', vModel: this.postal_code, type: 'text', required: true },
        { name: 'house_number', label: 'Número', id: 'house_number', vModel: this.house_number, type: 'text', required: true },
        { name: 'tel_number', label: 'Telefone para contato', id: 'tel_number', vModel: this.tel_number, type: 'text', required: true },
      ];
    } 
  },
};
</script>