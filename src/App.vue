<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <CarneForm />
        </v-col>
        <v-col cols="12">
          <ParcelasList />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import CarneForm from './components/CarneForm.vue';
import ParcelasList from './components/ParcelasList.vue';

export default {
  name: 'App',
  components: {
    CarneForm,
    ParcelasList,
  },
};
</script>

<style>

</style>