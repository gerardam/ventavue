<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
      style="top:64px;z-index:1;"
    >
      <v-list>
        <v-list-item :to="{ name: 'home'}">
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Almacén</v-list-item-title>
          </template>
            <v-list-item :to="{ name: 'categoria'}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Categorías</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Artículos</v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Compras</v-list-item-title>
          </template>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Ingresos</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Proveedores</v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Ventas</v-list-item-title>
          </template>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Ventas</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Clientes</v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Accesos</v-list-item-title>
          </template>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Roles</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Consultas</v-list-item-title>
          </template>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Consultas compras</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>table_chart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Consultas ventas</v-list-item-title>
            </v-list-item>
        </v-list-group>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixe
      style="flex:none;z-index:2;"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Sistema</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer height="auto" style="padding:0;z-index:0;text-align:center;">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              IncanatoIT &copy;2018
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
