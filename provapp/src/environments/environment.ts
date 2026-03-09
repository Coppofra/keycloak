export const environment = {
    production: false,
    keycloak: {
        url: 'http://localhost:8080',
        realm: 'prova',
        clientId: 'provapp',
        redirectUri: window.location.origin,
    },
    apiUrl: 'http://localhost:5000',
};
