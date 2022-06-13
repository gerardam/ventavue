<template>
  <v-app id="app">
    <v-navigation-drawer
      class="blue-grey lighten-5"
      fixed
      app
      v-model="drawer"
      style="top: 64px; z-index: 1"
    >
      <!-- :clipped="$vuetify.breakpoint.mdAndUp" -->
      <v-list>
        <v-list-item :to="{ name: 'home' }">
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Almacén</v-list-item-title>
          </template>
          <v-list-item :to="{ name: 'categoria' }">
            <v-list-item-icon>
              <v-icon>category</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Categorías</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'articulo' }">
            <v-list-item-icon>
              <v-icon>local_offer</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Artículos</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Compras</v-list-item-title>
          </template>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>payments</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ingresos</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>people_alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Proveedores</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Ventas</v-list-item-title>
          </template>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>shopping_cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ventas</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>groups</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Clientes</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Accesos</v-list-item-title>
          </template>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>account_tree</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Roles</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>person</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Consultas</v-list-item-title>
          </template>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>manage_search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Consultas compras</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: '' }">
            <v-list-item-icon>
              <v-icon>query_stats</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Consultas ventas</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="blue-grey darken-4" dark style="flex: none; z-index: 2">
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Sistema</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <v-footer height="auto" style="padding: 0; z-index: 0; text-align: center">
      <v-row justify="center" no-gutters>
        <v-col
          class="blue-grey darken-3 py-1 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //clipped: false,
      drawer: true,
      //fixed: false,
      // items: [
      //   {
      //     icon: "bubble_chart",
      //     title: "Inspire",
      //   },
      // ],
      //miniVariant: false,
      //right: true,
      //rightDrawer: false,
      //title: "Vuetify.js",
    };
  },
};
</script>
