(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{202:function(e,t,r){var content=r(210);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(23).default)("723ba780",content,!0,{sourceMap:!1})},209:function(e,t,r){"use strict";var n=r(202);r.n(n).a},210:function(e,t,r){(e.exports=r(22)(!1)).push([e.i,".con-expand-users .con-btns-user{display:flex;padding:10px 10px 0;align-items:center;justify-content:space-between}.con-expand-users .con-userx{display:flex;align-items:center;justify-content:flex-start}.list-icon i{font-size:.9rem!important}.vuesax-app-is-ltr .con-vs-popup{z-index:5}.users-pagination .vs-pagination--mb{justify-content:center!important;width:100%!important}",""])},215:function(e,t,r){"use strict";r.r(t);r(17);var n=r(2),o=r(7),l=r.n(o),c={data:function(){return{users:[],newUser:{name:"",lastname:"",email:"",password:null,password_confirmation:null,birthdate:null,profile_image:null},selected:null,pages:0,actualPage:1,popupCreateUser:!1}},fetch:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.loadData();case 1:case"end":return t.stop()}}),t)})))()},methods:{loadData:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$vs.loading(),t.next=3,l.a.get("http://localhost/HanggMarket/public/api/user",{params:{page:e.actualPage}}).then((function(t){e.users=t.data.data,e.pages=t.data.last_page}));case 3:e.$vs.loading.close();case 4:case"end":return t.stop()}}),t)})))()},dialogDeleteUser:function(e){this.selected=e,this.$vs.dialog({type:"confirm",color:"danger",title:"¿Estás seguro?",acceptText:"Confirmar",cancelText:"Cancelar",text:"Se va a proceder con la eliminación de el usuario.",accept:this.deleteUser})},deleteUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.delete("http://localhost/HanggMarket/public/api/user/destroy/"+e.selected).then((function(t){e.$vs.notify({title:"Usuario eliminado.",text:"El usuario ha sido eliminado correctamente.",color:"success",icon:"check_box"}),e.loadData()}));case 2:case"end":return t.stop()}}),t)})))()},addUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$refs.file.srcs.length&&(e.newUser.profile_image=e.$refs.file.srcs[0].src),t.next=3,l.a.post("http://localhost/HanggMarket/public/api/user/store",e.newUser).then((function(t){e.popupCreateUser=!1,e.loadData(),e.$vs.notify({title:"Usuario creado correctamente.",text:"El usuario ha sido creado correctamente",color:"success",icon:"check_box"})}));case 3:e.actualPage=e.pages;case 4:case"end":return t.stop()}}),t)})))()},goToUser:function(e){this.$router.push("/users/"+e)}}},d=(r(209),r(12)),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("vs-row",[r("vs-col",[r("vs-button",{staticStyle:{margin:"5px 0"},attrs:{color:"#008bef",size:"small",icon:"add"},on:{click:function(t){e.popupCreateUser=!0}}},[e._v("Añadir usuario")]),e._v(" "),r("vs-popup",{attrs:{title:"Crear usuario",active:e.popupCreateUser},on:{"update:active":function(t){e.popupCreateUser=t}}},[r("vs-input",{attrs:{color:"#008bef","label-placeholder":"Nombre"},model:{value:e.newUser.name,callback:function(t){e.$set(e.newUser,"name",t)},expression:"newUser.name"}}),e._v(" "),r("vs-input",{attrs:{color:"#008bef","label-placeholder":"Apellido"},model:{value:e.newUser.lastname,callback:function(t){e.$set(e.newUser,"lastname",t)},expression:"newUser.lastname"}}),e._v(" "),r("vs-input",{attrs:{color:"#008bef",type:"email","label-placeholder":"Correo electronico"},model:{value:e.newUser.email,callback:function(t){e.$set(e.newUser,"email",t)},expression:"newUser.email"}}),e._v(" "),r("vs-input",{attrs:{color:"#008bef",type:"password","label-placeholder":"Contraseña"},model:{value:e.newUser.password,callback:function(t){e.$set(e.newUser,"password",t)},expression:"newUser.password"}}),e._v(" "),r("vs-input",{attrs:{color:"#008bef",type:"password","label-placeholder":"Confirmar contraseña"},model:{value:e.newUser.password_confirmation,callback:function(t){e.$set(e.newUser,"password_confirmation",t)},expression:"newUser.password_confirmation"}}),e._v(" "),r("vs-input",{attrs:{color:"#008bef",type:"date","label-placeholder":"Fecha de nacimiento"},model:{value:e.newUser.birthdate,callback:function(t){e.$set(e.newUser,"birthdate",t)},expression:"newUser.birthdate"}}),e._v(" "),r("div",{staticClass:"centerx"},[r("vs-upload",{ref:"file",attrs:{limit:"1","show-upload-button":!1,accept:"image/png, image/jpeg"}})],1),e._v(" "),r("vs-button",{attrs:{color:"#008bef"},on:{click:e.addUser}},[e._v("Añadir usuario")])],1)],1)],1),e._v(" "),r("vs-row",[r("vs-col",[r("vs-table",{attrs:{data:e.users,noDataText:"No hay datos disponibles."},scopedSlots:e._u([{key:"default",fn:function(t){var data=t.data;return e._l(data,(function(tr,t){return r("vs-tr",{key:t,attrs:{data:tr}},[r("vs-td",{attrs:{data:tr.email}},[e._v(e._s(tr.email))]),e._v(" "),r("vs-td",{attrs:{data:tr.username}},[e._v(e._s(tr.name))]),e._v(" "),r("vs-td",{attrs:{data:tr.lastname}},[e._v(e._s(tr.lastname))]),e._v(" "),r("vs-td",{attrs:{data:tr.id}},[e._v(e._s(tr.id))]),e._v(" "),r("template",{staticClass:"expand-user",slot:"expand"},[r("div",{staticClass:"con-expand-users"},[r("div",{staticClass:"con-btns-user"},[r("div",{staticClass:"con-userx"},[r("vs-avatar",{attrs:{size:"45px",src:tr.profile_image}}),e._v(" "),r("span",[e._v(e._s(tr.name)+" "+e._s(tr.lastname))])],1),e._v(" "),r("div",[r("vs-button",{attrs:{"vs-type":"gradient",size:"small",color:"success",icon:"edit"},on:{click:function(t){return e.goToUser(tr.id)}}}),e._v(" "),r("vs-button",{attrs:{"vs-type":"flat",size:"small",color:"danger",icon:"delete_sweep"},on:{click:function(t){return e.dialogDeleteUser(tr.id)}}})],1)]),e._v(" "),r("vs-list",[r("vs-list-item",{attrs:{icon:"mail",title:"Email",subtitle:tr.email}}),e._v(" "),r("vs-list-item",{attrs:{icon:"cake",title:"Fecha de nacimiento",subtitle:tr.birthdate}}),e._v(" "),r("vs-list-item",{attrs:{icon:"calendar_today",title:"Creación de cuenta",subtitle:Date(tr.created_at)}})],1)],1)])],2)}))}}])},[r("template",{slot:"header"},[r("h3",[e._v("Usuarios")])]),e._v(" "),r("template",{slot:"thead"},[r("vs-th",[e._v("Correo electrónico")]),e._v(" "),r("vs-th",[e._v("Nombre")]),e._v(" "),r("vs-th",[e._v("Apellido")]),e._v(" "),r("vs-th",[e._v("ID")])],1)],2)],1)],1),e._v(" "),r("vs-row",[r("vs-pagination",{staticClass:"users-pagination",attrs:{total:e.pages},on:{change:e.loadData},model:{value:e.actualPage,callback:function(t){e.actualPage=t},expression:"actualPage"}})],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);