import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../../store";

interface Todo{
  id:string;
  text:string;
}

interface Product{
  id:number
  title:string
}

interface TodoState{
  todos:Todo[]
  products:Product[]
  loading:boolean
  error:string|null
}

const initialState:TodoState={
  todos:[],
  products:[],
  loading:false,
  error:null
};

export const fetchProducts = createAsyncThunk(
    "todos/fetchProducts",
    async()=>{
      const response = await fetch(
          "https://fakestoreapi.com/products"
      );
      const data=await response.json();
      return data;
    }
);

const todoSlice = createSlice({
  name:"todos",
  initialState,
  reducers:{
    addTodo:(state,action:PayloadAction<string>)=>{
      state.todos.push({
        id:Date.now().toString(),
        text:action.payload
      })
    },
    deleteTodo:(state,action:PayloadAction<string>)=>{
      state.todos=state.todos.filter(
          (todo)=>todo.id !==action.payload
    )
    },
  },

  extraReducers:(builder)=>{
    builder
        .addCase(fetchProducts.pending,(state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
          state.loading=false;
          state.products=action.payload;
        })
        .addCase(fetchProducts.rejected,(state)=>{
          state.loading=false;
          state.error="Failed to fetch products";
        });
  },
});
export const selectTodos = (state:RootState)=>state.todos.todos
export const {addTodo,deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;