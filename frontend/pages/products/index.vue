<template>
  <div>
    <vs-row>
      <vs-input placeholder="Buscar" icon="search" v-model="searching.text" v-on:keyup="loadData" />
      <vs-select
          placeholder="Categoría"
          autocomplete
          label="Categoría"
          v-model="searching.category"
          v-on:change="loadData"
        >
          <vs-select-item
            :key="index"
            :value="category.id"
            :text="category.name"
            v-for="(category,index) in loadedCategories"
          />
        </vs-select>
      <vs-button
        @click="popupAddProduct=true"
        icon="add"
        color="#007bef"
        size="small"
      >Añadir producto</vs-button>
      <vs-popup classContent="popup-example" title="Añadir producto" :active.sync="popupAddProduct">
        <vs-input label-placeholder="Nombre" v-model="productAdd.name" />
        <vs-input label-placeholder="Descripcion" v-model="productAdd.description" />
        <vs-input type="number" label-placeholder="Codigo de barras" v-model="productAdd.barcode" />
        <vs-input type="number" label-placeholder="Precio" v-model="productAdd.price" />
        <vs-input
          type="date"
          label-placeholder="Fecha inicio de precio"
          v-model="productAdd.date_start"
        />
        <vs-input
          type="date"
          label-placeholder="Fecha finalizacion de recio"
          v-model="productAdd.date_end"
        />
        <vs-select
          placeholder="Categorías"
          multiple
          autocomplete
          label="Categorías"
          v-model="productAdd.categories"
        >
          <vs-select-item
            :key="index"
            :value="category.id"
            :text="category.name"
            v-for="(category,index) in loadedCategories"
          />
        </vs-select>
        <vs-upload
          multiple
          text="Imagen de producto"
          ref="newImages"
          :show-upload-button="false"
          accept="image/x-png, image/gif, image/jpeg"
        />
        <!-- <vs-select
      label="Figuras"
      v-model="select1"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options1" />
        </vs-select>-->
        <vs-button @click="addProduct">Añadir producto</vs-button>
      </vs-popup>
    </vs-row>

    <vs-row vs-justify="center">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="2"
        class="product-item"
        v-for="product in products"
        :key="product.id"
      >
        <vs-card actionable class="cardx">
          <div slot="header">
            <h3>{{product.name}}</h3>
          </div>
          <div slot="media">
            <img
              height="200"
              :src="product.images.length ? product.images[0].image : 'https://www.gettyimages.es/gi-resources/images/500px/983794168.jpg'"
            />
          </div>
          <div>
            <b>{{product.barcode}}</b>
            <span>{{product.description}}</span>
            <vs-chip
              color="danger"
            >{{product.prices.length ? product.prices[0].value +'€' : 'No disponible'}}</vs-chip>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button
                color="primary"
                radius
                icon="open_in_browser"
                v-on:click="goToProduct(product.id)"
              />
              <vs-button
                color="danger"
                radius
                icon="delete"
                @click="dialogDeleteProduct(product.id)"
              />
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
      <!-- While not having products loaded -->
      <vs-col
        v-if="!products.length"
        style="text-align:center;margin: 5px;"
        vs-jusify="center"
      >No se han encontrado productos.</vs-col>
    </vs-row>
    <vs-row>
      <vs-pagination
        class="center-pagination"
        :total="pages"
        v-model="actualPage"
        v-on:change="loadData"
      ></vs-pagination>
    </vs-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [],
      searching: {
        text: null,
        category: null
      },
      actualPage: 1,
      pages: 1,
      popupAddProduct: false,
      productAdd: {
        name: "",
        description: "",
        barcode: "",
        price: "",
        date_start: null,
        date_end: null,
        images: [],
        categories: []
      },
      loadedCategories: []
    };
  },
  async fetch() {
    this.loadData();
    await axios
      .get(process.env.apiUrl + "/category", {
        params: { all: true }
      })
      .then(response => {
        this.loadedCategories = response.data;
      });
  },
  methods: {
    async loadData() {
      this.$vs.loading();
      await axios
        .get(process.env.apiUrl + "/product", {
          params: { page: this.actualPage, search: this.searching.text, category: this.searching.category }
        })
        .then(response => {
          this.products = response.data.data;
          this.pages = response.data.last_page;
        });
      this.$vs.loading.close();
    },
    async addProduct() {
      if (this.$refs.newImages.srcs.length) {
        this.$refs.newImages.srcs.forEach(image => {
          this.productAdd.images.push(image.src);
        });
      }
      axios
        .post(process.env.apiUrl + "/product/store", this.productAdd)
        .then(response => {
          this.loadData();
          this.popupAddProduct = false;
          this.productAdd = {
            name: "",
            description: "",
            barcode: "",
            price: "",
            date_start: null,
            date_end: null,
            images: [],
            categories: []
          };
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.productAdd.images = [];
            this.$vs.notify({
              title: "Error al añadir",
              text:
                "Comprueba que no exista el mismo producto y vuelve a intentarlo.",
              color: "danger",
              icon: "warning"
            });
          }
        });
    },
    dialogDeleteProduct(id) {
      this.selected = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `¿Estás seguro?`,
        acceptText: "Confirmar",
        cancelText: "Cancelar",
        text: `Se va a proceder con la eliminación de el producto.`,
        accept: this.deleteProduct
      });
    },
    async deleteProduct() {
      await axios
        .delete(process.env.apiUrl + "/product/destroy/" + this.selected)
        .then(response => {
          this.$vs.notify({
            title: "Producto eliminado.",
            text: "El producto ha sido eliminado correctamente.",
            color: "success",
            icon: "check_box"
          });
          this.loadData();
        });
    },
    goToProduct(id) {
      // This will redirect you to the product page
      this.$router.push("/products/" + id);
    }
  }
};
</script>

<style>
.product-item {
  margin: 20px;
  max-height: 350px;
}
</style>
