<template>
  <div>
    <vs-row>
      <vs-col vs-w="6">
        <h2>{{originalProduct.name}}</h2>
        <p>
          <vs-chip
            color="danger"
          >{{originalProduct.prices && originalProduct.prices.length ? originalProduct.prices[0].value +'€' : 'No disponible'}}</vs-chip>
        </p>

        <vs-images class="images-slider" hover="scale" not-border-radius>
          <vs-image
            :key="index+75"
            :src="image.image"
            v-for="(image, index) in originalProduct.images"
          />
          <vs-image
            v-if="originalProduct.images == undefined || !originalProduct.images.length "
            :src="require('~/assets/images/not_found_product.jpg')"
          />
        </vs-images>
        <vs-select
          placeholder="Selecciona una categoría..."
          label="Categorías"
          label-placeholder="Autocomplete"
          multiple
          autocomplete
          v-model="product.categories"
        >
          <vs-select-item
            :key="index+400"
            :value="item.id"
            :text="item.name"
            v-for="(item,index) in loadedCategories"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6">
        <vs-input label-placeholder="Nombre" v-model="product.name" />
        <vs-textarea label="Descripción" v-model="product.description" />
        <vs-input type="number" label-placeholder="Codigo de barras" v-model="product.barcode" />
        <vs-button v-on:click="modifyProduct">Guardar cambios</vs-button>
        <vs-alert :active="errors.length > 0" icon="info" color="danger">
          <p v-for="error in errors">{{error}}</p>
        </vs-alert>
      </vs-col>
    </vs-row>
    <vs-row>
      <pricesTable :productId="productId"></pricesTable>
    </vs-row>
  </div>
</template>

<script>
// Adding priceTable custom component(our own table with buttons and api call)
import pricesTable from "~/components/products/pricesTable.vue";
import axios from "axios";
export default {
  components: {
    pricesTable
  },
  // Validate the url
  validate({ params }) {
    // Must be a number the id
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      productId: this.$route.params.id,
      originalProduct: {},
      product: {
        categories: []
      },
      loadedCategories: [],
      errors: []
    };
  },
  async fetch() {
    // Load product data
    this.loadData();
    // Load categories
    this.loadCategories();
  },
  methods: {
    // Gets basic product data from api
    async loadData() {
      this.$vs.loading();
      // Request
      await axios
        .get(process.env.apiUrl + "/product/show/" + this.productId)
        .then(request => {
          this.originalProduct = request.data;
          // Loop inside array of categories
          // ? This is for the selectable html element for showing and manage
          let categories = [];
          this.originalProduct.categories.forEach(category => {
            // And extract just the categories id
            categories.push(category.id);
          });
          this.originalProduct.categories = categories;
          // Copy originalProduct into product
          this.product = JSON.parse(JSON.stringify(this.originalProduct));
        });
      this.$vs.loading.close();
    },
    // Get categories from api
    async loadCategories() {
      await axios
        .get(process.env.apiUrl + "/category", {
          params: { all: true }
        })
        .then(response => {
          this.loadedCategories = response.data;
        });
    },
    // Modifies the product
    async modifyProduct() {
      // Create the requests passing url,values
      // Just sends some paramethers for security reasons and api
      if (this.validProduct()) {
        await axios
          .post(process.env.apiUrl + "/product/update/" + this.productId, {
            name: this.product.name,
            description: this.product.description,
            barcode: this.product.barcode,
            categories: this.product.categories
          })
          .then(response => {
            // If all was correct do the first load
            this.loadData();
            // And show notification
            this.$vs.notify({
              title: "Producto modificado.",
              text: "El producto ha sido modificado correctamente.",
              color: "success",
              icon: "check_box"
            });
          });
      }
    },
    validProduct: function(e) {
      this.errors = [];
      if (
        this.product.name &&
        this.product.description &&
        this.product.barcode &&
        this.product.categories.length > 0
      ) {
        return true;
      }

      this.errors.push("Debes de rellenar todos los campos.");
    }
  }
};
</script>

<style>
.images-slider {
  width: 50%;
  display: inline-block;
  height: 120px;
}
.images-slider .vs-image--img {
  background-size: cover !important;
}
</style>
