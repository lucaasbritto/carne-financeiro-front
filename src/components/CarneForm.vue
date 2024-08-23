<template>
    <v-app>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="mx-auto">
            <v-card class="pa-5">
              <v-card-title>
                <span class="headline">Criar Carnê</span>
              </v-card-title>
              <v-form @submit.prevent="criarCarne">
                <v-text-field
                  v-model.number="valorTotal"
                  label="Valor Total"
                  type="number"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model.number="qtdParcelas"
                  label="Quantidade de Parcelas"
                  type="number"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="dataPrimeiroVencimento"
                  label="Data do Primeiro Vencimento"
                  type="date"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-select
                  v-model="periodicidade"
                  :items="['mensal', 'semanal']"
                  label="Periodicidade"
                  outlined
                  dense
                  required
                ></v-select>
                <v-text-field
                  v-model.number="valorEntrada"
                  label="Valor de Entrada (Opcional)"
                  type="number"
                  outlined
                  dense
                ></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4">
                  Criar Carnê
                </v-btn>
              </v-form>
              <v-divider class="my-4"></v-divider>
              <v-card-title>
                <span class="headline">Parcelas Geradas</span>
              </v-card-title>
              <v-list v-if="resultado">
                <v-list-item
                  v-for="parcela in resultado.parcelas"
                  :key="parcela.numero"
                  class="d-flex justify-space-between"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Parcela {{ parcela.numero }}: {{ parcela.valor.toFixed(2) }} - {{ parcela.data_vencimento }}
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
  
  export default {
    data() {
      return {
        valorTotal: null,
        qtdParcelas: null,
        dataPrimeiroVencimento: '',
        periodicidade: 'mensal',
        valorEntrada: 0,
        resultado: null,
      };
    },
    methods: {
      async criarCarne() {
        try {
          const response = await axios.post('http://localhost:8000/api/criar-carne', {
            valor_total: this.valorTotal,
            qtd_parcelas: this.qtdParcelas,
            data_primeiro_vencimento: this.dataPrimeiroVencimento,
            periodicidade: this.periodicidade,
            valor_entrada: this.valorEntrada,
          });
          this.resultado = response.data;
        } catch (error) {
          console.error('Erro ao criar carnê:', error);
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