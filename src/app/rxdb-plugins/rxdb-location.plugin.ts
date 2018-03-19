export function configRxdbLocationPlugin(pouchSettingsLocation={}) {
  return {
    rxdb: true,
    hooks: {
      preCreatePouchDb: pouchDbParameters => {
        pouchDbParameters.adapter = Object.assign({}, pouchDbParameters.adapter, pouchSettingsLocation);
      }
    }
  };
}
