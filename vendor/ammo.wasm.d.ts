export interface AmmoModule extends EmscriptenModule {

}

interface AmmoModuleFactory extends EmscriptenModuleFactory<AmmoModule> {

}

declare const Ammo: AmmoModuleFactory;

export default Ammo;