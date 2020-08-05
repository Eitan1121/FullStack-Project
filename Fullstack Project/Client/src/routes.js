import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutePage"), 
  },
  {
    path: "/recipes/Information/:recipe_id",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/familyRecipes",
    name: "familyRecipes",
    component: () => import("./pages/FamilyRecipePage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/personalRecipes",
    name: "personalRecipes",
    component: () => import("./pages/PersonalRecipesPage"),
  },
  {
    path: "/personalRecipesFull",
    name: "personalRecipesFull",
    component: () => import("./pages/PersonalRecipePage"),
  },
  {
    path: "/FullFamilyRecipe",
    name: "FullFamilyRecipe",
    component: () => import("./pages/FullFamilyPage"),
  },
];

export default routes;
