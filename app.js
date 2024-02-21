const Baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;

        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};

// EXCHANGE-RATE FUNCTION
const updateRate = async () => {
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    // console.log(amtVal);
    if(amtVal === "" || amtVal<1){
        alert("Enter a valid numer");
    }

    // console.log(fromCurr.value," to ",toCurr.value);
    const URL=`${Baseurl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    // console.log(rate);

    let finalAmt=amtVal*rate;
    msg.innerText=`${amount.value} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

// CHANGING FLAG FUNCTION
const updateFlag = (element) => {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    // console.log(countryCode);

    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
});

window.addEventListener("load", () => {
    updateRate();
});