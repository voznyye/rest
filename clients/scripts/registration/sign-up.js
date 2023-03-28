import {clean, cleanInputs} from "./../modules/cleaner";
import { bindInput } from "../modules/bindFunc";
import { postRequest } from "../resources/resources";
import getToken from "../verification/verification";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";


    function signUP(){
        const state = {};
        
        const signUPButton = document.getElementById("form-sign_up-button"),
            formNameInput = document.getElementById("form-name-input"),
            formPasswordInput = document.getElementById("form-password-input");

        bindInput(state, formNameInput);
        bindInput(state, formPasswordInput);

        
        signUPButton.addEventListener("click", event => {
            event.preventDefault();
    
            if(!state.name || !state.password){
                alert("Заполните имя и пароль");
                return;
            }
    
            if(event && event.target){
                postRequest("http://127.0.0.1/api/user/", state, getToken("token"))
                .then(response => {
                    console.log(response.message);
                    clean(state);
                    cleanInputs();
                    alert(response.message);
                    console.log(state);
                    // window.open("file:///C:/OSPanel/domains/AEH-project/clients/log-in.html");
                })
            }
        })
    }

    signUP();
})