export class Region {
    constructor(
        public code: string,
        public crop_type: string,
        public planting_date: string,
        public harvest_date: string,
        public geometry: any
    ) {
    }
}