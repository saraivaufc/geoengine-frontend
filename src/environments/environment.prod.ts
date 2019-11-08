// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  auth: {
    client_id: 'TgfzKnuv17whL1M45KIQym0jF1lAqXgtty2Sfw3c',
    redirectUrl: 'http://127.0.0.1:4200',
  },
  items_per_page: 10,
  base_endpoint: 'http://localhost:8000',
  endpoints: {
    token: 'oauth2Provider:token',
    fields: 'monitor:fields_create_list',
    regions_details: 'monitor:fields_retrieve_update_destroy',
    products: 'monitor:products_list',
    tasks: 'services:tasks_list',
    tasks_details: 'services:tasks_details'
  },
};
