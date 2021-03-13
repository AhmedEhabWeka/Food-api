let allRecipes = [];
let recipeDetails = {};
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

let recipesOffsetTop=$("#Recipes").offset().top;
$(window).scroll(function()
{
  let widnowScrl=$(window).scrollTop();
  console.log(widnowScrl);
  if(widnowScrl>=recipesOffsetTop-250)
  {
   
    $("#scrlBtn").fadeIn(500);
  }

  else
  {
    
    $("#scrlBtn").fadeOut(500);

  }
})


$("#scrlBtn").click(function(){
  
    $("html,body").animate({scrollTop:"0"},2000);
  })

  $("a[href^='#']").click(function()
  {
    let x = $(this).attr("href");
    let recipesOffsetNow=$(x).offset().top;
    $("html,body").animate({scrollTop:recipesOffsetNow},3000);
  })








async function getRecipes(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}

getRecipes("apple");
function displayRecipes() {
    let cartoona = ``;

    for (let i = 0; i < allRecipes.length; i++) {

        let myId = "'"+allRecipes[i].recipe_id+"'";
        cartoona += ` 
        <div class="col-md-4 recipeContainer">
        <div class="recipe" onclick="getRecipeDetails(${myId})">
        <div class="imgContainer position-relative">
          <img class="w-100" src="${allRecipes[i].image_url}" alt="">
          <div class="overlay d-flex justify-content-center align-items-center">
            <i class="fas fa-search"></i>
          </div>
        </div>
        <h3 class="color-mine py-1">${allRecipes[i].title}</h3>
        <p>${allRecipes[i].publisher}</p>
      </div>

    </div>    
        ` ;
    }

    document.getElementById('recipesRow').innerHTML = cartoona;
}


async function getRecipeDetails(id) {

    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await apiResponse.json();
    recipeDetails = recipeDetails.recipe;
    displayRecipeDetails();
}




function displayRecipeDetails() {

    let cartoona2 =``;

    for (let x of recipeDetails.ingredients) {
        cartoona2 +=` <li class="d-flex py-1 align-items-center font-weight-bolder"><span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${x}</li>
        `;
    }
    let cartoona = ` <div class="recipeDetials">
    <h3 class=" text-center py-1">${recipeDetails.title}</h3>
    <img src="${recipeDetails.image_url}"  alt="">
    <ul class="fa-ul py-3">
    ${cartoona2}
    </ul>
  </div>`;

  document.getElementById('recipeDetails').innerHTML = cartoona;

}


searchBtn.addEventListener("click", function () {
    getRecipes(searchInput.value);
    
})

$(function() {
    $('.skitter-large').skitter();
  });

 