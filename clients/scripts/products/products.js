require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import { bindInput } from "../modules/bindFunc";
import { postRequest, request, changeData} from "../resources/resources";
import { currentUserInit } from "../modules/currentUserInit";
import { renderProductCard } from "../modules/render";
import { cleanInputs } from "../modules/cleaner";
import getToken from "../verification/verification";


window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const searchInput  = document.getElementById("search-input"),
        productNameInput = document.getElementById("product-name"),
        productDescriptionInput = document.getElementById("product-description"),
        productPriceInput = document.getElementById("product-price"),

        searchButton = document.getElementById("get-one"),
        createButton = document.getElementById("create-new-item"),
        changeButton = document.getElementById("change-data"),
        deleteButton = document.getElementById("delete"),
        getAllButton = document.getElementById("get-all"),

        productsContainer = document.getElementById("products-hero");

    const state = {
        products: [],
        newProductChanges: {}
    };

    // магический строк 
    const methods = {
        get: "GET",
        delete: "DELETE"
    }

    currentUserInit("products");
    cleanProducts();

    bindInput(state.newProductChanges, searchInput);
    bindInput(state.newProductChanges, productNameInput);
    bindInput(state.newProductChanges, productDescriptionInput);
    bindInput(state.newProductChanges, productPriceInput);

    function createItem(event){
        event.preventDefault();

        if(!productNameInput.value || !productDescriptionInput.value || !productPriceInput.value){
            alert("Заполните поля name, description, price");
            return;
        }

        if(event && event.target){
            postRequest(`${window.env.host}/api/products/`, state.newProductChanges, getToken("token"))
            .then(response => {
                console.log(response)
                cleanInputs("productInputs");
            });
        }
    }

    function getAllProducts(event) {
        if(event && event.target){
            request(methods.get, `${window.env.host}/api/products/`, getToken("token"))
            .then(response => {
                cleanProducts();
                state.products = response;
                state.products.map(item => productsContainer.innerHTML += renderProductCard(item))
                console.log(state.products);
            });
        }
    }

    function changeProduct(event){
        if(!searchInput.value || ((!productNameInput.value && !productDescriptionInput.value && !productPriceInput.value))){
            alert("Обязательно заполните поля id, и один из трех полей ниже, чтобы изменить информацию о продукте!");
            return;
        }
        if(event && event.target){
            changeData(`${window.env.host}/api/products/${state.newProductChanges.id}`, {name: state.newProductChanges.name, price: state.newProductChanges.price, title: state.newProductChanges.title}, getToken("token"))
            .then(response => {
                const timer = setTimeout(function delay(){
                    if(response){
                        clearInterval(timer);
                        if(response.error){
                            alert(response.error);
                        } else {
                            alert(response.message);
                            getAllButton.click();
                            cleanInputs("productInputs");
                        }
                    } else {
                        setTimeout(delay, 5000)
                    }
                }, 5000)
            });
        }
    }

    function deleteProduct(event){
        if(!searchInput.value){
            alert("Укажите id продукта");
            return;
        }

        if(event && event.target){
            request(methods.delete, `${window.env.host}/api/products/${searchInput.value}`, getToken("token"))
            .then(response => {
                alert(response.message);
                getAllButton.click();
            });
        }
    }

    function searchProduct(event){
        if(!searchInput.value){
            alert("Укажите id продукта");
            return;
        }

        if(event && event.target){
            request(methods.get, `${window.env.host}/api/products/${searchInput.value}`, getToken("token"))
            .then(response => {
                console.log(response);
            })
        }
    }

    function cleanProducts() {
        productsContainer.innerHTML = "";
    }

    createButton.addEventListener("click", createItem.bind(this));

    getAllButton.addEventListener("click", getAllProducts.bind(this));

    changeButton.addEventListener("click", changeProduct.bind(this));

    deleteButton.addEventListener("click", deleteProduct.bind(this));

    searchButton.addEventListener("click", searchProduct.bind(this));

})
