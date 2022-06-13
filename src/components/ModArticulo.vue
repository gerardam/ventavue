<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="articulos"
        :search="search"
        class=""
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Articulos</v-toolbar-title>
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
                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          v-model="codigo"
                          label="Codigo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        <v-select
                          v-model="idCategoria"
                          :items="categorias"
                          label="Categoria *"
                        ></v-select>
                        <small
                          class="red--text"
                          v-if="validaMensaje[1] != ''"
                          >{{ validaMensaje[1] }}</small
                        >
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="nombre"
                          label="Nombre *"
                        ></v-text-field>
                        <small
                          class="red--text"
                          v-if="validaMensaje[0] != ''"
                          >{{ validaMensaje[0] }}</small
                        >
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          type="number"
                          v-model="stock"
                          label="Stock *"
                        ></v-text-field>
                        <small
                          class="red--text"
                          v-if="validaMensaje[2] != ''"
                          >{{ validaMensaje[2] }}</small
                        >
                      </v-col>
                      <v-col cols="6" sm="6" md="6">
                        <v-text-field
                          type="number"
                          v-model="precioVenta"
                          label="Precio venta *"
                        ></v-text-field>
                        <small
                          class="red--text"
                          v-if="validaMensaje[3] != ''"
                          >{{ validaMensaje[3] }}</small
                        >
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="descripcion"
                          label="Descripcion"
                        ></v-text-field>
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
                  >Activar articulos?</v-card-title
                >
                <v-card-title class="headline" v-if="adAccion == 2"
                  >Desactivar articulos?</v-card-title
                >
                <v-card-text>
                  Esta seguro de
                  <span v-if="adAccion == 1">Activar</span>
                  <span v-if="adAccion == 2">Desactivar</span>
                  la articulos {{ adNombre }}
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
      articulos: [],
      dialog: false,
      headers: [
        { text: "Código", value: "codigo" },
        { text: "Nombre", value: "nombre" },
        { text: "Categoría", value: "categoria" },
        { text: "Stock", value: "stock" },
        { text: "Precio venta", value: "precioVenta" },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "condicion" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      search: "",
      editedIndex: -1,
      id: "",
      codigo: "",
      nombre: "",
      stock: 0,
      precioVenta: 0,
      descripcion: "",
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
      idCategoria: "",
      categorias: [],
    };
  },

  methods: {
    Listar() {
      let me = this;
      axios
        .get("api/Articulos/Listar")
        .then(function (response) {
          //console.log(response);
          me.articulos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    EditarItem(item) {
      this.id = item.idArticulo;
      this.idCategoria = item.idCategoria;
      this.codigo = item.codigo;
      this.nombre = item.nombre;
      this.stock = item.stock;
      this.precioVenta = item.precioVenta;
      this.descripcion = item.descripcion;
      this.editedIndex = 1;
      this.dialog = true;
      this.validaMensaje = ["", "", "", ""];
    },

    Guardar() {
      if (this.Validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //codigo para editar
        let me = this;
        axios
          .put("api/Articulos/Actualizar", {
            idArticulo: me.id,
            idCategoria: me.idCategoria,
            codigo: me.codigo,
            nombre: me.nombre,
            stock: me.stock,
            precioVenta: me.precioVenta,
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
          .post("api/Articulos/Crear", {
            idCategoria: me.idCategoria,
            codigo: me.codigo,
            nombre: me.nombre,
            precioVenta: me.precioVenta,
            stock: me.stock,
            descripcion: me.descripcion,
          })
          .then(function () {
            //function (response) {
            me.close();
            me.Listar();
            me.Limpiar();
          })
          .catch(function (error) {
            //console.log(error);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          });
      }
    },

    ActivarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item.idArticulo;
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
        .put("api/Articulos/Activar/" + this.adId, {})
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
        .put("api/Articulos/Desactivar/" + this.adId, {})
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

    Select() {
      let me = this;
      var categoriasArray = [];
      axios
        .get("api/Categorias/Seleccionar")
        .then(function (response) {
          //console.log(response);
          categoriasArray = response.data;
          categoriasArray.map(function (x) {
            me.categorias.push({ text: x.nombre, value: x.idCategoria });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    Validar() {
      let isvalido = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 3 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre debe tener minimo 3 caracteres y maximo 50."
        );
        isvalido = 1;
      } else {
        this.validaMensaje.push("");
      }
      if (!this.idCategoria) {
        this.validaMensaje.push("Seleccione una categoría.");
        isvalido = 1;
      } else {
        this.validaMensaje.push("");
      }
      if (!this.stock || this.stock == 0) {
        this.validaMensaje.push("Ingrese el stock inicial del artículo.");
        isvalido = 1;
      } else {
        this.validaMensaje.push("");
      }
      if (!this.precioVenta || this.precioVenta == 0) {
        this.validaMensaje.push("Ingrese el precio de venta del artículo.");
        isvalido = 1;
      } else {
        this.validaMensaje.push("");
      }

      return isvalido; //1:true(no valido); 0:false(valido)
    },

    close() {
      this.dialog = false;
      this.Limpiar();
    },

    Limpiar() {
      this.id = "";
      this.idCategoria = "";
      this.codigo = "";
      this.nombre = "";
      this.stock = "";
      this.precioVenta = "";
      this.descripcion = "";
      this.editedIndex = -1;
    },
  },

  created() {
    this.Listar();
    this.Select();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Agregar articulos"
        : "Actualizar articulos";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>
