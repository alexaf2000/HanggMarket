(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{219:function(e,r,t){"use strict";t.r(r);t(63),t(17);var o=t(2),n=t(7),l=t.n(n),c={validate:function(e){var r=e.params;return/^\d+$/.test(r.id)},data:function(){return{userId:this.$route.params.id,originalUser:{},user:{name:"",lastname:"",password:"",password_confirmation:"",email:"",birthdate:"",profile_image:""},popupModifyProfileImage:!1}},fetch:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e.loadData();case 1:case"end":return r.stop()}}),r)})))()},methods:{loadData:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.$vs.loading(),r.next=3,l.a.get("http://localhost/HanggMarket/public/api/user/show/"+e.userId).then((function(r){e.originalUser=r.data,e.user.name=e.originalUser.name,e.user.lastname=e.originalUser.lastname,e.user.email=e.originalUser.email,e.user.birthdate=e.originalUser.birthdate,e.user.profile_image=e.originalUser.profile_image}));case 3:e.$vs.loading.close();case 4:case"end":return r.stop()}}),r)})))()},modifyUser:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.$vs.loading(),r.next=3,l.a.post("http://localhost/HanggMarket/public/api/user/update/"+e.userId,{name:e.user.name,lastname:e.user.lastname,email:e.user.email,birthdate:e.user.birthdate}).then((function(r){e.loadData(),e.$vs.notify({title:"Usuario modificado correctamente.",text:"El usuario ha sido modificado correctamente..",color:"success"})}));case 3:e.$vs.loading.close();case 4:case"end":return r.stop()}}),r)})))()},modifyUserPassword:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.$vs.loading(),r.next=3,l.a.post("http://localhost/HanggMarket/public/api/user/update/"+e.userId+"/credentials",{password:e.user.password,password_confirmation:e.user.password_confirmation}).then((function(r){e.loadData(),e.user.password="",e.user.password_confirmation="",e.$vs.notify({title:"Usuario modificado correctamente.",text:"El usuario ha sido modificado correctamente..",color:"success"})}));case 3:e.$vs.loading.close();case 4:case"end":return r.stop()}}),r)})))()},modifyUserProfileImage:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!e.$refs.file.srcs.length){r.next=5;break}return e.$vs.loading(),r.next=4,l.a.post("http://localhost/HanggMarket/public/api/user/update/"+e.userId+"/image",{profile_image:e.$refs.file.srcs[0].src}).then((function(r){e.loadData(),e.popupModifyProfileImage=!1,e.$vs.notify({title:"Usuario modificado correctamente.",text:"El usuario ha sido modificado correctamente..",color:"success"})}));case 4:e.$vs.loading.close();case 5:case"end":return r.stop()}}),r)})))()}}},d=t(12),component=Object(d.a)(c,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("h1",[e._v("Modificar usuario")]),e._v(" "),t("h3",[e._v(e._s(e.originalUser.name)+" "+e._s(e.originalUser.lastname))]),e._v(" "),t("vs-row",{attrs:{"vs-justify":"flex-start"}},[t("vs-col",{attrs:{"vs-w":"6"}},[t("vs-avatar",{attrs:{size:"70px",hover:"blur",src:e.user.profile_image},on:{click:function(r){e.popupModifyProfileImage=!0}}}),e._v(" "),t("vs-popup",{attrs:{title:"Cambiar imagen de perfil",active:e.popupModifyProfileImage},on:{"update:active":function(r){e.popupModifyProfileImage=r}}},[t("vs-upload",{ref:"file",attrs:{limit:"1",text:"Subir imagen de perfil","show-upload-button":!1,accept:"image/png, image/jpeg"}}),e._v(" "),t("vs-button",{on:{click:e.modifyUserProfileImage}},[e._v("Cambiar imagen")])],1),e._v(" "),t("h4",[e._v("Datos generales")]),e._v(" "),t("vs-input",{attrs:{"label-placeholder":"Nombre"},model:{value:e.user.name,callback:function(r){e.$set(e.user,"name",r)},expression:"user.name"}}),e._v(" "),t("vs-input",{attrs:{"label-placeholder":"Apellido"},model:{value:e.user.lastname,callback:function(r){e.$set(e.user,"lastname",r)},expression:"user.lastname"}}),e._v(" "),t("vs-input",{attrs:{type:"date","label-placeholder":"Fecha de nacimiento"},model:{value:e.user.birthdate,callback:function(r){e.$set(e.user,"birthdate",r)},expression:"user.birthdate"}}),e._v(" "),t("h4",[e._v("Correo electronico")]),e._v(" "),t("vs-input",{attrs:{type:"email","label-placeholder":"Correo electronico"},model:{value:e.user.email,callback:function(r){e.$set(e.user,"email",r)},expression:"user.email"}}),e._v(" "),t("vs-button",{staticStyle:{margin:"15px 0"},attrs:{color:"primary",type:"filled"},on:{click:e.modifyUser}},[e._v("Guardar cambios")])],1),e._v(" "),t("vs-col",{attrs:{"vs-w":"6"}},[t("h4",{staticStyle:{"text-align":"left"}},[e._v("Modificar contraseña")]),e._v(" "),t("vs-input",{attrs:{type:"password","label-placeholder":"Contraseña nueva"},model:{value:e.user.password,callback:function(r){e.$set(e.user,"password",r)},expression:"user.password"}}),e._v(" "),t("vs-input",{attrs:{type:"password","label-placeholder":"Confirmar contraseña nueva"},model:{value:e.user.password_confirmation,callback:function(r){e.$set(e.user,"password_confirmation",r)},expression:"user.password_confirmation"}}),e._v(" "),t("vs-button",{staticStyle:{margin:"15px 0"},attrs:{color:"primary",type:"filled"},on:{click:e.modifyUserPassword}},[e._v("Cambiar contraseña")])],1)],1)],1)}),[],!1,null,null,null);r.default=component.exports}}]);