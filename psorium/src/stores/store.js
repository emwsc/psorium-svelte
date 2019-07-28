import { writable } from "svelte/store";

/**
 * Список продуктов, которые выбрали для поисков рецептов
 */
export const selectedForRecipeProducts = writable({});

/**
 * true, если запущен поиск рецептов по продуктам
 * false, если поиск выключен
 */
export const isRecipiesSearchEnable = writable(false);

/**
 * Список найденных рецептов
 */
export const foundRecipes = writable([]);
