exports.deleteKeys = async(object, keys)=>{
    try {
        let obj2 = {...object._doc}
        for(const key of keys){
            delete obj2[key]
        }
        return obj2
    } catch (error) {
        console.log(err)
        return {};
    }
}