import  { makeAutoObservable } from "mobx";

export default class ProductStore {

    constructor() {
        this._types = [];
        this._products = [];
        this._selectedType = {};
        this._sort = 'data';
        makeAutoObservable(this);
    }       


    setTypes(types) {
        this._types = types;
    }
    setProducts(products) {
        this._products = products;
    }
    setSelectedType(type) {
        this._selectedType = type;
    }
   
    get types() {
        return this._types;
    }


    get products() {
        if (this._sort === 'price') {
            return [...this._products].sort((a, b) => a.price - b.price)
        }
        if (this._sort === 'date') {
            return [...this._products].sort((a, b) => new Date(b.date) - new Date(a.date))
        }
        return this._products
    }

    get selectedType() {
        return this._selectedType;
    }
    setSort(sort) {
        this._sort = sort;
    }   


}