(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"5nP1":function(t,i,e){"use strict";e.r(i),e.d(i,"ListModule",function(){return Y});var s=e("ofXK"),c=e("PCNd"),a=e("tyNb"),n=e("IJgu"),r=e("3Pt+"),o=e("0IaG"),l=e("fXoL"),b=e("niax"),m=e("21no"),d=e("kmnG"),u=e("qFsG"),f=e("/1cH"),h=e("bTqV"),p=e("NFeN"),g=e("FKr1"),v=e("sYmb");function U(t,i){if(1&t&&(l.Ub(0,"mat-option",10),l.Fc(1),l.Tb()),2&t){const t=i.$implicit;l.mc("value",t),l.Cb(1),l.Ic(" ",t.username," - ",t.email," ")}}function T(t,i){1&t&&l.Pb(0,"span",11)}let C=(()=>{class t{constructor(t,i,e,s,c){this.formBuilder=t,this.accountService=i,this.listService=e,this.dialogRef=s,this.data=c,this.loading=!1,this.submitted=!1,this.usersFound=[],this.listId=c.listId}ngOnInit(){this.form=this.formBuilder.group({filter:[""],description:["",r.s.required]})}get f(){return this.form.controls}onSubmit(){this.f.filter.value._id&&this.listService.shareList(this.listId,this.f.filter.value).subscribe()}onClose(){this.dialogRef.close(!1)}getFilteredUsers(t){this.accountService.geFilteredUsers(t).subscribe(t=>{this.usersFound=t})}displayUser(t){return t&&t.username?t.username:""}}return t.\u0275fac=function(i){return new(i||t)(l.Ob(r.c),l.Ob(b.a),l.Ob(m.a),l.Ob(o.g),l.Ob(o.a))},t.\u0275cmp=l.Ib({type:t,selectors:[["app-share"]],decls:21,vars:15,consts:[[3,"formGroup","ngSubmit"],[1,"example-full-width"],["type","text","aria-label","Number","matInput","","formControlName","filter",3,"placeholder","matAutocomplete","input"],["autoActiveFirstOption","",3,"displayWith"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["type","submit","mat-button","",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["inline",""],["mat-button","","type","button",3,"click"],[3,"value"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(t,i){if(1&t&&(l.Ub(0,"h2"),l.Fc(1),l.gc(2,"translate"),l.Tb(),l.Ub(3,"form",0),l.bc("ngSubmit",function(){return i.onSubmit()}),l.Ub(4,"mat-form-field",1),l.Ub(5,"input",2),l.bc("input",function(t){return i.getFilteredUsers(t.target.value)}),l.gc(6,"translate"),l.Tb(),l.Ub(7,"mat-autocomplete",3,4),l.Ec(9,U,2,3,"mat-option",5),l.Tb(),l.Tb(),l.Ub(10,"div"),l.Ub(11,"button",6),l.Ec(12,T,1,0,"span",7),l.Fc(13),l.gc(14,"translate"),l.Ub(15,"mat-icon",8),l.Fc(16,"person_add"),l.Tb(),l.Tb(),l.Ub(17,"button",9),l.bc("click",function(){return i.onClose()}),l.Fc(18,"Cancel "),l.Ub(19,"mat-icon",8),l.Fc(20,"cancel"),l.Tb(),l.Tb(),l.Tb(),l.Tb()),2&t){const t=l.uc(8);l.Cb(1),l.Gc(l.hc(2,9,"lists.share.title")),l.Cb(2),l.mc("formGroup",i.form),l.Cb(2),l.nc("placeholder",l.hc(6,11,"lists.share.field.usernameOrEmail")),l.mc("matAutocomplete",t),l.Cb(2),l.mc("displayWith",i.displayUser),l.Cb(2),l.mc("ngForOf",i.usersFound),l.Cb(2),l.mc("disabled",i.loading),l.Cb(1),l.mc("ngIf",i.loading),l.Cb(1),l.Hc(" ",l.hc(14,13,"lists.share.button.send")," ")}},directives:[r.u,r.m,r.g,d.c,u.a,r.b,f.c,r.l,r.f,f.a,s.l,h.a,s.m,p.a,g.h],pipes:[v.c],encapsulation:2}),t})();var F=e("FtGj");class I{constructor(t,i,e,s,c,a,n,r,o,l,b){t&&(this._id=t),i&&(this.name=i),e&&(this.description=e),s&&(this.listItems=s),c&&(this.cartItems=c),a&&(this.owner=a),n&&(this.sharedUsers=n),r&&(this.images=r),o&&(this.totals=o),l&&(this.income=l)}}var _=e("A5z7"),O=e("1jcm");function S(t,i){1&t&&(l.Ub(0,"h2"),l.Fc(1),l.gc(2,"translate"),l.Tb()),2&t&&(l.Cb(1),l.Gc(l.hc(2,1,"lists.add")))}function w(t,i){1&t&&(l.Ub(0,"h2"),l.Fc(1),l.gc(2,"translate"),l.Tb()),2&t&&(l.Cb(1),l.Gc(l.hc(2,1,"lists.edit.button")))}function y(t,i){1&t&&(l.Ub(0,"div"),l.Fc(1,"Name is required"),l.Tb())}function k(t,i){if(1&t&&(l.Ub(0,"div",21),l.Ec(1,y,2,0,"div",2),l.Tb()),2&t){const t=l.fc();l.Cb(1),l.mc("ngIf",t.f.name.errors.required)}}function E(t,i){1&t&&l.Pb(0,"div",21)}function L(t,i){1&t&&(l.Ub(0,"mat-icon",24),l.Fc(1,"cancel"),l.Tb())}function G(t,i){if(1&t){const t=l.Vb();l.Ub(0,"mat-chip",22),l.bc("removed",function(){l.wc(t);const e=i.$implicit;return l.fc().remove(e)}),l.Fc(1),l.Ec(2,L,2,0,"mat-icon",23),l.Tb()}if(2&t){const t=i.$implicit,e=l.fc();l.mc("selectable",e.selectable)("removable",e.removable),l.Cb(1),l.Hc(" ",t," "),l.Cb(1),l.mc("ngIf",e.removable)}}function A(t,i){1&t&&l.Pb(0,"span",25)}const M=function(t){return{"is-invalid":t}};let P=(()=>{class t{constructor(t,i,e,s){this.listService=t,this.formBuilder=i,this.dialogRef=e,this.data=s,this.loading=!1,this.submitted=!1,this.tags=[],this.addOnBlur=!0,this.visible=!0,this.selectable=!0,this.removable=!0,this.separatorKeysCodes=[F.g,F.c],this.list=s.list||new I,this.isAddMode=s.isAddMode}ngOnInit(){this.form=this.formBuilder.group({name:["",r.s.required],description:["",r.s.required],tags:[""],income:[!0]}),this.list._id&&(this.f.name.setValue(this.list.name),this.f.description.setValue(this.list.description),this.f.income.setValue(this.list.income),this.tags=this.list.tags)}get f(){return this.form.controls}onSubmit(){this.list.name=this.f.name.value,this.list.description=this.f.description.value,this.list.income=this.f.income.value,this.tags.length>0&&(this.list.tags=this.tags),this.listService.saveList(this.list).subscribe(t=>{this.dialogRef.close(t)})}close(){this.dialogRef.close()}add(t){const i=t.input,e=t.value;(e||"").trim()&&this.tags.push(e.trim()),i&&(i.value="")}remove(t){const i=this.tags.indexOf(t);i>=0&&this.tags.splice(i,1)}}return t.\u0275fac=function(i){return new(i||t)(l.Ob(m.a),l.Ob(r.c),l.Ob(o.g),l.Ob(o.a))},t.\u0275cmp=l.Ib({type:t,selectors:[["app-list-edit"]],decls:45,vars:30,consts:[[1,"dialog"],[1,"dialog-header"],[4,"ngIf"],["mat-icon-button","",3,"mat-dialog-close"],["mat-dialog-content","",1,"dialog-content"],[3,"formGroup","ngSubmit"],["for","name"],["matInput","","type","text","formControlName","name"],["class","invalid-feedback",4,"ngIf"],["for","description"],["matInput","","type","text","formControlName","description",3,"ngClass"],[1,"example-chip-list"],["aria-label","tag selection","formControlName","tags"],["chipList",""],[3,"selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","nuevo tag...",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],["formControlName","income","color","primary","checked",""],[1,"dialog-actions"],["mat-button","",3,"disabled","click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["mat-button","","type","button","cdkFocusInitial","",3,"click"],[1,"invalid-feedback"],[3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(t,i){if(1&t&&(l.Ub(0,"div",0),l.Ub(1,"div",1),l.Ec(2,S,3,3,"h2",2),l.Ec(3,w,3,3,"h2",2),l.Ub(4,"button",3),l.Ub(5,"mat-icon"),l.Fc(6,"close"),l.Tb(),l.Tb(),l.Tb(),l.Ub(7,"div",4),l.Ub(8,"form",5),l.bc("ngSubmit",function(){return i.onSubmit()}),l.Ub(9,"div"),l.Ub(10,"mat-form-field"),l.Ub(11,"mat-label",6),l.Fc(12),l.gc(13,"translate"),l.Tb(),l.Pb(14,"input",7),l.Ec(15,k,2,1,"div",8),l.Tb(),l.Ub(16,"mat-form-field"),l.Ub(17,"mat-label",9),l.Fc(18),l.gc(19,"translate"),l.Tb(),l.Pb(20,"input",10),l.Ec(21,E,1,0,"div",8),l.Tb(),l.Ub(22,"mat-form-field",11),l.Ub(23,"mat-label"),l.Fc(24,"Tags"),l.Tb(),l.Ub(25,"mat-chip-list",12,13),l.Ec(27,G,3,4,"mat-chip",14),l.Ub(28,"input",15),l.bc("matChipInputTokenEnd",function(t){return i.add(t)}),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Ub(29,"div"),l.Ub(30,"mat-slide-toggle",16),l.Fc(31),l.gc(32,"translate"),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Ub(33,"div",17),l.Ub(34,"button",18),l.bc("click",function(){return i.onSubmit()}),l.Ec(35,A,1,0,"span",19),l.Ub(36,"mat-icon"),l.Fc(37,"save"),l.Tb(),l.Fc(38),l.gc(39,"translate"),l.Tb(),l.Ub(40,"button",20),l.bc("click",function(){return i.close()}),l.Ub(41,"mat-icon"),l.Fc(42,"cancel"),l.Tb(),l.Fc(43),l.gc(44,"translate"),l.Tb(),l.Tb(),l.Tb()),2&t){const t=l.uc(26);l.Cb(2),l.mc("ngIf",i.isAddMode),l.Cb(1),l.mc("ngIf",!i.isAddMode),l.Cb(1),l.mc("mat-dialog-close",!1),l.Cb(4),l.mc("formGroup",i.form),l.Cb(4),l.Gc(l.hc(13,18,"lists.edit.name")),l.Cb(3),l.mc("ngIf",i.submitted&&i.f.name.errors),l.Cb(3),l.Gc(l.hc(19,20,"lists.edit.description")),l.Cb(2),l.mc("ngClass",l.rc(28,M,i.submitted&&i.f.description.errors)),l.Cb(1),l.mc("ngIf",i.submitted&&i.f.description.errors),l.Cb(6),l.mc("ngForOf",i.tags),l.Cb(1),l.mc("matChipInputFor",t)("matChipInputSeparatorKeyCodes",i.separatorKeysCodes)("matChipInputAddOnBlur",i.addOnBlur),l.Cb(3),l.Gc(l.hc(32,22,"lists.edit.income")),l.Cb(3),l.mc("disabled",!i.form.valid),l.Cb(1),l.mc("ngIf",i.loading),l.Cb(3),l.Hc(" ",l.hc(39,24,"global.actions.save")," "),l.Cb(5),l.Hc(" ",l.hc(44,26,"global.actions.cancel"),"")}},directives:[s.m,h.a,o.d,p.a,o.e,r.u,r.m,r.g,d.c,d.f,u.a,r.b,r.l,r.f,s.k,_.c,s.l,_.b,O.a,_.a,_.d],pipes:[v.c],encapsulation:2}),t})();var N=e("AytR"),x=e("Wp6s"),$=e("STbY");function B(t,i){1&t&&(l.Ub(0,"mat-icon"),l.Fc(1,"file_download"),l.Tb())}function q(t,i){1&t&&(l.Ub(0,"mat-icon"),l.Fc(1,"file_upload"),l.Tb())}function R(t,i){if(1&t&&l.Pb(0,"img",16),2&t){const t=l.fc(2);l.oc("src","",t.apiUrl,"/images/default-user.jpg",l.yc)}}function j(t,i){if(1&t&&l.Pb(0,"img",16),2&t){const t=l.fc().$implicit,i=l.fc();l.pc("src","",i.apiUrl,"/images/",t.owner.avatar.filename,".",t.owner.avatar.fileExt,"",l.yc)}}function V(t,i){if(1&t&&l.Pb(0,"img",19),2&t){const t=l.fc(3);l.oc("src","",t.apiUrl,"/images/default-user.jpg",l.yc)}}function H(t,i){if(1&t&&l.Pb(0,"img",19),2&t){const t=l.fc().$implicit,i=l.fc(2);l.pc("src","",i.apiUrl,"/images/",t.avatar.filename,".",t.avatar.fileExt,"",l.yc)}}function K(t,i){if(1&t&&(l.Ub(0,"div",17),l.Ec(1,V,1,1,"img",18),l.Ec(2,H,1,3,"img",18),l.Ub(3,"span"),l.Fc(4),l.Tb(),l.Tb()),2&t){const t=i.$implicit;l.Cb(1),l.mc("ngIf",!t.avatar),l.Cb(1),l.mc("ngIf",t.avatar),l.Cb(2),l.Gc(t.username)}}const D=function(t){return[t]},J=function(){return{exact:!0}};function W(t,i){if(1&t){const t=l.Vb();l.Ub(0,"mat-card",4),l.Ub(1,"div"),l.Ub(2,"div",5),l.Ub(3,"div",6),l.Ub(4,"a",7),l.Ub(5,"mat-card-title"),l.Fc(6),l.Ec(7,B,2,0,"mat-icon",8),l.Ec(8,q,2,0,"mat-icon",8),l.Tb(),l.Ub(9,"mat-card-subtitle"),l.Fc(10),l.Tb(),l.Tb(),l.Tb(),l.Ub(11,"div",9),l.Ub(12,"span"),l.Fc(13),l.Tb(),l.Ub(14,"button",10),l.Ub(15,"mat-icon"),l.Fc(16,"more_vert"),l.Tb(),l.Tb(),l.Ub(17,"mat-menu",null,11),l.Ub(19,"button",12),l.bc("click",function(){l.wc(t);const e=i.$implicit;return l.fc().onEdit(e)}),l.Ub(20,"mat-icon"),l.Fc(21,"edit"),l.Tb(),l.Ub(22,"span"),l.Fc(23),l.gc(24,"translate"),l.Tb(),l.Tb(),l.Ub(25,"button",12),l.bc("click",function(){l.wc(t);const e=i.$implicit;return l.fc().onDelete(e._id)}),l.Ub(26,"mat-icon"),l.Fc(27,"delete"),l.Tb(),l.Ub(28,"span"),l.Fc(29),l.gc(30,"translate"),l.Tb(),l.Tb(),l.Ub(31,"button",12),l.bc("click",function(){l.wc(t);const e=i.$implicit;return l.fc().onShare(e._id)}),l.Ub(32,"mat-icon"),l.Fc(33,"person_add"),l.Tb(),l.Ub(34,"span"),l.Fc(35),l.gc(36,"translate"),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Ub(37,"mat-card-content"),l.Ub(38,"div",13),l.Ec(39,R,1,1,"img",14),l.Ec(40,j,1,3,"img",14),l.Ub(41,"span"),l.Fc(42),l.Tb(),l.Tb(),l.Ec(43,K,5,3,"div",15),l.Tb(),l.Tb()}if(2&t){const t=i.$implicit,e=l.uc(18);l.Cb(4),l.mc("routerLink",l.rc(22,D,"/list/"+t._id))("routerLinkActiveOptions",l.qc(24,J)),l.Cb(2),l.Hc(" ",t.name," "),l.Cb(1),l.mc("ngIf",t.income),l.Cb(1),l.mc("ngIf",!t.income),l.Cb(2),l.Gc(t.description),l.Cb(3),l.Ic(" ",t.cartItems?t.cartItems.length:0,"/",(t.listItems?t.listItems.length:0)+(t.cartItems?t.cartItems.length:0)," "),l.Cb(1),l.mc("matMenuTriggerFor",e),l.Cb(9),l.Gc(l.hc(24,16,"global.actions.edit")),l.Cb(6),l.Gc(l.hc(30,18,"global.actions.delete")),l.Cb(6),l.Gc(l.hc(36,20,"global.actions.share")),l.Cb(4),l.mc("ngIf",!t.owner.avatar),l.Cb(1),l.mc("ngIf",t.owner.avatar),l.Cb(2),l.Gc(t.owner.username),l.Cb(1),l.mc("ngForOf",t.sharedUsers)}}const z=[{path:"",component:(()=>{class t{constructor(t,i,e){this.dialog=t,this.listService=i,this.accountService=e,this.userLists=this.listService.userListsSubject,this.user=this.accountService.sessionValue.user,this.apiUrl=N.a.apiUrl}ngOnInit(){this.listService.getUserLists()}onEdit(t){this.dialog.open(P,{data:{list:t,isAddMode:!1}}).afterClosed().subscribe(t=>{this.listService.getUserLists()})}onDelete(t){this.dialog.open(n.a,{data:{message:"Deseas borrar la lista",title:"Borrar lista"}}).afterClosed().subscribe(i=>{i?this.listService.deleteList(t).subscribe(t=>{this.listService.getUserLists()}):console.info("closed without confirm")})}addList(){this.dialog.open(P,{data:{isAddMode:!0}}).afterClosed().subscribe(t=>{console.info("The list edit dialog was closed",t),this.listService.getUserLists()})}onShare(t){this.dialog.open(C,{data:{listId:t}}).afterClosed().subscribe(t=>{console.info("The share dialog was closed",t),this.listService.getUserLists()})}}return t.\u0275fac=function(i){return new(i||t)(l.Ob(o.b),l.Ob(m.a),l.Ob(b.a))},t.\u0275cmp=l.Ib({type:t,selectors:[["app-list-home"]],decls:7,vars:3,consts:[[1,"list-home"],["class","list-home__card",4,"ngFor","ngForOf"],[1,"list-home__add-button"],["mat-fab","","color","primary","aria-label","Add list",1,"mat-elevation-z6",3,"click"],[1,"list-home__card"],[1,"list-home__card-header"],[1,"list-home__card-header-title"],["routerLinkActive","active",3,"routerLink","routerLinkActiveOptions"],[4,"ngIf"],[1,"toolbar__right"],["mat-icon-button","",1,"toolbar__sidenav-button",3,"matMenuTriggerFor"],["actions","matMenu"],["mat-menu-item","",3,"click"],[1,"list-home__avatar","list-home__avatar--owner"],["class","list-home__avatar-img list-home__avatar-img--owner",3,"src",4,"ngIf"],["class","list-home__avatar list-home__avatar--shared-user",4,"ngFor","ngForOf"],[1,"list-home__avatar-img","list-home__avatar-img--owner",3,"src"],[1,"list-home__avatar","list-home__avatar--shared-user"],["class","list-home__avatar-img list-home__avatar-img--shared-user",3,"src",4,"ngIf"],[1,"list-home__avatar-img","list-home__avatar-img--shared-user",3,"src"]],template:function(t,i){1&t&&(l.Ub(0,"div",0),l.Ec(1,W,44,25,"mat-card",1),l.gc(2,"async"),l.Tb(),l.Ub(3,"div",2),l.Ub(4,"button",3),l.bc("click",function(){return i.addList()}),l.Ub(5,"mat-icon"),l.Fc(6,"add"),l.Tb(),l.Tb(),l.Tb()),2&t&&(l.Cb(1),l.mc("ngForOf",l.hc(2,1,i.userLists)))},directives:[s.l,h.a,p.a,x.a,a.e,a.d,x.e,s.m,x.d,$.d,$.a,$.b,x.b],pipes:[s.b,v.c],encapsulation:2}),t})()}];let X=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(i){return new(i||t)},imports:[[a.f.forChild(z)],a.f]}),t})(),Y=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(i){return new(i||t)},imports:[[s.c,c.a,X]]}),t})()}}]);