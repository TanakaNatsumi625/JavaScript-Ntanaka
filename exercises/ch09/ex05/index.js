export function instanceOf(object, constructor){
    //objectのプロトタイプチェーンをたどり、constructorのprototypeと一致するか確認
    let proto = Object.getPrototypeOf(object);
    while(proto !== null){
        if(proto === constructor.prototype){
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

