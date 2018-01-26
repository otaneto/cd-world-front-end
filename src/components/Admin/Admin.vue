<template>

<v-layout>
  <v-card>
    <v-navigation-drawer permanent floating dark>
      <v-list>
          <v-list-group v-for="item in items" v-bind:value="item.active" v-bind:key="item.title">
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.subItems" v-bind:key="subItem.title" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      <!-- <v-list dense class="pt-0">
        <v-list-tile v-for="item in menuItems" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->
    </v-navigation-drawer>
  </v-card>

  <v-container fluid fill-height>
    <v-layout justify-center align-center>

      <v-flex lg10>
        <v-card class="pa-3">
          <v-form v-model="valid">

            <v-layout row wrap
             class="pt-1">
              <v-flex lg4>
                <v-text-field
                  label="Titulo"
                  v-model="title"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex lg3
                  class="pl-3">
                <v-text-field
                  label="Artista"
                  v-model="artist"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex lg3
                  class="pl-3">
                <v-select
                  label="Genero"
                  v-model="genre"
                  v-bind:items="genres"
                  required>
                </v-select>
              </v-flex>
              <v-flex lg2
                  class="pl-3">
                <v-text-field
                  label="Ano"
                  v-model="year"
                  required>
                </v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap
             class="pt-1">
              <v-flex lg4>
                <v-text-field
                  label="Preço de compra"
                  v-model="buyPrice"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex lg4
                  class="pl-3">
                <v-text-field
                  label="Preço de venda"
                  v-model="salePrice"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex lg4
                  class="pl-3">
                <v-text-field
                  label="Quantidade"
                  v-model="quantity"
                  required>
                </v-text-field>
              </v-flex>
            </v-layout>

            <v-flex lg12
             class="pt-1">
              <v-text-field
                label="Descrição"
                v-model="description"
                multi-line>
              </v-text-field>
            </v-flex>

            <v-btn @click="save">Salvar</v-btn>
            <v-btn @click="clear">Limpar</v-btn>
          </v-form>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>

</v-layout>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        items: [
          {
            action: 'face',
            title: 'Usuários',
            subItems: [
              { title: 'Gerenciar'}
            ]
          },
          {
            action: 'local_offer',
            title: 'CDs',
            subItems: [
              { title: 'Adicionar'},{ title: 'Gerenciar' }
            ]
          },
          {
            action: 'shopping_cart',
            title: 'Vendas',
            subItems: [
              { title: 'Gerenciar' }
            ]
          }
        ],
        genres: ['Forró', 'Sertanejo', 'Arrocha', 'Rock', 'Folk', 'Reggae', 'Pop Music', 'Heavy Metal', 'MPB']
      }
    },
    methods: {
      OnMenuItemClicked() {

      },
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },
  };
</script>
