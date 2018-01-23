<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <h3 class="headline mb-0">Login</h3>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSubmit">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Senha"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn class="primary" flat type="submit">Enviar</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/');
        }
      },
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('login', { email: this.email, password: this.password });
      },
    },
  };
</script>
