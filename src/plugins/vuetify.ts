import { createVuetify } from 'vuetify';
import type { ThemeDefinition } from 'vuetify';

import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const Lighttheme: ThemeDefinition = {
  dark: false,
  variables: {},
  colors: {
    primary: '#00AEEF',
    info: '#0AAF5E',
    success: '#00AEEF',
    warning: '#F68A33',
    error: '#EF5399',
    secondary: '#ffffff',
    dark: '#2b2b2b',
    gray: '#858585',
    background: '#f3f7f9',
    darkbackground: '#1f2328',
    darkblue: '#0b1e36',
    border: '#e9e9e9',
    footerbackground: '#1a1a1a'
  }
};

const Darktheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#1a1a1a',
    info: '#0AAF5E',
    success: '#00AEEF',
    warning: '#F68A33',
    error: '#EF5399',
    secondary: '#2b2b2b'
  }
};

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: Lighttheme,
      dark: Darktheme
    }
  },
  defaults: {
    VBtn: {
      color: 'primary',
      rounded: 'md',
      flat: true,
      fontWeight: '400',
      letterSpacing: '0'
    },
    VCard: {
      flat: true,
      elevation: 0
    }
  }
});
