<template>
  <div>
    <vs-row>
      <vs-col vs-w="6">
        <vs-button
          @click="activePrompt = true"
          color="primary"
          type="border"
          icon="add"
          size="small"
        >Añadir categoría</vs-button>
        <!-- Add category -->
        <vs-prompt
          color="primary"
          @cancel="newCategory.name='',newCategory.description=''"
          @accept="addCategory"
          id="addCategoryDialog"
          title="Añadir categoría"
          :active.sync="activePrompt"
          accept-text="Añadir"
          cancel-text="Cancelar"
        >
          <div>
            Introduce los datos de la nueva
            <b>categoría</b>.
            <vs-input
              label-placeholder="Nombre"
              v-on:keyup.enter="addCategory"
              v-model="newCategory.name"
            />
            <vs-input
              label-placeholder="Descripción"
              v-on:keyup.enter="addCategory"
              v-model="newCategory.description"
            />
          </div>
        </vs-prompt>
      </vs-col>
      <vs-col vs-w="6">
        <div style="float: right;">
          <vs-button
            @click="modifyCategoryButton"
            color="primary"
            type="border"
            icon="edit"
            :disabled="!selected.id"
          >Modificar</vs-button>
          <!-- Modify category -->
          <vs-popup
            :title="'Modificar categoría | '+toModify.name"
            :active.sync="popupModifyCategory"
          >
            <vs-input
              label-placeholder="Nombre"
              v-on:keyup.enter="ModifyCategory"
              v-model="toModify.name"
            />
            <vs-input
              label-placeholder="Descripción"
              v-on:keyup.enter="ModifyCategory"
              style="margin: 25px 0;"
              v-model="toModify.description"
            />
            <vs-button @click="ModifyCategory">Guardar cambios</vs-button>
          </vs-popup>
          <vs-button
            @click="openDeleteCategory"
            color="danger"
            type="border"
            icon="delete"
            :disabled="!selected.id"
          >Eliminar</vs-button>
        </div>
      </vs-col>
    </vs-row>

    <vs-row>
      <vs-col>
        <vs-table
          :sst="true"
          @search="handleSearch"
          v-model="selected"
          search
          :data="categories"
          noDataText="No hay datos disponibles."
        >
          <template slot="header">
            <h3>Categorías</h3>
          </template>
          <template slot="thead">
            <vs-th>id</vs-th>
            <vs-th>Nombre</vs-th>
            <vs-th>Descripción</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>

              <vs-td :data="data[indextr].name">{{data[indextr].name}}</vs-td>

              <vs-td :data="data[indextr].description">{{data[indextr].description}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-pagination
        class="category-pagination"
        :total="pages"
        v-model="actualPage"
        v-on:change="paginateChanged"
      ></vs-pagination>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    selected: {},
    searching: null,
    actualPage: 1,
    newCategory: {
      name: "",
      description: ""
    },
    pages: 0,
    categories: [],
    activePrompt: false,
    popupModifyCategory: false,
    toModify: {
      id: null,
      name: "",
      description: ""
    }
  }),
  // Page before load
  async fetch() {
    loadData();
  },
  methods: {
    async loadData() {
      this.$vs.loading();
      await axios
        .get(process.env.apiUrl + "/category", {
          params: {
            page: this.actualPage, // We send as parameter the actual page
            search: this.searching // And search terms
          }
        })
        .then(response => {
          // When getting response, then
          // set categories as the data
          // and pages as the lastpage (because is the max size of pages)
          this.categories = response.data.data;
          this.pages = response.data.last_page;
        });
      this.$vs.loading.close();
    },
    //If page is changed
    async paginateChanged() {
      this.$vs.loading();
      await axios
        .get(process.env.apiUrl + "/category", {
          params: {
            page: this.actualPage,
            search: this.searching
          }
        })
        .then(response => {
          this.categories = response.data.data;
          this.pages = response.data.last_page;
        });
      this.$vs.loading.close();
    },
    // If in searcher a key is pressed
    async handleSearch(searching) {
      this.searching = searching;
      this.$vs.loading();
      await axios
        .get(process.env.apiUrl + "/category", {
          params: {
            page: this.actualPage,
            search: this.searching
          }
        })
        .then(response => {
          this.categories = response.data.data;
          this.actualPage = 1;
          this.pages = response.data.last_page;
        });
      this.$vs.loading.close();
    },
    async addCategory(color) {
      // Show loading inside the container
      this.$vs.loading({ container: "#addCategoryDialog", scale: 0.6 });
      await axios
        .post(process.env.apiUrl + "/category/store", this.newCategory)
        .then(response => {
          this.newCategory.name = "";
          this.newCategory.description = "";
          this.$vs.notify({
            color: "success",
            title: "Categoría añadida.",
            text: "La categoría ha sido añadida correctamente."
          });
          this.activePrompt = false;
        });
      // Executes the fetch method
      this.loadData();
      // Set the current pagination to the last page
      this.actualPage = this.pages;
      this.searching = null;
    },
    openDeleteCategory() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `¿Estás seguro?`,
        acceptText: "Confirmar",
        cancelText: "Cancelar",
        text: `Se va a proceder con la eliminación de la categoría "${this.selected.name}".`,
        accept: this.DeleteCategory // If press accept then call this function
      });
    },
    // On delete category
    async DeleteCategory() {
      await axios
        .delete(process.env.apiUrl + "/category/destroy/" + this.selected.id)
        .then(response => {
          this.$vs.notify({
            color: "danger",
            title: "Categoría eliminada",
            text: "La categoría ha sido eleiminada correctamente."
          });
          this.selected = {};
        });
      this.loadData();
      this.actualPage = 1;
    },
    // On press modify button
    modifyCategoryButton() {
      this.popupModifyCategory = true; // Shows the popup
      // Set the toModify values as the selected object data
      // because we gonna modify the selected object
      this.toModify.id = this.selected.id;
      this.toModify.name = this.selected.name;
      this.toModify.description = this.selected.description;
    },
    // On save changes of modification
    async ModifyCategory() {
      await axios
        .post(process.env.apiUrl + "/category/update/" + this.toModify.id, {
          name: this.toModify.name,
          description: this.toModify.description
        })
        .then(response => {
          this.$vs.notify({
            color: "success",
            title: "Modificado correctamente.",
            text: "La categoría ha sido modificada correctamente.."
          });
          this.popupModifyCategory = false;
          this.loadData();
        });
    }
  }
};
</script>
