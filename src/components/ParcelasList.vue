<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>
              <span class="headline">Recuperar Parcelas</span>
            </v-card-title>
            <v-form>
              <v-text-field
                v-model.number="id"
                label="ID do Carnê"
                type="number"
                outlined
                dense
              ></v-text-field>
              <v-btn @click="recuperarParcelas" color="primary" class="mt-4">
                Recuperar Parcelas
              </v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <v-card-title>
              <span class="headline">Parcelas</span>
            </v-card-title>
            <v-list v-if="parcelas.length > 0">
              <v-list-item
                v-for="parcela in parcelas"
                :key="parcela.parcela"
                class="d-flex justify-space-between"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    Parcela {{ parcela.parcela }}: {{ parcela.valor.toFixed(2) }} - {{ $filters.formatDate(parcela.data_vencimento) }}
                    <span v-if="parcela.entrada" class="ml-2 badge">Entrada</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default {
  data() {
    return {
      id: null,
      parcelas: [],
    };
  },
  computed: {
    parcelasFormatadas() {
      return this.parcelas.map(parcela => {
        const dataVencimento = parseISO(parcela.data_vencimento);
        return {
          ...parcela,
          data_vencimento: format(dataVencimento, 'dd/MM/yyyy', { locale: ptBR }),
        };
      });
    },
  },
  methods: {
    async recuperarParcelas() {
      try {
        const response = await axios.get(`http://localhost:8000/api/recuperar-parcelas/${this.id}`);
        this.parcelas = response.data.parcelas;
      } catch (error) {
        console.error('Erro ao recuperar parcelas:', error);
      }
    },
  },
};
</script>

<style>
.badge {
  background-color: #ff5722;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>