// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    items_per_page: 10,
    base_endpoint: 'http://localhost:8000',
    endpoints: {
        auth: 'authentication:login',
        regions: 'monitor:regions_create_list',
        regions_details: 'monitor:regions_retrieve_update_destroy',
        products: 'monitor:products_list',
        tasks: 'services:tasks_list',
        tasks_details: 'services:tasks_details'
    },
};
