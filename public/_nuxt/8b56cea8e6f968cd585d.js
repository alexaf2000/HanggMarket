(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{214:function(e,t,n){"use strict";n.r(t);n(63),n(17);var r=n(2),o=n(7),c=n.n(o),d={data:function(){return{selected:{},searching:null,actualPage:1,newCategory:{name:"",description:""},pages:0,categories:[],activePrompt:!1,popupModifyCategory:!1,toModify:{id:null,name:"",description:""}}},fetch:function(){return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:loadData();case 1:case"end":return e.stop()}}),e)})))()},methods:{loadData:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$vs.loading(),t.next=3,c.a.get("http://localhost/HanggMarket/public/api/category",{params:{page:e.actualPage,search:e.searching}}).then((function(t){e.categories=t.data.data,e.pages=t.data.last_page}));case 3:e.$vs.loading.close();case 4:case"end":return t.stop()}}),t)})))()},paginateChanged:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$vs.loading(),t.next=3,c.a.get("http://localhost/HanggMarket/public/api/category",{params:{page:e.actualPage,search:e.searching}}).then((function(t){e.categories=t.data.data,e.pages=t.data.last_page}));case 3:e.$vs.loading.close();case 4:case"end":return t.stop()}}),t)})))()},handleSearch:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.searching=e,t.$vs.loading(),n.next=4,c.a.get("http://localhost/HanggMarket/public/api/category",{params:{page:t.actualPage,search:t.searching}}).then((function(e){t.categories=e.data.data,t.actualPage=1,t.pages=e.data.last_page}));case 4:t.$vs.loading.close();case 5:case"end":return n.stop()}}),n)})))()},addCategory:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.$vs.loading({container:"#addCategoryDialog",scale:.6}),e.next=3,c.a.post("http://localhost/HanggMarket/public/api/category/store",t.newCategory).then((function(e){t.newCategory.name="",t.newCategory.description="",t.$vs.notify({color:"success",title:"Categoría añadida.",text:"La categoría ha sido añadida correctamente."}),t.activePrompt=!1}));case 3:t.loadData(),t.actualPage=t.pages,t.searching=null;case 6:case"end":return e.stop()}}),e)})))()},openDeleteCategory:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"¿Estás seguro?",acceptText:"Confirmar",cancelText:"Cancelar",text:'Se va a proceder con la eliminación de la categoría "'.concat(this.selected.name,'".'),accept:this.DeleteCategory})},DeleteCategory:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.delete("http://localhost/HanggMarket/public/api/category/destroy/"+e.selected.id).then((function(t){e.$vs.notify({color:"danger",title:"Categoría eliminada",text:"La categoría ha sido eleiminada correctamente."}),e.selected={}}));case 2:e.loadData(),e.actualPage=1;case 4:case"end":return t.stop()}}),t)})))()},modifyCategoryButton:function(){this.popupModifyCategory=!0,this.toModify.id=this.selected.id,this.toModify.name=this.selected.name,this.toModify.description=this.selected.description},ModifyCategory:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.post("http://localhost/HanggMarket/public/api/category/update/"+e.toModify.id,{name:e.toModify.name,description:e.toModify.description}).then((function(t){e.$vs.notify({color:"success",title:"Modificado correctamente.",text:"La categoría ha sido modificada correctamente.."}),e.popupModifyCategory=!1,e.loadData()}));case 2:case"end":return t.stop()}}),t)})))()}}},l=n(12),component=Object(l.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vs-row",[n("vs-col",{attrs:{"vs-w":"6"}},[n("vs-button",{attrs:{color:"primary",type:"border",icon:"add",size:"small"},on:{click:function(t){e.activePrompt=!0}}},[e._v("Añadir categoría")]),e._v(" "),n("vs-prompt",{attrs:{color:"primary",id:"addCategoryDialog",title:"Añadir categoría",active:e.activePrompt,"accept-text":"Añadir","cancel-text":"Cancelar"},on:{cancel:function(t){e.newCategory.name="",e.newCategory.description=""},accept:e.addCategory,"update:active":function(t){e.activePrompt=t}}},[n("div",[e._v("\n          Introduce los datos de la nueva\n          "),n("b",[e._v("categoría")]),e._v(".\n          "),n("vs-input",{attrs:{"label-placeholder":"Nombre"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addCategory(t)}},model:{value:e.newCategory.name,callback:function(t){e.$set(e.newCategory,"name",t)},expression:"newCategory.name"}}),e._v(" "),n("vs-input",{attrs:{"label-placeholder":"Descripción"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addCategory(t)}},model:{value:e.newCategory.description,callback:function(t){e.$set(e.newCategory,"description",t)},expression:"newCategory.description"}})],1)])],1),e._v(" "),n("vs-col",{attrs:{"vs-w":"6"}},[n("div",{staticStyle:{float:"right"}},[n("vs-button",{attrs:{color:"primary",type:"border",icon:"edit",disabled:!e.selected.id},on:{click:e.modifyCategoryButton}},[e._v("Modificar")]),e._v(" "),n("vs-popup",{attrs:{title:"Modificar categoría | "+e.toModify.name,active:e.popupModifyCategory},on:{"update:active":function(t){e.popupModifyCategory=t}}},[n("vs-input",{attrs:{"label-placeholder":"Nombre"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.ModifyCategory(t)}},model:{value:e.toModify.name,callback:function(t){e.$set(e.toModify,"name",t)},expression:"toModify.name"}}),e._v(" "),n("vs-input",{staticStyle:{margin:"25px 0"},attrs:{"label-placeholder":"Descripción"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.ModifyCategory(t)}},model:{value:e.toModify.description,callback:function(t){e.$set(e.toModify,"description",t)},expression:"toModify.description"}}),e._v(" "),n("vs-button",{on:{click:e.ModifyCategory}},[e._v("Guardar cambios")])],1),e._v(" "),n("vs-button",{attrs:{color:"danger",type:"border",icon:"delete",disabled:!e.selected.id},on:{click:e.openDeleteCategory}},[e._v("Eliminar")])],1)])],1),e._v(" "),n("vs-row",[n("vs-col",[n("vs-table",{attrs:{sst:!0,search:"",data:e.categories,noDataText:"No hay datos disponibles."},on:{search:e.handleSearch},scopedSlots:e._u([{key:"default",fn:function(t){var data=t.data;return e._l(data,(function(tr,t){return n("vs-tr",{key:t,attrs:{data:tr}},[n("vs-td",{attrs:{data:data[t].id}},[e._v(e._s(data[t].id))]),e._v(" "),n("vs-td",{attrs:{data:data[t].name}},[e._v(e._s(data[t].name))]),e._v(" "),n("vs-td",{attrs:{data:data[t].description}},[e._v(e._s(data[t].description))])],1)}))}}]),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[n("template",{slot:"header"},[n("h3",[e._v("Categorías")])]),e._v(" "),n("template",{slot:"thead"},[n("vs-th",[e._v("id")]),e._v(" "),n("vs-th",[e._v("Nombre")]),e._v(" "),n("vs-th",[e._v("Descripción")])],1)],2)],1)],1),e._v(" "),n("vs-row",[n("vs-pagination",{staticClass:"category-pagination",attrs:{total:e.pages},on:{change:e.paginateChanged},model:{value:e.actualPage,callback:function(t){e.actualPage=t},expression:"actualPage"}})],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);