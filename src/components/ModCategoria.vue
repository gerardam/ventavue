<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="categorias"
        :search="search"
        class=""
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Categorias</v-toolbar-title>
            <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar..."
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="descripcion"
                          label="Descripcion"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" v-show="valida">
                        <div
                          class="red--text"
                          v-for="v in validaMensaje"
                          :key="v"
                          v-text="v"
                        ></div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="green darken-1" text @click="Guardar">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="adModal" max-width="290px">
              <v-card>
                <v-card-title class="headline" v-if="adAccion == 1"
                  >Activar categoria?</v-card-title
                >
                <v-card-title class="headline" v-if="adAccion == 2"
                  >Desactivar categoria?</v-card-title
                >
                <v-card-text>
                  Esta seguro de
                  <span v-if="adAccion == 1">Activar</span>
                  <span v-if="adAccion == 2">Desactivar</span>
                  la categoria {{ adNombre }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="ActivarDesactivarCerrar"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    v-if="adAccion == 1"
                    @click="Activar"
                  >
                    Aceptar
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    v-if="adAccion == 2"
                    @click="Desactivar"
                  >
                    Aceptar
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.opciones="{ item }">
          <v-icon class="mr-2" color="blue" @click="EditarItem(item)">
            mdi-pencil
          </v-icon>
          <template v-if="item.condicion">
            <v-icon
              color="green"
              large
              @click="ActivarDesactivarMostrar(2, item)"
            >
              toggle_on
            </v-icon>
          </template>
          <template v-else>
            <v-icon
              color="red"
              large
              @click="ActivarDesactivarMostrar(1, item)"
            >
              toggle_off
            </v-icon>
          </template>
        </template>
        <template v-slot:item.condicion="{ item }">
          <div v-if="item.condicion">
            <span class="green--text">Activo</span>
          </div>
          <div v-else>
            <span class="red--text">Inactivo</span>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="Listar"> Cargar </v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categorias: [],
      dialog: false,
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "condicion" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      search: "",
      editedIndex: -1,
      id: "",
      nombre: "",
      descripcion: "",
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
    };
  },

  methods: {
    Listar() {
      let me = this;
      axios
        .get("api/Categorias/Listar")
        .then(function (response) {
          //console.log(response);
          me.categorias = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    EditarItem(item) {
      this.id = item.idCategoria;
      this.nombre = item.nombre;
      this.descripcion = item.descripcion;
      this.editedIndex = 1;
      this.dialog = true;
    },

    Guardar() {
      if (this.Validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //codigo para editar
        let me = this;
        axios
          .put("api/Categorias/Actualizar/", {
            idCategoria: me.id,
            nombre: me.nombre,
            descripcion: me.descripcion,
          })
          .then(function () {
            //function (response) {
            me.close();
            me.Listar();
            me.Limpiar();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //codigo para guardar
        let me = this;
        axios
          .post("api/Categorias/Crear/", {
            nombre: me.nombre,
            descripcion: me.descripcion,
          })
          .then(function () {
            //function (response) {
            me.close();
            me.Listar();
            me.Limpiar();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    ActivarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item.idCategoria;
      if (accion == 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },

    ActivarDesactivarCerrar() {
      this.adModal = 0;
    },

    Activar() {
      let me = this;
      axios
        .put("api/Categorias/Activar/" + this.adId, {})
        .then(function () {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.Listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    Desactivar() {
      let me = this;
      axios
        .put("api/Categorias/Desactivar/" + this.adId, {})
        .then(function () {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.Listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    Validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 3 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre debe tener minimo 3 caracteres y maximo 50."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },

    close() {
      this.dialog = false;
      this.Limpiar();
    },

    Limpiar() {
      this.id = "";
      this.nombre = "";
      this.descripcion = "";
      this.editedIndex = -1;
    },
  },

  created() {
    this.Listar();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Agregar categoria"
        : "Actualizar categoria";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>
