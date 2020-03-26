<template>
  <div>
    <vs-row>
      <vs-col vs-w="6">
        <h2>
          {{originalProduct.name}}
          <vs-chip
            color="danger"
          >{{originalProduct.prices && originalProduct.prices.length ? originalProduct.prices[0].value +'€' : 'No disponible'}}</vs-chip>
        </h2>
        <p>
          Codigo de barras:
          <b>{{originalProduct.barcode}}</b>
        </p>
        <p>{{originalProduct.description}}</p>
        <vs-images class="images-slider" hover="scale" not-border-radius>
          <vs-image
            :key="index"
            :src="image.image"
            v-for="(image, index) in originalProduct.images"
          />
          <vs-image
            v-if="originalProduct.images == undefined || !originalProduct.images.length "
            :src="require('~/assets/images/not_found_product.jpg')"
          />
        </vs-images>
        <h4>Categorías</h4>
        <vs-chip
          :key="index"
          v-for="(category, index) in originalProduct.categories"
        >{{category.name}}</vs-chip>
      </vs-col>
      <vs-col vs-w="6">
        <vs-input label-placeholder="Nombre" v-model="product.name" />
        <vs-textarea label="Descripción" v-model="product.description" />
        <vs-input type="number" label-placeholder="Codigo de barras" v-model="product.barcode" />
        <vs-button v-on:click="modifyProduct">Guardar cambios</vs-button>
      </vs-col>
    </vs-row>
    <vs-row>
      <pricesTable :productId="productId"></pricesTable>
    </vs-row>
  </div>
</template>

<script>
import pricesTable from "~/components/products/pricesTable.vue";
import axios from "axios";
export default {
  components: {
    pricesTable
  },
  validate({ params }) {
    // Must be a number the id
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      productId: this.$route.params.id,
      originalProduct: {},
      product: {},
      loadedCategories: [""]
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
      await axios
        .get(process.env.apiUrl + "/product/show/" + this.productId)
        .then(request => {
          this.originalProduct = request.data;
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
    async modifyProduct() {
      await axios
        .post(process.env.apiUrl + "/product/update/" + this.productId, {
          name: this.product.name,
          description: this.product.description,
          barcode: this.product.barcode,
          categories: [1,2]
        })
        .then(response => {
          this.loadedCategories = response.data;
        });
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
