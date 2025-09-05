const ingredients = document.getElementById('ingredients');
const difficulty = document.getElementById('difficulty');
const time = document.getElementById('time');
const generate_recipe = document.getElementById('generate-recipe');
const recipe_card = document.getElementById('recipe-card');
const recipe_loading = document.getElementById('recipe-loading');
const recipe_text = document.getElementById('recipe-text');
const close_recipe = document.getElementById('close-recipe');

generate_recipe.addEventListener('click', async () => {
  if (!ingredients.value.trim() || !difficulty.value.trim() || !time.value.trim()) return;

  recipe_card.style.display = "block";
  recipe_loading.style.display = "block";
  recipe_text.textContent = "";
  close_recipe.style.display = "none";

  const res = await fetch(`/api/recipe?ingredients=${encodeURIComponent(ingredients.value)}&difficulty=${encodeURIComponent(difficulty.value)}&time=${encodeURIComponent(time.value)}`);
  const data = await res.json();

  recipe_loading.style.display = "none";
  recipe_text.textContent = data.recipe;
  close_recipe.style.display = "block";
});

generate_recipe.addEventListener('click', async () => {
  if (!ingredients.value.trim() || !difficulty.value.trim() || !time.value.trim()) return;

  recipe_card.style.display = "block";
  recipe_loading.style.display = "block";
  recipe_text.textContent = "";
  close_recipe.style.display = "none";

  const res = await fetch(`/api/recipe?ingredients=${encodeURIComponent(ingredients.value)}&difficulty=${encodeURIComponent(difficulty.value)}&time=${encodeURIComponent(time.value)}`);
  const data = await res.json();

  recipe_loading.style.display = "none";
  
  recipe_text.innerHTML = marked.parse(data.recipe);

  close_recipe.style.display = "block";
});

