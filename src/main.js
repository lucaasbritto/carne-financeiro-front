import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

loadFonts()

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatDate(value) {
    if (!value) return '';
    
    // Convertendo a data para ISO e manipulando sem alteração de fuso horário
    const parsedDate = parseISO(value);
    return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });
  }
};

app.use(vuetify)
   .mount('#app');

