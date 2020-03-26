<template>
  <vs-row>
    <vs-col vs-w="9">
      <vs-table v-model="selected" :data="prices">
        <template slot="header">
          <h3>Precios</h3>
        </template>
        <template slot="thead">
          <vs-th>Fecha de inicio</vs-th>
          <vs-th>Fecha de fin.</vs-th>
          <vs-th>Precio</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].date_start">{{data[indextr].date_start}}</vs-td>

            <vs-td :data="data[indextr].data_end">{{data[indextr].date_end}}</vs-td>

            <vs-td :data="data[indextr].value">{{data[indextr].value}}€</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-col>
    <vs-col vs-w="3">
      <vs-input type="number" label-placeholder="Precio" v-model="price.value"></vs-input>
      <vs-input type="date" label-placeholder="Fecha de inicio" v-model="price.date_start"></vs-input>
      <vs-input type="date" label-placeholder="Fecha de finalización" v-model="price.date_end"></vs-input>
      <vs-button v-if="!selected" v-on:click="addPrice">Añadir precio</vs-button>
      <vs-button v-if="selected">Modificar precio</vs-button>
      <vs-button :disabled="!selected" v-on:click="selected = null">Deseleccionar</vs-button>
      <vs-button v-if="selected" color="danger" v-on:click="dialogDeletePrice(selected.id)">Eliminar</vs-button>
    </vs-col>
  </vs-row>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    this.loadData();
  },
  props: ["productId"],
  data: () => ({
    selected: null,
    price: {
      value: "",
      date_start: null,
      date_end: null
    },
    prices: []
  }),
  methods: {
    // Get prices for this product
    async loadData() {
      await axios
        .get(process.env.apiUrl + "/product/show/" + this.productId + "/prices")
        .then(response => {
          this.prices = response.data;
        });
    },
    async addPrice() {
      await axios.post(
        process.env.apiUrl + "/price/store/product/" + this.productId,
        this.price
      );
    },
    dialogDeletePrice(id) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `¿Estás seguro?`,
        acceptText: "Confirmar",
        cancelText: "Cancelar",
        text: `Se va a proceder con la eliminación de el precio.`,
        accept: this.deletePrice
      });
    },
    async deletePrice() {
      await axios
        .delete(process.env.apiUrl + "/price/destroy/" + this.selected.id)
        .then(response => {
          this.$vs.notify({
            title: "Precio eliminado.",
            text: "El precio ha sido eliminado correctamente.",
            color: "success",
            icon: "check_box"
          });
          this.loadData();
        });
    }
  }
};
</script>

<style>
</style>
