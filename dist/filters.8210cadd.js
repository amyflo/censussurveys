parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"djxq":[function(require,module,exports) {
var e="";function t(){document.getElementById("cards").classList.toggle("card-columns")}function n(){$("input[type='checkbox']:checked").prop("checked",!1),e="",l()}function c(e,t){for(i=0;i<t.length;i++){t[i].style.display="inline-block",t[i].textContent.toLowerCase().includes(e)||(t[i].style.display="none")}}function l(){var t=document.getElementById("quicksearch");inputVal=t.value,inputVal=inputVal.toLowerCase().trim(),e?($(".card").hide(),c(inputVal,$(e))):c(inputVal,$(".card"))}function o(t,n){for(li=t.getElementsByTagName("li"),e=n.value.toUpperCase(),i=0;i<li.length;i++)checkbox=li[i].innerHTML.replace(/<.*>/,""),checkbox.toUpperCase().indexOf(e)>-1?li[i].style.display="":li[i].style.display="none"}function u(){input=document.getElementById("topicsInput"),div=document.getElementById("subtopics"),o(div,input)}document.getElementById("viewChange").onclick=t,document.getElementById("uncheckAll").onclick=n,$(".btn-group").click(function(){e="";for(var t=$(".filterCheckbox:checked"),n=0;n<t.length;n++)e+="."+t[n].id;l()}),document.getElementById("quicksearch").onkeyup=l,document.getElementById("topicsInput").onkeyup=u,l();
},{}]},{},["djxq"], null)
//# sourceMappingURL=filters.8210cadd.js.map