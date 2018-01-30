<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 md12>
        <v-card dark color="amber">
          <v-card-title>
            <div class="headline">Cupom Fiscal</div>
          </v-card-title>
          <v-card-text>
            <v-layout column>
                <div class="white--text">Loja CD WORLD</div>
                <div class="white--text">Rua dos Bobos, 0</div>
                <div class="white--text">57045-000 Maceió - Alagoas</div>
                <div class="white--text">CNPJ: 21.487.574/0001-06</div>
                <div class="white--text">IE: 10181465-30</div>
                <div class="white--text">IM: Isento</div>
                <div class="white--text">-------------------------------------------------------</div>
                <div class="white--text">Código Venda: {{ sale.id }}</div>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-layout row justify-space-between>
                <v-flex md4><strong>COD.ITEM</strong></v-flex>
                <v-flex md4><strong>ITEM</strong></v-flex>
                <v-flex md4><strong>QTD</strong></v-flex>
                <v-flex md4><strong>PRC.UNIT</strong></v-flex>
            </v-layout>
            <v-layout row justify-space-between>
                <v-flex md4>{{ sale.cd.id }}</v-flex>
                <v-flex md4>CD {{ sale.cd.title }}</v-flex>
                <v-flex md4>{{ sale.cd.amount }}</v-flex>
                <v-flex md4>{{ sale.cd.sale_price }}</v-flex>
            </v-layout>
            <v-layout>
              <strong>Valor Total: R$ {{ sale.total_purchase }}</strong>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-btn class="primary" type="button" flat route :to="'../'">Voltar</v-btn>
        <!-- <v-btn flat @click="printTaxCoupon">Imprimir</v-btn> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['id', 'sale_id'],
  computed: {
    sale() {
      return this.$store.getters.sale(this.sale_id);
    },
  }
}
</script>
