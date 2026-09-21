import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

import { ADD_PRODUCT_MODAL_ID } from '../constants';

const BASE_URL = 'http://localhost:3000';
export const useProductStore = create((set, get) => ({
    products: [],
    loading:false,
    error:null,
    deletingId:null,

    formData:{
        name:"",
        price:"",
        image:""
    },

    setFormData: (formData) => set({formData}),
    resetFormData: () => set({formData:{name:"", price:"", image:""}}),

    addProduct : async (e) => {
        e.preventDefault();
        set({ loading: true });
        try {
            await axios.post(`${BASE_URL}/api/products`, get().formData);
            await get().fetchProducts();
            get().resetFormData();
            toast.success("Product added successfully");
            document.getElementById(ADD_PRODUCT_MODAL_ID)?.close();
        } catch (error) {
            console.log(error, "error in addProduct");
            // Prefer the API's own message ("All Fields are required") over
            // axios' generic "Request failed with status code 400".
            toast.error(error.response?.data?.message || error.message);
        }finally {
            set({ loading: false });
        }
    },

    fetchProducts: async () => {
        set({ loading: true});
        try{
            const res = await axios.get(`${BASE_URL}/api/products`);
            set({ products: res.data.data, error:null });
        }catch(error){
            if(error.status === 429) set({error: "Too many requests. Please try again later.", products: []});
            else set({error: error.message});
        }finally{
            set({loading:false});
        }
    },

    // Deleting is a per-card action, so it tracks its own id rather than the
    // page-level `loading`/`error`, which would blank the whole grid.
    deleteProduct : async (id) =>{
        set({ deletingId: id });
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set((prev)=> ({ products: prev.products.filter((product) => product.id !== id) }));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.log(error, "error in deleteProduct");
            toast.error(error.response?.data?.message || error.message);
        } finally {
            set({ deletingId: null });
        }
    }
}))