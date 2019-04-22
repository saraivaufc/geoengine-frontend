// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export var environment = {
    production: false,
    items_per_page: 10,
    base_endpoint: 'http://localhost:8000',
    endpoints: {
        auth: 'authentication:login',
        regions: 'monitor:regions_create_list',
        regions_details: 'monitor:regions_retrieve_update_destroy',
        products: 'monitor:products_list',
        plans: 'payment:plans_list',
        payments: 'payment:payments_list',
    },
};
//# sourceMappingURL=environment.js.map