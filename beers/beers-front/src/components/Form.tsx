import {Beer} from "./BeerInterface"

export type FormType = Omit<Beer,"image_url"|"_id">