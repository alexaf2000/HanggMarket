(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{200:function(t,e,r){t.exports=r.p+"img/72bab5f.jpg"},201:function(t,e,r){var content=r(208);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(23).default)("36503942",content,!0,{sourceMap:!1})},207:function(t,e,r){"use strict";var o=r(201);r.n(o).a},208:function(t,e,r){(t.exports=r(22)(!1)).push([t.i,".product-item{margin:30px}",""])},216:function(t,e,r){"use strict";r.r(e);r(17);var o=r(2),c=r(7),n=r.n(c),d={data:function(){return{products:[],searching:{text:null,category:null},actualPage:1,pages:1,popupAddProduct:!1,productAdd:{name:"",description:"",barcode:"",price:"",date_start:null,date_end:null,images:[],categories:[]},loadedCategories:[]}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.loadData(),t.loadCategories();case 2:case"end":return e.stop()}}),e)})))()},methods:{loadData:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.$vs.loading(),e.next=3,n.a.get("http://localhost/HanggMarket/public/api/product",{params:{page:t.actualPage,search:t.searching.text,category:t.searching.category}}).then((function(e){t.products=e.data.data,t.pages=e.data.last_page}));case 3:t.$vs.loading.close();case 4:case"end":return e.stop()}}),e)})))()},loadCategories:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.get("http://localhost/HanggMarket/public/api/category",{params:{all:!0}}).then((function(e){t.loadedCategories=e.data}));case 2:case"end":return e.stop()}}),e)})))()},addProduct:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$refs.newImages.srcs.length&&t.$refs.newImages.srcs.forEach((function(image){t.productAdd.images.push(image.src)})),n.a.post("http://localhost/HanggMarket/public/api/product/store",t.productAdd).then((function(e){t.loadData(),t.popupAddProduct=!1,t.productAdd={name:"",description:"",barcode:"",price:"",date_start:null,date_end:null,images:[],categories:[]}})).catch((function(e){422==e.response.status&&(t.productAdd.images=[],t.$vs.notify({title:"Error al añadir",text:"Comprueba que no exista el mismo producto y vuelve a intentarlo.",color:"danger",icon:"warning"}))}));case 2:case"end":return e.stop()}}),e)})))()},dialogDeleteProduct:function(t){this.selected=t,this.$vs.dialog({type:"confirm",color:"danger",title:"¿Estás seguro?",acceptText:"Confirmar",cancelText:"Cancelar",text:"Se va a proceder con la eliminación de el producto.",accept:this.deleteProduct})},deleteProduct:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.a.delete("http://localhost/HanggMarket/public/api/product/destroy/"+t.selected).then((function(e){t.$vs.notify({title:"Producto eliminado.",text:"El producto ha sido eliminado correctamente.",color:"success",icon:"check_box"}),t.loadData()}));case 2:case"end":return e.stop()}}),e)})))()},goToProduct:function(t){this.$router.push("/products/"+t)}}},l=(r(207),r(12)),component=Object(l.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("vs-row",[o("vs-col",{attrs:{"vs-w":"2"}},[o("vs-button",{attrs:{icon:"add",color:"#007bef",size:"small"},on:{click:function(e){t.popupAddProduct=!0}}},[t._v("Añadir producto")])],1),t._v(" "),o("vs-col",{attrs:{"vs-w":"8"}},[o("vs-input",{staticStyle:{width:"90%"},attrs:{placeholder:"Buscar"},on:{keyup:t.loadData},model:{value:t.searching.text,callback:function(e){t.$set(t.searching,"text",e)},expression:"searching.text"}})],1),t._v(" "),o("vs-col",{attrs:{"vs-w":"2"}},[o("vs-select",{attrs:{placeholder:"Mostrar por categoría...",autocomplete:"",label:"Categoría"},on:{change:t.loadData},model:{value:t.searching.category,callback:function(e){t.$set(t.searching,"category",e)},expression:"searching.category"}},t._l(t.loadedCategories,(function(t,e){return o("vs-select-item",{key:e,attrs:{value:t.id,text:t.name}})})),1),t._v(" "),o("vs-popup",{attrs:{classContent:"popup-example",title:"Añadir producto",active:t.popupAddProduct},on:{"update:active":function(e){t.popupAddProduct=e}}},[o("vs-input",{attrs:{"label-placeholder":"Nombre"},model:{value:t.productAdd.name,callback:function(e){t.$set(t.productAdd,"name",e)},expression:"productAdd.name"}}),t._v(" "),o("vs-textarea",{attrs:{label:"Descripción",width:"50%",height:"120px"},model:{value:t.productAdd.description,callback:function(e){t.$set(t.productAdd,"description",e)},expression:"productAdd.description"}}),t._v(" "),o("vs-input",{attrs:{type:"number","label-placeholder":"Codigo de barras"},model:{value:t.productAdd.barcode,callback:function(e){t.$set(t.productAdd,"barcode",e)},expression:"productAdd.barcode"}}),t._v(" "),o("vs-input",{attrs:{type:"number","label-placeholder":"Precio"},model:{value:t.productAdd.price,callback:function(e){t.$set(t.productAdd,"price",e)},expression:"productAdd.price"}}),t._v(" "),o("vs-input",{attrs:{type:"date","label-placeholder":"Fecha inicio de precio"},model:{value:t.productAdd.date_start,callback:function(e){t.$set(t.productAdd,"date_start",e)},expression:"productAdd.date_start"}}),t._v(" "),o("vs-input",{attrs:{type:"date","label-placeholder":"Fecha finalizacion de recio"},model:{value:t.productAdd.date_end,callback:function(e){t.$set(t.productAdd,"date_end",e)},expression:"productAdd.date_end"}}),t._v(" "),o("vs-select",{attrs:{placeholder:"Categorías",multiple:"",autocomplete:"",label:"Categorías"},model:{value:t.productAdd.categories,callback:function(e){t.$set(t.productAdd,"categories",e)},expression:"productAdd.categories"}},t._l(t.loadedCategories,(function(t,e){return o("vs-select-item",{key:e,attrs:{value:t.id,text:t.name}})})),1),t._v(" "),o("vs-upload",{ref:"newImages",attrs:{multiple:"",text:"Imagen de producto",limit:"4","show-upload-button":!1,accept:"image/x-png, image/gif, image/jpeg"}}),t._v(" "),o("vs-button",{on:{click:t.addProduct}},[t._v("Añadir producto")])],1)],1)],1),t._v(" "),o("vs-row",{attrs:{"vs-justify":"center"}},[t._l(t.products,(function(e){return o("vs-col",{key:e.id,staticClass:"product-item",attrs:{type:"flex","vs-justify":"center","vs-align":"center","vs-w":"2"}},[o("vs-card",{staticClass:"cardx",attrs:{actionable:""}},[o("div",{attrs:{slot:"header"},slot:"header"},[o("h3",[t._v(t._s(e.name))])]),t._v(" "),o("div",{attrs:{slot:"media"},slot:"media"},[o("img",{attrs:{height:"200",src:e.images.length?e.images[0].image:r(200)}})]),t._v(" "),o("div",[o("p",[o("i",[t._v(t._s(e.barcode))])]),t._v(" "),o("p",[t._v(t._s(e.description))]),t._v(" "),o("vs-chip",{attrs:{color:"danger"}},[t._v(t._s(e.price?e.price+"€":"No disponible"))]),t._v(" "),t._l(e.categories,(function(e,r){return o("vs-chip",{key:r},[t._v(t._s(e.name))])}))],2),t._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("vs-row",{attrs:{"vs-justify":"flex-end"}},[o("vs-button",{attrs:{color:"primary",radius:"",icon:"open_in_browser"},on:{click:function(r){return t.goToProduct(e.id)}}}),t._v(" "),o("vs-button",{attrs:{color:"danger",radius:"",icon:"delete"},on:{click:function(r){return t.dialogDeleteProduct(e.id)}}})],1)],1)])],1)})),t._v(" "),t.products.length?t._e():o("vs-col",{staticStyle:{"text-align":"center",margin:"5px"},attrs:{"vs-jusify":"center"}},[t._v("No se han encontrado productos.")])],2),t._v(" "),o("vs-row",[o("vs-pagination",{staticClass:"center-pagination",attrs:{total:t.pages},on:{change:t.loadData},model:{value:t.actualPage,callback:function(e){t.actualPage=e},expression:"actualPage"}})],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);