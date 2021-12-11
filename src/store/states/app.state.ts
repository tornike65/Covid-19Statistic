import { Country } from "src/app/models/Countries.model";
import { Timeline } from "src/app/models/Timeline.model";

export interface AppState {
    isLoading: boolean,
    timeline: Timeline[],
    countries: Country[],
    countryCode: string,
    country:Country | null,
    selectedDate: string,
    message:string

}