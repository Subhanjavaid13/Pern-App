import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3000';
export const useProductStore = create((set, get) => ({
    products: [],
    loading:false,
    error:null,

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

    deleteProduct : async (id) =>{
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set((prev)=> ({ products: prev.products.filter((product) => product.id !== id), error:null }));
            toast.success("Product deleted successfully");
        } catch (error) {
            set({ error: error.message });
            toast.error(error.message);
        } finally {
            set({ loading: false });
        }
    }
}))