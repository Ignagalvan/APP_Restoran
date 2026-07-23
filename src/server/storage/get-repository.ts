import { JsonRestaurantOsRepository } from "./json-repository";
import type { RestaurantOsRepository } from "./repository";

let repository: RestaurantOsRepository | null = null;

export function getRepository() {
  repository ??= new JsonRestaurantOsRepository();
  return repository;
}
